import { useState } from 'react';
import type { Skill, MasteryLevel, Domain } from '../../types';
import { Star, Lock, ArrowLeft } from 'lucide-react';
import CcssTooltip from '../CcssTooltip';

const masteryColors: Record<MasteryLevel, { bg: string; border: string; text: string; label: string; dot: string }> = {
  not_started: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-500', label: 'Not Started', dot: 'bg-gray-400' },
  developing: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700', label: 'Developing', dot: 'bg-yellow-400' },
  proficient: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', label: 'Proficient', dot: 'bg-blue-400' },
  mastered: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', label: 'Mastered', dot: 'bg-green-400' },
};

const domainAccents: Record<Domain, string> = {
  OA: 'border-l-purple-500',
  NBT: 'border-l-indigo-500',
  MD: 'border-l-teal-500',
  G: 'border-l-orange-500',
};

const domainTabColors: Record<Domain, string> = {
  OA: 'bg-purple-100 text-purple-700',
  NBT: 'bg-indigo-100 text-indigo-700',
  MD: 'bg-teal-100 text-teal-700',
  G: 'bg-orange-100 text-orange-700',
};

export interface CrossClusterPrereq {
  cluster: string;
  domain: Domain;
  skillName: string;
}

export type HighlightState = 'none' | 'selected' | 'ancestor' | 'descendant' | 'dimmed';

interface SkillTreeCardProps {
  skill: Skill;
  mastery: MasteryLevel;
  accuracy: number | null;
  isComingSoon: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
  highlightState: HighlightState;
  onSkillClick: (skillId: string) => void;
  crossClusterPrereqs?: CrossClusterPrereq[];
}

const highlightClasses: Record<HighlightState, string> = {
  selected: 'ring-2 ring-indigo-500 ring-offset-1 shadow-lg scale-[1.03]',
  ancestor: 'ring-1 ring-indigo-300 shadow-sm',
  descendant: 'ring-1 ring-indigo-300 shadow-sm',
  dimmed: 'opacity-30',
  none: '',
};

export default function SkillTreeCard({
  skill,
  mastery,
  accuracy,
  isComingSoon,
  nodeRef,
  highlightState,
  onSkillClick,
  crossClusterPrereqs,
}: SkillTreeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = masteryColors[mastery];
  const isGrade2 = skill.standardCode.startsWith('2.');

  return (
    <div
      ref={nodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onSkillClick(skill.id);
        setExpanded(v => !v);
      }}
      className={`
        relative w-44 sm:w-48 border-2 border-l-4 rounded-xl p-2.5
        ${colors.border} ${colors.bg} ${domainAccents[skill.domain]}
        transition-all duration-200 hover:shadow-md cursor-pointer select-none
        ${isComingSoon && highlightState !== 'dimmed' ? 'opacity-70' : ''}
        ${highlightClasses[highlightState]}
      `}
      style={{ zIndex: 1 }}
    >
      {/* Top row: mastery dot + grade badge */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors.dot}`} />
          <span className={`text-[10px] font-semibold ${colors.text}`}>
            {colors.label}
          </span>
        </div>
        {mastery === 'mastered' && (
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        )}
        {isComingSoon && (
          <Lock className="w-3.5 h-3.5 text-gray-400" />
        )}
      </div>

      {/* Cross-cluster prerequisite tabs */}
      {crossClusterPrereqs && crossClusterPrereqs.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {crossClusterPrereqs.map((prereq, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-semibold ${domainTabColors[prereq.domain]}`}
              title={`Requires: ${prereq.skillName} (${prereq.cluster})`}
            >
              <ArrowLeft className="w-2 h-2" />
              {prereq.cluster}
            </span>
          ))}
        </div>
      )}

      {/* Skill name */}
      <h3 className={`font-bold text-xs leading-tight ${mastery === 'not_started' ? 'text-gray-600' : 'text-gray-800'}`}>
        {skill.name}
      </h3>

      {/* Grade indicator for 2nd grade */}
      {isGrade2 && (
        <span className="inline-block mt-1 px-1.5 py-0.5 bg-violet-100 text-violet-600 text-[9px] font-semibold rounded">
          2nd Grade
        </span>
      )}

      {/* CCSS code */}
      <div className="mt-1 text-[10px]">
        <CcssTooltip code={skill.standardCode} className="text-gray-400" />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-2 pt-2 border-t border-gray-200/60 space-y-1">
          <p className="text-[11px] text-gray-500 leading-snug">{skill.description}</p>
          {accuracy !== null && (
            <p className={`text-[11px] font-semibold ${
              accuracy >= 80 ? 'text-green-600' : accuracy >= 60 ? 'text-yellow-600' : 'text-red-500'
            }`}>
              {accuracy}% accuracy
            </p>
          )}
          {isComingSoon && (
            <p className="text-[10px] text-gray-400 italic">Coming soon</p>
          )}
        </div>
      )}
    </div>
  );
}
