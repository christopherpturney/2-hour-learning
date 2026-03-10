import type { Skill, Domain } from '../../types';

export interface DagNode {
  skillId: string;
  tier: number;
  column: number;
  domain: Domain;
}

export interface DagEdge {
  from: string;
  to: string;
}

export interface DagLayout {
  nodes: DagNode[];
  edges: DagEdge[];
  tiers: Map<number, DagNode[]>;
  maxTier: number;
}

const domainOrder: Domain[] = ['OA', 'NBT', 'MD', 'G'];

export function computeDagLayout(skills: Skill[]): DagLayout {
  const lookup = new Map(skills.map(s => [s.id, s]));
  const tierOf = new Map<string, number>();

  // 1. Compute tiers via recursive max-prerequisite-depth
  function getTier(id: string): number {
    if (tierOf.has(id)) return tierOf.get(id)!;
    const skill = lookup.get(id);
    if (!skill || skill.prerequisites.length === 0) {
      tierOf.set(id, 0);
      return 0;
    }
    const maxPrereq = Math.max(
      ...skill.prerequisites.map(pid => getTier(pid)),
    );
    const tier = maxPrereq + 1;
    tierOf.set(id, tier);
    return tier;
  }

  for (const skill of skills) getTier(skill.id);

  const maxTier = Math.max(...tierOf.values(), 0);

  // 2. Group by tier
  const tierGroups = new Map<number, Skill[]>();
  for (let t = 0; t <= maxTier; t++) tierGroups.set(t, []);
  for (const skill of skills) {
    const t = tierOf.get(skill.id) ?? 0;
    tierGroups.get(t)!.push(skill);
  }

  // 3. Order nodes within each tier
  // Tier 0: sort by domain order, then curriculum order
  tierGroups.get(0)!.sort((a, b) => {
    const dA = domainOrder.indexOf(a.domain);
    const dB = domainOrder.indexOf(b.domain);
    if (dA !== dB) return dA - dB;
    return a.curriculumOrder - b.curriculumOrder;
  });

  // Assign column indices for tier 0
  const columnOf = new Map<string, number>();
  for (const [i, skill] of tierGroups.get(0)!.entries()) {
    columnOf.set(skill.id, i);
  }

  // Subsequent tiers: barycenter heuristic — sort by average column of parents
  for (let t = 1; t <= maxTier; t++) {
    const tierSkills = tierGroups.get(t)!;

    tierSkills.sort((a, b) => {
      const avgA = averageParentColumn(a);
      const avgB = averageParentColumn(b);
      if (Math.abs(avgA - avgB) > 0.001) return avgA - avgB;
      // Tie-break by domain then curriculum order
      const dA = domainOrder.indexOf(a.domain);
      const dB = domainOrder.indexOf(b.domain);
      if (dA !== dB) return dA - dB;
      return a.curriculumOrder - b.curriculumOrder;
    });

    for (const [i, skill] of tierSkills.entries()) {
      columnOf.set(skill.id, i);
    }
  }

  function averageParentColumn(skill: Skill): number {
    if (skill.prerequisites.length === 0) return 0;
    const cols = skill.prerequisites
      .map(pid => columnOf.get(pid) ?? 0);
    return cols.reduce((sum, c) => sum + c, 0) / cols.length;
  }

  // 4. Build output
  const nodes: DagNode[] = [];
  const tiers = new Map<number, DagNode[]>();

  for (let t = 0; t <= maxTier; t++) {
    const tierNodes: DagNode[] = [];
    for (const skill of tierGroups.get(t)!) {
      const node: DagNode = {
        skillId: skill.id,
        tier: t,
        column: columnOf.get(skill.id) ?? 0,
        domain: skill.domain,
      };
      nodes.push(node);
      tierNodes.push(node);
    }
    tiers.set(t, tierNodes);
  }

  // 5. Collect edges
  const edges: DagEdge[] = [];
  for (const skill of skills) {
    for (const preId of skill.prerequisites) {
      edges.push({ from: preId, to: skill.id });
    }
  }

  return { nodes, edges, tiers, maxTier };
}

export interface DagGraphMaps {
  parentsOf: Map<string, Set<string>>;
  childrenOf: Map<string, Set<string>>;
}

export function buildGraphMaps(skills: Skill[]): DagGraphMaps {
  const parentsOf = new Map<string, Set<string>>();
  const childrenOf = new Map<string, Set<string>>();
  for (const s of skills) {
    if (!parentsOf.has(s.id)) parentsOf.set(s.id, new Set());
    if (!childrenOf.has(s.id)) childrenOf.set(s.id, new Set());
    for (const pid of s.prerequisites) {
      parentsOf.get(s.id)!.add(pid);
      if (!childrenOf.has(pid)) childrenOf.set(pid, new Set());
      childrenOf.get(pid)!.add(s.id);
    }
  }
  return { parentsOf, childrenOf };
}

export function getAncestors(skillId: string, parentsOf: Map<string, Set<string>>): Set<string> {
  const result = new Set<string>();
  const stack = [skillId];
  while (stack.length > 0) {
    const current = stack.pop()!;
    for (const parent of parentsOf.get(current) ?? []) {
      if (!result.has(parent)) {
        result.add(parent);
        stack.push(parent);
      }
    }
  }
  return result;
}

export function getDescendants(skillId: string, childrenOf: Map<string, Set<string>>): Set<string> {
  const result = new Set<string>();
  const stack = [skillId];
  while (stack.length > 0) {
    const current = stack.pop()!;
    for (const child of childrenOf.get(current) ?? []) {
      if (!result.has(child)) {
        result.add(child);
        stack.push(child);
      }
    }
  }
  return result;
}
