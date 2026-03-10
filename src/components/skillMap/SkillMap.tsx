import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import type { Skill, SkillScore, MasteryLevel, Domain } from '../../types';
import { skills, domainNames, skillMap as skillLookup } from '../../data/skills';
import { getRegisteredSkillIds } from '../../engine/problems/index';
import { Plus, Hash, Ruler, Triangle } from 'lucide-react';
import { computeDagLayout, buildGraphMaps, getAncestors, getDescendants } from './dagLayout';
import TreeConnectors from './TreeConnectors';
import SkillTreeCard from './SkillTreeCard';
import type { HighlightState, CrossClusterPrereq } from './SkillTreeCard';

interface SkillMapProps {
  scores: Map<string, SkillScore>;
}

// Override cluster for skills whose CCSS cluster letter changes between grades
// (e.g., time is MD.B in 1st grade but MD.C in 2nd grade)
const clusterOverrides: Record<string, string> = {
  'tell-time-five-minutes': 'MD.B',
};

function getCluster(skill: Skill): string {
  if (clusterOverrides[skill.id]) return clusterOverrides[skill.id];
  const parts = skill.standardCode.split('.');
  return `${parts[1]}.${parts[2]}`;
}

const clusterLabels: Record<string, string> = {
  'OA.A': 'Word Problems',
  'OA.B': 'Properties',
  'OA.C': 'Strategies & Fluency',
  'OA.D': 'Equations',
  'NBT.A': 'Counting',
  'NBT.B': 'Place Value',
  'NBT.C': 'Operations',
  'MD.A': 'Measurement',
  'MD.B': 'Time',
  'MD.C': 'Data',
  'G.A': 'Shapes & Partitions',
};

const domainClusters: Record<Domain, string[]> = {
  OA: ['OA.A', 'OA.B', 'OA.C', 'OA.D'],
  NBT: ['NBT.A', 'NBT.B', 'NBT.C'],
  MD: ['MD.A', 'MD.B', 'MD.C'],
  G: ['G.A'],
};

const masteryDots: Record<MasteryLevel, { dot: string; text: string; label: string }> = {
  not_started: { dot: 'bg-gray-400', text: 'text-gray-500', label: 'Not Started' },
  developing: { dot: 'bg-yellow-400', text: 'text-yellow-700', label: 'Developing' },
  proficient: { dot: 'bg-blue-400', text: 'text-blue-700', label: 'Proficient' },
  mastered: { dot: 'bg-green-400', text: 'text-green-700', label: 'Mastered' },
};

const domainBadgeColors: Record<Domain, string> = {
  OA: 'bg-purple-600',
  NBT: 'bg-indigo-600',
  MD: 'bg-teal-600',
  G: 'bg-orange-500',
};

const DomainIcon = ({ domain, className }: { domain: Domain; className?: string }) => {
  const cls = className ?? 'w-4 h-4';
  switch (domain) {
    case 'OA': return <Plus className={cls} />;
    case 'NBT': return <Hash className={cls} />;
    case 'MD': return <Ruler className={cls} />;
    case 'G': return <Triangle className={cls} />;
  }
};

function getMastery(skillId: string, scores: Map<string, SkillScore>): MasteryLevel {
  return scores.get(skillId)?.mastery ?? 'not_started';
}

function getAccuracy(skillId: string, scores: Map<string, SkillScore>): number | null {
  const score = scores.get(skillId);
  if (!score || score.totalAttempts === 0) return null;
  return Math.round((score.totalCorrect / score.totalAttempts) * 100);
}

export default function SkillMap({ scores }: SkillMapProps) {
  const domainContainerRefs = useRef<Record<Domain, { current: HTMLDivElement | null }>>({
    OA: { current: null },
    NBT: { current: null },
    MD: { current: null },
    G: { current: null },
  });
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [, setMeasureTick] = useState(0);

  const registeredIds = useMemo(() => new Set(getRegisteredSkillIds()), []);
  const layout = useMemo(() => computeDagLayout(skills), []);
  const graphMaps = useMemo(() => buildGraphMaps(skills), []);

  // Build cluster × tier grid
  const clusterTierGrid = useMemo(() => {
    const tierOf = new Map<string, number>();
    for (const node of layout.nodes) {
      tierOf.set(node.skillId, node.tier);
    }
    // Map: cluster → tier → skills[]
    const grid = new Map<string, Map<number, Skill[]>>();
    for (const clusters of Object.values(domainClusters)) {
      for (const cluster of clusters) {
        grid.set(cluster, new Map());
      }
    }
    for (const skill of skills) {
      const cluster = getCluster(skill);
      const tier = tierOf.get(skill.id) ?? 0;
      const clusterMap = grid.get(cluster);
      if (clusterMap) {
        if (!clusterMap.has(tier)) clusterMap.set(tier, []);
        clusterMap.get(tier)!.push(skill);
      }
    }
    return grid;
  }, [layout]);

  // Edges grouped by domain (intra-domain only)
  const edgesByDomain = useMemo(() => {
    const map: Record<Domain, typeof layout.edges> = { OA: [], NBT: [], MD: [], G: [] };
    for (const edge of layout.edges) {
      const fromDomain = skillLookup.get(edge.from)?.domain;
      const toDomain = skillLookup.get(edge.to)?.domain;
      if (fromDomain && toDomain && fromDomain === toDomain) {
        map[fromDomain].push(edge);
      }
    }
    return map;
  }, [layout.edges]);

  // All intra-domain edges flat (for highlight computation)
  const allIntraDomainEdges = useMemo(() => {
    return [...edgesByDomain.OA, ...edgesByDomain.NBT, ...edgesByDomain.MD, ...edgesByDomain.G];
  }, [edgesByDomain]);

  // Cross-domain prerequisites per skill (shown as tabs on cards)
  const crossDomainPrereqsMap = useMemo(() => {
    const map = new Map<string, CrossClusterPrereq[]>();
    for (const skill of skills) {
      const crossPrereqs: CrossClusterPrereq[] = [];
      for (const prereqId of skill.prerequisites) {
        const prereqSkill = skillLookup.get(prereqId);
        if (prereqSkill && prereqSkill.domain !== skill.domain) {
          crossPrereqs.push({
            cluster: getCluster(prereqSkill),
            domain: prereqSkill.domain,
            skillName: prereqSkill.name,
          });
        }
      }
      if (crossPrereqs.length > 0) {
        map.set(skill.id, crossPrereqs);
      }
    }
    return map;
  }, []);

  // Highlight state
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const highlightedSet = useMemo(() => {
    if (!selectedSkillId) return null;
    const ancestors = getAncestors(selectedSkillId, graphMaps.parentsOf);
    const descendants = getDescendants(selectedSkillId, graphMaps.childrenOf);
    const all = new Set([selectedSkillId, ...ancestors, ...descendants]);
    return { all, ancestors, descendants, selected: selectedSkillId };
  }, [selectedSkillId, graphMaps]);

  const highlightedEdges = useMemo(() => {
    if (!highlightedSet) return null;
    const edgeKeys = new Set<string>();
    for (const edge of allIntraDomainEdges) {
      if (highlightedSet.all.has(edge.from) && highlightedSet.all.has(edge.to)) {
        edgeKeys.add(`${edge.from}-${edge.to}`);
      }
    }
    return edgeKeys;
  }, [highlightedSet, allIntraDomainEdges]);

  const handleSkillClick = useCallback((skillId: string) => {
    setSelectedSkillId(prev => prev === skillId ? null : skillId);
  }, []);

  function getHighlightState(skillId: string): HighlightState {
    if (!highlightedSet) return 'none';
    if (highlightedSet.selected === skillId) return 'selected';
    if (highlightedSet.ancestors.has(skillId)) return 'ancestor';
    if (highlightedSet.descendants.has(skillId)) return 'descendant';
    return 'dimmed';
  }

  // Force re-render for connector measurement after initial layout
  const remeasure = useCallback(() => setMeasureTick(t => t + 1), []);

  useEffect(() => {
    const timer = setTimeout(remeasure, 100);
    return () => clearTimeout(timer);
  }, [remeasure]);

  // Summary stats
  const counts: Record<MasteryLevel, number> = { not_started: 0, developing: 0, proficient: 0, mastered: 0 };
  for (const skill of skills) {
    counts[getMastery(skill.id, scores)]++;
  }
  const totalSkills = skills.length;
  const progressPercent = Math.round((counts.mastered / totalSkills) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6" onClick={() => setSelectedSkillId(null)}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">My Math Skills</h1>
        <p className="text-gray-500 mb-6">Track your progress across all math skills</p>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-800">{counts.mastered}/{totalSkills}</span>
              <span className="text-gray-500 ml-2">skills mastered</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {(Object.entries(counts) as [MasteryLevel, number][]).map(([level, count]) => (
                <div
                  key={level}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-opacity-20 ${masteryDots[level].text}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${masteryDots[level].dot}`} />
                  {count} {masteryDots[level].label}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1.5">{progressPercent}% complete</p>
        </div>

        {/* Dependency Trees — One per Domain */}
        {(['OA', 'NBT', 'MD', 'G'] as Domain[]).map(domain => {
          const clusters = domainClusters[domain];
          const domainEdges = edgesByDomain[domain];

          return (
            <div key={domain} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 overflow-x-auto mb-4">
              {/* Domain header */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white ${domainBadgeColors[domain]}`}>
                  <DomainIcon domain={domain} className="w-3.5 h-3.5" />
                  {domainNames[domain]}
                </span>
              </div>

              <div
                ref={(el) => { domainContainerRefs.current[domain].current = el; }}
                className="relative min-w-fit min-h-fit"
              >
                <TreeConnectors
                  edges={domainEdges}
                  nodeRefs={nodeRefs}
                  containerRef={domainContainerRefs.current[domain]}
                  highlightedEdges={highlightedEdges}
                />

                <div className="flex flex-col gap-1">
                  {clusters.map(cluster => {
                    const tierMap = clusterTierGrid.get(cluster);
                    if (!tierMap || tierMap.size === 0) return null;

                    return (
                      <div
                        key={cluster}
                        className="flex flex-row items-center gap-0"
                      >
                        {/* Cluster label */}
                        <div className="w-28 shrink-0 pr-2 py-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-white ${domainBadgeColors[domain]}`}>
                            {cluster}
                          </span>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                            {clusterLabels[cluster]}
                          </p>
                        </div>

                        {/* Tier cells */}
                        <div className="flex flex-row gap-8 items-center">
                          {Array.from({ length: layout.maxTier + 1 }, (_, tier) => {
                            const cellSkills = tierMap.get(tier) ?? [];
                            return (
                              <div key={tier} className="w-48 shrink-0 flex flex-col items-center gap-2 py-2">
                                {cellSkills.map(skill => {
                                  const mastery = getMastery(skill.id, scores);
                                  const accuracy = getAccuracy(skill.id, scores);
                                  const isComingSoon = !registeredIds.has(skill.id);

                                  return (
                                    <SkillTreeCard
                                      key={skill.id}
                                      skill={skill}
                                      mastery={mastery}
                                      accuracy={accuracy}
                                      isComingSoon={isComingSoon}
                                      highlightState={getHighlightState(skill.id)}
                                      onSkillClick={handleSkillClick}
                                      crossClusterPrereqs={crossDomainPrereqsMap.get(skill.id)}
                                      nodeRef={(el) => {
                                        if (el) nodeRefs.current.set(skill.id, el);
                                        else nodeRefs.current.delete(skill.id);
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-bold text-gray-700 mb-3">How Mastery Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.entries(masteryDots) as [MasteryLevel, typeof masteryDots.not_started][]).map(([level, meta]) => (
              <div key={level} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full ${meta.dot} mt-0.5 shrink-0`} />
                <div>
                  <p className={`font-semibold text-sm ${meta.text}`}>{meta.label}</p>
                  <p className="text-xs text-gray-500">
                    {level === 'not_started' && 'Skill has not been attempted yet'}
                    {level === 'developing' && 'Working on it, getting better!'}
                    {level === 'proficient' && 'Almost there, keep practicing!'}
                    {level === 'mastered' && 'Great job, skill is learned!'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
