import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, CalendarDays } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Institution Registration & Workspace Creation',
      desc: 'The institutional registrar or dean registers the campus. A dedicated institutional ID (e.g. EDU-PUN-001) is provisioned with strictly isolated tenant data.',
      details: ['Data isolation per institution', 'Role-based account invitations', 'Custom department setup']
    },
    {
      num: '02',
      title: 'Infrastructure & Faculty Roster Mapping',
      desc: 'Classrooms, labs, auditoriums, and their seating capacities are uploaded. Faculty members and subjects are mapped.',
      details: ['Room equipment tracking', 'Batch division setups', 'Course credit configurations']
    },
    {
      num: '03',
      title: 'Conflict-Free Timetable Generation',
      desc: 'The scheduling engine creates the master timetable. Any overlapping rooms or professors are flagged immediately before publishing.',
      details: ['Automated collision checks', 'Live slot allocation', 'One-click timetable publishing']
    },
    {
      num: '04',
      title: 'Student Digital Classroom Onboarding',
      desc: 'Students log in via mobile or desktop. Their personalized schedules, enrolled digital classrooms, and lecture venues are immediately ready.',
      details: ['No manual enrollment required', 'Synced to calendar feeds', 'Offline access caching']
    },
    {
      num: '05',
      title: 'Real-Time Dynamic Coordination',
      desc: 'When room repairs happen or professors shift venues, 1-click management relocations update students within seconds via push notifications and live schedule badges.',
      details: ['Instant broadcast system', 'Verified student reporting', 'Centralized campus notices']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Implementation Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            How EduFlow Connects Your Campus
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            From initial registration to daily real-time lecture relocations, discover the end-to-end academic workflow.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        <div className="space-y-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shrink-0 font-mono">
                {st.num}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
                <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700">
                  {st.details.map((d, i) => (
                    <span key={i} className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{d}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/register-institution')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
          >
            <span>Start Institutional Onboarding</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
