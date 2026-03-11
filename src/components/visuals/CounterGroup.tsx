/**
 * CounterGroup — renders colored circle counters for addition/subtraction.
 *
 * Value format examples:
 *   "counters-5"           → 5 blue circles
 *   "counters-5-3"         → 5 blue + 3 amber circles (addition)
 *   "counters-8-cross-3"   → 8 total, last 3 crossed out (subtraction)
 *
 * Arranged in rows of 5 for easy counting.
 */

interface CounterGroupProps {
  value: string;
  size?: number;
}

export interface CounterGroupInfo {
  groupA: number;
  groupB: number;
  crossedOut: number;
}

export function parseCounterValue(value: string): CounterGroupInfo | null {
  // counters-8-cross-3
  const crossMatch = value.match(/^counters-(\d+)-cross-(\d+)$/);
  if (crossMatch) {
    const total = parseInt(crossMatch[1], 10);
    const crossed = parseInt(crossMatch[2], 10);
    return { groupA: total, groupB: 0, crossedOut: crossed };
  }

  // counters-5-3
  const twoGroupMatch = value.match(/^counters-(\d+)-(\d+)$/);
  if (twoGroupMatch) {
    return {
      groupA: parseInt(twoGroupMatch[1], 10),
      groupB: parseInt(twoGroupMatch[2], 10),
      crossedOut: 0,
    };
  }

  // counters-5
  const singleMatch = value.match(/^counters-(\d+)$/);
  if (singleMatch) {
    return { groupA: parseInt(singleMatch[1], 10), groupB: 0, crossedOut: 0 };
  }

  return null;
}

function CircleRow({ count, color, crossed }: { count: number; color: string; crossed?: boolean }) {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push(
      <div
        key={i}
        className={`relative rounded-full ${crossed ? 'opacity-40' : ''}`}
        style={{ width: 28, height: 28, backgroundColor: color }}
      >
        {crossed && (
          <svg
            className="absolute inset-0"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="22" y2="22" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <line x1="22" y1="6" x2="6" y2="22" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>
    );
  }
  return <>{circles}</>;
}

export default function CounterGroup({ value }: CounterGroupProps) {
  const info = parseCounterValue(value);
  if (!info) return null;

  const { groupA, groupB, crossedOut } = info;

  // Subtraction mode: show remaining + crossed out
  if (crossedOut > 0) {
    const remaining = groupA - crossedOut;
    return (
      <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} counters with ${crossedOut} crossed out`}>
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          <CircleRow count={remaining} color="#6366f1" />
          <CircleRow count={crossedOut} color="#6366f1" crossed />
        </div>
        <div className="flex gap-4 text-xs font-semibold text-slate-500">
          <span>{remaining} left</span>
          <span className="text-red-400">{crossedOut} taken away</span>
        </div>
      </div>
    );
  }

  // Two groups (addition) or single group
  if (groupB > 0) {
    return (
      <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} and ${groupB} counters`}>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm">
          <div className="flex flex-wrap gap-2 p-2 bg-indigo-50 rounded-xl">
            <CircleRow count={groupA} color="#6366f1" />
          </div>
          <span className="text-lg font-bold text-slate-400">+</span>
          <div className="flex flex-wrap gap-2 p-2 bg-amber-50 rounded-xl">
            <CircleRow count={groupB} color="#f59e0b" />
          </div>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-slate-500">
          <span className="text-indigo-600">{groupA}</span>
          <span className="text-amber-600">{groupB}</span>
        </div>
      </div>
    );
  }

  // Single group
  return (
    <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} counters`}>
      <div className="flex flex-wrap justify-center gap-2 max-w-xs">
        <CircleRow count={groupA} color="#6366f1" />
      </div>
    </div>
  );
}
