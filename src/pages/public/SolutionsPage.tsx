import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Building, GraduationCap, School, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { navigate } = useApp();

  const solutions = [
    {
      title: 'For Colleges & Higher Education Institutes',
      desc: 'Handle departmental divisions, semester electives, laboratory periods, and multi-tier faculty workloads with precision.',
      benefits: [
        'Automated division scheduling',
        'Student roll call attendance tracking',
        'Direct lab manual & study material distribution',
        'Placement and examination notice dissemination'
      ],
      icon: Building
    },
    {
      title: 'For Multi-Faculty Universities',
      desc: 'Scale across campuses, multiple engineering and humanities schools, tiered auditoriums, and hundreds of lecture halls.',
      benefits: [
        'Multi-tenant institutional hierarchy',
        'Emergency facility relocation broadcasts',
        'Role-based permissions for Deans, HODs, and Professors',
        'Comprehensive audit logging and capacity analytics'
      ],
      icon: GraduationCap
    },
    {
      title: 'For K-12 Schools & Academies',
      desc: 'Simplify daily period schedules, homework assignments, parent-teacher announcements, and classroom attendance registers.',
      benefits: [
        'Structured periods and bell timetables',
        'Homework submission and teacher marks',
        'Real-time relief teacher scheduling',
        'Zero distraction safe digital classrooms'
      ],
      icon: School
    },
    {
      title: 'For Competitive Coaching Institutes',
      desc: 'Rapid batch management, entrance test preparation materials, practice test paper distribution, and doubts clearing.',
      benefits: [
        'Weekend and crash course batch scheduling',
        'Question paper library with model keys',
        'Fast classroom shifting for revision marathons',
        'Teacher-student doubt discussion threads'
      ],
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Tailored Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            Built for Every Educational Organization
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Whether running an engineering university of 10,000 students or an intensive coaching center, EduFlow adapts seamlessly.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{sol.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sol.desc}</p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase text-slate-400 block mb-2">Key Advantages:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {sol.benefits.map((b, idx) => (
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

        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/register-institution')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
          >
            <span>Onboard Your Institution</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
