import { useEffect, useCallback } from 'react';

interface NumberPadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function NumberPad({ value, onChange, onSubmit, disabled }: NumberPadProps) {
  const handleDigit = useCallback((digit: string) => {
    if (disabled) return;
    onChange(value + digit);
  }, [disabled, value, onChange]);

  const handleBackspace = useCallback(() => {
    if (disabled) return;
    onChange(value.slice(0, -1));
  }, [disabled, value, onChange]);

  const handleSubmit = useCallback(() => {
    if (disabled || !value.trim()) return;
    onSubmit();
  }, [disabled, value, onSubmit]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleBackspace, handleSubmit]);

  const buttonClass =
    'bg-slate-50 active:bg-indigo-100 border-2 border-slate-200 active:border-indigo-400 text-slate-800 rounded-2xl text-2xl font-bold transition-all disabled:opacity-50 min-h-[56px]';

  return (
    <div className="space-y-3">
      {/* Display */}
      <div className="flex justify-center">
        <div className="w-40 text-center text-3xl font-bold py-3 px-4 rounded-2xl border-2 border-slate-200 bg-white min-h-[56px] text-slate-800">
          {value || <span className="text-slate-300">?</span>}
        </div>
      </div>

      {/* Number grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-fit">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleDigit(String(n))}
              disabled={disabled}
              className={`w-16 h-14 ${buttonClass}`}
            >
              {n}
            </button>
          ))}
          {/* Bottom row: backspace, 0, submit */}
          <button
            type="button"
            onClick={handleBackspace}
            disabled={disabled || !value}
            className={`w-16 h-14 ${buttonClass} text-lg`}
            aria-label="Delete"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleDigit('0')}
            disabled={disabled}
            className={`w-16 h-14 ${buttonClass}`}
          >
            0
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="w-16 h-14 bg-indigo-600 active:bg-indigo-700 text-white rounded-2xl text-lg font-bold transition-all disabled:opacity-50 min-h-[56px]"
          >
            Go!
          </button>
        </div>
      </div>
    </div>
  );
}
