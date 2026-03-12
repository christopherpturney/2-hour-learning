interface ClockFaceProps {
  hour: number;
  minute: number;
  size?: number;
  className?: string;
}

export default function ClockFace({ hour, minute, size = 200, className = '' }: ClockFaceProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;
  const tickOuterRadius = radius * 0.92;
  const tickInnerRadius = radius * 0.82;
  const smallTickInnerRadius = radius * 0.88;
  const numberRadius = radius * 0.68;

  // Calculate hand angles
  // Minute hand: 0 at 12, 180 at 6, etc.
  const minuteAngle = (minute / 60) * 360 - 90;
  // Hour hand: accounts for partial hour from minutes
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30 - 90;

  const minuteHandLength = radius * 0.75;
  const hourHandLength = radius * 0.52;

  function polarToCartesian(angle: number, r: number) {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  const minuteEnd = polarToCartesian(minuteAngle, minuteHandLength);
  const hourEnd = polarToCartesian(hourAngle, hourHandLength);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label={`Clock showing ${hour}:${minute === 0 ? '00' : minute}`}
    >
      {/* Clock face background */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="white"
        stroke="#334155"
        strokeWidth={size * 0.02}
      />

      {/* Minute tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        const angle = (i / 60) * 360 - 90;
        const isHourMark = i % 5 === 0;
        const inner = isHourMark ? tickInnerRadius : smallTickInnerRadius;
        const start = polarToCartesian(angle, inner);
        const end = polarToCartesian(angle, tickOuterRadius);
        return (
          <line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={isHourMark ? '#334155' : '#94a3b8'}
            strokeWidth={isHourMark ? size * 0.015 : size * 0.005}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hour numbers */}
      {Array.from({ length: 12 }, (_, i) => {
        const num = i === 0 ? 12 : i;
        const angle = (i / 12) * 360 - 90;
        const pos = polarToCartesian(angle, numberRadius);
        return (
          <text
            key={num}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.12}
            fontWeight="bold"
            fill="#1e293b"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {num}
          </text>
        );
      })}

      {/* Hour hand (short, thick) */}
      <line
        x1={cx}
        y1={cy}
        x2={hourEnd.x}
        y2={hourEnd.y}
        stroke="#1e293b"
        strokeWidth={size * 0.04}
        strokeLinecap="round"
      />

      {/* Minute hand (long, thinner) */}
      <line
        x1={cx}
        y1={cy}
        x2={minuteEnd.x}
        y2={minuteEnd.y}
        stroke="#4338ca"
        strokeWidth={size * 0.025}
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.03} fill="#1e293b" />
    </svg>
  );
}

/**
 * Parse a clock image value like "clock-3-00" or "clock-12-30"
 * Returns { hour, minute } or null if invalid
 */
export function parseClockValue(value: string): { hour: number; minute: number } | null {
  const match = value.match(/^clock-(\d+)-(\d+)$/);
  if (!match) return null;
  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}
