import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Grid, Plus, BookOpen, User, Building, Search } from 'lucide-react';

export const AdminSubjects: React.FC = () => {
  const { subjects, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState(4);
  const [dept, setDept] = useState('Computer Engineering');

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Subject Added',
      message: `Course ${name} (${code}) added to curriculum.`
    });
    setModalOpen(false);
    setName('');
    setCode('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-base">Add Curriculum Course</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence & Expert Systems"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-306"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Academic Credits</label>
                  <input
                    type="number"
                    required
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Grid className="w-4 h-4" />
            <span>Academic Syllabi &amp; Credits</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Curriculum &amp; Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure subjects, faculty leads, credit weightings, and classroom venues.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Subject</span>
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search course title or code..."
          className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* SUBJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {s.code}
                </span>
                <span className="text-xs font-bold text-slate-400">{s.credits} Credits</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{s.department}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Instructor: <strong>{s.teacherName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Default Venue: Room {s.roomNumber} ({s.building})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
