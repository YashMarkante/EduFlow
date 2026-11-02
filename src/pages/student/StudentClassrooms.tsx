import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Clock,
  MapPin,
  User,
  FileText,
  BookOpen,
  Bell,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const StudentClassrooms: React.FC = () => {
  const { subjects, assignments, materials, announcements, navigate } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Enrolled Academic Units</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            My Digital Classrooms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Access course syllabi, assignments, lecture slides, live announcements, and class discussions.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span>Enrolled in {subjects.length} Courses</span>
        </div>
      </div>

      {/* CLASSROOM CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub) => {
          // Compute pending assignments for this subject
          const pendingCount = assignments.filter(
            (a) => (a.classroomId === sub.id || a.subjectName === sub.name) && a.status === 'due_soon'
          ).length;

          // Compute materials count
          const materialsCount = materials.filter(
            (m) => m.classroomId === sub.id || m.subjectName === sub.name
          ).length;

          // Compute announcements count
          const ancCount = announcements.filter(
            (a) => a.classroomId === sub.id || a.subjectName === sub.name
          ).length;

          return (
            <div
              key={sub.id}
              onClick={() => navigate(`/student/classrooms/${sub.id}`)}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div
                className="h-2.5 w-full"
                style={{ backgroundColor: sub.color }}
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {sub.code}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {sub.name}
                  </h3>

                  <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sub.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold text-slate-800">Room {sub.roomNumber}</span>
                      <span className="text-slate-400">({sub.building})</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{sub.nextLectureTime}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics / Status Indicators */}
                <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="block font-black text-amber-600 text-sm">{pendingCount}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Pending Tasks</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="block font-black text-teal-600 text-sm">{materialsCount}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Materials</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="block font-black text-blue-600 text-sm">{ancCount}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Updates</span>
                  </div>
                </div>
              </div>

              {/* Bottom Enter Card */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:bg-blue-50/50 transition-colors">
                <span>Enter Digital Classroom</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
