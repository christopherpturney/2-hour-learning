import { useState, useEffect, useCallback } from 'react';
import type { Student, SkillScore } from '../types';
import { getStudents, createStudent, getSkillScores, saveAllSkillScores, updateStudent } from '../services/database';

export function useStudent(parentId: string | undefined) {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [scores, setScores] = useState<Map<string, SkillScore>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load students
  useEffect(() => {
    if (!parentId) return;
    setLoading(true);
    getStudents(parentId).then(s => {
      setStudents(s);
      if (s.length > 0 && !activeStudent) {
        setActiveStudent(s[0]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [parentId]);

  // Load scores when active student changes
  useEffect(() => {
    if (!activeStudent) return;
    getSkillScores(activeStudent.id).then(setScores);
  }, [activeStudent?.id]);

  const addStudent = useCallback(async (name: string) => {
    if (!parentId) return;
    const student = await createStudent(parentId, name);
    setStudents(prev => [...prev, student]);
    setActiveStudent(student);
  }, [parentId]);

  const saveScores = useCallback(async (newScores: Map<string, SkillScore>) => {
    setScores(newScores);
    await saveAllSkillScores(newScores);
  }, []);

  const markAssessmentComplete = useCallback(async () => {
    if (!activeStudent) return;
    await updateStudent(activeStudent.id, { assessmentComplete: true });
    setActiveStudent(prev => prev ? { ...prev, assessmentComplete: true } : null);
  }, [activeStudent]);

  return {
    students,
    activeStudent,
    setActiveStudent,
    scores,
    setScores,
    saveScores,
    addStudent,
    markAssessmentComplete,
    loading,
  };
}
