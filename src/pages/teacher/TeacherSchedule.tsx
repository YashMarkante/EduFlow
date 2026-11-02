import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Clock,
  MapPin,
  Download,
  RefreshCw,
  AlertTriangle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { EmergencyRoomChangeModal } from '../../components/common/EmergencyRoomChangeModal';
import { OfficialTimetableDocModal } from '../../components/common/OfficialTimetableDocModal';

export const TeacherSchedule: React.FC = () => {
  const { timetable, currentUser, resetToOfficialTimetable, addToast } = useApp();
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [relocateModalOpen, setRelocateModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [activeEntryId, setActiveEntryId] = useState<string | undefined>(undefined);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

  // Filter entries for current teacher, or show all for Class Teacher Prof. Rajesh Patil
  const teacherEntries = timetable.filter(
    (t) =>
      t.dayOfWeek === selectedDay &&
      (t.teacherName.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[1] || 'patil') ||
        t.teacherId === currentUser.id ||
        currentUser.name.includes('Patil'))
  );

  return (
    <div className="space-y-6 pb-12">
      <EmergencyRoomChangeModal
        isOpen={relocateModalOpen}
        onClose={() => setRelocateModalOpen(false)}
        defaultEntryId={activeEntryId}
      />

      <OfficialTimetableDocModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />

      {/* OFFICIAL TIMETABLE BANNER */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-teal-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Official PDF Document (Version 5.0)
              </span>
              <span className="text-[11px] text-teal-200">Indira College of Engineering &amp; Management (ICEM)</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              Faculty Teaching Roster • S.Y. Computer Engineering
            </h2>
            <p className="text-xs text-slate-300">
              Assigned venue: Room 204 (Lecture Hall) &amp; Computer Lab Wing (CS Labs 1, 2, 3)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setDocModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-teal-950 hover:bg-teal-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-teal-700" />
            <span>View Official Document</span>
          </button>
          <button
            onClick={resetToOfficialTimetable}
            className="px-3 py-2 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-white border border-teal-600/60 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset to official Version 5 Timetable"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-300" />
            <span>Reset V5</span>
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Faculty Teaching Planner</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Assigned Lectures &amp; Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {currentUser.name} • {currentUser.title || 'Faculty Lead'} • S.Y. Computer Engineering (A.Y. 2026-27 Version 5)
          </p>
        </div>

        <button
          onClick={() => {
            const calendarData = [
              'BEGIN:VCALENDAR',
              'VERSION:2.0',
              'PRODID:-//ICEM Pune//EduFlow S.Y. Faculty Timetable V5//EN',
              ...teacherEntries.map((t, idx) => [
                'BEGIN:VEVENT',
                `UID:icem-faculty-${idx}-${Date.now()}@eduflow.app`,
                `SUMMARY:${t.subjectName} (${t.subjectCode})`,
                `LOCATION:${t.roomName} (${t.building})`,
                `DESCRIPTION:Faculty: ${t.teacherName}. Division: ${t.division}. S.Y. Version 5 Timetable.`,
                'END:VEVENT'
              ].join('\r\n')),
              'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ICEM_Faculty_Teaching_Schedule.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            addToast({
              type: 'success',
              title: 'Faculty Schedule Exported (.ics)',
              message: 'Saved teaching schedule calendar feed.'
            });
          }}
          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Add to Calendar</span>
        </button>
      </div>

      {/* DAY SELECTOR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDay === day
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ENTRIES LIST */}
      <div className="space-y-4">
        {teacherEntries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No lectures scheduled for {selectedDay}. Free office hours and research block.
          </div>
        ) : (
          teacherEntries.map((item) => {
            const isMoved = item.status === 'moved';
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isMoved
                    ? 'bg-amber-50/50 border-amber-300'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 shrink-0">
                    <span className="text-xs font-black text-slate-900 block">{item.startTime}</span>
                    <span className="text-[10px] text-slate-400 block">{item.endTime}</span>
                    {item.type && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 mt-1 inline-block">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <div className="border-l-2 border-slate-200 pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {item.subjectCode}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{item.subjectName}</h3>
                      {item.batch && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          {item.batch}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">{item.division}</span>
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Room {item.roomName}</span>
                        <span className="text-slate-400">({item.building})</span>
                      </div>
                    </div>

                    {isMoved && (
                      <div className="mt-2 text-xs text-amber-900 bg-amber-100/70 p-2 rounded-lg flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Moved: {item.changeReason}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveEntryId(item.id);
                      setRelocateModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all"
                  >
                    Shift Room
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
