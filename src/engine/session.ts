import type { ActiveSession, Problem, SessionPlan, SessionPhase, SkillScore } from '../types';
import { selectLearningSkills, selectWarmupSkills, selectPracticeSkills } from './zpd';
import { generateProblem } from './problems';
import { recordAttempt } from './mastery';

// Session timing (in seconds)
const WARMUP_DURATION = 3 * 60;     // 3 minutes
const LEARNING_DURATION = 10 * 60;  // 10 minutes
const PRACTICE_DURATION = 5 * 60;   // 5 minutes
const TOTAL_DURATION = 20 * 60;     // 20 minutes

// Problem counts per phase
const WARMUP_PROBLEMS = 6;
const LEARNING_PROBLEMS = 12;
const PRACTICE_PROBLEMS = 8;

export function createSessionPlan(scores: Map<string, SkillScore>): SessionPlan {
  const learningSkills = selectLearningSkills(scores);
  const warmupSkills = selectWarmupSkills(scores, WARMUP_PROBLEMS);
  const practiceSkills = selectPracticeSkills(learningSkills, scores, PRACTICE_PROBLEMS);

  return {
    warmupSkills: warmupSkills.map(s => s.id),
    learningSkills: learningSkills.map(s => s.id),
    practiceSkills: practiceSkills.map(s => s.id),
    totalProblems: WARMUP_PROBLEMS + LEARNING_PROBLEMS + PRACTICE_PROBLEMS,
  };
}

export function startSession(plan: SessionPlan): ActiveSession {
  return {
    plan,
    phase: 'warmup',
    startTime: Date.now(),
    elapsedSeconds: 0,
    problemsCompleted: 0,
    problemsCorrect: 0,
    currentProblem: null,
    skillResults: {},
    consecutiveWrong: 0,
  };
}

export function getNextProblem(session: ActiveSession): Problem | null {
  const { phase, plan, problemsCompleted } = session;

  let skillId: string | null = null;
  let scaffolding: 'concrete' | 'representational' | 'abstract' = 'abstract';

  if (phase === 'warmup') {
    const warmupSkills = plan.warmupSkills;
    if (warmupSkills.length === 0) return null;
    skillId = warmupSkills[problemsCompleted % warmupSkills.length];
    scaffolding = 'abstract'; // warmup is review, so abstract
  } else if (phase === 'learning') {
    const learningSkills = plan.learningSkills;
    if (learningSkills.length === 0) return null;
    const learningIndex = problemsCompleted - getPhaseStartIndex(session, 'learning');
    skillId = learningSkills[learningIndex % learningSkills.length];

    // Scaffold based on consecutive wrong answers
    if (session.consecutiveWrong >= 3) {
      scaffolding = 'concrete';
    } else if (session.consecutiveWrong >= 2) {
      scaffolding = 'representational';
    } else {
      scaffolding = 'abstract';
    }
  } else if (phase === 'practice') {
    const practiceSkills = plan.practiceSkills;
    if (practiceSkills.length === 0) return null;
    const practiceIndex = problemsCompleted - getPhaseStartIndex(session, 'practice');
    skillId = practiceSkills[practiceIndex % practiceSkills.length];
    scaffolding = 'abstract';
  } else {
    return null; // celebration phase
  }

  if (!skillId) return null;

  try {
    return generateProblem(skillId, scaffolding);
  } catch {
    // If no generator exists for this skill, skip it
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
  const newSession = {
    ...session,
    problemsCompleted: session.problemsCompleted + 1,
    problemsCorrect: session.problemsCorrect + (correct ? 1 : 0),
    consecutiveWrong: correct ? 0 : session.consecutiveWrong + 1,
    skillResults: { ...session.skillResults },
  };

  // Update skill results for this session
  const skillId = problem.skillId;
  if (!newSession.skillResults[skillId]) {
    newSession.skillResults[skillId] = { attempted: 0, correct: 0 };
  }
  newSession.skillResults[skillId] = {
    attempted: newSession.skillResults[skillId].attempted + 1,
    correct: newSession.skillResults[skillId].correct + (correct ? 1 : 0),
  };

  // Update the student's skill score
  const currentScore = newScores.get(skillId);
  if (currentScore) {
    newScores.set(skillId, recordAttempt(currentScore, correct));
  }

  // Check if we should advance to next phase
  newSession.phase = determinePhase(newSession);

  return { session: newSession, scores: newScores };
}

function determinePhase(session: ActiveSession): SessionPhase {
  const elapsed = (Date.now() - session.startTime) / 1000;

  // Time-based phase transitions
  if (elapsed >= WARMUP_DURATION + LEARNING_DURATION + PRACTICE_DURATION) {
    return 'celebration';
  }

  // Problem-count-based phase transitions
  if (session.problemsCompleted < WARMUP_PROBLEMS) {
    return 'warmup';
  } else if (session.problemsCompleted < WARMUP_PROBLEMS + LEARNING_PROBLEMS) {
    return 'learning';
  } else if (session.problemsCompleted < WARMUP_PROBLEMS + LEARNING_PROBLEMS + PRACTICE_PROBLEMS) {
    return 'practice';
  }
  return 'celebration';
}

function getPhaseStartIndex(_session: ActiveSession, phase: SessionPhase): number {
  switch (phase) {
    case 'warmup': return 0;
    case 'learning': return WARMUP_PROBLEMS;
    case 'practice': return WARMUP_PROBLEMS + LEARNING_PROBLEMS;
    case 'celebration': return WARMUP_PROBLEMS + LEARNING_PROBLEMS + PRACTICE_PROBLEMS;
  }
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
    learning: 'New Learning',
    practice: 'Practice',
    celebration: 'Great Job!',
  };

  return {
    phase: session.phase,
    phaseLabel: phaseLabels[session.phase],
    problemsCompleted: session.problemsCompleted,
    totalProblems: session.plan.totalProblems,
    percentComplete: Math.round((session.problemsCompleted / session.plan.totalProblems) * 100),
    elapsedSeconds: elapsed,
    totalSeconds: TOTAL_DURATION,
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
