import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { Student, SkillScore, Session, ActiveSession } from '../../types';
import {
  createSessionPlan,
  startSession,
  getNextProblem,
  recordAnswer,
  advanceFromTeach,
  getSessionProgress,
  isSessionComplete,
  getSessionSummary,
} from '../../engine/session';
import { getLesson } from '../../data/lessons';
import { skillMap } from '../../data/skills';
import ProblemDisplay from './ProblemDisplay';
import LessonDisplay from './LessonDisplay';
import Feedback from './Feedback';
import { PartyPopper, Star, Check, ArrowLeft } from 'lucide-react';

interface SessionManagerProps {
  student: Student;
  scores: Map<string, SkillScore>;
  onComplete: (scores: Map<string, SkillScore>, sessionData: Session) => void;
}

type ViewState = 'problem' | 'feedback' | 'lesson' | 'complete';

export default function SessionManager({ student, scores, onComplete }: SessionManagerProps) {
  const sessionRef = useRef<ActiveSession>(null!);
  const scoresRef = useRef<Map<string, SkillScore>>(new Map(scores));

  if (sessionRef.current === null) {
    const plan = createSessionPlan(scores);
    sessionRef.current = startSession(plan);
  }

  const [, setRenderCount] = useState(0);
  const forceRender = useCallback(() => setRenderCount(n => n + 1), []);

  const [viewState, setViewState] = useState<ViewState>(() => {
    // Start with lesson if first phase is teach
    return sessionRef.current.phase === 'teach' ? 'lesson' : 'problem';
  });
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastExplanation, setLastExplanation] = useState('');
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const encouragementRef = useRef('');

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

    // If phase is teach, show lesson
    if (session.phase === 'teach') {
      setViewState('lesson');
      forceRender();
      return;
    }

    try {
      const problem = getNextProblem(session);
      if (!problem) {
        // No problem available — advance phase
        // This handles empty phases gracefully
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

  function handleLessonComplete() {
    const session = sessionRef.current;
    sessionRef.current = advanceFromTeach(session);
    loadNextProblem();
  }

  function handleAnswer(answer: string) {
    const session = sessionRef.current;
    if (!session.currentProblem) return;

    const correct = answer.toLowerCase().trim() === session.currentProblem.correctAnswer.toLowerCase().trim();
    setLastAnswerCorrect(correct);
    setLastExplanation(session.currentProblem.explanation);
    setLastCorrectAnswer(session.currentProblem.correctAnswer);

    if (correct) {
      const ENCOURAGEMENTS = ['Amazing!', 'You rock!', 'Fantastic!', 'Super star!', 'Way to go!', 'Brilliant!', 'Awesome!', 'Keep it up!'];
      encouragementRef.current = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    }

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

  // Get current lesson for teach phase
  const currentLesson = useMemo(() => {
    const session = sessionRef.current;
    if (session.phase !== 'teach' && viewState !== 'lesson') return null;
    const tp = session.teachingProgress[session.currentTeachingIndex];
    if (!tp) return null;
    return getLesson(tp.skillId);
  }, [viewState]);

  const currentSkillName = useMemo(() => {
    const session = sessionRef.current;
    const tp = session.teachingProgress[session.currentTeachingIndex];
    if (!tp) return '';
    return skillMap.get(tp.skillId)?.name ?? tp.skillId;
  }, [viewState]);

  const session = sessionRef.current;
  const progress = getSessionProgress(session);

  const phaseColors: Record<string, string> = {
    warmup: 'from-orange-400 to-amber-500',
    teach: 'from-indigo-500 to-violet-600',
    guided_practice: 'from-violet-500 to-purple-600',
    independent_practice: 'from-emerald-500 to-teal-600',
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
      {/* Timer + Phase indicator (hidden during lesson for cleaner view) */}
      {viewState !== 'lesson' && (
        <>
          <div className={`bg-gradient-to-r ${phaseColors[progress.phase] || phaseColors.teach} rounded-2xl p-4 text-white shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">{progress.phaseLabel}</span>
              <span className="text-xl font-bold font-mono">
                {formatTime(elapsedSeconds)}
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
            {(['warmup', 'teach', 'guided_practice', 'independent_practice'] as const).map((phase) => {
              const isCurrent = progress.phase === phase;
              const phaseOrder = ['warmup', 'teach', 'guided_practice', 'independent_practice'];
              const currentIdx = phaseOrder.indexOf(progress.phase);
              const thisIdx = phaseOrder.indexOf(phase);
              const isPast = thisIdx < currentIdx;

              // Skip warmup indicator if no warmup skills
              if (phase === 'warmup' && session.plan.warmupSkills.length === 0) return null;

              const labels: Record<string, string> = {
                warmup: 'Warm Up',
                teach: 'Lesson',
                guided_practice: 'Guided',
                independent_practice: 'Practice',
              };

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
                    {labels[phase]}
                  </div>
                  {phase !== 'independent_practice' && (
                    <div className={`w-6 h-0.5 ${isPast ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Lesson view */}
      {viewState === 'lesson' && currentLesson && (
        <LessonDisplay
          steps={currentLesson.steps}
          skillName={currentSkillName}
          onComplete={handleLessonComplete}
        />
      )}

      {/* Lesson fallback — if no lesson content exists, skip to guided practice */}
      {viewState === 'lesson' && !currentLesson && (() => {
        handleLessonComplete();
        return null;
      })()}

      {/* Problem */}
      {viewState === 'problem' && session.currentProblem && (
        <ProblemDisplay
          problem={session.currentProblem}
          onAnswer={handleAnswer}
        />
      )}

      {/* Feedback */}
      {viewState === 'feedback' && (
        <Feedback
          correct={lastAnswerCorrect}
          explanation={lastExplanation}
          correctAnswer={lastCorrectAnswer}
          encouragement={encouragementRef.current}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
