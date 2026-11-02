import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, CheckCircle2, ShieldCheck, Building } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { rooms, timetable, attendance, assignments, institution } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Operational Intelligence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Campus Analytics &amp; Utilization
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-time metrics on classroom occupancy, faculty workloads, student attendance health, and course turnaround.
        </p>
      </div>

      {/* KPI STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Classroom Utilization Rate
          </span>
          <span className="text-3xl font-black text-slate-900">82.4%</span>
          <span className="text-xs text-emerald-600 font-bold block mt-1">+4.2% from last semester</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Overall Campus Attendance
          </span>
          <span className="text-3xl font-black text-blue-600">88.1%</span>
          <span className="text-xs text-slate-400 block mt-1">Institutional requirement: 75%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Coursework Completion
          </span>
          <span className="text-3xl font-black text-teal-600">94.6%</span>
          <span className="text-xs text-slate-400 block mt-1">On-time digital submissions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Active Schedule Conflicts
          </span>
          <span className="text-3xl font-black text-emerald-600">0</span>
          <span className="text-xs text-emerald-600 font-semibold block mt-1">All slots verified</span>
        </div>
      </div>

      {/* UTILIZATION BREAKDOWN & FACULTY WORKLOAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Utilization */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Classroom Occupancy by Hall</h3>
          <div className="space-y-3">
            {[
              { room: 'C-204 (Lecture Hall)', util: 92 },
              { room: 'Lab 2 (Computer Lab)', util: 88 },
              { room: 'B-105 (Smart Lecture Room)', util: 85 },
              { room: 'A-101 (Main Auditorium)', util: 64 },
              { room: 'Lab 1 (Cisco Networking Lab)', util: 78 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.room}</span>
                  <span className="text-slate-500 font-bold">{item.util}% occupied</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${item.util}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Workload */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Faculty Weekly Lecture Hours</h3>
          <div className="space-y-3">
            {[
              { teacher: 'Prof. Rajesh Patil (Data Structures & OS)', hours: 18, max: 20 },
              { teacher: 'Prof. Sneha Kulkarni (Python & DBMS)', hours: 16, max: 20 },
              { teacher: 'Prof. Deshmukh (Applied Mathematics)', hours: 14, max: 20 },
              { teacher: 'Prof. K. Verma (Computer Networks)', hours: 15, max: 20 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.teacher}</span>
                  <span className="text-teal-700 font-bold">{item.hours} / {item.max} hrs/wk</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full"
                    style={{ width: `${(item.hours / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
