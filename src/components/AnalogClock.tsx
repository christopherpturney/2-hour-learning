interface AnalogClockProps {
  hour: number;
  minute: number;
  size?: number;
}

export default function AnalogClock({ hour, minute, size = 120 }: AnalogClockProps) {
  const cx = 50;
  const cy = 50;

  // Normalize hour to 1-12
  const h = hour % 12 || 12;

  // Minute hand: 360 degrees / 60 minutes = 6 degrees per minute
  const minuteAngle = (minute / 60) * 360 - 90;

  // Hour hand: each hour = 30 degrees, plus minute offset
  const hourAngle = (h / 12) * 360 + (minute / 60) * 30 - 90;

  const minuteRad = (minuteAngle * Math.PI) / 180;
  const hourRad = (hourAngle * Math.PI) / 180;

  const minuteLength = 32;
  const hourLength = 22;

  const minuteX = cx + minuteLength * Math.cos(minuteRad);
  const minuteY = cy + minuteLength * Math.sin(minuteRad);

  const hourX = cx + hourLength * Math.cos(hourRad);
  const hourY = cy + hourLength * Math.sin(hourRad);

  // Number positions (at radius 38 from center)
  const numberRadius = 38;
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angle = (num / 12) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      num,
      x: cx + numberRadius * Math.cos(rad),
      y: cy + numberRadius * Math.sin(rad),
    };
  });

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="inline-block">
      {/* Clock face */}
      <circle cx={cx} cy={cy} r={46} fill="white" stroke="#334155" strokeWidth="2.5" />

      {/* Tick marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = ((i / 12) * 360 - 90) * (Math.PI / 180);
        const outerR = 43;
        const innerR = 40;
        return (
          <line
            key={i}
            x1={cx + innerR * Math.cos(angle)}
            y1={cy + innerR * Math.sin(angle)}
            x2={cx + outerR * Math.cos(angle)}
            y2={cy + outerR * Math.sin(angle)}
            stroke="#94a3b8"
            strokeWidth="1"
          />
        );
      })}

      {/* Numbers */}
      {numbers.map(({ num, x, y }) => (
        <text
          key={num}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="9"
          fontWeight="bold"
          fill="#334155"
          fontFamily="system-ui, sans-serif"
        >
          {num}
        </text>
      ))}

      {/* Hour hand (thick, short) */}
      <line
        x1={cx}
        y1={cy}
        x2={hourX}
        y2={hourY}
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Minute hand (thinner, long) */}
      <line
        x1={cx}
        y1={cy}
        x2={minuteX}
        y2={minuteY}
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="2.5" fill="#1e293b" />
    </svg>
  );
}

/** Parse a clock questionPart value like "clock-3-00" into { hour, minute } or null */
export function parseClockValue(value: string): { hour: number; minute: number } | null {
  const match = value.match(/^clock-(\d+)-(\d+)$/);
  if (!match) return null;
  return { hour: parseInt(match[1], 10), minute: parseInt(match[2], 10) };
}
