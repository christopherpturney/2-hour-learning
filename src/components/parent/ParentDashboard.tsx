import type { Student, SkillScore, Session, MasteryLevel, Domain } from '../../types';
import { skills, domainNames } from '../../data/skills';
import { selectLearningSkills } from '../../engine/zpd';

interface ParentDashboardProps {
  student: Student;
  scores: Map<string, SkillScore>;
  sessions: Session[];
}

const MASTERY_LEVELS: MasteryLevel[] = ['mastered', 'proficient', 'developing', 'not_started'];
const domains: Domain[] = ['OA', 'NBT', 'MD', 'G'];

const masteryMeta: Record<MasteryLevel, { label: string; color: string; bgLight: string; barColor: string }> = {
  mastered: {
    label: 'Mastered',
    color: 'text-green-700',
    bgLight: 'bg-green-100',
    barColor: 'bg-green-500',
  },
  proficient: {
    label: 'Proficient',
    color: 'text-blue-700',
    bgLight: 'bg-blue-100',
    barColor: 'bg-blue-500',
  },
  developing: {
    label: 'Developing',
    color: 'text-yellow-700',
    bgLight: 'bg-yellow-100',
    barColor: 'bg-yellow-500',
  },
  not_started: {
    label: 'Not Started',
    color: 'text-gray-500',
    bgLight: 'bg-gray-100',
    barColor: 'bg-gray-300',
  },
};

function getMastery(skillId: string, scores: Map<string, SkillScore>): MasteryLevel {
  return scores.get(skillId)?.mastery ?? 'not_started';
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hrs}h ${remMins}m`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ParentDashboard({ student, scores, sessions }: ParentDashboardProps) {
  // --- Compute Overall Stats ---
  const totalSkills = skills.length;
  const masteryCounts: Record<MasteryLevel, number> = {
    not_started: 0,
    developing: 0,
    proficient: 0,
    mastered: 0,
  };
  for (const skill of skills) {
    masteryCounts[getMastery(skill.id, scores)]++;
  }
  const progressPercent = Math.round((masteryCounts.mastered / totalSkills) * 100);

  // --- Accuracy Trend (last 10 sessions) ---
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
  );
  const recentSessions = sortedSessions.slice(-10);
  const accuracyTrend = recentSessions.map((s) => ({
    date: formatDate(s.startedAt),
    accuracy: s.problemsAttempted > 0 ? Math.round((s.problemsCorrect / s.problemsAttempted) * 100) : 0,
    attempted: s.problemsAttempted,
    correct: s.problemsCorrect,
  }));

  // --- Time Stats ---
  const totalSessions = sessions.length;
  const totalSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  const totalProblems = sessions.reduce((sum, s) => sum + s.problemsAttempted, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.problemsCorrect, 0);
  const overallAccuracy = totalProblems > 0 ? Math.round((totalCorrect / totalProblems) * 100) : 0;

  // --- Domain Breakdown ---
  const domainBreakdown = domains.map((domain) => {
    const domainSkills = skills.filter((s) => s.domain === domain);
    const counts: Record<MasteryLevel, number> = {
      not_started: 0,
      developing: 0,
      proficient: 0,
      mastered: 0,
    };
    for (const s of domainSkills) {
      counts[getMastery(s.id, scores)]++;
    }
    return { domain, total: domainSkills.length, counts };
  });

  // --- ZPD Recommendations ---
  const zpdSkills = selectLearningSkills(scores);

  // --- Recent Session History ---
  const sessionHistory = sortedSessions.slice(-10).reverse();

  // Progress ring values
  const ringRadius = 52;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {student.name}&apos;s Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Grade {student.gradeLevel} -- Math Progress Overview
            </p>
          </div>
          <div className="text-right text-xs text-gray-400">
            {totalSessions > 0 && (
              <p>
                Last session: {formatDate(sortedSessions[sortedSessions.length - 1].startedAt)}
              </p>
            )}
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Progress Ring */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-800">{progressPercent}%</span>
                <span className="text-[10px] text-gray-400">complete</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-800">
                {masteryCounts.mastered}
                <span className="text-base font-normal text-gray-400">/{totalSkills}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">skills mastered</p>
            </div>
          </div>

          {/* Total Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-800">{totalSessions}</p>
            <p className="text-xs text-gray-400 mt-1">{formatDuration(totalSeconds)} total time</p>
          </div>

          {/* Problems Solved */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">Problems Solved</p>
            <p className="text-3xl font-bold text-gray-800">{totalProblems}</p>
            <p className="text-xs text-gray-400 mt-1">{totalCorrect} correct</p>
          </div>

          {/* Overall Accuracy */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">Overall Accuracy</p>
            <p className="text-3xl font-bold text-gray-800">{overallAccuracy}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overallAccuracy >= 80
                    ? 'bg-green-500'
                    : overallAccuracy >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-400'
                }`}
                style={{ width: `${overallAccuracy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Middle Row: Accuracy Trend + ZPD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Accuracy Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-700 mb-4">Accuracy Trend</h2>
            {accuracyTrend.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                No sessions yet. Start a practice session to see trends.
              </p>
            ) : (
              <div>
                {/* Simple bar chart */}
                <div className="flex items-end gap-2 h-40">
                  {accuracyTrend.map((point, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-xs font-medium text-gray-600">
                        {point.accuracy}%
                      </span>
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          point.accuracy >= 80
                            ? 'bg-green-400'
                            : point.accuracy >= 60
                              ? 'bg-yellow-400'
                              : 'bg-red-300'
                        }`}
                        style={{
                          height: `${Math.max(point.accuracy, 5)}%`,
                        }}
                      />
                      <span className="text-[10px] text-gray-400 truncate w-full text-center">
                        {point.date}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Last {accuracyTrend.length} session{accuracyTrend.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Skill Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-700 mb-3">Up Next</h2>
            <p className="text-xs text-gray-400 mb-3">
              Skills in {student.name}&apos;s zone of proximal development
            </p>
            {zpdSkills.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-sm text-gray-400">
                  {masteryCounts.mastered === totalSkills
                    ? 'All skills mastered! Amazing work!'
                    : 'Complete prerequisites to unlock new skills.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {zpdSkills.map((skill) => {
                  const score = scores.get(skill.id);
                  const mastery = score?.mastery ?? 'not_started';
                  const meta = masteryMeta[mastery];

                  return (
                    <div
                      key={skill.id}
                      className="p-3 rounded-lg border border-blue-200 bg-blue-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{skill.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{skill.description}</p>
                        </div>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${meta.bgLight} ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-mono">
                        {domainNames[skill.domain]} -- {skill.standardCode}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Domain Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Domain Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domainBreakdown.map(({ domain, total, counts }) => {
              const domainMastered = counts.mastered;
              const domainPercent = Math.round((domainMastered / total) * 100);

              return (
                <div
                  key={domain}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        {domainNames[domain]}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">{domain}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {domainPercent}%
                    </span>
                  </div>

                  {/* Stacked bar */}
                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex mb-3">
                    {MASTERY_LEVELS.map((level) => {
                      const pct = (counts[level] / total) * 100;
                      if (pct === 0) return null;
                      return (
                        <div
                          key={level}
                          className={`${masteryMeta[level].barColor} transition-all duration-300`}
                          style={{ width: `${pct}%` }}
                        />
                      );
                    })}
                  </div>

                  {/* Counts */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {MASTERY_LEVELS.map((level) => (
                      <span key={level} className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${masteryMeta[level].barColor}`} />
                        <span className="text-gray-500">
                          {counts[level]} {masteryMeta[level].label.toLowerCase()}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Session History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-700">Recent Sessions</h2>
          </div>

          {sessionHistory.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">
              No sessions recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sessionHistory.map((session, i) => {
                const accuracy =
                  session.problemsAttempted > 0
                    ? Math.round((session.problemsCorrect / session.problemsAttempted) * 100)
                    : 0;
                const sessionDate = new Date(session.startedAt);
                const dateLabel = sessionDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                const timeLabel = sessionDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={session.id ?? i}
                    className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Date */}
                    <div className="w-24 shrink-0">
                      <p className="text-sm font-medium text-gray-700">{dateLabel}</p>
                      <p className="text-xs text-gray-400">{timeLabel}</p>
                    </div>

                    {/* Type Badge */}
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                        session.sessionType === 'assessment'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {session.sessionType === 'assessment' ? 'Assessment' : 'Practice'}
                    </span>

                    {/* Stats */}
                    <div className="flex-1 flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Score: </span>
                        <span className="font-medium text-gray-800">
                          {session.problemsCorrect}/{session.problemsAttempted}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time: </span>
                        <span className="font-medium text-gray-800">
                          {formatDuration(session.durationSeconds)}
                        </span>
                      </div>
                    </div>

                    {/* Accuracy */}
                    <div className="w-16 text-right">
                      <span
                        className={`text-sm font-bold ${
                          accuracy >= 80
                            ? 'text-green-600'
                            : accuracy >= 60
                              ? 'text-yellow-600'
                              : 'text-red-500'
                        }`}
                      >
                        {accuracy}%
                      </span>
                    </div>

                    {/* Accuracy mini bar */}
                    <div className="w-20 shrink-0">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full transition-all ${
                            accuracy >= 80
                              ? 'bg-green-500'
                              : accuracy >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-400'
                          }`}
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mastery Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          {MASTERY_LEVELS.map((level) => (
            <span key={level} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${masteryMeta[level].barColor}`} />
              {masteryMeta[level].label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
