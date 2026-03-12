/**
 * MeasurementBar — renders length bars for comparison and ruler-style measurement.
 *
 * Value formats:
 *   "compare-pencil:6,crayon:3-inches"  → two labeled bars side by side
 *   "measure-pencil:6-inches"           → single bar with ruler marks
 */

const BAR_COLORS = ['#818cf8', '#f59e0b', '#34d399', '#f87171'];

export interface MeasurementInfo {
  type: 'compare' | 'measure';
  items: { label: string; length: number }[];
  unit: string;
}

export function parseMeasurementValue(value: string): MeasurementInfo | null {
  // compare-pencil:6,crayon:3-inches
  const compareMatch = value.match(/^compare-(.+)-(\w+)$/);
  if (compareMatch) {
    const pairs = compareMatch[1].split(',');
    const items: { label: string; length: number }[] = [];
    for (const pair of pairs) {
      const [label, numStr] = pair.split(':');
      if (!label || !numStr) return null;
      const num = parseInt(numStr, 10);
      if (isNaN(num)) return null;
      items.push({ label: label.replace(/_/g, ' '), length: num });
    }
    if (items.length === 0) return null;
    return { type: 'compare', items, unit: compareMatch[2].replace(/_/g, ' ') };
  }

  // measure-pencil:6-inches
  const measureMatch = value.match(/^measure-(.+?):(\d+)-(\w+)$/);
  if (measureMatch) {
    return {
      type: 'measure',
      items: [{ label: measureMatch[1].replace(/_/g, ' '), length: parseInt(measureMatch[2], 10) }],
      unit: measureMatch[3].replace(/_/g, ' '),
    };
  }

  return null;
}

interface MeasurementBarProps {
  value: string;
}

export default function MeasurementBar({ value }: MeasurementBarProps) {
  const info = parseMeasurementValue(value);
  if (!info) return null;

  const maxLength = Math.max(...info.items.map((i) => i.length));
  const pxPerUnit = Math.min(30, 240 / maxLength);

  if (info.type === 'measure') {
    const item = info.items[0];
    const barWidth = item.length * pxPerUnit;

    return (
      <div className="my-3 flex flex-col items-center gap-2" aria-label={`${item.label}: ${item.length} ${info.unit}`}>
        {/* Bar */}
        <div
          className="h-8 rounded-md"
          style={{ width: barWidth, backgroundColor: BAR_COLORS[0] }}
        />
        {/* Ruler ticks */}
        <svg width={barWidth + 2} height="24" viewBox={`0 0 ${barWidth + 2} 24`}>
          {Array.from({ length: item.length + 1 }, (_, i) => {
            const x = i * pxPerUnit + 1;
            return (
              <g key={i}>
                <line x1={x} y1={0} x2={x} y2={12} stroke="#334155" strokeWidth="1.5" />
                <text x={x} y={22} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">{i}</text>
              </g>
            );
          })}
          <line x1={1} y1={0} x2={barWidth + 1} y2={0} stroke="#334155" strokeWidth="1" />
        </svg>
        <span className="text-xs font-semibold text-slate-500">
          {item.label}: {item.length} {info.unit}
        </span>
      </div>
    );
  }

  // Compare mode
  return (
    <div className="my-3 flex flex-col gap-2 items-start" aria-label="Length comparison">
      {info.items.map((item, i) => {
        const barWidth = item.length * pxPerUnit;
        return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 w-16 text-right shrink-0">
              {item.label}
            </span>
            <div
              className="h-6 rounded-r-md"
              style={{ width: barWidth, backgroundColor: BAR_COLORS[i % BAR_COLORS.length], minWidth: 4 }}
            />
            <span className="text-xs font-bold text-slate-700">
              {info.unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}
