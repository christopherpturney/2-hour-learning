import { CheckCircle, XCircle, Star, ArrowRight } from 'lucide-react';

interface FeedbackProps {
  correct: boolean;
  explanation: string;
  correctAnswer: string;
  encouragement: string;
  onNext: () => void;
}

export default function Feedback({ correct, explanation, correctAnswer, encouragement, onNext }: FeedbackProps) {
  return (
    <div
      className={`rounded-2xl p-6 text-center space-y-4 border-2 ${
        correct
          ? 'bg-emerald-50 border-emerald-300'
          : 'bg-red-50 border-red-200'
      }`}
    >
      {correct
        ? <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto" />
        : <XCircle className="w-14 h-14 text-red-400 mx-auto" />
      }

      <h3
        className={`text-2xl font-bold ${
          correct ? 'text-emerald-600' : 'text-red-500'
        }`}
      >
        {correct ? encouragement : 'Not quite!'}
      </h3>

      {!correct && (
        <p className="text-lg text-slate-700">
          The correct answer is{' '}
          <span className="font-bold text-indigo-600 text-xl">{correctAnswer}</span>
        </p>
      )}

      {/* Always show explanation — reinforces learning whether right or wrong */}
      {explanation && (
        <p className="text-slate-500 text-sm">{explanation}</p>
      )}

      {correct && (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
        </div>
      )}

      <button
        onClick={onNext}
        className={`inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-xl font-bold text-white transition-colors shadow-sm min-h-[56px] ${
          correct
            ? 'bg-emerald-600 active:bg-emerald-700'
            : 'bg-indigo-600 active:bg-indigo-700'
        }`}
      >
        Next
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
