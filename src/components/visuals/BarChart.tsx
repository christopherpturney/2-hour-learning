/**
 * BarChart — renders a horizontal bar chart with labeled categories.
 *
 * Value format: "barchart-Cats:3,Dogs:5,Fish:2"
 */

const BAR_COLORS = ['#818cf8', '#f59e0b', '#34d399', '#f87171', '#a78bfa', '#38bdf8'];

export interface BarChartInfo {
  data: { label: string; value: number }[];
}

export function parseBarChartValue(value: string): BarChartInfo | null {
  const match = value.match(/^barchart-(.+)$/);
  if (!match) return null;

  const entries = match[1].split(',');
  const data: { label: string; value: number }[] = [];

  for (const entry of entries) {
    const [label, numStr] = entry.split(':');
    if (!label || !numStr) return null;
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return null;
    data.push({ label: label.trim(), value: num });
  }

  return data.length > 0 ? { data } : null;
}

interface BarChartProps {
  value: string;
}

export default function BarChart({ value }: BarChartProps) {
  const info = parseBarChartValue(value);
  if (!info) return null;

  const maxValue = Math.max(...info.data.map((d) => d.value));
  const maxBarWidth = 200;

  return (
    <div className="my-3 w-full max-w-sm" aria-label="Bar chart">
      <div className="space-y-2">
        {info.data.map((item, i) => {
          const barWidth = maxValue > 0 ? (item.value / maxValue) * maxBarWidth : 0;
          const color = BAR_COLORS[i % BAR_COLORS.length];

          return (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600 w-16 text-right shrink-0">
                {item.label}
              </span>
              <div className="flex items-center gap-1.5 flex-1">
                <div
                  className="h-6 rounded-r-md transition-all"
                  style={{ width: barWidth, backgroundColor: color, minWidth: item.value > 0 ? 4 : 0 }}
                />
                <span className="text-xs font-bold text-slate-700">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Grid labels */}
      <div className="flex items-center gap-2 mt-1">
        <span className="w-16 shrink-0" />
        <div className="flex-1 flex justify-between px-0.5" style={{ maxWidth: maxBarWidth }}>
          {Array.from({ length: Math.min(maxValue + 1, 11) }, (_, i) => (
            <span key={i} className="text-[10px] text-slate-400">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
