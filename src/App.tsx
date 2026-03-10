import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import type { Student, Session, SkillScore } from './types';
import { skills } from './data/skills';
import { createEmptyScore } from './engine/mastery';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import StudentSelector from './components/StudentSelector';
import Dashboard from './components/Dashboard';
import AssessmentFlow from './components/assessment/AssessmentFlow';
import SessionManager from './components/session/SessionManager';
import SkillMap from './components/skillMap/SkillMap';
import WorksheetGenerator from './components/worksheets/WorksheetGenerator';
import ParentDashboard from './components/parent/ParentDashboard';

// Check if Supabase is configured
const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

// ============================================
// Local Storage helpers (demo mode)
// ============================================
function loadLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function saveLocal(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadScoresMap(studentId: string): Map<string, SkillScore> {
  const saved = loadLocal<Record<string, SkillScore>>(`scores_${studentId}`, {});
  const map = new Map<string, SkillScore>();
  for (const skill of skills) {
    map.set(skill.id, saved[skill.id] || createEmptyScore(studentId, skill.id));
  }
  return map;
}

function saveScoresMap(studentId: string, scores: Map<string, SkillScore>) {
  const obj: Record<string, SkillScore> = {};
  for (const [k, v] of scores) {
    if (v.totalAttempts > 0) obj[k] = v;
  }
  saveLocal(`scores_${studentId}`, obj);
}

function AppContent() {
  // Demo mode state (when Supabase is not configured)
  const [demoMode] = useState(!hasSupabase);
  const [demoUser, setDemoUser] = useState<boolean>(() => loadLocal('demo_logged_in', false));
  const [students, setStudents] = useState<Student[]>(() => loadLocal('demo_students', []));
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [scores, setScores] = useState<Map<string, SkillScore>>(new Map());
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Supabase mode hooks (only used when configured)
  // For now, always use demo mode — Supabase integration activates when env vars are set

  // Initialize
  useEffect(() => {
    if (demoMode) {
      if (demoUser && students.length > 0) {
        const student = students[0];
        setActiveStudent(student);
        setScores(loadScoresMap(student.id));
        setRecentSessions(loadLocal(`sessions_${student.id}`, []));
      }
      setLoading(false);
    } else {
      // Supabase mode — import and use hooks dynamically
      setLoading(false);
    }
  }, []);

  // Update scores when active student changes
  useEffect(() => {
    if (activeStudent && demoMode) {
      setScores(loadScoresMap(activeStudent.id));
      setRecentSessions(loadLocal(`sessions_${activeStudent.id}`, []));
    }
  }, [activeStudent?.id]);

  const handleDemoLogin = useCallback(() => {
    setDemoUser(true);
    saveLocal('demo_logged_in', true);
  }, []);

  const handleSignOut = useCallback(() => {
    if (demoMode) {
      setDemoUser(false);
      setActiveStudent(null);
      saveLocal('demo_logged_in', false);
    }
  }, [demoMode]);

  const handleAddStudent = useCallback((name: string) => {
    const student: Student = {
      id: crypto.randomUUID(),
      parentId: 'demo',
      name,
      gradeLevel: 1,
      assessmentComplete: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [...students, student];
    setStudents(updated);
    setActiveStudent(student);
    saveLocal('demo_students', updated);
    setScores(loadScoresMap(student.id));
  }, [students]);

  const saveScores = useCallback(async (newScores: Map<string, SkillScore>) => {
    setScores(newScores);
    if (activeStudent && demoMode) {
      saveScoresMap(activeStudent.id, newScores);
    }
  }, [activeStudent, demoMode]);

  const markAssessmentComplete = useCallback(() => {
    if (!activeStudent) return;
    const updated = { ...activeStudent, assessmentComplete: true };
    setActiveStudent(updated);
    const updatedStudents = students.map(s => s.id === updated.id ? updated : s);
    setStudents(updatedStudents);
    if (demoMode) saveLocal('demo_students', updatedStudents);
  }, [activeStudent, students, demoMode]);

  async function handleAssessmentComplete(newScores: Map<string, SkillScore>) {
    await saveScores(newScores);
    markAssessmentComplete();

    const totalAttempted = Array.from(newScores.values()).reduce((s, sc) => s + sc.totalAttempts, 0);
    const totalCorrect = Array.from(newScores.values()).reduce((s, sc) => s + sc.totalCorrect, 0);
    const sessionData: Session = {
      id: crypto.randomUUID(),
      studentId: activeStudent!.id,
      sessionType: 'assessment',
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      problemsAttempted: totalAttempted,
      problemsCorrect: totalCorrect,
      skillBreakdown: [],
    };

    if (demoMode) {
      const sessions = [sessionData, ...recentSessions].slice(0, 10);
      setRecentSessions(sessions);
      saveLocal(`sessions_${activeStudent!.id}`, sessions);
    }

    navigate('/');
  }

  async function handleSessionComplete(newScores: Map<string, SkillScore>, sessionData: Session) {
    await saveScores(newScores);

    if (demoMode) {
      const sessions = [sessionData, ...recentSessions].slice(0, 10);
      setRecentSessions(sessions);
      saveLocal(`sessions_${activeStudent!.id}`, sessions);
    }

    navigate('/');
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🧮</div>
          <p className="text-xl text-indigo-600 font-bold">Loading Math Mastery...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!demoUser) {
    return <LoginPage onDemoLogin={handleDemoLogin} />;
  }

  // No active student — show selector
  if (!activeStudent) {
    return (
      <Layout onSignOut={handleSignOut}>
        <StudentSelector
          students={students}
          activeStudent={activeStudent}
          onSelect={(student) => setActiveStudent(student)}
          onAdd={handleAddStudent}
        />
      </Layout>
    );
  }

  return (
    <Layout studentName={activeStudent.name} onSignOut={handleSignOut}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              student={activeStudent}
              scores={scores}
              sessions={recentSessions}
              onStartAssessment={() => navigate('/assessment')}
              onStartSession={() => navigate('/session')}
              onNavigate={(path) => navigate(path)}
            />
          }
        />
        <Route
          path="/assessment"
          element={
            <AssessmentFlow
              student={activeStudent}
              scores={scores}
              onComplete={handleAssessmentComplete}
            />
          }
        />
        <Route
          path="/session"
          element={
            <SessionManager
              student={activeStudent}
              scores={scores}
              onComplete={handleSessionComplete}
            />
          }
        />
        <Route
          path="/skills"
          element={<SkillMap scores={scores} />}
        />
        <Route
          path="/worksheets"
          element={<WorksheetGenerator scores={scores} />}
        />
        <Route
          path="/parent"
          element={
            <ParentDashboard
              student={activeStudent}
              scores={scores}
              sessions={recentSessions}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
