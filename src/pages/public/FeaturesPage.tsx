import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import {
  CalendarDays,
  RefreshCw,
  GraduationCap,
  FileText,
  BookOpen,
  Bell,
  CheckSquare,
  MessageSquare,
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { navigate } = useApp();

  const features = [
    {
      title: 'Smart Timetable Engine',
      subtitle: 'Zero-Collision Dynamic Scheduling',
      desc: 'Generates conflict-free weekly timetables detecting room collisions, teacher overlaps, and batch conflicts automatically.',
      bullets: ['Automated room collision detection', 'Teacher workload tracking', 'One-click export to Google/Apple Calendar', 'Division batch support'],
      icon: CalendarDays,
      badge: 'Core Engine'
    },
    {
      title: 'Real-Time Classroom Relocation',
      subtitle: 'Emergency Relocation with Zero Delay',
      desc: 'When maintenance, electrical faults, or AV repairs occur, management reallocates the session. Enrolled students and faculty receive instant push alerts.',
      bullets: ['In-app instant banner alerts', 'Automatic calendar synchronization', 'Relocation reason logging', 'Verified management audit trail'],
      icon: RefreshCw,
      badge: 'High Impact'
    },
    {
      title: 'Dedicated Digital Classrooms',
      subtitle: 'Course Centralization',
      desc: 'Each subject receives a private digital workspace with syllabi, assignments, lecture slides, attendance, grades, and official discussion boards.',
      bullets: ['Organized units and modules', 'Teacher announcements feed', 'Integrated assessment grading', 'Subject attendance analytics'],
      icon: GraduationCap,
      badge: 'Academic Hub'
    },
    {
      title: 'Assignment Management & Grading',
      subtitle: 'End-to-End Coursework Cycle',
      desc: 'Faculty publish assignments with guidelines, attachments, and deadlines. Students submit solutions with file uploads and receive evaluations.',
      bullets: ['Supports PDF, DOCX, ZIP & Jupyter notebooks', 'Late submission policy rules', 'Rubric marks & written feedback', 'Automated deadline reminders'],
      icon: FileText,
      badge: 'Assessment'
    },
    {
      title: 'Study Materials Repository',
      subtitle: 'Unit-Wise Digital Library',
      desc: 'Centralized repository of lecture slides, practical manuals, and solved previous year university exam papers.',
      bullets: ['Categorized by Unit 1, 2, 3 & Exam Prep', 'Multi-format PDF/PPT/DOC/ZIP', 'Bookmark favorite materials', 'Offline download support'],
      icon: BookOpen,
      badge: 'Resources'
    },
    {
      title: 'Classroom Incident Triaging',
      subtitle: 'Student Reporting & Admin Verification',
      desc: 'Students report locked rooms, teacher absence, or equipment issues. Management verifies before broadcast to eliminate false alarms.',
      bullets: ['Prevents campus misinformation', 'Verifiable incident logs', 'One-click relocation after verification', 'Audit reports for dean office'],
      icon: ShieldCheck,
      badge: 'Unique Feature'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Platform Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            Engineered for Modern Academic Efficiency
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            EduFlow solves the day-to-day coordination breakdown between students, faculty, and administrators.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {f.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                    <div className="text-xs font-semibold text-blue-600 mt-0.5">{f.subtitle}</div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
                  </div>

                  <ul className="pt-2 space-y-1.5 text-xs text-slate-600">
                    {f.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">Experience the EduFlow difference</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test the live environment with realistic college demo data.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/register-institution')}
              className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs shadow"
            >
              Register Your Institution
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
            >
              Sign In to Demo Campus
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
