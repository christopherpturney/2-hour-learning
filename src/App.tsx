import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import type { Student, Session, SkillScore, AttemptRecord } from './types';
import { skills } from './data/skills';
import { createEmptyScore, calculateMastery, getNextReviewDate } from './engine/mastery';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import StudentSelector from './components/StudentSelector';
import Dashboard from './components/Dashboard';
import AssessmentFlow from './components/assessment/AssessmentFlow';
import SessionManager from './components/session/SessionManager';
import SkillMap from './components/skillMap/SkillMap';
import WorksheetGenerator from './components/worksheets/WorksheetGenerator';
import ProblemPreview from './components/problems/ProblemPreview';
import LessonPreview from './components/lessons/LessonPreview';
import ParentDashboard from './components/parent/ParentDashboard';
import HowItWorks from './components/HowItWorks';
import { Loader2 } from 'lucide-react';

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

// Generate realistic scores for a mid-first-grade student
function createSampleScores(studentId: string): Map<string, SkillScore> {
  const scores = new Map<string, SkillScore>();
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  // Skills this student has mastered (K prereqs + early 1st grade)
  const masteredSkills = [
    'addition-within-5', 'subtraction-within-5',
    'addition-within-10', 'subtraction-within-10',
    'addition-fluency-10', 'subtraction-fluency-10',
    'count-to-120', 'order-objects-by-length',
    'tell-time-hour', 'identify-2d-shapes', 'partition-halves',
  ];

  // Skills the student is proficient in (working on solidifying)
  const proficientSkills = [
    'word-problems-add-to', 'word-problems-take-from',
    'commutative-property', 'understand-tens-ones',
  ];

  // Skills the student is developing (just started)
  const developingSkills = [
    'counting-on-strategy', 'subtraction-as-unknown-addend',
  ];

  function makeAttempts(correct: number, total: number, daysAgo: number): AttemptRecord[] {
    const attempts: AttemptRecord[] = [];
    for (let i = 0; i < total; i++) {
      attempts.push({
        correct: i < correct,
        timestamp: new Date(now - daysAgo * day + i * 60000).toISOString(),
      });
    }
    // Shuffle so correct/incorrect aren't perfectly ordered
    for (let i = attempts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [attempts[i], attempts[j]] = [attempts[j], attempts[i]];
    }
    return attempts;
  }

  for (const skill of skills) {
    if (masteredSkills.includes(skill.id)) {
      const daysAgo = 10 + Math.floor(Math.random() * 20);
      const recent = makeAttempts(9, 10, daysAgo);
      const score: SkillScore = {
        studentId, skillId: skill.id,
        mastery: 'mastered',
        totalAttempts: 15 + Math.floor(Math.random() * 10),
        totalCorrect: 13 + Math.floor(Math.random() * 8),
        recentAttempts: recent,
        lastAttempted: new Date(now - daysAgo * day).toISOString(),
        firstMasteredAt: new Date(now - (daysAgo + 5) * day).toISOString(),
        nextReviewAt: null,
      };
      score.nextReviewAt = getNextReviewDate(score);
      scores.set(skill.id, score);
    } else if (proficientSkills.includes(skill.id)) {
      const daysAgo = 2 + Math.floor(Math.random() * 5);
      const recent = makeAttempts(8, 10, daysAgo);
      const score: SkillScore = {
        studentId, skillId: skill.id,
        mastery: 'proficient',
        totalAttempts: 10 + Math.floor(Math.random() * 5),
        totalCorrect: 8 + Math.floor(Math.random() * 4),
        recentAttempts: recent,
        lastAttempted: new Date(now - daysAgo * day).toISOString(),
        firstMasteredAt: null,
        nextReviewAt: null,
      };
      score.mastery = calculateMastery(score);
      scores.set(skill.id, score);
    } else if (developingSkills.includes(skill.id)) {
      const daysAgo = 1 + Math.floor(Math.random() * 3);
      const recent = makeAttempts(4, 7, daysAgo);
      const score: SkillScore = {
        studentId, skillId: skill.id,
        mastery: 'developing',
        totalAttempts: 7,
        totalCorrect: 4,
        recentAttempts: recent,
        lastAttempted: new Date(now - daysAgo * day).toISOString(),
        firstMasteredAt: null,
        nextReviewAt: null,
      };
      score.mastery = calculateMastery(score);
      scores.set(skill.id, score);
    } else {
      scores.set(skill.id, createEmptyScore(studentId, skill.id));
    }
  }

  return scores;
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

  const handleAddSampleStudent = useCallback(() => {
    const student: Student = {
      id: crypto.randomUUID(),
      parentId: 'demo',
      name: 'Sam',
      gradeLevel: 1,
      assessmentComplete: true,
      createdAt: new Date().toISOString(),
    };
    const sampleScores = createSampleScores(student.id);
    const updated = [...students, student];
    setStudents(updated);
    setActiveStudent(student);
    saveLocal('demo_students', updated);
    setScores(sampleScores);
    saveScoresMap(student.id, sampleScores);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-indigo-600 font-bold">Loading Math Mastery...</p>
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
          onAddSample={handleAddSampleStudent}
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
              onExit={() => navigate('/')}
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
              onExit={() => navigate('/')}
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
          path="/problems"
          element={<ProblemPreview />}
        />
        <Route
          path="/lessons"
          element={<LessonPreview />}
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
        <Route
          path="/how-it-works"
          element={<HowItWorks />}
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
