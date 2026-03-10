interface ShapeVisualProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * Parse an image value from geometry generators into rendering info.
 * Returns null if the value doesn't match any known shape pattern.
 */
export function parseShapeValue(value: string): ShapeInfo | null {
  // 2D shapes: shape-circle, shape-triangle, etc.
  const shape2d = value.match(/^shape-(\w+)$/);
  if (shape2d) {
    const name = shape2d[1];
    if (['circle', 'triangle', 'square', 'rectangle', 'trapezoid', 'hexagon'].includes(name)) {
      return { kind: '2d', shape: name };
    }
  }

  // 3D shapes: shape3d-cube, shape3d-rectangular-prism, etc.
  const shape3d = value.match(/^shape3d-(.+)$/);
  if (shape3d) {
    const name = shape3d[1];
    if (['cube', 'rectangular-prism', 'cone', 'cylinder', 'sphere'].includes(name)) {
      return { kind: '3d', shape: name };
    }
  }

  // Compositions: compose-triangle-to-square, etc.
  const compose = value.match(/^compose-(\w+)-to-(.+)$/);
  if (compose) {
    return { kind: 'compose', partShape: compose[1], resultShape: compose[2] };
  }

  // Partitions: circle-halves, square-fourths, rectangle-unequal-parts
  const partition = value.match(/^(circle|square|rectangle)-(halves|fourths|unequal-parts)$/);
  if (partition) {
    const shape = partition[1];
    const type = partition[2];
    return {
      kind: 'partition',
      shape,
      parts: type === 'fourths' ? 4 : 2,
      equal: type !== 'unequal-parts',
    };
  }

  // Food shares: pizza-2-parts, sandwich-4-parts, etc.
  const food = value.match(/^(pizza|sandwich|pie|cake|cookie)-(\d+)-parts$/);
  if (food) {
    const item = food[1];
    const parts = parseInt(food[2], 10);
    // Round foods → circle, sandwich → rectangle
    const shape = item === 'sandwich' ? 'rectangle' : 'circle';
    return { kind: 'partition', shape, parts, equal: true };
  }

  return null;
}

type ShapeInfo =
  | { kind: '2d'; shape: string }
  | { kind: '3d'; shape: string }
  | { kind: 'compose'; partShape: string; resultShape: string }
  | { kind: 'partition'; shape: string; parts: number; equal: boolean };

export default function ShapeVisual({ value, size = 120, className = '' }: ShapeVisualProps) {
  const info = parseShapeValue(value);
  if (!info) return null;

  switch (info.kind) {
    case '2d':
      return <Shape2D shape={info.shape} size={size} className={className} />;
    case '3d':
      return <Shape3D shape={info.shape} size={size} className={className} />;
    case 'compose':
      return <ComposeShape partShape={info.partShape} resultShape={info.resultShape} size={size} className={className} />;
    case 'partition':
      return <PartitionShape shape={info.shape} parts={info.parts} equal={info.equal} size={size} className={className} />;
  }
}

// ---- 2D Shapes ----

function Shape2D({ shape, size, className }: { shape: string; size: number; className: string }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;
  const stroke = '#4338ca';
  const fill = '#e0e7ff';
  const sw = Math.max(2, s * 0.02);

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className} aria-label={shape}>
      {shape === 'circle' && (
        <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
      {shape === 'triangle' && (
        <polygon
          points={`${cx},${cy - r} ${cx - r * 0.87},${cy + r * 0.5} ${cx + r * 0.87},${cy + r * 0.5}`}
          fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
        />
      )}
      {shape === 'square' && (
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2}
          fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
        />
      )}
      {shape === 'rectangle' && (
        <rect x={cx - r * 1.3} y={cy - r * 0.7} width={r * 2.6} height={r * 1.4}
          fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
        />
      )}
      {shape === 'trapezoid' && (
        <polygon
          points={`${cx - r * 0.5},${cy - r * 0.6} ${cx + r * 0.5},${cy - r * 0.6} ${cx + r},${cy + r * 0.6} ${cx - r},${cy + r * 0.6}`}
          fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
        />
      )}
      {shape === 'hexagon' && (() => {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 60 - 90) * Math.PI / 180;
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(' ');
        return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
      })()}
    </svg>
  );
}

// ---- 3D Shapes ----

function Shape3D({ shape, size, className }: { shape: string; size: number; className: string }) {
  const s = size;
  const stroke = '#4338ca';
  const fill = '#e0e7ff';
  const fillSide = '#c7d2fe';
  const fillTop = '#ddd6fe';
  const sw = Math.max(2, s * 0.02);

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className} aria-label={shape}>
      {shape === 'cube' && (() => {
        const f = s * 0.3; // face size
        const ox = s * 0.25; // front face origin x
        const oy = s * 0.35; // front face origin y
        const dx = f * 0.5; // 3D offset x
        const dy = f * 0.4; // 3D offset y
        return (
          <>
            {/* Front face */}
            <rect x={ox} y={oy} width={f} height={f} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            {/* Top face */}
            <polygon points={`${ox},${oy} ${ox + dx},${oy - dy} ${ox + f + dx},${oy - dy} ${ox + f},${oy}`}
              fill={fillTop} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            {/* Right face */}
            <polygon points={`${ox + f},${oy} ${ox + f + dx},${oy - dy} ${ox + f + dx},${oy + f - dy} ${ox + f},${oy + f}`}
              fill={fillSide} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          </>
        );
      })()}
      {shape === 'rectangular-prism' && (() => {
        const w = s * 0.4;
        const h = s * 0.25;
        const ox = s * 0.15;
        const oy = s * 0.4;
        const dx = s * 0.15;
        const dy = s * 0.12;
        return (
          <>
            <rect x={ox} y={oy} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <polygon points={`${ox},${oy} ${ox + dx},${oy - dy} ${ox + w + dx},${oy - dy} ${ox + w},${oy}`}
              fill={fillTop} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <polygon points={`${ox + w},${oy} ${ox + w + dx},${oy - dy} ${ox + w + dx},${oy + h - dy} ${ox + w},${oy + h}`}
              fill={fillSide} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          </>
        );
      })()}
      {shape === 'cone' && (() => {
        const cx = s / 2;
        const baseY = s * 0.7;
        const tipY = s * 0.15;
        const rx = s * 0.25;
        const ry = s * 0.08;
        return (
          <>
            <polygon points={`${cx},${tipY} ${cx - rx},${baseY} ${cx + rx},${baseY}`}
              fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <ellipse cx={cx} cy={baseY} rx={rx} ry={ry}
              fill={fillSide} stroke={stroke} strokeWidth={sw} />
          </>
        );
      })()}
      {shape === 'cylinder' && (() => {
        const cx = s / 2;
        const topY = s * 0.25;
        const botY = s * 0.7;
        const rx = s * 0.25;
        const ry = s * 0.08;
        return (
          <>
            <rect x={cx - rx} y={topY} width={rx * 2} height={botY - topY}
              fill={fill} stroke="none" />
            <line x1={cx - rx} y1={topY} x2={cx - rx} y2={botY} stroke={stroke} strokeWidth={sw} />
            <line x1={cx + rx} y1={topY} x2={cx + rx} y2={botY} stroke={stroke} strokeWidth={sw} />
            <ellipse cx={cx} cy={botY} rx={rx} ry={ry}
              fill={fillSide} stroke={stroke} strokeWidth={sw} />
            <ellipse cx={cx} cy={topY} rx={rx} ry={ry}
              fill={fillTop} stroke={stroke} strokeWidth={sw} />
          </>
        );
      })()}
      {shape === 'sphere' && (() => {
        const cx = s / 2;
        const cy = s / 2;
        const r = s * 0.35;
        return (
          <>
            <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
            {/* Curvature lines */}
            <ellipse cx={cx} cy={cy} rx={r * 0.7} ry={r}
              fill="none" stroke={stroke} strokeWidth={sw * 0.5} strokeDasharray={`${s * 0.03} ${s * 0.03}`} opacity={0.4} />
            <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35}
              fill="none" stroke={stroke} strokeWidth={sw * 0.5} strokeDasharray={`${s * 0.03} ${s * 0.03}`} opacity={0.4} />
          </>
        );
      })()}
    </svg>
  );
}

// ---- Compose Shapes ----

function ComposeShape({ partShape, resultShape, size, className }: {
  partShape: string; resultShape: string; size: number; className: string;
}) {
  const s = size;
  const stroke = '#4338ca';
  const fill1 = '#e0e7ff';
  const fill2 = '#c7d2fe';
  const sw = Math.max(2, s * 0.02);
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.35;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}
      aria-label={`${partShape}s composing a ${resultShape}`}>
      {partShape === 'triangle' && resultShape === 'square' && (
        <>
          <polygon points={`${cx - r},${cy + r} ${cx + r},${cy + r} ${cx - r},${cy - r}`}
            fill={fill1} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <polygon points={`${cx + r},${cy - r} ${cx - r},${cy - r} ${cx + r},${cy + r}`}
            fill={fill2} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </>
      )}
      {partShape === 'triangle' && resultShape === 'rectangle' && (
        <>
          <polygon points={`${cx - r * 1.2},${cy + r * 0.6} ${cx},${cy - r * 0.6} ${cx},${cy + r * 0.6}`}
            fill={fill1} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <polygon points={`${cx + r * 1.2},${cy + r * 0.6} ${cx},${cy - r * 0.6} ${cx},${cy + r * 0.6}`}
            fill={fill2} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </>
      )}
      {partShape === 'square' && resultShape === 'rectangle' && (
        <>
          <rect x={cx - r} y={cy - r * 0.5} width={r} height={r}
            fill={fill1} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x={cx} y={cy - r * 0.5} width={r} height={r}
            fill={fill2} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </>
      )}
      {partShape === 'square' && resultShape === 'bigger square' && (
        <>
          <rect x={cx - r} y={cy - r} width={r} height={r}
            fill={fill1} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x={cx} y={cy - r} width={r} height={r}
            fill={fill2} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x={cx - r} y={cy} width={r} height={r}
            fill={fill1} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <rect x={cx} y={cy} width={r} height={r}
            fill={fill2} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </>
      )}
      {partShape === 'triangle' && resultShape === 'hexagon' && (() => {
        return (
          <>
            {Array.from({ length: 6 }, (_, i) => {
              const angle1 = (i * 60 - 90) * Math.PI / 180;
              const angle2 = ((i + 1) * 60 - 90) * Math.PI / 180;
              const x1 = cx + r * Math.cos(angle1);
              const y1 = cy + r * Math.sin(angle1);
              const x2 = cx + r * Math.cos(angle2);
              const y2 = cy + r * Math.sin(angle2);
              return (
                <polygon key={i}
                  points={`${cx},${cy} ${x1},${y1} ${x2},${y2}`}
                  fill={i % 2 === 0 ? fill1 : fill2}
                  stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
              );
            })}
          </>
        );
      })()}
    </svg>
  );
}

// ---- Partition Shapes ----

function PartitionShape({ shape, parts, equal, size, className }: {
  shape: string; parts: number; equal: boolean; size: number; className: string;
}) {
  const s = size;
  const stroke = '#4338ca';
  const fill = '#e0e7ff';
  const divider = '#ef4444';
  const sw = Math.max(2, s * 0.02);
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}
      aria-label={`${shape} divided into ${parts} ${equal ? 'equal' : 'unequal'} parts`}>
      {shape === 'circle' && (
        <>
          <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
          {parts === 2 && equal && (
            <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={divider} strokeWidth={sw} />
          )}
          {parts === 2 && !equal && (
            <line x1={cx + r * 0.3} y1={cy - r} x2={cx + r * 0.3} y2={cy + r}
              stroke={divider} strokeWidth={sw} strokeDasharray={`${s * 0.02} ${s * 0.02}`} />
          )}
          {parts === 4 && (
            <>
              <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={divider} strokeWidth={sw} />
              <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={divider} strokeWidth={sw} />
            </>
          )}
        </>
      )}
      {shape === 'square' && (() => {
        const half = r;
        return (
          <>
            <rect x={cx - half} y={cy - half} width={half * 2} height={half * 2}
              fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            {parts === 2 && equal && (
              <line x1={cx} y1={cy - half} x2={cx} y2={cy + half} stroke={divider} strokeWidth={sw} />
            )}
            {parts === 2 && !equal && (
              <line x1={cx + half * 0.3} y1={cy - half} x2={cx + half * 0.3} y2={cy + half}
                stroke={divider} strokeWidth={sw} strokeDasharray={`${s * 0.02} ${s * 0.02}`} />
            )}
            {parts === 4 && (
              <>
                <line x1={cx} y1={cy - half} x2={cx} y2={cy + half} stroke={divider} strokeWidth={sw} />
                <line x1={cx - half} y1={cy} x2={cx + half} y2={cy} stroke={divider} strokeWidth={sw} />
              </>
            )}
          </>
        );
      })()}
      {shape === 'rectangle' && (() => {
        const hw = r * 1.3;
        const hh = r * 0.7;
        return (
          <>
            <rect x={cx - hw} y={cy - hh} width={hw * 2} height={hh * 2}
              fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            {parts === 2 && equal && (
              <line x1={cx} y1={cy - hh} x2={cx} y2={cy + hh} stroke={divider} strokeWidth={sw} />
            )}
            {parts === 2 && !equal && (
              <line x1={cx + hw * 0.3} y1={cy - hh} x2={cx + hw * 0.3} y2={cy + hh}
                stroke={divider} strokeWidth={sw} strokeDasharray={`${s * 0.02} ${s * 0.02}`} />
            )}
            {parts === 4 && (
              <>
                <line x1={cx} y1={cy - hh} x2={cx} y2={cy + hh} stroke={divider} strokeWidth={sw} />
                <line x1={cx - hw} y1={cy} x2={cx + hw} y2={cy} stroke={divider} strokeWidth={sw} />
              </>
            )}
          </>
        );
      })()}
    </svg>
  );
}
