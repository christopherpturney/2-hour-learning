import { useState } from 'react';
import type { Domain } from '../../types';
import { skills, domainNames } from '../../data/skills';
import { getLesson } from '../../data/lessons';
import LessonDisplay from '../session/LessonDisplay';
import { ArrowLeft } from 'lucide-react';

const domains: Domain[] = ['OA', 'NBT', 'MD', 'G'];

export default function LessonPreview() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const activeSkill = activeSkillId ? skills.find(s => s.id === activeSkillId) : null;
  const activeLesson = activeSkillId ? getLesson(activeSkillId) : undefined;

  if (activeSkill && activeLesson) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSkillId(null)}
            className="p-2 rounded-xl text-slate-500 active:bg-slate-100 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-800 truncate">{activeSkill.name}</h2>
            <p className="text-xs text-slate-400">{activeSkill.standardCode}</p>
          </div>
        </div>

        <LessonDisplay
          steps={activeLesson.steps}
          skillId={activeSkill.id}
          skillName={activeSkill.displayName || activeSkill.name}
          onComplete={() => setActiveSkillId(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Lesson Preview</h2>
        <p className="text-sm text-slate-500 mt-1">Preview any lesson content</p>
      </div>

      {domains.map(domain => {
        const domainSkills = skills.filter(s => s.domain === domain);
        return (
          <div key={domain} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-700 text-sm">{domainNames[domain]}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {domainSkills.map(skill => {
                const hasLesson = !!getLesson(skill.id);
                return (
                  <div key={skill.id} className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className={`text-sm font-medium truncate ${hasLesson ? 'text-slate-800' : 'text-slate-400'}`}>
                        {skill.displayName || skill.name}
                      </p>
                      <p className="text-xs text-slate-400">{skill.standardCode}</p>
                    </div>
                    {hasLesson ? (
                      <button
                        onClick={() => setActiveSkillId(skill.id)}
                        className="shrink-0 px-4 py-2 rounded-xl bg-violet-50 text-violet-600 text-xs font-bold active:bg-violet-100 transition-colors min-h-[36px]"
                      >
                        View
                      </button>
                    ) : (
                      <span className="shrink-0 text-xs text-slate-300 font-medium">No lesson</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
