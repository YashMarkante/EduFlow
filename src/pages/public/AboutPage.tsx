import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="flex justify-center mb-6">
            <Logo size="xl" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Brand Identity &amp; Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            The Flow Behind Modern Education
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            "Edu" represents education. "Flow" represents the smooth, frictionless flow of information, schedules, resources, and communication across campus.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 flex-1">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Why We Built EduFlow</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Educational institutions are complex micro-cities. Every day, thousands of students navigate hundreds of classrooms, while faculty balance multiple lectures, laboratory sessions, assessments, and departmental duties.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Yet most campuses still rely on static PDF timetables, ad-hoc WhatsApp groups, and paper notice boards. When an unexpected classroom maintenance issue arises, chaos ensues: students crowd corridors, teachers wait in empty halls, and crucial lecture hours are wasted.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            EduFlow was built to serve as the unified digital nervous system for modern campuses—connecting administrators, professors, and students in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl font-black text-blue-600">Zero</span>
            <span className="block text-xs font-bold text-slate-700 mt-1">Classroom Collisions</span>
            <p className="text-xs text-slate-500 mt-1">Automated timetable conflict detection</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl font-black text-teal-600">&lt; 30s</span>
            <span className="block text-xs font-bold text-slate-700 mt-1">Relocation Broadcast</span>
            <p className="text-xs text-slate-500 mt-1">Push notifications to all affected devices</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl font-black text-indigo-600">100%</span>
            <span className="block text-xs font-bold text-slate-700 mt-1">Multi-Tenant Isolated</span>
            <p className="text-xs text-slate-500 mt-1">Strict data separation per campus</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/register-institution')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
          >
            <span>Register Your Campus Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
