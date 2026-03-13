import type { AssessmentState, SkillScore } from '../types';
import { getSkillsInOrder } from '../data/skills';
import { generateProblem } from './problems';
import { createEmptyScore, recordAttempt } from './mastery';

const QUESTIONS_PER_SKILL = 3;

// Skills tested in assessment order — starts with K prerequisites, then Grade 1
const ASSESSMENT_ORDER = getSkillsInOrder().map(s => s.id);

export function createAssessment(): AssessmentState {
  return {
    currentSkillIndex: 0,
    skillQueue: [...ASSESSMENT_ORDER],
    questionsPerSkill: QUESTIONS_PER_SKILL,
    currentQuestionIndex: 0,
    results: {},
    complete: false,
  };
}

export function getAssessmentProgress(state: AssessmentState): {
  current: number;
  total: number;
  percent: number;
} {
  const skillsDone = Object.keys(state.results).length;
  const total = state.skillQueue.length;
  return {
    current: skillsDone,
    total,
    percent: Math.round((skillsDone / total) * 100),
  };
}

export function getCurrentAssessmentProblem(state: AssessmentState) {
  if (state.complete) return null;
  const skillId = state.skillQueue[state.currentSkillIndex];
  if (!skillId) return null;
  return generateProblem(skillId, 'abstract');
}

export function recordAssessmentAnswer(
  state: AssessmentState,
  skillId: string,
  correct: boolean,
  scores: Map<string, SkillScore>
): { state: AssessmentState; scores: Map<string, SkillScore> } {
  const newScores = new Map(scores);
  const newState = { ...state, results: { ...state.results } };

  // Initialize result for this skill if needed
  if (!newState.results[skillId]) {
    newState.results[skillId] = { attempted: 0, correct: 0 };
  }
  newState.results[skillId] = {
    attempted: newState.results[skillId].attempted + 1,
    correct: newState.results[skillId].correct + (correct ? 1 : 0),
  };

  // Update the skill score
  const currentScore = newScores.get(skillId) || createEmptyScore('', skillId);
  newScores.set(skillId, recordAttempt(currentScore, correct));

  // Move to next question or next skill
  const nextQuestionIndex = newState.currentQuestionIndex + 1;

  if (nextQuestionIndex >= QUESTIONS_PER_SKILL) {
    // Done with this skill — decide whether to skip dependents
    const result = newState.results[skillId];
    const correctCount = result.correct;

    if (correctCount <= 1) {
      // 0-1 correct: skip dependent skills in this branch
      const dependentsToSkip = getDependentSkillIds(skillId, newState.skillQueue);
      newState.skillQueue = newState.skillQueue.filter(
        id => !dependentsToSkip.has(id)
      );
    }

    // Move to next skill
    newState.currentQuestionIndex = 0;
    newState.currentSkillIndex = findNextSkillIndex(newState);

    if (newState.currentSkillIndex >= newState.skillQueue.length) {
      newState.complete = true;
    }
  } else {
    newState.currentQuestionIndex = nextQuestionIndex;
  }

  return { state: newState, scores: newScores };
}

function findNextSkillIndex(state: AssessmentState): number {
  // Find the next skill that hasn't been tested yet
  for (let i = 0; i < state.skillQueue.length; i++) {
    if (!state.results[state.skillQueue[i]]) {
      return i;
    }
  }
  return state.skillQueue.length; // all done
}

function getDependentSkillIds(
  skillId: string,
  queue: string[]
): Set<string> {
  const allSkills = getSkillsInOrder();
  const toSkip = new Set<string>();

  // BFS to find all transitive dependents
  const stack = [skillId];
  while (stack.length > 0) {
    const current = stack.pop()!;
    for (const s of allSkills) {
      if (s.prerequisites.includes(current) && queue.includes(s.id) && !toSkip.has(s.id)) {
        toSkip.add(s.id);
        stack.push(s.id);
      }
    }
  }

  return toSkip;
}

export function getAssessmentSummary(
  results: Record<string, { attempted: number; correct: number }>
): { skillId: string; score: number; label: string }[] {
  return Object.entries(results).map(([skillId, r]) => {
    if (r.attempted === 0) {
      return { skillId, score: 0, label: 'Not Started' };
    }
    const score = Math.round((r.correct / r.attempted) * 100);
    let label: string;
    if (r.correct === r.attempted) label = 'Proficient';
    else if (r.correct >= 2) label = 'Developing';
    else label = 'Not Started';
    return { skillId, score, label };
  });
}
