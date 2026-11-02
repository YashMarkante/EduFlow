import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" theme="light" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
              One Platform. Every Classroom. Every Connection.
              <br />
              The modern academic operating system engineered for universities, colleges, schools, and coaching institutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Multi-tenant encrypted academic data isolation</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Smart Timetable</button></li>
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Real-time Classroom Relocation</button></li>
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Digital Classrooms</button></li>
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Study Materials Hub</button></li>
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Assignment Workflow</button></li>
              <li><button onClick={() => navigate('/features')} className="hover:text-white transition-colors">Institutional Notices</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/solutions')} className="hover:text-white transition-colors">For Colleges &amp; Universities</button></li>
              <li><button onClick={() => navigate('/solutions')} className="hover:text-white transition-colors">For K-12 High Schools</button></li>
              <li><button onClick={() => navigate('/solutions')} className="hover:text-white transition-colors">For Coaching Academies</button></li>
              <li><button onClick={() => navigate('/solutions')} className="hover:text-white transition-colors">Multi-Campus Systems</button></li>
              <li><button onClick={() => navigate('/solutions')} className="hover:text-white transition-colors">Role-Based Access Control</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Institutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/register-institution')} className="hover:text-white text-teal-400 font-semibold transition-colors">Onboard Your Campus</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Campus Portal Login</button></li>
              <li><button onClick={() => navigate('/how-it-works')} className="hover:text-white transition-colors">Implementation Guide</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Our Philosophy</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Talk to Academic Sales</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduFlow Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Security &amp; Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">FERPA &amp; GDPR Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
