import type { SkillScore, MasteryLevel, Domain } from '../../types';
import { skills, domainNames, skillMap as skillLookup } from '../../data/skills';

interface SkillMapProps {
  scores: Map<string, SkillScore>;
}

const masteryColors: Record<MasteryLevel, { bg: string; border: string; text: string; label: string }> = {
  not_started: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-500',
    label: 'Not Started',
  },
  developing: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    text: 'text-yellow-700',
    label: 'Developing',
  },
  proficient: {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-700',
    label: 'Proficient',
  },
  mastered: {
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-700',
    label: 'Mastered',
  },
};

const domainColors: Record<Domain, { header: string; accent: string }> = {
  OA: { header: 'bg-purple-600', accent: 'border-l-purple-500' },
  NBT: { header: 'bg-indigo-600', accent: 'border-l-indigo-500' },
  MD: { header: 'bg-teal-600', accent: 'border-l-teal-500' },
  G: { header: 'bg-orange-500', accent: 'border-l-orange-500' },
};

const domainEmojis: Record<Domain, string> = {
  OA: '+',
  NBT: '#',
  MD: '\u{1F4CF}',
  G: '\u{25B3}',
};

function getMastery(skillId: string, scores: Map<string, SkillScore>): MasteryLevel {
  const score = scores.get(skillId);
  return score?.mastery ?? 'not_started';
}

function getAccuracy(skillId: string, scores: Map<string, SkillScore>): number | null {
  const score = scores.get(skillId);
  if (!score || score.totalAttempts === 0) return null;
  return Math.round((score.totalCorrect / score.totalAttempts) * 100);
}

export default function SkillMap({ scores }: SkillMapProps) {
  // Compute summary stats
  const counts: Record<MasteryLevel, number> = {
    not_started: 0,
    developing: 0,
    proficient: 0,
    mastered: 0,
  };

  for (const skill of skills) {
    const mastery = getMastery(skill.id, scores);
    counts[mastery]++;
  }

  const totalSkills = skills.length;
  const progressPercent = Math.round((counts.mastered / totalSkills) * 100);

  // Group skills by domain
  const domains: Domain[] = ['OA', 'NBT', 'MD', 'G'];
  const skillsByDomain = new Map<Domain, typeof skills>();
  for (const domain of domains) {
    skillsByDomain.set(
      domain,
      skills
        .filter((s) => s.domain === domain)
        .sort((a, b) => a.curriculumOrder - b.curriculumOrder),
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          My Math Skills
        </h1>
        <p className="text-gray-500 mb-6">Track your progress across all 1st grade math skills</p>

        {/* Progress Summary Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-800">
                {counts.mastered}/{totalSkills}
              </span>
              <span className="text-gray-500 ml-2">skills mastered</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {(Object.entries(counts) as [MasteryLevel, number][]).map(([level, count]) => (
                <div
                  key={level}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${masteryColors[level].bg} ${masteryColors[level].text}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      level === 'not_started'
                        ? 'bg-gray-400'
                        : level === 'developing'
                          ? 'bg-yellow-400'
                          : level === 'proficient'
                            ? 'bg-blue-400'
                            : 'bg-green-400'
                    }`}
                  />
                  {count} {masteryColors[level].label}
                </div>
              ))}
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1.5">{progressPercent}% complete</p>
        </div>

        {/* Domain Sections */}
        <div className="space-y-8">
          {domains.map((domain) => {
            const domainSkills = skillsByDomain.get(domain) ?? [];
            const domainMastered = domainSkills.filter(
              (s) => getMastery(s.id, scores) === 'mastered',
            ).length;

            return (
              <div
                key={domain}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Domain Header */}
                <div
                  className={`${domainColors[domain].header} px-5 py-4 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{domainEmojis[domain]}</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        {domainNames[domain]}
                      </h2>
                      <p className="text-sm text-white/80">
                        {domainMastered}/{domainSkills.length} mastered
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-sm text-white font-medium">
                    {domain}
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {domainSkills.map((skill) => {
                    const mastery = getMastery(skill.id, scores);
                    const accuracy = getAccuracy(skill.id, scores);
                    const colors = masteryColors[mastery];
                    const prereqNames = skill.prerequisites
                      .map((pid) => skillLookup.get(pid)?.name ?? pid)
                      .filter(Boolean);

                    return (
                      <div
                        key={skill.id}
                        className={`relative rounded-xl border-2 ${colors.border} ${colors.bg} p-3.5 transition-all hover:shadow-md hover:scale-[1.02]`}
                      >
                        {/* Mastery Badge */}
                        <div className="flex items-start justify-between mb-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${colors.text} ${
                              mastery === 'not_started'
                                ? 'bg-gray-200'
                                : mastery === 'developing'
                                  ? 'bg-yellow-200'
                                  : mastery === 'proficient'
                                    ? 'bg-blue-200'
                                    : 'bg-green-200'
                            }`}
                          >
                            {colors.label}
                          </span>
                          {mastery === 'mastered' && (
                            <span className="text-lg" aria-label="star">
                              &#11088;
                            </span>
                          )}
                        </div>

                        {/* Skill Name */}
                        <h3
                          className={`font-bold text-sm leading-tight mb-1 ${
                            mastery === 'not_started' ? 'text-gray-600' : 'text-gray-800'
                          }`}
                        >
                          {skill.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                          {skill.description}
                        </p>

                        {/* Accuracy & Standard Code */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400 font-mono">
                            {skill.standardCode}
                          </span>
                          {accuracy !== null && (
                            <span
                              className={`font-semibold ${
                                accuracy >= 80
                                  ? 'text-green-600'
                                  : accuracy >= 60
                                    ? 'text-yellow-600'
                                    : 'text-red-500'
                              }`}
                            >
                              {accuracy}% accuracy
                            </span>
                          )}
                        </div>

                        {/* Prerequisites indicator */}
                        {prereqNames.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200/60">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                              Requires
                            </p>
                            <p className="text-xs text-gray-500 leading-snug">
                              {prereqNames.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-bold text-gray-700 mb-3">How Mastery Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-700">Not Started</p>
                <p className="text-xs text-gray-500">Skill has not been attempted yet</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-yellow-700">Developing</p>
                <p className="text-xs text-gray-500">Working on it, getting better!</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-blue-700">Proficient</p>
                <p className="text-xs text-gray-500">Almost there, keep practicing!</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-green-700">Mastered</p>
                <p className="text-xs text-gray-500">Great job, skill is learned!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
