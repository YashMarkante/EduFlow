import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Check, X, Users, Calendar, Clock, MapPin, Save } from 'lucide-react';

export const TeacherAttendance: React.FC = () => {
  const { subjects, recordStudentAttendance, addToast } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  // Sample student roll call list for Division A
  const [students, setStudents] = useState([
    { id: 'user-student-1', name: 'Yash Markante', roll: 'BE-CS-042', present: true },
    { id: 'user-student-2', name: 'Aarav Mehta', roll: 'BE-CS-012', present: true },
    { id: 'user-student-3', name: 'Riya Sen', roll: 'BE-CS-027', present: true },
    { id: 'user-student-4', name: 'Rohan Sharma', roll: 'BE-CS-033', present: false },
    { id: 'user-student-5', name: 'Pooja Iyer', roll: 'BE-CS-051', present: true },
    { id: 'user-student-6', name: 'Aditya Deshmukh', roll: 'BE-CS-004', present: true }
  ]);

  const toggleStudent = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  const markAll = (present: boolean) => {
    setStudents((prev) => prev.map((s) => ({ ...s, present })));
  };

  const handleSaveAttendance = () => {
    const presentCount = students.filter((s) => s.present).length;
    // Update student 1 attendance in context
    const student1 = students.find((s) => s.id === 'user-student-1');
    if (student1) {
      recordStudentAttendance(selectedSubjectId, student1.id, student1.present);
    }
    addToast({
      type: 'success',
      title: 'Attendance Saved',
      message: `Recorded ${presentCount}/${students.length} students present for today's session.`
    });
  };

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Digital Register</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Lecture Attendance Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Mark student presence with real-time institutional compliance updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="text-xs font-bold rounded-xl border border-slate-200 px-3.5 py-2 bg-slate-50 text-slate-800"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SESSION SUMMARY BAR */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-teal-800 font-bold block">{currentSubject.name}</span>
            <span className="text-teal-600">Room {currentSubject.roomNumber} • Division A</span>
          </div>
          <div className="border-l border-teal-200 pl-4">
            <span className="text-teal-800 font-bold block">Today's Class</span>
            <span className="text-teal-600">09:00 AM - 10:00 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll(true)}
            className="px-3 py-1.5 rounded-lg bg-white border border-teal-300 text-teal-800 font-bold hover:bg-teal-100"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll(false)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-100"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Student Name &amp; Roll Number</span>
          <span className="text-xs font-bold text-slate-400 uppercase">Attendance Status</span>
        </div>

        <div className="divide-y divide-slate-100">
          {students.map((st) => (
            <div
              key={st.id}
              className="py-3.5 flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              <div>
                <span className="text-sm font-bold text-slate-900 block">{st.name}</span>
                <span className="text-xs text-slate-400">{st.roll} • Division A</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStudent(st.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    st.present
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  {st.present ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Confirm &amp; Log Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
