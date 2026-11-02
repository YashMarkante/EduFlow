import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Clock,
  MapPin,
  User,
  ShieldAlert
} from 'lucide-react';
import { EmergencyRoomChangeModal } from '../../components/common/EmergencyRoomChangeModal';
import { OfficialTimetableDocModal } from '../../components/common/OfficialTimetableDocModal';
import { FileText, RotateCcw } from 'lucide-react';

export const AdminTimetable: React.FC = () => {
  const {
    timetable,
    rooms,
    subjects,
    users,
    addTimetableEntry,
    deleteTimetableEntry,
    resetToOfficialTimetable,
    updateClassroomSchedule,
    addToast
  } = useApp();

  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [selectedDivision, setSelectedDivision] = useState('S.Y. Div A');
  const [relocateModalOpen, setRelocateModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [activeRelocateEntry, setActiveRelocateEntry] = useState<string | undefined>(undefined);

  // Modal for new slot
  const [newSlotModalOpen, setNewSlotModalOpen] = useState(false);
  const [slotSubjectId, setSlotSubjectId] = useState(subjects[0]?.id || '');
  const [slotRoomId, setSlotRoomId] = useState(rooms[0]?.id || '');
  const [slotTeacherId, setSlotTeacherId] = useState(users.find((u) => u.role === 'TEACHER')?.id || '');
  const [slotDay, setSlotDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [slotStart, setSlotStart] = useState('08:45');
  const [slotEnd, setSlotEnd] = useState('09:45');
  const [conflictError, setConflictError] = useState<string | null>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

  const entriesForSelectedDay = timetable
    .filter((t) => t.dayOfWeek === selectedDay && t.division === selectedDivision)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleOpenRelocate = (entryId: string) => {
    setActiveRelocateEntry(entryId);
    setRelocateModalOpen(true);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const targetSub = subjects.find((s) => s.id === slotSubjectId) || subjects[0];
    const targetRoom = rooms.find((r) => r.id === slotRoomId) || rooms[0];
    const targetTeacher = users.find((u) => u.id === slotTeacherId) || users[1];

    const result = addTimetableEntry({
      division: selectedDivision,
      subjectId: targetSub.id,
      subjectName: targetSub.name,
      subjectCode: targetSub.code,
      teacherId: targetTeacher.id,
      teacherName: targetTeacher.name,
      roomId: targetRoom.id,
      roomName: targetRoom.roomNumber,
      building: targetRoom.building,
      dayOfWeek: slotDay,
      startTime: slotStart,
      endTime: slotEnd,
      status: 'scheduled'
    });

    if (!result.success && result.conflict) {
      setConflictError(result.conflict);
    } else {
      setNewSlotModalOpen(false);
      setConflictError(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <EmergencyRoomChangeModal
        isOpen={relocateModalOpen}
        onClose={() => setRelocateModalOpen(false)}
        defaultEntryId={activeRelocateEntry}
      />

      <OfficialTimetableDocModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />

      {/* OFFICIAL TIMETABLE VERSION 5 BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-indigo-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Official PDF Document (Version 5.0)
              </span>
              <span className="text-[11px] text-indigo-200">Indira College of Engineering &amp; Management (ICEM)</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              S.Y. Computer Engineering • Academic Year 2026-2027
            </h2>
            <p className="text-xs text-slate-300">
              Department of Computer Engineering • Room 204 (Lecture Hall) • CS Labs 1, 2, 3 &amp; Hardware Lab
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setDocModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-indigo-700" />
            <span>View Official Document</span>
          </button>
          <button
            onClick={resetToOfficialTimetable}
            className="px-3 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-white border border-indigo-600/60 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset master timetable to official Version 5 document"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-300" />
            <span>Reset to V5</span>
          </button>
        </div>
      </div>

      {/* NEW SLOT CREATION MODAL WITH CONFLICT DETECTOR */}
      {newSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Schedule New Class Session</h3>
                <p className="text-xs text-slate-500">Automated multi-conflict checking</p>
              </div>
              <button
                onClick={() => {
                  setNewSlotModalOpen(false);
                  setConflictError(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSlot} className="p-6 space-y-4">
              {conflictError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-300 rounded-xl text-xs text-red-900 flex items-start gap-2.5 animate-in shake">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">TIMETABLE CONFLICT DETECTED:</strong>
                    <span>{conflictError}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Course / Subject
                </label>
                <select
                  value={slotSubjectId}
                  onChange={(e) => setSlotSubjectId(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Room / Lab
                  </label>
                  <select
                    value={slotRoomId}
                    onChange={(e) => setSlotRoomId(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.roomNumber} ({r.roomType})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Faculty Assigned
                  </label>
                  <select
                    value={slotTeacherId}
                    onChange={(e) => setSlotTeacherId(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white"
                  >
                    {users
                      .filter((u) => u.role === 'TEACHER')
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Day
                  </label>
                  <select
                    value={slotDay}
                    onChange={(e) => setSlotDay(e.target.value as any)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={slotStart}
                    onChange={(e) => setSlotStart(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={slotEnd}
                    onChange={(e) => setSlotEnd(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewSlotModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow"
                >
                  Verify &amp; Add Lecture Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Master Institutional Scheduling</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Timetable Management &amp; Room Allocations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Detect room, faculty, and division conflicts automatically. Reallocate lecture halls with 1 click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNewSlotModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Schedule Lecture Slot</span>
          </button>
        </div>
      </div>

      {/* DAY & DIVISION SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Day Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Division Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Division:</span>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="text-xs font-bold rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800"
          >
            <option value="S.Y. Div A">S.Y. Div A (ICEM Comp Engg - V5)</option>
            <option value="S.Y. Div B">S.Y. Div B (AI &amp; Data Science)</option>
            <option value="Division A">Division A (General)</option>
          </select>
        </div>
      </div>

      {/* SCHEDULE SLOTS LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Timeslot &amp; Subject</span>
          <span>Room Allocation &amp; Actions</span>
        </div>

        <div className="space-y-3">
          {entriesForSelectedDay.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No sessions scheduled for {selectedDay} in {selectedDivision}. Click "+ Schedule Lecture Slot" above.
            </div>
          ) : (
            entriesForSelectedDay.map((entry) => {
              const isMoved = entry.status === 'moved';
              const isLive = entry.status === 'live';
              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isMoved
                      ? 'bg-amber-50/50 border-amber-300'
                      : isLive
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 shrink-0">
                      <span className="text-xs font-black text-slate-900 block">{entry.startTime}</span>
                      <span className="text-[10px] text-slate-400 block">{entry.endTime}</span>
                      {isLive && (
                        <span className="inline-block text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 mt-1">
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="border-l-2 border-slate-200 pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                          {entry.subjectCode}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{entry.subjectName}</h4>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{entry.teacherName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right mr-2">
                      {isMoved ? (
                        <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Room {entry.roomName} (Moved from {entry.originalRoomName})
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-800">
                          Room {entry.roomName} ({entry.building})
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOpenRelocate(entry.id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center gap-1"
                      title="Relocate this room immediately"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Relocate</span>
                    </button>

                    <button
                      onClick={() => deleteTimetableEntry(entry.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete slot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
