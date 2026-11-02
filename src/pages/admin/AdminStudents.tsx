import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Plus,
  Upload,
  Search,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const { addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Student directory list
  const [studentList, setStudentList] = useState([
    { id: '1', name: 'Yash Markante', roll: 'BE-CS-042', div: 'Division A', dept: 'Computer Engineering', email: 'yash.m@student.eduflow.edu', status: 'Active' },
    { id: '2', name: 'Aarav Mehta', roll: 'BE-CS-012', div: 'Division A', dept: 'Computer Engineering', email: 'aarav.m@student.eduflow.edu', status: 'Active' },
    { id: '3', name: 'Riya Sen', roll: 'BE-CS-027', div: 'Division A', dept: 'Computer Engineering', email: 'riya.s@student.eduflow.edu', status: 'Active' },
    { id: '4', name: 'Rohan Sharma', roll: 'BE-CS-033', div: 'Division B', dept: 'Computer Engineering', email: 'rohan.s@student.eduflow.edu', status: 'Active' },
    { id: '5', name: 'Pooja Iyer', roll: 'BE-CS-051', div: 'Division A', dept: 'Information Technology', email: 'pooja.i@student.eduflow.edu', status: 'Active' },
    { id: '6', name: 'Aditya Deshmukh', roll: 'BE-CS-004', div: 'Division A', dept: 'Computer Engineering', email: 'aditya.d@student.eduflow.edu', status: 'Active' }
  ]);

  const handleCsvImport = () => {
    addToast({
      type: 'success',
      title: 'Bulk CSV Processed',
      message: 'Successfully imported and verified 60 student profiles into Division A.'
    });
    setImportModalOpen(false);
  };

  const filtered = studentList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.div.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* CSV Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-base">Bulk CSV Student Import</h3>
              <button onClick={() => setImportModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500">
                Upload comma-separated values (.csv) with headers: <code>name, roll_number, division, department, email</code>.
              </p>
              <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-6 text-center bg-indigo-50/30">
                <FileSpreadsheet className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Class_Roster_DivisionA_2026.csv</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Contains 60 student records</span>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setImportModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCsvImport}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow"
                >
                  Execute Batch Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Student Registry &amp; Divisions</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Student Management &amp; Batches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage division allocations, bulk CSV rosters, and academic account credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk CSV Import</span>
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name or roll number..."
          className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Student Name</th>
              <th className="py-3 px-2">Roll Number</th>
              <th className="py-3 px-2">Division</th>
              <th className="py-3 px-2">Department</th>
              <th className="py-3 px-2">Institutional Email</th>
              <th className="py-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-2 font-bold text-slate-900">{st.name}</td>
                <td className="py-3 px-2 font-semibold text-slate-700">{st.roll}</td>
                <td className="py-3 px-2 text-slate-600">{st.div}</td>
                <td className="py-3 px-2 text-slate-600">{st.dept}</td>
                <td className="py-3 px-2 text-slate-400">{st.email}</td>
                <td className="py-3 px-2 text-right">
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {st.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
