import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { LessonStep } from '../../types';
import AnalogClock, { parseClockValue } from '../AnalogClock';
import { BookOpen, Lightbulb, Play, ArrowRight, ChevronRight, Volume2 } from 'lucide-react';

interface LessonDisplayProps {
  steps: LessonStep[];
  skillId: string;
  skillName: string;
  onComplete: () => void;
}

function renderDots(count: number) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push(
      <span key={i} className="inline-block w-6 h-6 bg-blue-400 rounded-full mx-0.5" />
    );
  }
  return <div className="flex flex-wrap justify-center gap-1.5 my-1">{dots}</div>;
}

export default function LessonDisplay({ steps, skillId, skillName, onComplete }: LessonDisplayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const audioSrc = `/audio/lessons/${skillId}-${currentStep}.mp3`;

  // Auto-play audio when step changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = audioSrc;
    audio.load();

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); // Autoplay blocked — user hasn't interacted yet
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioSrc]);

  const handleReplay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const stepIcon = useMemo(() => {
    switch (step.type) {
      case 'concept': return <BookOpen className="w-6 h-6" />;
      case 'example': return <Play className="w-6 h-6" />;
      case 'try_it': return <Lightbulb className="w-6 h-6" />;
    }
  }, [step.type]);

  const stepColor = useMemo(() => {
    switch (step.type) {
      case 'concept': return 'from-indigo-500 to-violet-600';
      case 'example': return 'from-emerald-500 to-teal-600';
      case 'try_it': return 'from-amber-500 to-orange-500';
    }
  }, [step.type]);

  const stepLabel = useMemo(() => {
    switch (step.type) {
      case 'concept': return 'Learn';
      case 'example': return 'Example';
      case 'try_it': return 'Your Turn';
    }
  }, [step.type]);

  function handleNext() {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep(s => s + 1);
    }
  }

  return (
    <div className="space-y-5">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />

      {/* Skill name + progress dots */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-700">{skillName}</h2>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentStep
                  ? 'bg-indigo-500 scale-125'
                  : i < currentStep
                    ? 'bg-indigo-300'
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Step header */}
        <div className={`bg-gradient-to-r ${stepColor} text-white px-5 py-3 flex items-center gap-2`}>
          {stepIcon}
          <span className="text-xs font-bold uppercase tracking-wider">{stepLabel}</span>
          <span className="ml-auto text-xs opacity-75">{currentStep + 1} / {steps.length}</span>
        </div>

        {/* Step content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
            {/* Replay audio button */}
            <button
              onClick={handleReplay}
              className={`shrink-0 p-1.5 rounded-full transition-colors ${
                isPlaying
                  ? 'bg-indigo-100 text-indigo-600 animate-pulse'
                  : 'bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-500'
              }`}
              aria-label="Listen again"
              title="Listen again"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-slate-600 text-base leading-relaxed">{step.content}</p>

          {/* Visual */}
          {step.visual && step.visual.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap items-center justify-center gap-2">
              {step.visual.map((part, idx) => {
                switch (part.type) {
                  case 'dots':
                    return <div key={idx}>{renderDots(part.count || 0)}</div>;
                  case 'equation':
                    return (
                      <span key={idx} className="text-2xl font-bold text-slate-800 px-1">
                        {part.value}
                      </span>
                    );
                  case 'text':
                    return (
                      <span key={idx} className="text-lg text-slate-600 px-1">
                        {part.value}
                      </span>
                    );
                  case 'image': {
                    const clock = parseClockValue(part.value);
                    if (clock) {
                      return <AnalogClock key={idx} hour={clock.hour} minute={clock.minute} size={140} />;
                    }
                    return <span key={idx} className="text-lg text-slate-600">{part.value}</span>;
                  }
                  default:
                    return <span key={idx} className="text-lg text-slate-600">{part.value}</span>;
                }
              })}
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium">{step.tip}</p>
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className={`w-full inline-flex items-center justify-center gap-2 py-5 rounded-2xl text-xl font-bold text-white transition-colors shadow-sm min-h-[56px] ${
          isLast
            ? 'bg-amber-500 active:bg-amber-600'
            : 'bg-indigo-600 active:bg-indigo-700'
        }`}
      >
        {isLast ? (
          <>
            Let's Practice!
            <ChevronRight className="w-6 h-6" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}
