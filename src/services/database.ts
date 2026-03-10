import { supabase } from '../supabase';
import type { Student, SkillScore, Session, AttemptRecord } from '../types';
import { skills } from '../data/skills';
import { createEmptyScore } from '../engine/mastery';

// ============================================
// Students
// ============================================

export async function createStudent(parentId: string, name: string): Promise<Student> {
  const { data, error } = await supabase
    .from('students')
    .insert({ parent_id: parentId, name, grade_level: 1 })
    .select()
    .single();
  if (error) throw error;
  return mapStudent(data);
}

export async function getStudents(parentId: string): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at');
  if (error) throw error;
  return (data || []).map(mapStudent);
}

export async function updateStudent(studentId: string, updates: Partial<Student>): Promise<void> {
  const dbUpdates: Record<string, unknown> = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.assessmentComplete !== undefined) dbUpdates.assessment_complete = updates.assessmentComplete;
  if (updates.gradeLevel !== undefined) dbUpdates.grade_level = updates.gradeLevel;

  const { error } = await supabase
    .from('students')
    .update(dbUpdates)
    .eq('id', studentId);
  if (error) throw error;
}

// ============================================
// Skill Scores
// ============================================

export async function getSkillScores(studentId: string): Promise<Map<string, SkillScore>> {
  const { data, error } = await supabase
    .from('skill_scores')
    .select('*')
    .eq('student_id', studentId);
  if (error) throw error;

  const scores = new Map<string, SkillScore>();

  // Initialize all skills with empty scores
  for (const skill of skills) {
    scores.set(skill.id, createEmptyScore(studentId, skill.id));
  }

  // Overlay with saved scores
  for (const row of data || []) {
    scores.set(row.skill_id, mapSkillScore(row));
  }

  return scores;
}

export async function saveSkillScore(score: SkillScore): Promise<void> {
  const { error } = await supabase
    .from('skill_scores')
    .upsert({
      student_id: score.studentId,
      skill_id: score.skillId,
      mastery: score.mastery,
      total_attempts: score.totalAttempts,
      total_correct: score.totalCorrect,
      recent_attempts: score.recentAttempts,
      last_attempted: score.lastAttempted,
      first_mastered_at: score.firstMasteredAt,
      next_review_at: score.nextReviewAt,
    }, {
      onConflict: 'student_id,skill_id',
    });
  if (error) throw error;
}

export async function saveAllSkillScores(scores: Map<string, SkillScore>): Promise<void> {
  const rows = Array.from(scores.values())
    .filter(s => s.totalAttempts > 0)
    .map(score => ({
      student_id: score.studentId,
      skill_id: score.skillId,
      mastery: score.mastery,
      total_attempts: score.totalAttempts,
      total_correct: score.totalCorrect,
      recent_attempts: score.recentAttempts,
      last_attempted: score.lastAttempted,
      first_mastered_at: score.firstMasteredAt,
      next_review_at: score.nextReviewAt,
    }));

  if (rows.length === 0) return;

  const { error } = await supabase
    .from('skill_scores')
    .upsert(rows, { onConflict: 'student_id,skill_id' });
  if (error) throw error;
}

// ============================================
// Sessions
// ============================================

export async function saveSession(session: Session): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .insert({
      student_id: session.studentId,
      session_type: session.sessionType,
      started_at: session.startedAt,
      duration_seconds: session.durationSeconds,
      problems_attempted: session.problemsAttempted,
      problems_correct: session.problemsCorrect,
      skill_breakdown: session.skillBreakdown,
    });
  if (error) throw error;
}

export async function getRecentSessions(studentId: string, limit = 10): Promise<Session[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .order('started_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []).map(mapSession);
}

// ============================================
// Mappers (DB row → app types)
// ============================================

function mapStudent(row: Record<string, unknown>): Student {
  return {
    id: row.id as string,
    parentId: row.parent_id as string,
    name: row.name as string,
    gradeLevel: row.grade_level as number,
    assessmentComplete: row.assessment_complete as boolean,
    createdAt: row.created_at as string,
  };
}

function mapSkillScore(row: Record<string, unknown>): SkillScore {
  return {
    id: row.id as string,
    studentId: row.student_id as string,
    skillId: row.skill_id as string,
    mastery: row.mastery as SkillScore['mastery'],
    totalAttempts: row.total_attempts as number,
    totalCorrect: row.total_correct as number,
    recentAttempts: (row.recent_attempts as AttemptRecord[]) || [],
    lastAttempted: row.last_attempted as string | null,
    firstMasteredAt: row.first_mastered_at as string | null,
    nextReviewAt: row.next_review_at as string | null,
  };
}

function mapSession(row: Record<string, unknown>): Session {
  return {
    id: row.id as string,
    studentId: row.student_id as string,
    sessionType: row.session_type as Session['sessionType'],
    startedAt: row.started_at as string,
    durationSeconds: row.duration_seconds as number,
    problemsAttempted: row.problems_attempted as number,
    problemsCorrect: row.problems_correct as number,
    skillBreakdown: (row.skill_breakdown as Session['skillBreakdown']) || [],
  };
}
