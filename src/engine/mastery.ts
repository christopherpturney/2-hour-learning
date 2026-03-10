import type { MasteryLevel, SkillScore, AttemptRecord } from '../types';

const REVIEW_INTERVALS_DAYS = [3, 7, 14, 30];
const RECENT_ATTEMPTS_LIMIT = 10;

export function createEmptyScore(studentId: string, skillId: string): SkillScore {
  return {
    studentId,
    skillId,
    mastery: 'not_started',
    totalAttempts: 0,
    totalCorrect: 0,
    recentAttempts: [],
    lastAttempted: null,
    firstMasteredAt: null,
    nextReviewAt: null,
  };
}

export function calculateMastery(score: SkillScore): MasteryLevel {
  if (score.recentAttempts.length < 3) {
    return 'not_started';
  }

  const correct = score.recentAttempts.filter(a => a.correct).length;
  const accuracy = correct / score.recentAttempts.length;

  if (accuracy >= 0.9) {
    // Sustained across 2+ sessions: check if firstMasteredAt exists
    // (meaning mastery was achieved in a previous session)
    if (score.firstMasteredAt) {
      return 'mastered';
    }
    return 'proficient';
  }

  if (accuracy >= 0.8) {
    return 'proficient';
  }

  if (accuracy >= 0.5) {
    return 'developing';
  }

  return 'developing';
}

export function recordAttempt(score: SkillScore, correct: boolean): SkillScore {
  const now = new Date().toISOString();
  const newAttempt: AttemptRecord = { correct, timestamp: now };

  const recentAttempts = [...score.recentAttempts, newAttempt].slice(-RECENT_ATTEMPTS_LIMIT);

  const updatedScore: SkillScore = {
    ...score,
    totalAttempts: score.totalAttempts + 1,
    totalCorrect: score.totalCorrect + (correct ? 1 : 0),
    recentAttempts,
    lastAttempted: now,
  };

  const newMastery = calculateMastery(updatedScore);

  // Set firstMasteredAt when reaching proficient with 90%+ for the first time
  let firstMasteredAt = updatedScore.firstMasteredAt;
  if (!firstMasteredAt && newMastery === 'proficient') {
    const recentCorrect = recentAttempts.filter(a => a.correct).length;
    const accuracy = recentCorrect / recentAttempts.length;
    if (accuracy >= 0.9) {
      firstMasteredAt = now;
    }
  }

  // If mastered, compute review date; if demoted from mastered, clear review
  let nextReviewAt = updatedScore.nextReviewAt;
  if (newMastery === 'mastered') {
    nextReviewAt = getNextReviewDate({ ...updatedScore, mastery: newMastery, firstMasteredAt });
  } else if (score.mastery === 'mastered') {
    nextReviewAt = null;
  }

  return {
    ...updatedScore,
    mastery: newMastery,
    firstMasteredAt,
    nextReviewAt,
  };
}

export function getNextReviewDate(score: SkillScore): string | null {
  if (score.mastery !== 'mastered' || !score.firstMasteredAt) {
    return null;
  }

  const masteredAt = new Date(score.firstMasteredAt).getTime();
  const now = Date.now();

  for (const days of REVIEW_INTERVALS_DAYS) {
    const reviewTime = masteredAt + days * 24 * 60 * 60 * 1000;
    if (reviewTime > now) {
      return new Date(reviewTime).toISOString();
    }
  }

  // Past all intervals: schedule 30 days from last attempt or now
  const base = score.lastAttempted ? new Date(score.lastAttempted).getTime() : now;
  return new Date(base + 30 * 24 * 60 * 60 * 1000).toISOString();
}

export function needsReview(score: SkillScore): boolean {
  if (score.mastery !== 'mastered' || !score.nextReviewAt) {
    return false;
  }
  return new Date(score.nextReviewAt).getTime() <= Date.now();
}
