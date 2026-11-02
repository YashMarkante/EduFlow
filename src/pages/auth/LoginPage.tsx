import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/common/Logo';
import {
  Lock,
  Mail,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, navigate, switchRole, institution } = useApp();
  const [email, setEmail] = useState('yash.m@student.eduflow.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = login(email);
    if (!success) {
      setError('Invalid institution credentials. Please check your email or use 1-click demo login below.');
    }
  };

  const handleQuickDemo = (role: 'STUDENT' | 'TEACHER' | 'ADMIN') => {
    switchRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Campus Credential Recovery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Institutional security policy requires password resets to be verified through your registered campus administrator or university IT helpdesk.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-800">
              Assistance contact: <strong>admin@{institution.name.toLowerCase().replace(/ /g, '')}.edu</strong>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div onClick={() => navigate('/')} className="inline-block cursor-pointer">
          <Logo size="lg" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          Sign In to Your Campus
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your institutional credentials or choose a demo persona
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Institution Email / Student ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yash.m@student.eduflow.edu"
                  className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3.5 py-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3.5 py-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span className="text-slate-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to EduFlow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo 1-Click Role Logins */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block text-center mb-3">
              Fast 1-Click Demo Evaluation
            </span>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('STUDENT')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
              >
                <GraduationCap className="w-4 h-4 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-800 block text-[11px]">Student</span>
                <span className="text-[9px] text-slate-400">Yash</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('TEACHER')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all group"
              >
                <Briefcase className="w-4 h-4 text-teal-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-800 block text-[11px]">Teacher</span>
                <span className="text-[9px] text-slate-400">Prof. Patil</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-800 block text-[11px]">Management</span>
                <span className="text-[9px] text-slate-400">Dean Sharma</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center pt-2 text-xs text-slate-500">
            <span>Are you an institution? </span>
            <button
              onClick={() => navigate('/register-institution')}
              className="font-bold text-blue-600 hover:underline"
            >
              Register your institution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
