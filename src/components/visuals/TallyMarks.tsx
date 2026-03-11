/**
 * TallyMarks — renders tally mark groups.
 *
 * Value format: "tally-7" → one group of 5 (with diagonal) + 2 singles
 */

export interface TallyInfo {
  count: number;
}

export function parseTallyValue(value: string): TallyInfo | null {
  const match = value.match(/^tally-(\d+)$/);
  if (!match) return null;
  return { count: parseInt(match[1], 10) };
}

function TallyGroup5() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      {/* Four vertical lines */}
      {[5, 10, 15, 20].map((x, i) => (
        <line key={i} x1={x} y1={3} x2={x} y2={25} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {/* Diagonal slash */}
      <line x1={2} y1={22} x2={23} y2={5} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TallySingles({ count }: { count: number }) {
  const width = count * 8 + 4;
  return (
    <svg width={width} height="28" viewBox={`0 0 ${width} 28`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <line key={i} x1={i * 8 + 4} y1={3} x2={i * 8 + 4} y2={25} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

interface TallyMarksProps {
  value: string;
}

export default function TallyMarks({ value }: TallyMarksProps) {
  const info = parseTallyValue(value);
  if (!info) return null;

  const fullGroups = Math.floor(info.count / 5);
  const remainder = info.count % 5;

  return (
    <div
      className="flex items-center gap-3 my-2"
      aria-label={`${info.count} tally marks`}
    >
      {Array.from({ length: fullGroups }, (_, i) => (
        <TallyGroup5 key={i} />
      ))}
      {remainder > 0 && <TallySingles count={remainder} />}
    </div>
  );
}
