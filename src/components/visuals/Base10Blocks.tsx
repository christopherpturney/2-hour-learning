/**
 * Base10Blocks — renders place value blocks (hundreds, tens, ones).
 *
 * Value format:
 *   "base10-0-3-5"    → 0 hundreds, 3 tens, 5 ones
 *   "base10-2-4-7"    → 2 hundreds, 4 tens, 7 ones
 *
 * Hundreds = 10×10 flat squares, Tens = tall bars, Ones = small cubes.
 */

export interface Base10Info {
  hundreds: number;
  tens: number;
  ones: number;
}

export function parseBase10Value(value: string): Base10Info | null {
  const match = value.match(/^base10-(\d+)-(\d+)-(\d+)$/);
  if (!match) return null;
  return {
    hundreds: parseInt(match[1], 10),
    tens: parseInt(match[2], 10),
    ones: parseInt(match[3], 10),
  };
}

function HundredBlock() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="1" y="1" width="42" height="42" rx="2" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1.5" />
      {/* Grid lines to show 10×10 */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={4.2 * (i + 1) + 1} y1="1" x2={4.2 * (i + 1) + 1} y2="43" stroke="#4338ca" strokeWidth="0.3" opacity="0.4" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1="1" y1={4.2 * (i + 1) + 1} x2="43" y2={4.2 * (i + 1) + 1} stroke="#4338ca" strokeWidth="0.3" opacity="0.4" />
      ))}
    </svg>
  );
}

function TenBar() {
  return (
    <svg width="12" height="44" viewBox="0 0 12 44" aria-hidden="true">
      <rect x="1" y="1" width="10" height="42" rx="1.5" fill="#818cf8" stroke="#4338ca" strokeWidth="1.5" />
      {/* Segment lines */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="1" y1={4.2 * (i + 1) + 1} x2="11" y2={4.2 * (i + 1) + 1} stroke="#4338ca" strokeWidth="0.3" opacity="0.5" />
      ))}
    </svg>
  );
}

function OneCube() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
    </svg>
  );
}

interface Base10BlocksProps {
  value: string;
}

export default function Base10Blocks({ value }: Base10BlocksProps) {
  const info = parseBase10Value(value);
  if (!info) return null;

  const { hundreds, tens, ones } = info;
  const hasHundreds = hundreds > 0;
  const hasTens = tens > 0;
  const hasOnes = ones > 0;

  return (
    <div
      className="flex flex-wrap items-end justify-center gap-6 my-3"
      aria-label={`${hundreds} hundreds, ${tens} tens, ${ones} ones`}
    >
      {/* Hundreds */}
      {hasHundreds && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap gap-1 justify-center" style={{ maxWidth: 140 }}>
            {Array.from({ length: hundreds }, (_, i) => (
              <HundredBlock key={i} />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">
            hundreds
          </span>
        </div>
      )}

      {/* Tens */}
      {hasTens && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: tens }, (_, i) => (
              <TenBar key={i} />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">
            tens
          </span>
        </div>
      )}

      {/* Ones */}
      {hasOnes && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap gap-0.5 justify-center" style={{ maxWidth: 72 }}>
            {Array.from({ length: ones }, (_, i) => (
              <OneCube key={i} />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">
            ones
          </span>
        </div>
      )}
    </div>
  );
}
