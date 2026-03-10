import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, FileText, Play, BarChart3, Calculator } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  studentName?: string;
  onSignOut?: () => void;
}

const tabs = [
  { path: '/', Icon: Home, label: 'Home' },
  { path: '/skills', Icon: Map, label: 'Skills' },
  { path: '/worksheets', Icon: FileText, label: 'Sheets' },
  { path: '/problems', Icon: Play, label: 'Problems' },
  { path: '/parent', Icon: BarChart3, label: 'Progress' },
];

export default function Layout({ children, studentName, onSignOut }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide bottom nav during sessions/assessments or when no student is active
  const hideNav = !studentName || ['/session', '/assessment'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Math Mastery</h1>
          </div>
          <div className="flex items-center gap-3">
            {studentName && (
              <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                {studentName}
              </span>
            )}
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="text-sm text-slate-400 active:text-slate-800 font-medium px-2 py-1 rounded-lg active:bg-slate-100 transition-colors min-h-[44px] flex items-center"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content — add bottom padding when nav is visible */}
      <main className={`flex-1 ${location.pathname === '/skills' ? 'max-w-full' : 'max-w-3xl'} mx-auto w-full px-4 py-5 ${hideNav ? '' : 'pb-24'}`}>
        {children}
      </main>

      {/* Bottom Tab Bar */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="max-w-3xl mx-auto flex">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] transition-colors ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-slate-400 active:text-slate-600'
                  }`}
                >
                  <tab.Icon className="w-5 h-5" />
                  <span className={`text-[11px] mt-0.5 font-semibold ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
