import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building,
  User,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { reports, rooms, verifyClassroomReport, dismissClassroomReport } = useApp();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [targetRoomId, setTargetRoomId] = useState(rooms.find((r) => r.status === 'available')?.id || rooms[0]?.id || '');
  const [verifyNotes, setVerifyNotes] = useState('Relocated to available lecture hall after facility inspection.');

  const handleVerify = (repId: string) => {
    verifyClassroomReport(repId, targetRoomId, verifyNotes);
    setSelectedReportId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Incident Triaging &amp; Verification Desk</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Student Classroom Issue Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Verify student reports regarding locked rooms, missing faculty, or overlapping batches before broadcasting official changes.
        </p>
      </div>

      {/* REPORTS LIST */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No active reports pending</h3>
            <p className="text-xs text-slate-500 mt-1">All classroom incident queues are cleared.</p>
          </div>
        ) : (
          reports.map((rep) => {
            const isPending = rep.status === 'pending';
            const isVerified = rep.status === 'verified';
            return (
              <div
                key={rep.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isPending
                    ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                    : isVerified
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isPending
                            ? 'bg-amber-200 text-amber-900'
                            : isVerified
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {rep.status}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {rep.reportType.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Reported {rep.reportedAt}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {rep.subjectName} (Current Scheduled: Room {rep.reportedRoom})
                    </h3>
                  </div>

                  <div className="text-xs text-slate-500 sm:text-right">
                    <span>Reported by: <strong className="text-slate-800">{rep.studentName}</strong> ({rep.studentRoll})</span>
                    <span className="block text-[11px] text-slate-400">{rep.division}</span>
                  </div>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed mb-4">
                  <strong>Student Observation:</strong> "{rep.notes}"
                </div>

                {isVerified && rep.resolvedRoom && (
                  <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-900 mb-3">
                    <strong>Official Management Resolution:</strong> Verified and relocated to Room {rep.resolvedRoom}. Reason: {rep.resolvedNote}
                  </div>
                )}

                {/* VERIFICATION ACTION CONTROLS */}
                {isPending && (
                  <div className="pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <label className="text-xs font-bold text-slate-700 shrink-0">Relocate to:</label>
                      <select
                        value={targetRoomId}
                        onChange={(e) => setTargetRoomId(e.target.value)}
                        className="text-xs font-semibold rounded-xl border border-slate-300 px-3 py-1.5 bg-white text-slate-800"
                      >
                        {rooms.map((r) => (
                          <option key={r.id} value={r.id}>
                            Room {r.roomNumber} ({r.roomType}) - [{r.status}]
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => dismissClassroomReport(rep.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-semibold"
                      >
                        Dismiss False Alarm
                      </button>
                      <button
                        onClick={() => handleVerify(rep.id)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify &amp; Broadcast Relocation</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
