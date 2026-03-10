import { useState } from 'react';
import type { FormEvent } from 'react';
import { signIn, signUp } from '../services/auth';

interface LoginPageProps {
  onDemoLogin?: () => void;
}

export default function LoginPage({ onDemoLogin }: LoginPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password);
        setSignUpSuccess(true);
      } else {
        await signIn(email, password);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (signUpSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">Check Your Email!</h2>
          <p className="text-slate-600 text-lg">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account!
          </p>
          <button
            onClick={() => { setSignUpSuccess(false); setMode('signin'); }}
            className="mt-6 text-indigo-600 active:text-indigo-800 font-semibold text-lg min-h-[48px]"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧮</div>
          <h1 className="text-3xl font-bold text-slate-800">Math Mastery</h1>
          <p className="text-slate-500 mt-2 text-lg">
            {mode === 'signin'
              ? 'Welcome back!'
              : 'Join the math adventure!'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
          <button
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-colors min-h-[48px] ${
              mode === 'signin'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 active:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-colors min-h-[48px] ${
              mode === 'signup'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 active:text-slate-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="parent@example.com"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-lg transition-colors min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-lg transition-colors min-h-[48px]"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold active:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm min-h-[52px]"
          >
            {loading
              ? '...'
              : mode === 'signin'
                ? "Let's Go!"
                : 'Create Account'}
          </button>
        </form>

        {onDemoLogin && (
          <div className="mt-6 text-center">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-400">or</span>
              </div>
            </div>
            <button
              onClick={onDemoLogin}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl text-lg font-bold active:bg-emerald-700 transition-colors shadow-sm min-h-[52px]"
            >
              Try Demo Mode
            </button>
            <p className="text-slate-400 text-sm mt-2">No account needed</p>
          </div>
        )}
      </div>
    </div>
  );
}
