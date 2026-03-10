import { useState, useRef, useCallback, useEffect } from 'react';
import type { Student, SkillScore, AssessmentState, Problem } from '../../types';
import {
  createAssessment,
  getAssessmentProgress,
  getCurrentAssessmentProblem,
  recordAssessmentAnswer,
  getAssessmentSummary,
} from '../../engine/assessment';
import ProblemDisplay from '../session/ProblemDisplay';
import Feedback from '../session/Feedback';

interface AssessmentFlowProps {
  student: Student;
  scores: Map<string, SkillScore>;
  onComplete: (scores: Map<string, SkillScore>) => void;
}

type ViewState = 'problem' | 'feedback' | 'complete';

export default function AssessmentFlow({ student, scores, onComplete }: AssessmentFlowProps) {
  // Use refs for mutable state to avoid stale closures
  const stateRef = useRef<AssessmentState>(createAssessment());
  const scoresRef = useRef<Map<string, SkillScore>>(new Map(scores));

  // Render trigger — increment to force re-render after ref mutations
  const [, setRenderCount] = useState(0);
  const forceRender = useCallback(() => setRenderCount(n => n + 1), []);

  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [viewState, setViewState] = useState<ViewState>('problem');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastExplanation, setLastExplanation] = useState('');
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');

  // Skip skills that don't have problem generators
  function skipToNextValidSkill(): boolean {
    const state = stateRef.current;
    let attempts = 0;
    const maxAttempts = state.skillQueue.length;

    while (attempts < maxAttempts) {
      if (state.complete || state.currentSkillIndex >= state.skillQueue.length) {
        state.complete = true;
        return false;
      }

      try {
        const problem = getCurrentAssessmentProblem(state);
        if (problem) return true;
      } catch {
        // No generator for this skill — skip it
      }

      // Mark this skill as skipped and advance
      const skippedSkillId = state.skillQueue[state.currentSkillIndex];
      state.results[skippedSkillId] = { attempted: 0, correct: 0 };
      state.currentQuestionIndex = 0;

      // Find the next untested skill
      let found = false;
      for (let i = 0; i < state.skillQueue.length; i++) {
        if (!state.results[state.skillQueue[i]]) {
          state.currentSkillIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        state.complete = true;
        return false;
      }
      attempts++;
    }
    state.complete = true;
    return false;
  }

  function loadNextProblem() {
    const state = stateRef.current;

    if (state.complete) {
      setViewState('complete');
      forceRender();
      return;
    }

    const hasValid = skipToNextValidSkill();
    if (!hasValid) {
      setViewState('complete');
      forceRender();
      return;
    }

    try {
      const problem = getCurrentAssessmentProblem(state);
      if (problem) {
        setCurrentProblem(problem);
        setViewState('problem');
        forceRender();
      } else {
        setViewState('complete');
        forceRender();
      }
    } catch {
      // Shouldn't happen after skipToNextValidSkill, but just in case
      state.complete = true;
      setViewState('complete');
      forceRender();
    }
  }

  // Load initial problem
  useEffect(() => {
    loadNextProblem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(answer: string) {
    if (!currentProblem) return;

    const correct = answer.toLowerCase().trim() === currentProblem.correctAnswer.toLowerCase().trim();
    setLastAnswerCorrect(correct);
    setLastExplanation(currentProblem.explanation);
    setLastCorrectAnswer(currentProblem.correctAnswer);

    // Directly mutate refs — no stale closure issues
    const result = recordAssessmentAnswer(
      stateRef.current,
      currentProblem.skillId,
      correct,
      scoresRef.current
    );

    stateRef.current = result.state;
    scoresRef.current = result.scores;
    setViewState('feedback');
    forceRender();
  }

  function handleNext() {
    if (stateRef.current.complete) {
      setViewState('complete');
      forceRender();
    } else {
      loadNextProblem();
    }
  }

  function handleComplete() {
    onComplete(scoresRef.current);
  }

  const state = stateRef.current;
  const progress = getAssessmentProgress(state);
  const currentSkillId = state.skillQueue[state.currentSkillIndex] || '';
  const currentSkillName = currentSkillId.replace(/-/g, ' ');

  // Complete view
  if (viewState === 'complete' || state.complete) {
    const summary = getAssessmentSummary(state.results);
    const proficientCount = summary.filter((s) => s.label === 'Proficient').length;
    const developingCount = summary.filter((s) => s.label === 'Developing').length;
    const totalTested = summary.filter((s) => s.score > 0 || (s.label !== 'Not Started')).length;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold">Assessment Complete!</h2>
          <p className="text-green-100 mt-2 text-lg">
            Great job, {student.name}! We know just where to start.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow border border-gray-100">
            <p className="text-2xl font-bold text-indigo-600">{totalTested}</p>
            <p className="text-sm text-gray-500 font-medium">Skills Tested</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow border border-gray-100">
            <p className="text-2xl font-bold text-green-600">{proficientCount}</p>
            <p className="text-sm text-gray-500 font-medium">Proficient</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow border border-gray-100">
            <p className="text-2xl font-bold text-yellow-600">{developingCount}</p>
            <p className="text-sm text-gray-500 font-medium">Developing</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700 mb-3">Your Skills</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {summary.map((item) => (
              <div key={item.skillId} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700 font-medium truncate mr-3">{item.skillId.replace(/-/g, ' ')}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                    item.label === 'Proficient'
                      ? 'bg-green-100 text-green-700'
                      : item.label === 'Developing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {item.label === 'Proficient' ? '🏆' : item.label === 'Developing' ? '📈' : '📋'} {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-5 rounded-2xl text-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          Continue to Dashboard 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-600">Assessment Progress</span>
          <span className="text-sm text-gray-500">
            {progress.current} / {progress.total} skills
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400 capitalize">{currentSkillName}</p>
          <p className="text-xs text-gray-400">
            Question {state.currentQuestionIndex + 1} of {state.questionsPerSkill}
          </p>
        </div>
      </div>

      {/* Problem or Feedback */}
      {viewState === 'problem' && currentProblem && (
        <ProblemDisplay
          problem={currentProblem}
          onAnswer={handleAnswer}
        />
      )}

      {viewState === 'feedback' && (
        <Feedback
          correct={lastAnswerCorrect}
          explanation={lastExplanation}
          correctAnswer={lastCorrectAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
