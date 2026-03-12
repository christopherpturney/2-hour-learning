/**
 * ObjectGroup — renders contextual object icons for word problems.
 *
 * Value format examples:
 *   "objects-apples-5"                → 5 apple icons
 *   "objects-crayons-3-5"             → 3 crayons + 5 crayons (addition, two groups)
 *   "objects-cookies-8-cross-3"       → 8 cookies, last 3 crossed out (subtraction)
 */

import { ObjectIcon } from './ObjectIcons';

export interface ObjectGroupInfo {
  objectName: string;
  groupA: number;
  groupB: number;
  crossedOut: number;
}

export function parseObjectGroupValue(value: string): ObjectGroupInfo | null {
  // objects-{name}-{total}-cross-{removed}
  const crossMatch = value.match(/^objects-(.+)-(\d+)-cross-(\d+)$/);
  if (crossMatch) {
    return {
      objectName: crossMatch[1].replace(/_/g, ' '),
      groupA: parseInt(crossMatch[2], 10),
      groupB: 0,
      crossedOut: parseInt(crossMatch[3], 10),
    };
  }

  // objects-{name}-{a}-{b}  (two groups)
  const twoGroupMatch = value.match(/^objects-(.+)-(\d+)-(\d+)$/);
  if (twoGroupMatch) {
    return {
      objectName: twoGroupMatch[1].replace(/_/g, ' '),
      groupA: parseInt(twoGroupMatch[2], 10),
      groupB: parseInt(twoGroupMatch[3], 10),
      crossedOut: 0,
    };
  }

  // objects-{name}-{count}
  const singleMatch = value.match(/^objects-(.+?)-(\d+)$/);
  if (singleMatch) {
    return {
      objectName: singleMatch[1].replace(/_/g, ' '),
      groupA: parseInt(singleMatch[2], 10),
      groupB: 0,
      crossedOut: 0,
    };
  }

  return null;
}

function IconRow({ count, objectName, crossed }: { count: number; objectName: string; crossed?: boolean }) {
  const icons = [];
  for (let i = 0; i < count; i++) {
    icons.push(
      <div key={i} className={`relative ${crossed ? 'opacity-40' : ''}`}>
        <ObjectIcon name={objectName} size={36} />
        {crossed && (
          <svg
            className="absolute inset-0"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <line x1="8" y1="8" x2="28" y2="28" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <line x1="28" y1="8" x2="8" y2="28" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>
    );
  }
  return <>{icons}</>;
}

export default function ObjectGroup({ value }: { value: string }) {
  const info = parseObjectGroupValue(value);
  if (!info) return null;

  const { objectName, groupA, groupB, crossedOut } = info;

  // Subtraction mode: show remaining + crossed out
  if (crossedOut > 0) {
    const remaining = groupA - crossedOut;
    return (
      <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} ${objectName} with ${crossedOut} crossed out`}>
        <div className="flex flex-wrap justify-center gap-2 max-w-sm">
          <IconRow count={remaining} objectName={objectName} />
          <IconRow count={crossedOut} objectName={objectName} crossed />
        </div>
        <div className="flex gap-4 text-xs font-semibold text-slate-500">
          <span>{remaining} left</span>
          <span className="text-red-400">{crossedOut} taken away</span>
        </div>
      </div>
    );
  }

  // Two groups (addition)
  if (groupB > 0) {
    return (
      <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} and ${groupB} ${objectName}`}>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
          <div className="flex flex-wrap gap-2 p-2 bg-indigo-50 rounded-xl">
            <IconRow count={groupA} objectName={objectName} />
          </div>
          <span className="text-lg font-bold text-slate-400">+</span>
          <div className="flex flex-wrap gap-2 p-2 bg-amber-50 rounded-xl">
            <IconRow count={groupB} objectName={objectName} />
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
    <div className="flex flex-col items-center gap-2 my-3" aria-label={`${groupA} ${objectName}`}>
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        <IconRow count={groupA} objectName={objectName} />
      </div>
    </div>
  );
}
