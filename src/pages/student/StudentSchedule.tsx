import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Download,
  AlertTriangle,
  ChevronRight,
  Filter,
  CheckCircle2,
  Calendar as CalendarIcon,
  RefreshCw,
  FileText,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { ReportClassroomModal } from '../../components/common/ReportClassroomModal';
import { OfficialTimetableDocModal } from '../../components/common/OfficialTimetableDocModal';

export const StudentSchedule: React.FC = () => {
  const { timetable, currentUser, resetToOfficialTimetable, navigate, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'Today' | 'Tomorrow' | 'Week'>('Today');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [batchFilter, setBatchFilter] = useState<'ALL' | 'S2'>('S2');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ subject: string; room: string } | null>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Current day mapping
  const currentDayName = 'Monday'; // For consistent demo schedule
  const tomorrowDayName = 'Tuesday';

  const displayedDay =
    activeTab === 'Today'
      ? currentDayName
      : activeTab === 'Tomorrow'
      ? tomorrowDayName
      : selectedDay;

  const currentDayEntries = timetable
    .filter((t) => {
      const matchDay = activeTab === 'Week' ? t.dayOfWeek === selectedDay : t.dayOfWeek === displayedDay;
      if (!matchDay) return false;
      if (batchFilter === 'S2') {
        // If it's a batch-specific practical, show only if it includes Batch S2 or is general lecture
        if (t.batch && t.batch !== 'Batch S2') return false;
      }
      return true;
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleExportCalendar = () => {
    const calendarData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ICEM Pune//EduFlow S.Y. Timetable V5//EN',
      ...timetable.map((t, idx) => [
        'BEGIN:VEVENT',
        `UID:icem-sy-${idx}-${Date.now()}@eduflow.app`,
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
    link.setAttribute('download', 'ICEM_SY_Computer_Timetable_Version_5.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Calendar File Downloaded (.ics)',
      message: 'EduFlow schedule (.ics) prepared for Google Calendar, Apple Calendar, and Outlook.'
    });
  };

  const handleReportIssue = (subject: string, room: string) => {
    setReportTarget({ subject, room });
    setReportModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {reportModalOpen && (
        <ReportClassroomModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          defaultSubject={reportTarget?.subject}
          defaultRoom={reportTarget?.room}
        />
      )}

      {docModalOpen && (
        <OfficialTimetableDocModal
          isOpen={docModalOpen}
          onClose={() => setDocModalOpen(false)}
        />
      )}

      {/* OFFICIAL TIMETABLE VERSION 5 BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Official PDF Timetable Active
              </span>
              <span className="text-[11px] text-blue-200">Version 5.0 (2026-2027)</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              Indira College of Engineering &amp; Management (ICEM), Pune
            </h2>
            <p className="text-xs text-slate-300">
              Department of Computer Engineering • S.Y. Div A (Room 204) • Batches S1, S2, S3, S4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setDocModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-blue-700" />
            <span>View Official Document</span>
          </button>
          <button
            onClick={resetToOfficialTimetable}
            className="px-3 py-2 rounded-xl bg-blue-800/80 hover:bg-blue-700 text-white border border-blue-600/60 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset to official Version 5 Timetable"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-300" />
            <span>Reset V5</span>
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Interactive Academic Schedule</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            My Timetable &amp; Lecture Halls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            S.Y. Computer Engineering (A.Y. 2026-27 Version 5) • Semester III • Roll: {currentUser.rollNumber}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* BATCH SELECTOR */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200">
            <button
              onClick={() => setBatchFilter('S2')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                batchFilter === 'S2'
                  ? 'bg-white text-blue-700 shadow-2xs font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              My Batch (S2)
            </button>
            <button
              onClick={() => setBatchFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                batchFilter === 'ALL'
                  ? 'bg-white text-blue-700 shadow-2xs font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              All Batches
            </button>
          </div>

          <button
            onClick={handleExportCalendar}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>

      {/* TAB SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center bg-slate-200/70 p-1 rounded-xl w-fit">
          {(['Today', 'Tomorrow', 'Week'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'Today' ? 'Today (Mon)' : tab === 'Tomorrow' ? 'Tomorrow (Tue)' : 'Full Week Grid'}
            </button>
          ))}
        </div>

        {activeTab === 'Week' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SCHEDULE CARD LIST */}
      <div className="space-y-4">
        {currentDayEntries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No lectures scheduled</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are no classes scheduled for {displayedDay}. Enjoy your academic study block!
            </p>
          </div>
        ) : (
          currentDayEntries.map((entry) => {
            const isLive = entry.status === 'live';
            const isMoved = entry.status === 'moved';

            return (
              <div
                key={entry.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isMoved
                    ? 'bg-gradient-to-r from-amber-50/70 via-white to-orange-50/30 border-amber-300 shadow-sm'
                    : isLive
                    ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Time and Subject */}
                  <div className="flex items-start gap-4">
                    <div className="w-24 shrink-0">
                      <span className="text-sm font-black text-slate-900 block tracking-tight">
                        {entry.startTime}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        until {entry.endTime}
                      </span>
                      {isLive && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                      {entry.type && (
                        <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 block w-fit">
                          {entry.type}
                        </span>
                      )}
                    </div>

                    <div className="border-l-2 border-slate-200 pl-4 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {entry.subjectCode}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          {entry.subjectName}
                        </h3>
                        {entry.batch && (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                            {entry.batch}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{entry.teacherName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          {isMoved ? (
                            <span className="flex items-center gap-1.5">
                              <del className="text-red-500 font-semibold">{entry.originalRoomName}</del>
                              <span>➔</span>
                              <strong className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black">
                                NEW: Room {entry.roomName}
                              </strong>
                            </span>
                          ) : (
                            <span className="font-bold text-slate-900">Room {entry.roomName}</span>
                          )}
                          <span className="text-slate-400">({entry.building})</span>
                        </div>
                      </div>

                      {/* Changed Notice info */}
                      {isMoved && (
                        <div className="mt-2 p-2.5 bg-amber-100/70 border border-amber-300/80 rounded-xl text-xs text-amber-900">
                          <div className="font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span>Relocation Notice: {entry.changeReason}</span>
                          </div>
                          <span className="text-[10px] text-amber-800">
                            Updated {entry.changedAt} by {entry.changedBy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    <button
                      onClick={() => handleReportIssue(entry.subjectName, entry.roomName)}
                      className="px-3 py-1.5 rounded-xl border border-amber-200 text-amber-800 hover:bg-amber-50 text-xs font-semibold transition-colors"
                      title="Report if room is locked or lecture cannot take place"
                    >
                      Report Issue
                    </button>
                    <button
                      onClick={() => navigate(`/student/classrooms/${entry.subjectId}`)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                    >
                      <span>Classroom</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
