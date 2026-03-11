import type { ActiveSession, Problem, SessionPlan, SessionPhase, SkillScore, TeachingProgress } from '../types';
import { selectLearningSkills, selectWarmupSkills, selectPracticeSkills } from './zpd';
import { generateProblem } from './problems';
import { recordAttempt } from './mastery';

// Problem counts per phase
const WARMUP_PROBLEMS = 6;
const GUIDED_PROBLEMS_PER_SKILL = 4;
const INDEPENDENT_PROBLEMS = 8;

export function createSessionPlan(scores: Map<string, SkillScore>): SessionPlan {
  const learningSkills = selectLearningSkills(scores);
  const warmupSkills = selectWarmupSkills(scores, WARMUP_PROBLEMS);
  const practiceSkills = selectPracticeSkills(learningSkills, scores, INDEPENDENT_PROBLEMS);

  const guidedTotal = learningSkills.length * GUIDED_PROBLEMS_PER_SKILL;
  const warmupTotal = Math.min(warmupSkills.length, WARMUP_PROBLEMS);

  return {
    warmupSkills: warmupSkills.map(s => s.id),
    learningSkills: learningSkills.map(s => s.id),
    practiceSkills: practiceSkills.map(s => s.id),
    totalProblems: warmupTotal + guidedTotal + INDEPENDENT_PROBLEMS,
  };
}

export function startSession(plan: SessionPlan): ActiveSession {
  const teachingProgress: TeachingProgress[] = plan.learningSkills.map(skillId => ({
    skillId,
    lessonStepIndex: 0,
    lessonComplete: false,
    guidedCorrect: 0,
    guidedAttempted: 0,
  }));

  // Skip warmup if no review skills
  const initialPhase: SessionPhase = plan.warmupSkills.length > 0 ? 'warmup' : 'teach';

  return {
    plan,
    phase: initialPhase,
    startTime: Date.now(),
    elapsedSeconds: 0,
    problemsCompleted: 0,
    problemsCorrect: 0,
    currentProblem: null,
    skillResults: {},
    consecutiveWrong: 0,
    teachingProgress,
    currentTeachingIndex: 0,
  };
}

export function getNextProblem(session: ActiveSession): Problem | null {
  const { phase, plan } = session;

  let skillId: string | null = null;
  let scaffolding: 'concrete' | 'representational' | 'abstract' = 'abstract';

  if (phase === 'warmup') {
    const warmupSkills = plan.warmupSkills;
    if (warmupSkills.length === 0) return null;
    const warmupIndex = getWarmupIndex(session);
    if (warmupIndex >= WARMUP_PROBLEMS) return null;
    skillId = warmupSkills[warmupIndex % warmupSkills.length];
    scaffolding = 'abstract'; // warmup is review
  } else if (phase === 'guided_practice') {
    const tp = session.teachingProgress[session.currentTeachingIndex];
    if (!tp || tp.guidedAttempted >= GUIDED_PROBLEMS_PER_SKILL) return null;
    skillId = tp.skillId;

    // Scaffold down if struggling in guided practice
    if (session.consecutiveWrong >= 2) {
      scaffolding = 'concrete';
    } else if (session.consecutiveWrong >= 1) {
      scaffolding = 'representational';
    } else {
      scaffolding = 'abstract';
    }
  } else if (phase === 'independent_practice') {
    const practiceSkills = plan.practiceSkills;
    if (practiceSkills.length === 0) return null;
    const practiceIndex = getIndependentIndex(session);
    if (practiceIndex >= INDEPENDENT_PROBLEMS) return null;
    skillId = practiceSkills[practiceIndex % practiceSkills.length];
    scaffolding = 'abstract';
  } else {
    // teach or celebration — no problem to generate
    return null;
  }

  if (!skillId) return null;

  try {
    return generateProblem(skillId, scaffolding);
  } catch {
    return null;
  }
}

export function recordAnswer(
  session: ActiveSession,
  correct: boolean,
  scores: Map<string, SkillScore>
): { session: ActiveSession; scores: Map<string, SkillScore> } {
  const problem = session.currentProblem;
  if (!problem) return { session, scores };

  const newScores = new Map(scores);
  const newSession: ActiveSession = {
    ...session,
    problemsCompleted: session.problemsCompleted + 1,
    problemsCorrect: session.problemsCorrect + (correct ? 1 : 0),
    consecutiveWrong: correct ? 0 : session.consecutiveWrong + 1,
    skillResults: { ...session.skillResults },
    teachingProgress: session.teachingProgress.map(tp => ({ ...tp })),
  };

  // Update skill results
  const skillId = problem.skillId;
  if (!newSession.skillResults[skillId]) {
    newSession.skillResults[skillId] = { attempted: 0, correct: 0 };
  }
  newSession.skillResults[skillId] = {
    attempted: newSession.skillResults[skillId].attempted + 1,
    correct: newSession.skillResults[skillId].correct + (correct ? 1 : 0),
  };

  // Update student's skill score
  const currentScore = newScores.get(skillId);
  if (currentScore) {
    newScores.set(skillId, recordAttempt(currentScore, correct));
  }

  // Track guided practice progress
  if (session.phase === 'guided_practice') {
    const tp = newSession.teachingProgress[newSession.currentTeachingIndex];
    if (tp) {
      tp.guidedAttempted += 1;
      tp.guidedCorrect += correct ? 1 : 0;
    }
  }

  // Determine next phase
  newSession.phase = determinePhase(newSession);

  return { session: newSession, scores: newScores };
}

function getWarmupIndex(session: ActiveSession): number {
  // Count problems completed during warmup
  return session.problemsCompleted;
}

function getIndependentIndex(session: ActiveSession): number {
  // Problems completed in independent practice = total completed minus warmup and guided
  const warmupDone = Math.min(session.plan.warmupSkills.length > 0 ? WARMUP_PROBLEMS : 0, session.plan.warmupSkills.length);
  const guidedDone = session.teachingProgress.reduce((sum, tp) => sum + tp.guidedAttempted, 0);
  return session.problemsCompleted - warmupDone - guidedDone;
}

function determinePhase(session: ActiveSession): SessionPhase {
  const { plan } = session;

  // Warmup phase
  if (session.phase === 'warmup') {
    const warmupDone = session.problemsCompleted;
    if (warmupDone >= WARMUP_PROBLEMS || warmupDone >= plan.warmupSkills.length) {
      // Move to teach (or skip to independent if no learning skills)
      if (plan.learningSkills.length > 0) return 'teach';
      return 'independent_practice';
    }
    return 'warmup';
  }

  // Teach phase — stays until lesson display triggers advance
  if (session.phase === 'teach') {
    return 'teach';
  }

  // Guided practice
  if (session.phase === 'guided_practice') {
    const tp = session.teachingProgress[session.currentTeachingIndex];
    if (tp && tp.guidedAttempted >= GUIDED_PROBLEMS_PER_SKILL) {
      // This skill's guided practice is done. Move to next skill or independent.
      const nextIndex = session.currentTeachingIndex + 1;
      if (nextIndex < session.teachingProgress.length) {
        // More skills to teach
        session.currentTeachingIndex = nextIndex;
        return 'teach';
      }
      // All teaching done — move to independent practice
      return 'independent_practice';
    }
    return 'guided_practice';
  }

  // Independent practice
  if (session.phase === 'independent_practice') {
    const idx = getIndependentIndex(session);
    if (idx >= INDEPENDENT_PROBLEMS) {
      return 'celebration';
    }
    return 'independent_practice';
  }

  return 'celebration';
}

// Called by SessionManager when the lesson display is complete
export function advanceFromTeach(session: ActiveSession): ActiveSession {
  const tp = session.teachingProgress[session.currentTeachingIndex];
  if (tp) {
    tp.lessonComplete = true;
  }
  return {
    ...session,
    phase: 'guided_practice',
    consecutiveWrong: 0,
    teachingProgress: session.teachingProgress.map(t => ({ ...t })),
  };
}

export function getSessionProgress(session: ActiveSession): {
  phase: SessionPhase;
  phaseLabel: string;
  problemsCompleted: number;
  totalProblems: number;
  percentComplete: number;
  elapsedSeconds: number;
  totalSeconds: number;
} {
  const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
  const phaseLabels: Record<SessionPhase, string> = {
    warmup: 'Warm Up',
    teach: 'New Lesson',
    guided_practice: 'Guided Practice',
    independent_practice: 'Practice',
    celebration: 'Great Job!',
  };

  return {
    phase: session.phase,
    phaseLabel: phaseLabels[session.phase],
    problemsCompleted: session.problemsCompleted,
    totalProblems: session.plan.totalProblems,
    percentComplete: session.plan.totalProblems > 0
      ? Math.round((session.problemsCompleted / session.plan.totalProblems) * 100)
      : 0,
    elapsedSeconds: elapsed,
    totalSeconds: 20 * 60,
  };
}

export function isSessionComplete(session: ActiveSession): boolean {
  return session.phase === 'celebration';
}

export function getSessionSummary(session: ActiveSession) {
  const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
  return {
    duration: elapsed,
    problemsAttempted: session.problemsCompleted,
    problemsCorrect: session.problemsCorrect,
    accuracy: session.problemsCompleted > 0
      ? Math.round((session.problemsCorrect / session.problemsCompleted) * 100)
      : 0,
    skillBreakdown: Object.entries(session.skillResults).map(([skillId, r]) => ({
      skillId,
      attempted: r.attempted,
      correct: r.correct,
    })),
  };
}
