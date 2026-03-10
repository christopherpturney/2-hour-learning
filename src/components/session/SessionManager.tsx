import { useState, useEffect, useRef, useCallback } from 'react';
import type { Student, SkillScore, Session, ActiveSession } from '../../types';
import {
  createSessionPlan,
  startSession,
  getNextProblem,
  recordAnswer,
  getSessionProgress,
  isSessionComplete,
  getSessionSummary,
} from '../../engine/session';
import ProblemDisplay from './ProblemDisplay';
import Feedback from './Feedback';
import { PartyPopper, Star, Check, ArrowLeft } from 'lucide-react';

interface SessionManagerProps {
  student: Student;
  scores: Map<string, SkillScore>;
  onComplete: (scores: Map<string, SkillScore>, sessionData: Session) => void;
}

type ViewState = 'problem' | 'feedback' | 'complete';

export default function SessionManager({ student, scores, onComplete }: SessionManagerProps) {
  // Use refs for mutable state to avoid stale closures
  const sessionRef = useRef<ActiveSession>(null!);
  const scoresRef = useRef<Map<string, SkillScore>>(new Map(scores));

  // Initialize session ref on first render
  if (sessionRef.current === null) {
    const plan = createSessionPlan(scores);
    sessionRef.current = startSession(plan);
  }

  const [, setRenderCount] = useState(0);
  const forceRender = useCallback(() => setRenderCount(n => n + 1), []);

  const [viewState, setViewState] = useState<ViewState>('problem');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastExplanation, setLastExplanation] = useState('');
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    const session = sessionRef.current;
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - session.startTime) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function loadNextProblem() {
    const session = sessionRef.current;
    if (isSessionComplete(session)) {
      setViewState('complete');
      if (timerRef.current) clearInterval(timerRef.current);
      forceRender();
      return;
    }

    try {
      const problem = getNextProblem(session);
      if (!problem) {
        session.phase = 'celebration';
        setViewState('complete');
        if (timerRef.current) clearInterval(timerRef.current);
        forceRender();
        return;
      }
      session.currentProblem = problem;
      setViewState('problem');
      forceRender();
    } catch {
      session.phase = 'celebration';
      setViewState('complete');
      if (timerRef.current) clearInterval(timerRef.current);
      forceRender();
    }
  }

  useEffect(() => {
    loadNextProblem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(answer: string) {
    const session = sessionRef.current;
    if (!session.currentProblem) return;

    const correct = answer.toLowerCase().trim() === session.currentProblem.correctAnswer.toLowerCase().trim();
    setLastAnswerCorrect(correct);
    setLastExplanation(session.currentProblem.explanation);
    setLastCorrectAnswer(session.currentProblem.correctAnswer);

    const result = recordAnswer(session, correct, scoresRef.current);
    sessionRef.current = result.session;
    scoresRef.current = result.scores;
    setViewState('feedback');
    forceRender();
  }

  function handleNext() {
    loadNextProblem();
  }

  function handleComplete() {
    const session = sessionRef.current;
    const summary = getSessionSummary(session);
    const sessionData: Session = {
      studentId: student.id,
      sessionType: 'daily',
      startedAt: new Date(session.startTime).toISOString(),
      durationSeconds: summary.duration,
      problemsAttempted: summary.problemsAttempted,
      problemsCorrect: summary.problemsCorrect,
      skillBreakdown: summary.skillBreakdown,
    };
    onComplete(scoresRef.current, sessionData);
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function renderStars(accuracy: number) {
    const count = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
    return (
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: count }, (_, i) => (
          <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400" />
        ))}
      </div>
    );
  }

  const session = sessionRef.current;
  const progress = getSessionProgress(session);
  const phaseColors: Record<string, string> = {
    warmup: 'from-orange-400 to-amber-500',
    learning: 'from-indigo-500 to-violet-600',
    practice: 'from-violet-500 to-purple-600',
    celebration: 'from-emerald-500 to-teal-600',
  };

  // Complete screen
  if (viewState === 'complete' || isSessionComplete(session)) {
    const summary = getSessionSummary(session);

    return (
      <div className="space-y-5">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center shadow-sm">
          <PartyPopper className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-bold">Great Job!</h2>
          <p className="text-emerald-100 mt-1">
            Amazing work today, {student.name}!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-indigo-600">{summary.problemsAttempted}</p>
            <p className="text-xs text-slate-500 font-medium">Problems</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-emerald-600">{summary.problemsCorrect}</p>
            <p className="text-xs text-slate-500 font-medium">Correct</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
            <p className="text-2xl font-bold text-violet-600">{summary.accuracy}%</p>
            <p className="text-xs text-slate-500 font-medium">Accuracy</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Session Time</p>
          <p className="text-2xl font-bold text-indigo-600">{formatTime(summary.duration)}</p>
        </div>

        {renderStars(summary.accuracy)}

        <button
          onClick={handleComplete}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl text-xl font-bold active:bg-indigo-700 transition-colors shadow-sm min-h-[56px] inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Timer + Phase indicator */}
      <div className={`bg-gradient-to-r ${phaseColors[progress.phase] || phaseColors.learning} rounded-2xl p-4 text-white shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold">{progress.phaseLabel}</span>
          <span className="text-xl font-bold font-mono">
            {formatTime(elapsedSeconds)} / {formatTime(progress.totalSeconds)}
          </span>
        </div>

        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-80">
          <span>{progress.problemsCompleted} problems done</span>
          <span>{progress.totalProblems} total</span>
        </div>
      </div>

      {/* Phase step indicators */}
      <div className="flex items-center justify-center gap-2">
        {(['warmup', 'learning', 'practice'] as const).map((phase) => {
          const isCurrent = progress.phase === phase;
          const isPast =
            (phase === 'warmup' && (progress.phase === 'learning' || progress.phase === 'practice')) ||
            (phase === 'learning' && progress.phase === 'practice');
          return (
            <div key={phase} className="flex items-center gap-2">
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-bold min-h-[32px] flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white'
                    : isPast
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isPast && <Check className="w-3 h-3" />}
                {phase === 'warmup' ? 'Warm Up' : phase === 'learning' ? 'New Learning' : 'Practice'}
              </div>
              {phase !== 'practice' && (
                <div className={`w-6 h-0.5 ${isPast ? 'bg-emerald-300' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Problem or Feedback */}
      {viewState === 'problem' && session.currentProblem && (
        <ProblemDisplay
          problem={session.currentProblem}
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
