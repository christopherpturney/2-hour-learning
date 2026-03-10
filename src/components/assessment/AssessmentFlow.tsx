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
import { PartyPopper, Trophy, TrendingUp, ClipboardList, ArrowRight } from 'lucide-react';

interface AssessmentFlowProps {
  student: Student;
  scores: Map<string, SkillScore>;
  onComplete: (scores: Map<string, SkillScore>) => void;
}

type ViewState = 'problem' | 'complete';

export default function AssessmentFlow({ student, scores, onComplete }: AssessmentFlowProps) {
  // Use refs for mutable state to avoid stale closures
  const stateRef = useRef<AssessmentState>(createAssessment());
  const scoresRef = useRef<Map<string, SkillScore>>(new Map(scores));

  // Render trigger — increment to force re-render after ref mutations
  const [, setRenderCount] = useState(0);
  const forceRender = useCallback(() => setRenderCount(n => n + 1), []);

  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [viewState, setViewState] = useState<ViewState>('problem');

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

    // Directly mutate refs — no stale closure issues
    const result = recordAssessmentAnswer(
      stateRef.current,
      currentProblem.skillId,
      correct,
      scoresRef.current
    );

    stateRef.current = result.state;
    scoresRef.current = result.scores;

    // Skip feedback — assessments don't reveal right/wrong
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
      <div className="space-y-5">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center shadow-sm">
          <PartyPopper className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-bold">Assessment Complete!</h2>
          <p className="text-emerald-100 mt-2">
            Great job, {student.name}! We know just where to start.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-indigo-600">{totalTested}</p>
            <p className="text-xs text-slate-500 font-medium">Skills Tested</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-emerald-600">{proficientCount}</p>
            <p className="text-xs text-slate-500 font-medium">Proficient</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-amber-600">{developingCount}</p>
            <p className="text-xs text-slate-500 font-medium">Developing</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-3">Your Skills</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {summary.map((item) => (
              <div key={item.skillId} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-700 font-medium truncate mr-3">{item.skillId.replace(/-/g, ' ')}</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                    item.label === 'Proficient'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.label === 'Developing'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.label === 'Proficient'
                    ? <Trophy className="w-3 h-3" />
                    : item.label === 'Developing'
                      ? <TrendingUp className="w-3 h-3" />
                      : <ClipboardList className="w-3 h-3" />
                  }
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl text-xl font-bold active:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 min-h-[56px]"
        >
          Continue to Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-600">Assessment Progress</span>
          <span className="text-sm text-slate-500">
            {progress.current} / {progress.total} skills
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-slate-400 capitalize">{currentSkillName}</p>
          <p className="text-xs text-slate-400">
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
    </div>
  );
}
