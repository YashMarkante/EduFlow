import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, FileText, Bell, GraduationCap, X, ArrowRight, DoorOpen } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    searchQuery,
    setSearchQuery,
    subjects,
    rooms,
    assignments,
    materials,
    announcements,
    users,
    navigate,
    currentUser
  } = useApp();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    setDebouncedQuery(searchQuery);
  }, [searchQuery]);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const q = debouncedQuery.toLowerCase().trim();

  // Search across collections
  const matchedSubjects = q
    ? subjects.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
    : subjects.slice(0, 3);

  const matchedRooms = q
    ? rooms.filter((r) => r.roomNumber.toLowerCase().includes(q) || r.building.toLowerCase().includes(q))
    : [];

  const matchedAssignments = q
    ? assignments.filter((a) => a.title.toLowerCase().includes(q) || a.subjectName.toLowerCase().includes(q))
    : [];

  const matchedMaterials = q
    ? materials.filter((m) => m.title.toLowerCase().includes(q) || m.unit.toLowerCase().includes(q) || m.subjectName.toLowerCase().includes(q))
    : [];

  const matchedAnnouncements = q
    ? announcements.filter((a) => a.title.toLowerCase().includes(q) || a.subjectName.toLowerCase().includes(q))
    : [];

  const handleSelect = (path: string) => {
    setSearchModalOpen(false);
    navigate(path);
  };

  const hasAnyResults =
    matchedSubjects.length > 0 ||
    matchedRooms.length > 0 ||
    matchedAssignments.length > 0 ||
    matchedMaterials.length > 0 ||
    matchedAnnouncements.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, classrooms, assignments, study materials, notices... (e.g. 'Linked List')"
            className="w-full text-slate-800 placeholder-slate-400 text-sm md:text-base focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1 divide-y divide-slate-100">
          {!q && (
            <div className="text-xs text-slate-500 font-medium pb-2">
              Popular searches: <button onClick={() => setSearchQuery('Linked List')} className="text-blue-600 hover:underline mx-1">"Linked List"</button> • <button onClick={() => setSearchQuery('Python')} className="text-blue-600 hover:underline mx-1">"Python"</button> • <button onClick={() => setSearchQuery('C-204')} className="text-blue-600 hover:underline mx-1">"C-204"</button>
            </div>
          )}

          {/* Subjects / Classrooms */}
          {matchedSubjects.length > 0 && (
            <div className="pt-2 first:pt-0">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                Digital Classrooms &amp; Courses
              </span>
              <div className="space-y-1">
                {matchedSubjects.map((sub) => {
                  const targetUrl =
                    currentUser.role === 'STUDENT'
                      ? `/student/classrooms/${sub.id}`
                      : currentUser.role === 'TEACHER'
                      ? `/teacher/classrooms/${sub.id}`
                      : `/admin/classrooms`;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSelect(targetUrl)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                          style={{ backgroundColor: sub.color }}
                        >
                          {sub.code.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                            {sub.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {sub.code} • {sub.teacherName} • Room {sub.roomNumber}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Assignments */}
          {matchedAssignments.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                Assignments &amp; Tasks
              </span>
              <div className="space-y-1">
                {matchedAssignments.map((asg) => (
                  <button
                    key={asg.id}
                    onClick={() => handleSelect(currentUser.role === 'TEACHER' ? '/teacher/assignments' : '/student/assignments')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                          {asg.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {asg.subjectName} • Due {asg.dueDate} ({asg.maxMarks} marks)
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      Due Soon
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Study Materials */}
          {matchedMaterials.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                Study Materials &amp; Resources
              </span>
              <div className="space-y-1">
                {matchedMaterials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => handleSelect(currentUser.role === 'TEACHER' ? '/teacher/materials' : '/student/materials')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                          {mat.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {mat.subjectName} • {mat.unit} • {mat.fileSize}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">
                      {mat.materialType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {matchedAnnouncements.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                Announcements
              </span>
              <div className="space-y-1">
                {matchedAnnouncements.map((anc) => (
                  <button
                    key={anc.id}
                    onClick={() => handleSelect(`/student/classrooms/${anc.classroomId}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                          {anc.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {anc.subjectName} • {anc.authorName} • {anc.publishDate}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${anc.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                      {anc.priority}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rooms */}
          {matchedRooms.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                Physical Campus Rooms
              </span>
              <div className="space-y-1">
                {matchedRooms.map((rm) => (
                  <div
                    key={rm.id}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <DoorOpen className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Room {rm.roomNumber} ({rm.roomType})</div>
                        <div className="text-xs text-slate-500">{rm.building} • Floor {rm.floor} • Cap {rm.capacity}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${rm.status === 'available' ? 'bg-emerald-100 text-emerald-700' : rm.status === 'occupied' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {rm.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && !hasAnyResults && (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-600">No results found for "{searchQuery}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Data Structures", "Python", "C-204", or "Assignment"</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
