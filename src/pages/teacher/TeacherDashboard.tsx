import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Clock,
  MapPin,
  Users,
  FileText,
  BookOpen,
  Bell,
  CheckSquare,
  Plus,
  MessageSquare,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { EmergencyRoomChangeModal } from '../../components/common/EmergencyRoomChangeModal';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    timetable,
    assignments,
    submissions,
    discussions,
    materials,
    navigate
  } = useApp();

  const [relocateModalOpen, setRelocateModalOpen] = useState(false);

  // Teacher classes for Monday
  const teacherClasses = timetable.filter(
    (t) => t.dayOfWeek === 'Monday' && (t.teacherName.includes('Patil') || t.teacherId === currentUser.id)
  );

  const currentClass = teacherClasses.find((t) => t.status === 'live') || teacherClasses[0];
  const nextClass = teacherClasses[1] || teacherClasses[0];

  // Ungraded submissions count
  const pendingEvaluationCount = submissions.filter((s) => s.status === 'submitted').length;

  // Recent questions from students
  const recentQuestions = discussions.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      <EmergencyRoomChangeModal
        isOpen={relocateModalOpen}
        onClose={() => setRelocateModalOpen(false)}
      />

      {/* TEACHER HERO HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Faculty Academic Control Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {currentUser.name} 🎓
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {currentUser.title || 'Course Lead'} • {currentUser.department}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRelocateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Relocate Lecture Room</span>
          </button>
          <button
            onClick={() => navigate('/teacher/assignments')}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Evaluate Tasks ({pendingEvaluationCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS BAR (Section 22 specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/teacher/assignments')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-xs text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black mb-2 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 block">Create Assignment</span>
          <span className="text-[10px] text-slate-400">Post new coursework</span>
        </button>

        <button
          onClick={() => navigate('/teacher/materials')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 block">Upload Material</span>
          <span className="text-[10px] text-slate-400">Share slides &amp; notes</span>
        </button>

        <button
          onClick={() => navigate('/teacher/announcements')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-xs text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black mb-2 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 block">Announcement</span>
          <span className="text-[10px] text-slate-400">Broadcast to class</span>
        </button>

        <button
          onClick={() => navigate('/teacher/attendance')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-xs text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <CheckSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 block">Mark Attendance</span>
          <span className="text-[10px] text-slate-400">Log lecture presence</span>
        </button>
      </div>

      {/* TODAY'S CLASSES & ACTIVE SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule for Teacher */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Assigned Lectures</h2>
              <p className="text-xs text-slate-500">Division A &amp; Practical Labs</p>
            </div>
            <button
              onClick={() => navigate('/teacher/schedule')}
              className="text-xs font-bold text-teal-600 hover:underline"
            >
              Full Schedule →
            </button>
          </div>

          <div className="space-y-3">
            {teacherClasses.map((item) => {
              const isLive = item.status === 'live';
              const isMoved = item.status === 'moved';
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isLive
                      ? 'bg-teal-50/50 border-teal-300'
                      : isMoved
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-slate-50/60 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 shrink-0">
                      <span className="text-xs font-bold text-slate-900 block">{item.startTime}</span>
                      <span className="text-[10px] text-slate-400">{item.endTime}</span>
                    </div>

                    <div className="border-l-2 border-slate-200 pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{item.subjectName}</span>
                        {isLive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            LIVE
                          </span>
                        )}
                        {isMoved && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                            RELOCATED
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.division} • Room {item.roomName} ({item.building})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => navigate('/teacher/attendance')}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-xs font-semibold"
                    >
                      Attendance
                    </button>
                    <button
                      onClick={() => navigate(`/teacher/classrooms/${item.subjectId}`)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                    >
                      Classroom
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Recent Student Questions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Student Inquiries</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Needs Response</span>
            </div>

            <div className="space-y-3">
              {recentQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => navigate(`/teacher/classrooms/${q.classroomId}`)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-teal-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500">{q.authorName}</span>
                    <span className="text-[9px] text-slate-400">{q.createdAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{q.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{q.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
