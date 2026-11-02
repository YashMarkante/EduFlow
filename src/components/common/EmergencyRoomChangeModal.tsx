import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, X, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEntryId?: string;
}

export const EmergencyRoomChangeModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  defaultEntryId
}) => {
  const { timetable, rooms, updateClassroomSchedule } = useApp();

  const [selectedEntryId, setSelectedEntryId] = useState(defaultEntryId || timetable[0]?.id || '');
  const [selectedRoomId, setSelectedRoomId] = useState(rooms.find((r) => r.status === 'available')?.id || rooms[0]?.id || '');
  const [reason, setReason] = useState('Air conditioning maintenance and electrical repairs');

  if (!isOpen) return null;

  const currentEntry = timetable.find((t) => t.id === selectedEntryId) || timetable[0];
  const targetRoom = rooms.find((r) => r.id === selectedRoomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEntryId && selectedRoomId) {
      updateClassroomSchedule(selectedEntryId, selectedRoomId, reason);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-red-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Real-Time Classroom Relocation</h3>
              <p className="text-xs text-slate-500">Instant broadcast to faculty and all enrolled students</p>
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select Active / Upcoming Session
            </label>
            <select
              value={selectedEntryId}
              onChange={(e) => setSelectedEntryId(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {timetable.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.subjectName} ({t.dayOfWeek} {t.startTime} - {t.endTime}) • Current: Room {t.roomName}
                </option>
              ))}
            </select>
          </div>

          {currentEntry && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Current Room:</span>
                <span className="font-bold text-slate-900 text-sm">{currentEntry.roomName}</span>
                <span className="text-slate-400 block">{currentEntry.building}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 animate-pulse" />
              <div>
                <span className="text-slate-500 block">Destination Room:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  {targetRoom ? targetRoom.roomNumber : 'Select Below'}
                </span>
                <span className="text-slate-400 block">{targetRoom?.building}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select New Classroom
            </label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.roomNumber} ({r.roomType}, Cap: {r.capacity}) — {r.building} [{r.status.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Reason for Classroom Change
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. AC maintenance, lab software update, room collision"
              required
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Immediate Action:</strong> Submitting will update the institutional timetable, send immediate in-app push alerts to all enrolled students and faculty, and update all dashboard schedules.
            </span>
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
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Broadcast Relocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
