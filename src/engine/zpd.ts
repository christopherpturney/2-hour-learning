import type { Skill, SkillScore, MasteryLevel } from '../types';
import { skills, skillMap } from '../data/skills';
import { needsReview, createEmptyScore } from './mastery';

function getScore(skillId: string, scores: Map<string, SkillScore>): SkillScore {
  return scores.get(skillId) ?? createEmptyScore('', skillId);
}

function allPrerequisitesMastered(skill: Skill, scores: Map<string, SkillScore>): boolean {
  return skill.prerequisites.every(preId => {
    const preScore = getScore(preId, scores);
    return preScore.mastery === 'mastered';
  });
}

function isReady(skill: Skill, scores: Map<string, SkillScore>): boolean {
  const score = getScore(skill.id, scores);
  if (score.mastery === 'mastered') {
    return false;
  }
  if (skill.prerequisites.length === 0) {
    return true;
  }
  return allPrerequisitesMastered(skill, scores);
}

export function selectLearningSkills(scores: Map<string, SkillScore>): Skill[] {
  const readySkills = skills
    .filter(s => isReady(s, scores))
    .sort((a, b) => {
      const aScore = getScore(a.id, scores);
      const bScore = getScore(b.id, scores);

      // Developing before not_started
      const masteryPriority: Record<MasteryLevel, number> = {
        developing: 0,
        not_started: 1,
        proficient: 2,
        mastered: 3,
      };

      const priorityDiff = masteryPriority[aScore.mastery] - masteryPriority[bScore.mastery];
      if (priorityDiff !== 0) return priorityDiff;

      return a.curriculumOrder - b.curriculumOrder;
    });

  return readySkills.slice(0, 2);
}

export function selectWarmupSkills(scores: Map<string, SkillScore>, count: number): Skill[] {
  const reviewSkills = skills.filter(s => {
    const score = getScore(s.id, scores);
    return needsReview(score);
  });

  // Sort by most overdue first (earliest nextReviewAt)
  reviewSkills.sort((a, b) => {
    const aReview = getScore(a.id, scores).nextReviewAt!;
    const bReview = getScore(b.id, scores).nextReviewAt!;
    return new Date(aReview).getTime() - new Date(bReview).getTime();
  });

  return reviewSkills.slice(0, count);
}

export function selectPracticeSkills(
  learningSkills: Skill[],
  scores: Map<string, SkillScore>,
  count: number,
): Skill[] {
  const learningIds = new Set(learningSkills.map(s => s.id));
  const result: Skill[] = [...learningSkills];

  // Add recent developing skills not already in learning set
  const developingSkills = skills
    .filter(s => {
      if (learningIds.has(s.id)) return false;
      const score = getScore(s.id, scores);
      return score.mastery === 'developing' || score.mastery === 'proficient';
    })
    .sort((a, b) => {
      const aScore = getScore(a.id, scores);
      const bScore = getScore(b.id, scores);
      const aTime = aScore.lastAttempted ? new Date(aScore.lastAttempted).getTime() : 0;
      const bTime = bScore.lastAttempted ? new Date(bScore.lastAttempted).getTime() : 0;
      return bTime - aTime;
    });

  for (const skill of developingSkills) {
    if (result.length >= count) break;
    result.push(skill);
  }

  return result.slice(0, count);
}

export function getSkillStatus(
  skillId: string,
  scores: Map<string, SkillScore>,
): { mastery: MasteryLevel; isReady: boolean } {
  const skill = skillMap.get(skillId);
  const score = getScore(skillId, scores);

  return {
    mastery: score.mastery,
    isReady: skill ? isReady(skill, scores) : false,
  };
}
