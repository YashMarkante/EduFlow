import React, { useState } from 'react';
import {
  CalendarDays,
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  X,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  FileText,
  Building,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface OfficialTimetableDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialTimetableDocModal: React.FC<OfficialTimetableDocModalProps> = ({
  isOpen,
  onClose
}) => {
  const { timetable, resetToOfficialTimetable, addToast } = useApp();
  const [selectedBatch, setSelectedBatch] = useState<'ALL' | 'S1' | 'S2' | 'S3' | 'S4'>('S2');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportICS = () => {
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
      title: 'Timetable Exported (.ics)',
      message: 'ICEM S.Y. Timetable V5 downloaded. Open to import directly into Google, Apple, or Outlook Calendar.'
    });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

  const timeSlots = [
    { label: '08:45 - 09:45', type: 'lecture' },
    { label: '09:45 - 10:45', type: 'lecture' },
    { label: '10:45 - 11:00', type: 'recess', title: 'Morning Short Recess (15 mins)' },
    { label: '11:00 - 12:00', type: 'lecture' },
    { label: '12:00 - 01:00', type: 'lecture' },
    { label: '01:00 - 01:45', type: 'lunch', title: 'Lunch Break (45 mins)' },
    { label: '01:45 - 03:45', type: 'practical', title: 'Practical / Lab Sessions (2 Hours)' },
    { label: '03:45 - 04:45', type: 'mentoring', title: 'Mentoring / Tutorial / Seminar' }
  ];

  // Subject table metadata from SPPU syllabus & ICEM timetable
  const subjectGuide = [
    { code: '210241', short: 'DM', name: 'Discrete Mathematics', faculty: 'Prof. Deshmukh', credits: 4, room: 'Room 204' },
    { code: '210242', short: 'DSA', name: 'Data Structures & Algorithms', faculty: 'Prof. Rajesh Patil', credits: 4, room: 'Room 204' },
    { code: '210243', short: 'OOP', name: 'Object Oriented Programming', faculty: 'Prof. Sneha Kulkarni', credits: 3, room: 'Room 204' },
    { code: '210244', short: 'CG', name: 'Computer Graphics', faculty: 'Prof. Pooja More', credits: 3, room: 'Room 204' },
    { code: '210245', short: 'DELD', name: 'Digital Electronics & Logic Design', faculty: 'Prof. Nilesh Shinde', credits: 3, room: 'Room 204 / 205' },
    { code: '210246', short: 'DSL', name: 'Data Structures Laboratory (Pr)', faculty: 'Prof. Rajesh Patil', credits: 2, room: 'CS Lab 2' },
    { code: '210247', short: 'OOPL/CGL', name: 'OOP & Computer Graphics Lab (Pr)', faculty: 'Prof. Sneha Kulkarni / Prof. Pooja More', credits: 2, room: 'CS Lab 1 / Lab 3' },
    { code: '210248', short: 'DELDL', name: 'Digital Electronics Lab (Pr)', faculty: 'Prof. Nilesh Shinde', credits: 1, room: 'Hardware Lab' },
    { code: '210249', short: 'BCS/PBL', name: 'Business Communication & PBL', faculty: 'Prof. Pooja More / Class Faculty', credits: 1, room: 'Language Lab / Seminar Hall' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* TOP TOOLBAR */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-sm">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Official Timetable Document
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  Version 5.0 (Active)
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Indira College of Engineering & Management (ICEM), Pune
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Batch Filter */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs font-bold text-slate-600">
              <span className="px-2 text-[11px] text-slate-400">Batch:</span>
              {(['ALL', 'S1', 'S2', 'S3', 'S4'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBatch(b)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedBatch === b
                      ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {b === 'S2' ? 'S2 (Yash)' : b}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportICS}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Add to Google / Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export .ICS</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Print Timetable Document"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>

            <button
              onClick={resetToOfficialTimetable}
              className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Reset any temporary changes back to original Version 5 document"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>Reset to V5</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DOCUMENT VIEW CONTAINER */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-100/60 print:p-0 print:bg-white">
          {/* OFFICIAL INSTITUTIONAL LETTERHEAD FORMAT */}
          <div className="bg-white rounded-xl border border-slate-300 p-6 sm:p-8 shadow-xs space-y-6 print:border-none print:shadow-none">
            {/* LETTERHEAD */}
            <div className="border-b-2 border-slate-800 pb-5 text-center relative">
              <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">
                Indira Group of Institutes (IGI), Pune
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Indira College of Engineering and Management (ICEM)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Approved by AICTE New Delhi | Recognized by DTE Govt. of Maharashtra (DTE Code: EN6179) | Affiliated to Savitribai Phule Pune University (SPPU)
              </p>
              <p className="text-[11px] text-slate-500">
                Parandwadi, Off Pune-Mumbai Expressway, Tal. Maval, Dist. Pune - 410506 • NAAC Accredited
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-800">
                <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  DEPARTMENT OF COMPUTER ENGINEERING
                </span>
                <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-md border border-blue-200">
                  CLASS: S.Y. B.TECH / B.E. (DIV A) • SEMESTER III (2026-2027)
                </span>
                <span className="bg-emerald-50 text-emerald-900 px-3 py-1 rounded-md border border-emerald-200">
                  DOC: SY_26-27_Time_Table_Version 5.pdf
                </span>
              </div>
            </div>

            {/* CLASS INFORMATION SUMMARY STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Classroom Location:</span>
                <span className="font-extrabold text-slate-800">Room 204 (2nd Floor)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Class Teacher:</span>
                <span className="font-extrabold text-slate-800">Prof. Rajesh Patil</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Timetable Coordinator:</span>
                <span className="font-extrabold text-slate-800">Prof. Nilesh Shinde</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Effective From:</span>
                <span className="font-extrabold text-slate-800">September 2026 (w.e.f.)</span>
              </div>
            </div>

            {/* TIMETABLE GRID TABLE */}
            <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-2xs">
              <table className="w-full text-xs text-left border-collapse min-w-[840px]">
                <thead>
                  <tr className="bg-slate-900 text-white font-black text-center text-[11px] divide-x divide-slate-800">
                    <th className="py-2.5 px-3 w-28 text-left">Day / Time</th>
                    <th className="py-2.5 px-2">08:45 - 09:45</th>
                    <th className="py-2.5 px-2">09:45 - 10:45</th>
                    <th className="py-2.5 px-1 bg-amber-900/60 w-14 text-[10px]">
                      10:45-11:00
                      <span className="block font-normal text-amber-200">RECESS</span>
                    </th>
                    <th className="py-2.5 px-2">11:00 - 12:00</th>
                    <th className="py-2.5 px-2">12:00 - 01:00</th>
                    <th className="py-2.5 px-1 bg-amber-900/60 w-14 text-[10px]">
                      01:00-01:45
                      <span className="block font-normal text-amber-200">LUNCH</span>
                    </th>
                    <th className="py-2.5 px-3 bg-blue-950/70" colSpan={1}>
                      01:45 - 03:45 (Practicals)
                    </th>
                    <th className="py-2.5 px-2 bg-slate-800">03:45 - 04:45</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {/* MONDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Monday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM (210241)</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center bg-blue-50/50">
                      <div className="font-bold text-blue-800">DSA (210242)</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] font-semibold text-blue-700">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-teal-800">OOP (210243)</div>
                      <div className="text-[10px] text-slate-500">Prof. Sneha Kulkarni</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-orange-800">DELD (210245)</div>
                      <div className="text-[10px] text-slate-500">Prof. Nilesh Shinde</div>
                      <div className="text-[10px] font-semibold text-orange-700">Room 205 (Relocated)</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 border-r border-slate-200 bg-blue-50/30">
                      <div className="text-[11px] font-bold text-slate-900 mb-1">
                        S1: DSL (CS Lab 2) • <span className="text-blue-700 font-extrabold">S2: OOPL (CS Lab 1)</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        S3: DELD (Hardware Lab) • S4: BCS (Language Lab)
                      </div>
                    </td>
                    <td className="p-2 text-center bg-slate-50">
                      <div className="font-semibold text-slate-700">TG Mentoring</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] text-slate-600">Room 204</div>
                    </td>
                  </tr>

                  {/* TUESDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Tuesday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-purple-800">CG (210244)</div>
                      <div className="text-[10px] text-slate-500">Prof. Pooja More</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM (210241)</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-blue-800">DSA (210242)</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-orange-800">DELD (210245)</div>
                      <div className="text-[10px] text-slate-500">Prof. Nilesh Shinde</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 border-r border-slate-200 bg-blue-50/30">
                      <div className="text-[11px] font-bold text-slate-900 mb-1">
                        S1: CGL (CS Lab 3) • <span className="text-blue-700 font-extrabold">S2: DSL (CS Lab 2)</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        S3: OOPL (CS Lab 1) • S4: DELD (Hardware Lab)
                      </div>
                    </td>
                    <td className="p-2 text-center bg-slate-50">
                      <div className="font-semibold text-slate-700">Remedial / Tutorial</div>
                      <div className="text-[10px] text-slate-500">Prof. Sneha Kulkarni</div>
                      <div className="text-[10px] text-slate-600">Room 204</div>
                    </td>
                  </tr>

                  {/* WEDNESDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Wednesday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-teal-800">OOP (210243)</div>
                      <div className="text-[10px] text-slate-500">Prof. Sneha Kulkarni</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-blue-800">DSA (210242)</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM (210241)</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-purple-800">CG (210244)</div>
                      <div className="text-[10px] text-slate-500">Prof. Pooja More</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 border-r border-slate-200 bg-blue-50/30">
                      <div className="text-[11px] font-bold text-slate-900 mb-1">
                        S1: DELD (Hardware Lab) • <span className="text-blue-700 font-extrabold">S2: CGL (CS Lab 3)</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        S3: DSL (CS Lab 2) • S4: OOPL (CS Lab 1)
                      </div>
                    </td>
                    <td className="p-2 text-center bg-slate-50">
                      <div className="font-semibold text-slate-700">BCS & Seminar</div>
                      <div className="text-[10px] text-slate-500">Prof. Pooja More</div>
                      <div className="text-[10px] text-slate-600">Seminar Hall 1</div>
                    </td>
                  </tr>

                  {/* THURSDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Thursday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-orange-800">DELD (210245)</div>
                      <div className="text-[10px] text-slate-500">Prof. Nilesh Shinde</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-teal-800">OOP (210243)</div>
                      <div className="text-[10px] text-slate-500">Prof. Sneha Kulkarni</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-blue-800">DSA (210242)</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM (210241)</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 border-r border-slate-200 bg-blue-50/30">
                      <div className="text-[11px] font-bold text-slate-900 mb-1">
                        S1: OOPL (CS Lab 1) • <span className="text-blue-700 font-extrabold">S2: DELD (Hardware Lab)</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        S3: CGL (CS Lab 3) • S4: DSL (CS Lab 2)
                      </div>
                    </td>
                    <td className="p-2 text-center bg-slate-50">
                      <div className="font-semibold text-slate-700">PBL Mentoring</div>
                      <div className="text-[10px] text-slate-500">Faculty Guide Team</div>
                      <div className="text-[10px] text-slate-600">Room 204</div>
                    </td>
                  </tr>

                  {/* FRIDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Friday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-purple-800">CG (210244)</div>
                      <div className="text-[10px] text-slate-500">Prof. Pooja More</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-orange-800">DELD (210245)</div>
                      <div className="text-[10px] text-slate-500">Prof. Nilesh Shinde</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-teal-800">OOP (210243)</div>
                      <div className="text-[10px] text-slate-500">Prof. Sneha Kulkarni</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM (210241)</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 border-r border-slate-200 bg-blue-50/30">
                      <div className="text-[11px] font-bold text-slate-900 mb-1">
                        Coding Club &amp; Technical Activity
                      </div>
                      <div className="text-[10px] text-slate-600">
                        Competitive DSA Problem Solving • CS Lab 2
                      </div>
                    </td>
                    <td className="p-2 text-center bg-slate-50">
                      <div className="font-semibold text-slate-700">Department Forum</div>
                      <div className="text-[10px] text-slate-500">Dr. Arvind Sharma (HOD)</div>
                      <div className="text-[10px] text-slate-600">Seminar Hall 1</div>
                    </td>
                  </tr>

                  {/* SATURDAY */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold bg-slate-100 text-slate-900 border-r border-slate-200">
                      Saturday
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-blue-800">DSA Revision</div>
                      <div className="text-[10px] text-slate-500">Prof. Rajesh Patil</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="font-bold text-emerald-800">DM Tutorial</div>
                      <div className="text-[10px] text-slate-500">Prof. Deshmukh</div>
                      <div className="text-[10px] font-semibold text-slate-600">Room 204</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      TEA
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center bg-slate-50" colSpan={2}>
                      <div className="font-bold text-slate-900">Industry Guest Lecture &amp; Tech Webinar</div>
                      <div className="text-[10px] text-slate-600">Invited Tech Leads • Seminar Hall 1 (11:00 - 01:00)</div>
                    </td>
                    <td className="bg-amber-50 text-[10px] text-center font-bold text-amber-800 border-r border-slate-200">
                      LUNCH
                    </td>
                    <td className="p-2 text-center bg-slate-50" colSpan={2}>
                      <div className="font-semibold text-slate-700">Co-curricular / Sports &amp; Central Library</div>
                      <div className="text-[10px] text-slate-500">Open Campus Hours</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SUBJECT & FACULTY DIRECTORY TABLE */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Course Details &amp; Faculty Matrix (SPPU Scheme)</span>
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold">
                    <tr>
                      <th className="p-2.5">Course Code</th>
                      <th className="p-2.5">Subject Abbr.</th>
                      <th className="p-2.5">Course Name</th>
                      <th className="p-2.5">Assigned Faculty</th>
                      <th className="p-2.5">Credits</th>
                      <th className="p-2.5">Designated Venue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {subjectGuide.map((s) => (
                      <tr key={s.code} className="hover:bg-slate-50">
                        <td className="p-2 font-mono font-bold text-slate-900">{s.code}</td>
                        <td className="p-2 font-bold text-blue-700">{s.short}</td>
                        <td className="p-2 font-medium">{s.name}</td>
                        <td className="p-2 font-semibold text-slate-800">{s.faculty}</td>
                        <td className="p-2">{s.credits}</td>
                        <td className="p-2 font-medium text-slate-600">{s.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INSTITUTIONAL SIGNATURE BLOCK */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="h-8 border-b border-dashed border-slate-300 mx-auto w-32" />
                <div className="text-xs font-bold text-slate-800">Prof. Rajesh Patil</div>
                <div className="text-[10px] text-slate-500">Class Teacher (Div A)</div>
              </div>

              <div className="space-y-1">
                <div className="h-8 border-b border-dashed border-slate-300 mx-auto w-32" />
                <div className="text-xs font-bold text-slate-800">Prof. Nilesh Shinde</div>
                <div className="text-[10px] text-slate-500">Timetable In-charge</div>
              </div>

              <div className="space-y-1">
                <div className="h-8 border-b border-dashed border-slate-300 mx-auto w-32" />
                <div className="text-xs font-bold text-slate-800">Dr. Arvind Sharma</div>
                <div className="text-[10px] text-slate-500">HOD Computer Engineering</div>
              </div>

              <div className="space-y-1">
                <div className="h-8 border-b border-dashed border-slate-300 mx-auto w-32" />
                <div className="text-xs font-bold text-slate-800">Dr. P. R. Radhakrishnan</div>
                <div className="text-[10px] text-slate-500">Principal, ICEM Pune</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>EduFlow live database synchronized with ICEM Timetable Version 5.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
