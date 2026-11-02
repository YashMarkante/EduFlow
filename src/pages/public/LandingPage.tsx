import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
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
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  School,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, switchRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      {/* HERO SECTION (Section 3 specification) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50">
        {/* Subtle geometric background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/15 via-teal-300/15 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-bold mb-6 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span>EduFlow Academic OS • Production Release</span>
          </div>

          {/* Main Tagline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Every Classroom.
            </span>{' '}
            Every Connection.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Manage schedules, classrooms, assignments, study materials, announcements, and academic communication from one intelligent platform.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/register-institution')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                switchRole('STUDENT');
                navigate('/student/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Demo</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </button>
          </div>

          {/* HERO VISUAL MOCKUP (Section 3 specification) */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-slate-300/80 bg-white shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden ring-1 ring-slate-900/5">
            {/* Mockup browser bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-400 ml-2 hidden sm:inline">
                  https://eduflow-tech.edu/student/dashboard
                </span>
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                EDU-PUN-001 • Division A Live Feed
              </span>
            </div>

            {/* Mockup Real-time Relocation Banner */}
            <div className="p-3.5 mb-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/40 border border-amber-300 text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>REAL-TIME CLASSROOM CHANGE:</span>
                <span className="font-medium text-slate-700">Operating Systems moved:</span>
                <del className="text-red-500">Room A-302</del>
                <span>➔</span>
                <strong className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">NEW: Room B-105</strong>
              </div>
              <span className="text-[10px] text-slate-400">10:42 AM • Maintenance Verified</span>
            </div>

            {/* Mockup 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Mockup 1: Today's schedule / Current Class */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-700">Current Class (LIVE)</span>
                <div className="text-sm font-bold text-slate-900 mt-1">Data Structures &amp; Alg.</div>
                <div className="text-slate-600 mt-1 font-medium">09:00 AM - 10:00 AM</div>
                <div className="font-bold text-slate-900 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Room C-204 (Prof. Patil)</span>
                </div>
              </div>

              {/* Mockup 2: Next Class */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Next Lecture</span>
                <div className="text-sm font-bold text-slate-900 mt-1">Python Programming</div>
                <div className="text-slate-600 mt-1 font-medium">10:00 AM • Lab 2</div>
                <div className="text-slate-500 mt-1 font-medium">Prof. Sneha Kulkarni</div>
              </div>

              {/* Mockup 3: Assignment Deadline */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700">Assignment Deadline</span>
                <div className="text-sm font-bold text-slate-900 mt-1">Linked List Cycle Impl.</div>
                <div className="text-amber-800 font-bold mt-1">Due Tomorrow 11:59 PM</div>
                <span className="text-[10px] text-slate-500 mt-1 block">50 Marks Max</span>
              </div>

              {/* Mockup 4: Study Material */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
                <span className="text-[10px] uppercase font-bold text-teal-700">Latest Material</span>
                <div className="text-sm font-bold text-slate-900 mt-1">Unit 3: Linked Lists.pdf</div>
                <div className="text-slate-600 mt-1">Uploaded by Prof. Patil</div>
                <div className="text-teal-700 font-bold mt-1">3.5 MB • PDF Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / VALUE SECTION (Section 3 specification) */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-8">
            Built for modern educational institutions worldwide
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Colleges', desc: 'Departmental divisions, credits, labs, faculty schedules' },
              { title: 'Universities', desc: 'Multi-campus architectures, lecture halls, campus notices' },
              { title: 'High Schools', desc: 'Classroom periods, exam calendars, attendance logging' },
              { title: 'Coaching Institutes', desc: 'Batch schedules, quick room reallocations, question banks' }
            ].map((inst, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-left hover:border-blue-300 hover:shadow-xs transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                  <Building className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{inst.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{inst.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: PROBLEM VS EDUFLOW (Section 4 specification) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider block mb-2">
              The Reality Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Academic communication shouldn't be this complicated.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Students and professors juggle scattered apps, outdated printouts, and noisy messaging groups every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* The Old Broken Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-red-500/30 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                The Chaos of Legacy Systems
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Static PDF Timetables:</strong> Outdated the moment a room changes or a professor takes leave.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Chaotic WhatsApp Groups:</strong> Critical classroom notices buried under hundreds of student chats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Physical Notice Boards:</strong> Students miss scholarship and placement deadlines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Scattered Study Materials:</strong> Google Drive links expire and lecture notes are misplaced.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Classroom Confusion:</strong> Batches collide in the same room without real-time conflict detection.</span>
                </li>
              </ul>
            </div>

            {/* EduFlow Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900/60 to-teal-900/40 border border-teal-500/40 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                The EduFlow Unified Flow
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Dynamic Smart Timetables:</strong> Live schedule synced across phones and laptops instantly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Real-time Room Changes:</strong> Management relocates a room, students receive push &amp; in-app alerts within seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Dedicated Digital Classrooms:</strong> Each course has organized notes by unit, tasks, and official Q&amp;A.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Incident Reporting &amp; Verification:</strong> Students report room issues; management verifies before broadcast.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Centralized Notice Board:</strong> Official circulars categorized by Scholarships, Exams, and Placements.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE FEATURES (Section 4 specification: 10 cards) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-2">
              Everything in One Place
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              10 Pillars of Modern Academic Management
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Designed to eliminate miscommunication between administration, faculty, and students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '1. Smart Timetable', desc: 'Conflict-free weekly scheduler for rooms, faculty, and student batches.', icon: CalendarDays },
              { title: '2. Real-Time Classroom Updates', desc: 'Instant relocation broadcasts to affected students and teachers.', icon: RefreshCw },
              { title: '3. Digital Classrooms', desc: 'Dedicated course hubs with organized units, announcements, and notes.', icon: GraduationCap },
              { title: '4. Assignment Management', desc: 'Coursework submission with file uploads, deadline tracking, and grading.', icon: FileText },
              { title: '5. Study Materials Hub', desc: 'Syllabi, lecture slides, and question papers organized by unit.', icon: BookOpen },
              { title: '6. Academic Notifications', desc: 'Contextual notifications for upcoming classes, new notes, and deadlines.', icon: Bell },
              { title: '7. Attendance Tracking', desc: 'Real-time subject-wise percentage and automated threshold warnings.', icon: CheckSquare },
              { title: '8. Structured Q&A Discussion', desc: 'Official teacher answers, student doubt resolution, and pinned threads.', icon: MessageSquare },
              { title: '9. Unified Academic Calendar', desc: 'Combine lectures, exams, assignment due dates, and campus holidays.', icon: Calendar },
              { title: '10. Management Operations', desc: 'Room occupancy analytics, faculty workload stats, and incident triaging.', icon: Building }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{card.title}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-blue-600">
                    <span>Learn more</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (Section 4 specification: 5 steps) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-2">
              Smooth Information Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How EduFlow Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Management creates timetable', desc: 'Deans schedule slots with automated room & teacher collision checking.' },
              { step: '02', title: 'Students receive schedules', desc: 'Personalized calendars automatically sync to student phones.' },
              { step: '03', title: 'Enter digital classrooms', desc: 'One-click access to syllabi, materials, and discussion boards.' },
              { step: '04', title: 'Teachers upload tasks', desc: 'Faculty publish assignments, lecture slides, and evaluated grades.' },
              { step: '05', title: 'Real-time notifications', desc: 'Room relocations, deadlines, and circulars alert everyone instantly.' }
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-left space-y-2">
                <span className="text-2xl font-black text-blue-600/30 block font-mono">{st.step}</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{st.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ROLE-BASED EXPERIENCE (Section 4 specification: 3 large cards) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-2">
              Role-Based Authorization
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tailored Experiences for Every Campus Role
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Student</h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-700">
                  "Know where you need to be and what you need to do."
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Never walk into an empty classroom again. View live room locations, pending assignments, downloaded notes, and official circulars on mobile.
                </p>
              </div>

              <button
                onClick={() => {
                  switchRole('STUDENT');
                  navigate('/student/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Student Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Teacher Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Teacher</h3>
                <p className="text-xs sm:text-sm font-semibold text-teal-700">
                  "Manage your classes and resources effortlessly."
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Publish assignments, evaluate student submissions with remarks, upload slides by unit, log roll-call attendance, and answer doubts officially.
                </p>
              </div>

              <button
                onClick={() => {
                  switchRole('TEACHER');
                  navigate('/teacher/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Faculty Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Management Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Management</h3>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  "Control academic operations from one dashboard."
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Resolve scheduling collisions, reallocate lecture rooms in real-time, triage student incident reports, publish campus circulars, and monitor analytics.
                </p>
              </div>

              <button
                onClick={() => {
                  switchRole('ADMIN');
                  navigate('/admin/dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Management Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (Section 6 specification) */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Ready to make your institution smarter?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join forward-thinking colleges, universities, and coaching institutes transitioning from outdated ERPs to EduFlow.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/register-institution')}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all"
            >
              Register Your Institution
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl transition-all"
            >
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
