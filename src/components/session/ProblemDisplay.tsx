import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Problem } from '../../types';
import ClockFace, { parseClockValue } from '../ClockFace';
import ShapeVisual, { parseShapeValue } from '../ShapeVisual';
import CounterGroup, { parseCounterValue } from '../visuals/CounterGroup';
import Base10Blocks, { parseBase10Value } from '../visuals/Base10Blocks';
import TallyMarks, { parseTallyValue } from '../visuals/TallyMarks';
import BarChart, { parseBarChartValue } from '../visuals/BarChart';
import MeasurementBar, { parseMeasurementValue } from '../visuals/MeasurementBar';

interface ProblemDisplayProps {
  problem: Problem;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export default function ProblemDisplay({ problem, onAnswer, disabled }: ProblemDisplayProps) {
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Reset hint visibility when problem changes
  useEffect(() => {
    setShowHint(false);
  }, [problem.id]);

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;
    onAnswer(inputValue.trim());
    setInputValue('');
  }

  function renderDots(count: number) {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <span key={i} className="inline-block w-6 h-6 bg-blue-400 rounded-full mx-0.5" />
      );
    }
    return <div className="flex flex-wrap justify-center gap-1.5 my-2">{dots}</div>;
  }

  function renderQuestionParts() {
    if (!problem.questionParts || problem.questionParts.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 my-4">
        {problem.questionParts.map((part, idx) => {
          switch (part.type) {
            case 'image': {
              const clock = parseClockValue(part.value);
              if (clock) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <ClockFace hour={clock.hour} minute={clock.minute} size={200} />
                  </div>
                );
              }
              const shapeInfo = parseShapeValue(part.value);
              if (shapeInfo) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <ShapeVisual value={part.value} size={180} />
                  </div>
                );
              }
              const counterInfo = parseCounterValue(part.value);
              if (counterInfo) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <CounterGroup value={part.value} />
                  </div>
                );
              }
              const base10Info = parseBase10Value(part.value);
              if (base10Info) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <Base10Blocks value={part.value} />
                  </div>
                );
              }
              const tallyInfo = parseTallyValue(part.value);
              if (tallyInfo) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <TallyMarks value={part.value} />
                  </div>
                );
              }
              const barChartInfo = parseBarChartValue(part.value);
              if (barChartInfo) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <BarChart value={part.value} />
                  </div>
                );
              }
              const measureInfo = parseMeasurementValue(part.value);
              if (measureInfo) {
                return (
                  <div key={idx} className="w-full flex justify-center my-2">
                    <MeasurementBar value={part.value} />
                  </div>
                );
              }
              return null;
            }
            case 'dots':
              return <div key={idx}>{renderDots(part.count || 0)}</div>;
            case 'blank':
              return (
                <span
                  key={idx}
                  className="inline-block w-16 h-12 border-b-4 border-indigo-400 mx-1"
                />
              );
            case 'equation':
              return (
                <span key={idx} className="text-3xl font-bold text-slate-800">
                  {part.value}
                </span>
              );
            case 'text':
              return (
                <span key={idx} className="text-xl text-slate-700">
                  {part.value}
                </span>
              );
            case 'number_line': {
              // Parse range from value like "0-10", "0-20", "0-5"
              let nlMin = 0;
              let nlMax = 10;
              const nlMatch = part.value.match(/^(\d+)-(\d+)$/);
              if (nlMatch) {
                nlMin = parseInt(nlMatch[1], 10);
                nlMax = parseInt(nlMatch[2], 10);
              }
              const nlCount = nlMax - nlMin + 1;
              // For large ranges, show every 5th or 10th number
              const step = nlCount > 20 ? 10 : nlCount > 10 ? 5 : 1;
              const ticks = [];
              for (let n = nlMin; n <= nlMax; n += step) {
                ticks.push(n);
              }
              if (ticks[ticks.length - 1] !== nlMax) ticks.push(nlMax);
              return (
                <div key={idx} className="w-full flex items-center gap-1 justify-center my-2 overflow-x-auto">
                  {ticks.map((n) => (
                    <div key={n} className="flex flex-col items-center">
                      <div className="w-1 h-4 bg-slate-400" />
                      <span className="text-sm text-slate-500 font-medium">{n}</span>
                    </div>
                  ))}
                </div>
              );
            }
            default:
              return (
                <span key={idx} className="text-xl text-slate-700">
                  {part.value}
                </span>
              );
          }
        })}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
      {/* Scaffolding indicator */}
      {problem.scaffolding === 'concrete' && (
        <div className="text-center text-sm text-blue-600 font-semibold bg-blue-50 rounded-xl px-3 py-2 inline-block">
          Use the dots to help you count!
        </div>
      )}

      {/* Question */}
      <div className="text-center py-2">
        {(!problem.questionParts || problem.questionParts.length === 0) && (
          <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed">
            {problem.question}
          </p>
        )}
        {renderQuestionParts()}
      </div>

      {/* Hint — hidden until requested */}
      {problem.hint && (
        showHint ? (
          <p className="text-center text-sm text-indigo-500 italic bg-indigo-50 rounded-xl px-3 py-2">{problem.hint}</p>
        ) : (
          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="mx-auto block text-sm text-slate-400 font-medium active:text-indigo-500 transition-colors"
          >
            Need a hint?
          </button>
        )
      )}

      {/* Answer input area */}
      <div className="space-y-3">
        {problem.type === 'multiple_choice' && problem.choices && (
          <div className="flex flex-wrap justify-center gap-3">
            {problem.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => !disabled && onAnswer(choice)}
                disabled={disabled}
                className="bg-slate-50 active:bg-indigo-100 border-2 border-slate-200 active:border-indigo-400 text-slate-800 py-4 px-10 rounded-2xl text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] min-w-[80px]"
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {problem.type === 'number_input' && (
          <form onSubmit={handleInputSubmit} className="flex gap-3 justify-center">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              autoFocus
              placeholder="?"
              className="w-32 text-center text-3xl font-bold py-3 px-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 min-h-[56px]"
            />
            <button
              type="submit"
              disabled={disabled || !inputValue.trim()}
              className="bg-indigo-600 text-white py-3 px-8 rounded-2xl text-xl font-bold active:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm min-h-[56px]"
            >
              Go!
            </button>
          </form>
        )}

        {problem.type === 'true_false' && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => !disabled && onAnswer('true')}
              disabled={disabled}
              className="flex-1 max-w-44 bg-emerald-50 active:bg-emerald-100 border-2 border-emerald-300 active:border-emerald-500 text-emerald-700 py-5 rounded-2xl text-2xl font-bold transition-all disabled:opacity-50 min-h-[64px]"
            >
              True
            </button>
            <button
              onClick={() => !disabled && onAnswer('false')}
              disabled={disabled}
              className="flex-1 max-w-44 bg-red-50 active:bg-red-100 border-2 border-red-300 active:border-red-500 text-red-600 py-5 rounded-2xl text-2xl font-bold transition-all disabled:opacity-50 min-h-[64px]"
            >
              False
            </button>
          </div>
        )}

        {problem.type === 'comparison' && (
          <div className="flex gap-3 justify-center">
            {['<', '=', '>'].map((op) => (
              <button
                key={op}
                onClick={() => !disabled && onAnswer(op)}
                disabled={disabled}
                className="w-20 h-20 bg-slate-50 active:bg-indigo-100 border-2 border-slate-200 active:border-indigo-400 text-slate-800 rounded-2xl text-3xl font-bold transition-all disabled:opacity-50 min-h-[64px]"
              >
                {op}
              </button>
            ))}
          </div>
        )}

        {problem.type === 'fill_blank' && (
          <form onSubmit={handleInputSubmit} className="flex gap-3 justify-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              autoFocus
              placeholder="?"
              className="w-32 text-center text-3xl font-bold py-3 px-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 min-h-[56px]"
            />
            <button
              type="submit"
              disabled={disabled || !inputValue.trim()}
              className="bg-indigo-600 text-white py-3 px-8 rounded-2xl text-xl font-bold active:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm min-h-[56px]"
            >
              Go!
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
