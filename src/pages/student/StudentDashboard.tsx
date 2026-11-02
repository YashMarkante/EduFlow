import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  MapPin,
  User,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle,
  FileText,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Flame,
  CheckSquare
} from 'lucide-react';
import { ReportClassroomModal } from '../../components/common/ReportClassroomModal';
import { OfficialTimetableDocModal } from '../../components/common/OfficialTimetableDocModal';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    timetable,
    assignments,
    materials,
    announcements,
    attendance,
    notices,
    navigate
  } = useApp();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  // Today's Day: default Monday for demo
  const todayEntries = timetable
    .filter((t) => t.dayOfWeek === 'Monday')
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Find live and next class
  const currentClass = todayEntries.find((t) => t.status === 'live') || todayEntries[0];
  const nextClass = todayEntries[1] || todayEntries[0];

  // Check for any moved class today
  const movedClasses = todayEntries.filter((t) => t.status === 'moved');

  // Overall attendance calculation
  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClasses = attendance.reduce((acc, curr) => acc + curr.total, 0);
  const overallAttendance = Math.round((totalAttended / totalClasses) * 100);

  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status === 'due_soon');

  const todayDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 pb-12">
      <ReportClassroomModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        defaultSubject={currentClass?.subjectName}
        defaultRoom={currentClass?.roomName}
      />

      <OfficialTimetableDocModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />

      {/* WELCOME GREETING HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl shadow-blue-950/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ICEM Pune • S.Y. Timetable V5 Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {todayDateFormatted} • {currentUser.division} ({currentUser.rollNumber})
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 sm:self-center flex-wrap">
          <button
            onClick={() => setDocModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            title="View Official S.Y. Timetable PDF Document"
          >
            <FileText className="w-4 h-4 text-blue-300" />
            <span>Timetable PDF</span>
          </button>
          <button
            onClick={() => setReportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Report Room Issue</span>
          </button>
          <button
            onClick={() => navigate('/student/schedule')}
            className="px-4 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Full Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* REAL-TIME CLASSROOM CHANGE ALERT (Crucial section from specs) */}
      {movedClasses.map((item) => (
        <div
          key={item.id}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/50 border-2 border-amber-300/80 shadow-md shadow-amber-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30 mt-0.5">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 tracking-wider">
                  Real-time Classroom Relocation
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {item.changedAt} • by {item.changedBy}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {item.subjectName} ({item.startTime} - {item.endTime})
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Original Room: <del className="font-semibold text-red-600">{item.originalRoomName}</del> →{' '}
                <strong className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black text-xs">
                  NEW ROOM: {item.roomName} ({item.building})
                </strong>
              </p>
              {item.changeReason && (
                <p className="text-xs text-slate-500 italic mt-1">
                  Reason: {item.changeReason}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={() => navigate('/student/schedule')}
              className="text-xs font-bold px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs"
            >
              View Updated Schedule
            </button>
          </div>
        </div>
      ))}

      {/* TOP 4 KEY CARDS (Specified in Prompt section 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Current Class */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
              Current Class
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              LIVE NOW
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {currentClass.subjectName}
          </h3>
          <div className="space-y-1.5 mt-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentClass.startTime} - {currentClass.endTime}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-bold text-slate-800">Room {currentClass.roomName}</span>
              <span className="text-slate-400">({currentClass.building})</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-slate-500">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentClass.teacherName}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Next Class */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
              Next Class
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
              UPCOMING
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg leading-tight">
            {nextClass.subjectName}
          </h3>
          <div className="space-y-1.5 mt-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{nextClass.startTime} - {nextClass.endTime}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-bold text-slate-800">{nextClass.roomName}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-slate-500">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{nextClass.teacherName}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Attendance */}
        <div
          onClick={() => navigate('/student/attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
              Attendance
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              SAFE (&gt; 75%)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {overallAttendance}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Overall Average</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallAttendance}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
            <span>{totalAttended} of {totalClasses} classes attended</span>
            <span className="font-semibold text-blue-600 group-hover:underline">Details →</span>
          </div>
        </div>

        {/* CARD 4: Pending Assignments */}
        <div
          onClick={() => navigate('/student/assignments')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
              Pending Tasks
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              ACTION NEEDED
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">
              {pendingAssignments.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Assignments Due</span>
          </div>

          <div className="mt-3 p-2 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
            <span className="font-bold truncate">Linked List Impl.</span>
            <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
              Tomorrow
            </span>
          </div>
        </div>
      </div>

      {/* TODAY'S SCHEDULE TIMELINE & ANNOUNCEMENTS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule for Today */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Lecture Schedule</h2>
              <p className="text-xs text-slate-500">Division A • Computer Engineering</p>
            </div>
            <button
              onClick={() => navigate('/student/schedule')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Weekly Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {todayEntries.map((lecture, idx) => {
              const isLive = lecture.status === 'live';
              const isMoved = lecture.status === 'moved';
              return (
                <div
                  key={lecture.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isLive
                      ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                      : isMoved
                      ? 'bg-amber-50/40 border-amber-300'
                      : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 sm:w-16 shrink-0 text-left">
                      <span className="text-xs font-bold text-slate-900 block">
                        {lecture.startTime}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {lecture.endTime}
                      </span>
                    </div>

                    <div className="border-l-2 border-slate-200 pl-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {lecture.subjectName}
                        </span>
                        {isLive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            NOW
                          </span>
                        )}
                        {isMoved && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                            ROOM CHANGED
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{lecture.teacherName}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">
                          {isMoved ? (
                            <span>
                              <del className="text-red-500">{lecture.originalRoomName}</del> →{' '}
                              <strong className="text-emerald-700">{lecture.roomName}</strong>
                            </span>
                          ) : (
                            `Room ${lecture.roomName}`
                          )}
                        </span>
                        <span>•</span>
                        <span>{lecture.building}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:self-center">
                    <button
                      onClick={() => navigate(`/student/classrooms/${lecture.subjectId}`)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
                    >
                      Classroom →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Urgent Announcements & Notices */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Classroom Broadcasts</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Latest</span>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((anc) => (
                <div
                  key={anc.id}
                  onClick={() => navigate(`/student/classrooms/${anc.classroomId}`)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {anc.subjectName}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        anc.priority === 'urgent'
                          ? 'bg-red-100 text-red-700'
                          : anc.priority === 'important'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {anc.priority}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {anc.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{anc.authorName}</span>
                    <span>{anc.publishDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Study Materials Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Recent Materials</span>
              </h3>
              <button
                onClick={() => navigate('/student/materials')}
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {materials.slice(0, 3).map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => navigate('/student/materials')}
                  className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0">
                      {mat.materialType}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                        {mat.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {mat.subjectName} • {mat.unit}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{mat.fileSize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
