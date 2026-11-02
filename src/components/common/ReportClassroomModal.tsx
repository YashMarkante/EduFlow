import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, X, CheckCircle, ShieldAlert } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  defaultRoom?: string;
}

export const ReportClassroomModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Data Structures & Algorithms',
  defaultRoom = 'C-204'
}) => {
  const { submitClassroomReport, subjects } = useApp();

  const [subjectName, setSubjectName] = useState(defaultSubject);
  const [reportedRoom, setReportedRoom] = useState(defaultRoom);
  const [reportType, setReportType] = useState<'teacher_not_arrived' | 'room_occupied' | 'lecture_moved' | 'equipment_issue' | 'maintenance_needed'>('room_occupied');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitClassroomReport({
      subjectName,
      reportedRoom,
      currentScheduledRoom: reportedRoom,
      reportType,
      notes: notes || 'Student reported room unavailability/issue via EduFlow app.'
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Report Classroom Issue</h3>
              <p className="text-xs text-slate-500">Official verification workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Management Verification Protected:</strong> To prevent false alarms, your report is verified by the academic operations desk before an official broadcast is made to the batch.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subject / Course
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Current Scheduled Room
              </label>
              <input
                type="text"
                value={reportedRoom}
                onChange={(e) => setReportedRoom(e.target.value)}
                placeholder="e.g. C-204"
                required
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Observed Issue
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="room_occupied">Room is Occupied</option>
                <option value="teacher_not_arrived">Teacher Not Arrived</option>
                <option value="lecture_moved">Lecture Moved Elsewhere</option>
                <option value="equipment_issue">AV / Projector Broken</option>
                <option value="maintenance_needed">Maintenance in Progress</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Specific Details / What is happening?
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Another batch is taking an exam in C-204. Our class of 60 students is standing outside."
              required
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              Submit Incident Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
