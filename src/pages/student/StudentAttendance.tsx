import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { attendance, currentUser } = useApp();

  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attended, 0);
  const totalMissed = attendance.reduce((acc, curr) => acc + curr.missed, 0);
  const totalClasses = attendance.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = Math.round((totalAttended / totalClasses) * 100);

  const hasWarning = attendance.some((a) => a.percentage < 75);

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
          <CheckSquare className="w-4 h-4" />
          <span>Biometric &amp; Lecture Presence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Attendance Analytics &amp; Compliance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Student: {currentUser.name} ({currentUser.rollNumber}) • Institutional Policy: Minimum 75% Mandatory
        </p>
      </div>

      {/* OVERALL METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Overall Attendance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{overallPercentage}%</span>
            <span className="text-xs font-bold text-emerald-600">Eligible</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Attended Lectures
          </span>
          <span className="text-3xl font-black text-emerald-600">{totalAttended}</span>
          <span className="text-xs text-slate-400 block mt-1">Total periods present</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Missed Lectures
          </span>
          <span className="text-3xl font-black text-red-600">{totalMissed}</span>
          <span className="text-xs text-slate-400 block mt-1">Leaves &amp; absences</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Total Conducted
          </span>
          <span className="text-3xl font-black text-blue-600">{totalClasses}</span>
          <span className="text-xs text-slate-400 block mt-1">Academic sessions</span>
        </div>
      </div>

      {/* WARNING BANNER IF BELOW THRESHOLD */}
      {hasWarning && (
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <h4 className="font-bold text-sm">Attendance Warning Threshold Alert</h4>
            <p>
              One or more subjects are nearing or below the institutional 75% attendance threshold. Please contact your course faculty or attend upcoming recovery practicals.
            </p>
          </div>
        </div>
      )}

      {/* SUBJECT-WISE ATTENDANCE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          Subject-wise Attendance Breakdown
        </h3>

        <div className="space-y-4">
          {attendance.map((sub) => {
            const isCritical = sub.percentage < 75;
            return (
              <div
                key={sub.subjectId}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {sub.subjectCode}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{sub.subjectName}</h4>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {sub.attended} attended / {sub.total} conducted • ({sub.missed} absences)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-black px-2.5 py-1 rounded-lg ${
                        isCritical
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {sub.percentage}%
                    </span>
                    {isCritical ? (
                      <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Warning</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Good Standing</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
