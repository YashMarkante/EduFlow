import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Mail, Building, CheckCircle2, Search } from 'lucide-react';

export const AdminFaculty: React.FC = () => {
  const { users, subjects, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Computer Engineering');

  const facultyMembers = users.filter((u) => u.role === 'TEACHER');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Faculty Enrolled',
      message: `Invited ${name} (${email}) to campus academic faculty.`
    });
    setModalOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-base">Onboard New Faculty</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name &amp; Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Anand Kulkarni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. anand.k@faculty.eduflow.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Department</label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50"
                >
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Applied Sciences">Applied Sciences</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow">Send Faculty Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Academic Staff &amp; Lecturers</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Faculty Directory &amp; Course Load
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Assign digital classrooms, manage availability, and review teaching schedules.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Faculty Member</span>
        </button>
      </div>

      {/* FACULTY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {facultyMembers.map((fac) => {
          const assignedSubs = subjects.filter((s) => s.teacherId === fac.id || s.teacherName.includes(fac.name.split(' ')[1] || ''));
          return (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={fac.avatar}
                  alt={fac.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{fac.name}</h3>
                  <span className="text-xs text-slate-500 block">{fac.title || 'Course Faculty'}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">{fac.email}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Assigned Digital Classrooms:
                </span>
                <div className="space-y-1">
                  {assignedSubs.map((s) => (
                    <div key={s.id} className="text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg">
                      {s.name} ({s.code}) • Room {s.roomNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
