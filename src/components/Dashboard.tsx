import type { Student, SkillScore, Session } from '../types';
import { hasSavedSession } from './session/SessionManager';
import { hasSavedAssessment } from './assessment/AssessmentFlow';
import { ClipboardList, BookOpen, PlayCircle } from 'lucide-react';

interface DashboardProps {
  student: Student;
  scores: Map<string, SkillScore>;
  sessions: Session[];
  onStartAssessment: () => void;
  onStartSession: () => void;
  onNavigate: (path: string) => void;
}

export default function Dashboard({
  student,
  scores,
  sessions,
  onStartAssessment,
  onStartSession,
}: DashboardProps) {
  const hasResumableSession = hasSavedSession(student.id);
  const hasResumableAssessment = hasSavedAssessment(student.id);
  const allScores = Array.from(scores.values());
  const mastered = allScores.filter((s) => s.mastery === 'mastered').length;
  const proficient = allScores.filter((s) => s.mastery === 'proficient').length;
  const developing = allScores.filter((s) => s.mastery === 'developing').length;
  const inProgress = proficient + developing;
  const totalAttempted = allScores.reduce((sum, s) => sum + s.totalAttempts, 0);
  const totalCorrect = allScores.reduce((sum, s) => sum + s.totalCorrect, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const totalSkills = allScores.length;
  const progressPercent = totalSkills > 0 ? Math.round((mastered / totalSkills) * 100) : 0;

  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">Hi, {student.name}!</h2>
        <p className="text-slate-500 mt-1">Ready to learn some math today?</p>
      </div>

      {/* Assessment / Session CTA */}
      {!student.assessmentComplete ? (
        <button
          onClick={onStartAssessment}
          className="w-full bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-2xl text-center shadow-sm active:scale-[0.98] transition-transform"
        >
          {hasResumableAssessment ? (
            <>
              <PlayCircle className="w-10 h-10 mx-auto mb-2 opacity-90" />
              <span className="text-xl font-bold block">Resume Assessment</span>
              <p className="text-amber-100 mt-1 text-sm">Pick up where you left off</p>
            </>
          ) : (
            <>
              <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-90" />
              <span className="text-xl font-bold block">Start Assessment</span>
              <p className="text-amber-100 mt-1 text-sm">Find out what you already know</p>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onStartSession}
          className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl text-center shadow-sm active:scale-[0.98] transition-transform"
        >
          {hasResumableSession ? (
            <>
              <PlayCircle className="w-10 h-10 mx-auto mb-2 opacity-90" />
              <span className="text-xl font-bold block">Resume Session</span>
              <p className="text-emerald-100 mt-1 text-sm">Pick up where you left off</p>
            </>
          ) : (
            <>
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-90" />
              <span className="text-xl font-bold block">Start Today's Session</span>
              <p className="text-emerald-100 mt-1 text-sm">20 minutes of math practice</p>
            </>
          )}
        </button>
      )}

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-700">Progress</h3>
          <span className="text-sm font-semibold text-indigo-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-emerald-600">{mastered}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Mastered</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">In Progress</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-violet-600">{overallAccuracy}%</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Accuracy</p>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {recentSessions.map((session, idx) => {
              const accuracy = session.problemsAttempted > 0
                ? Math.round((session.problemsCorrect / session.problemsAttempted) * 100)
                : 0;
              const date = new Date(session.startedAt);
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={session.id || idx}
                  className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      session.sessionType === 'assessment' ? 'bg-amber-50' : 'bg-emerald-50'
                    }`}>
                      {session.sessionType === 'assessment'
                        ? <ClipboardList className="w-5 h-5 text-amber-600" />
                        : <BookOpen className="w-5 h-5 text-emerald-600" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">
                        {session.sessionType === 'assessment' ? 'Assessment' : 'Practice'}
                      </p>
                      <p className="text-xs text-slate-400">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                      {accuracy}%
                    </p>
                    <p className="text-xs text-slate-400">
                      {session.problemsCorrect}/{session.problemsAttempted}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
