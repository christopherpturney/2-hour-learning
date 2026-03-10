import { useEffect, useState, useCallback } from 'react';
import type { DagEdge } from './dagLayout';

interface TreeConnectorsProps {
  edges: DagEdge[];
  nodeRefs: React.RefObject<Map<string, HTMLDivElement>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  highlightedEdges: Set<string> | null;
}

interface LineData {
  key: string;
  d: string;
  highlighted: boolean;
}

export default function TreeConnectors({ edges, nodeRefs, containerRef, highlightedEdges }: TreeConnectorsProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const refs = nodeRefs.current;
    if (!container || !refs || refs.size === 0) return;

    const cRect = container.getBoundingClientRect();
    const sLeft = container.scrollLeft;
    const sTop = container.scrollTop;

    // Sort edges by target vertical position for consistent port ordering
    const sortedEdges = [...edges].sort((a, b) => {
      const aTo = refs.get(a.to);
      const bTo = refs.get(b.to);
      if (!aTo || !bTo) return 0;
      return aTo.getBoundingClientRect().top - bTo.getBoundingClientRect().top;
    });

    // Count outgoing/incoming edges per node for port staggering
    const outgoingOrder = new Map<string, DagEdge[]>();
    const incomingOrder = new Map<string, DagEdge[]>();

    for (const edge of sortedEdges) {
      if (!outgoingOrder.has(edge.from)) outgoingOrder.set(edge.from, []);
      outgoingOrder.get(edge.from)!.push(edge);
    }

    // Sort incoming edges by source vertical position
    const incomingSorted = [...edges].sort((a, b) => {
      const aFrom = refs.get(a.from);
      const bFrom = refs.get(b.from);
      if (!aFrom || !bFrom) return 0;
      return aFrom.getBoundingClientRect().top - bFrom.getBoundingClientRect().top;
    });

    for (const edge of incomingSorted) {
      if (!incomingOrder.has(edge.to)) incomingOrder.set(edge.to, []);
      incomingOrder.get(edge.to)!.push(edge);
    }

    const newLines: LineData[] = [];

    for (const edge of sortedEdges) {
      const fromEl = refs.get(edge.from);
      const toEl = refs.get(edge.to);
      if (!fromEl || !toEl) continue;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      // Outgoing port stagger (right edge of parent)
      const outEdges = outgoingOrder.get(edge.from) ?? [];
      const outIdx = outEdges.indexOf(edge);
      const outCount = outEdges.length;
      const outSpread = Math.min(fromRect.height * 0.6, outCount * 8);
      const outOffset = outCount <= 1
        ? 0
        : -outSpread / 2 + (outSpread / (outCount - 1)) * outIdx;

      // Incoming port stagger (left edge of child)
      const inEdges = incomingOrder.get(edge.to) ?? [];
      const inIdx = inEdges.indexOf(edge);
      const inCount = inEdges.length;
      const inSpread = Math.min(toRect.height * 0.6, inCount * 8);
      const inOffset = inCount <= 1
        ? 0
        : -inSpread / 2 + (inSpread / (inCount - 1)) * inIdx;

      // Left-to-right: right-center of parent → left-center of child
      const startX = fromRect.left - cRect.left + sLeft + fromRect.width;
      const startY = fromRect.top - cRect.top + sTop + fromRect.height / 2 + outOffset;
      const endX = toRect.left - cRect.left + sLeft;
      const endY = toRect.top - cRect.top + sTop + toRect.height / 2 + inOffset;

      const hGap = endX - startX;
      const cpOffset = Math.max(hGap * 0.4, 30);

      const key = `${edge.from}-${edge.to}`;
      newLines.push({
        key,
        d: `M ${startX} ${startY} C ${startX + cpOffset} ${startY}, ${endX - cpOffset} ${endY}, ${endX} ${endY}`,
        highlighted: highlightedEdges?.has(key) ?? false,
      });
    }

    // Sort: dimmed edges first, highlighted edges on top
    newLines.sort((a, b) => {
      if (a.highlighted === b.highlighted) return 0;
      return a.highlighted ? 1 : -1;
    });

    setLines(newLines);
    setSize({
      w: container.scrollWidth,
      h: container.scrollHeight,
    });
  }, [edges, nodeRefs, containerRef, highlightedEdges]);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);

    const timer = setTimeout(measure, 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [measure]);

  if (lines.length === 0 || size.w === 0) return null;

  const hasHighlight = highlightedEdges !== null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={size.w}
      height={size.h}
      style={{ zIndex: 0 }}
    >
      {lines.map(line => (
        <path
          key={line.key}
          d={line.d}
          fill="none"
          stroke={line.highlighted ? '#6366f1' : '#cbd5e1'}
          strokeWidth={line.highlighted ? 2.5 : 1.5}
          strokeLinecap="round"
          opacity={hasHighlight ? (line.highlighted ? 0.9 : 0.15) : 0.6}
          className="transition-all duration-200"
        />
      ))}
    </svg>
  );
}
