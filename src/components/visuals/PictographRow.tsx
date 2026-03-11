/**
 * PictographRow — renders a row of small category icons for data/pictograph problems.
 *
 * Value format: "pictograph-{category}-{count}"
 * Examples:
 *   "pictograph-apples-3"   → 3 apple icons in a row
 *   "pictograph-dog-5"      → 5 dog icons in a row
 */

import { ObjectIcon } from './ObjectIcons';

export interface PictographInfo {
  category: string;
  count: number;
}

export function parsePictographValue(value: string): PictographInfo | null {
  const match = value.match(/^pictograph-(.+?)-(\d+)$/);
  if (!match) return null;
  return {
    category: match[1].replace(/_/g, ' '),
    count: parseInt(match[2], 10),
  };
}

export default function PictographRow({ value }: { value: string }) {
  const info = parsePictographValue(value);
  if (!info) return null;

  const icons = [];
  for (let i = 0; i < info.count; i++) {
    icons.push(
      <ObjectIcon key={i} name={info.category} size={28} />
    );
  }

  return (
    <div
      className="flex items-center gap-1 my-1"
      aria-label={`${info.count} ${info.category}`}
    >
      {icons}
    </div>
  );
}
