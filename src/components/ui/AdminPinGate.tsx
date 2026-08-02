import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_PIN = '2601'; // Change this to your preferred PIN

interface AdminPinGateProps {
  children: React.ReactNode;
}

export const AdminPinGate: React.FC<AdminPinGateProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    // Persist auth in sessionStorage so it survives React re-renders
    return sessionStorage.getItem('lara_admin_auth') === 'true';
  });
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;

    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('lara_admin_auth', 'true');
      setAuthenticated(true);
      setError('');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPin('');
      if (newAttempts >= 5) {
        setLocked(true);
        setLockTimer(30);
        setError('Too many failed attempts. Locked for 30 seconds.');
        const interval = setInterval(() => {
          setLockTimer((t) => {
            if (t <= 1) {
              clearInterval(interval);
              setLocked(false);
              setAttempts(0);
              setError('');
              return 0;
            }
            return t - 1;
          });
        }, 1000);
      } else {
        setError(`Incorrect PIN. ${5 - newAttempts} attempt${5 - newAttempts === 1 ? '' : 's'} remaining.`);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('lara_admin_auth');
    setAuthenticated(false);
    setPin('');
  };

  if (authenticated) {
    return (
      <div>
        {/* Logout strip */}
        <div className="bg-[#121212] border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#F58220]" />
            <span className="font-bold text-white">Admin Session Active</span>
            <span className="text-gray-500">— Lara Concrete CRM</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-900/40 hover:bg-red-900/70 text-red-400 hover:text-white border border-red-800/50 px-3 py-1 rounded-lg font-bold transition-colors"
            >
              Lock Admin
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F58220]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F58220] shadow-2xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Lara Concrete LLC — CRM Dashboard</p>
        </div>

        {/* PIN Form */}
        <div className="bg-[#2D2D2D] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-medium">Enter your admin PIN to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-gray-300 mb-1.5">Admin PIN</label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  disabled={locked}
                  autoFocus
                  className={`w-full bg-[#1A1A1A] border text-white rounded-xl px-4 py-3.5 text-center text-xl font-black tracking-[0.5em] focus:outline-none transition-colors pr-12 ${
                    error
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-white/10 focus:border-[#F58220]'
                  } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-3 text-xs text-red-400 font-bold text-center">
                {locked ? `🔒 ${error} (${lockTimer}s)` : `⚠️ ${error}`}
              </div>
            )}

            <button
              type="submit"
              disabled={!pin || locked}
              className="w-full btn-lara-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>Unlock Admin Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Return to public site
            </Link>
          </div>
        </div>

        {/* Security note */}
        <p className="text-center text-[10px] text-gray-600 mt-4">
          Secured session · 5 attempts before lockout · Lara Concrete LLC
        </p>
      </div>
    </div>
  );
};
