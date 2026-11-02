import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Plus, Paperclip } from 'lucide-react';

export const TeacherAnnouncements: React.FC = () => {
  const { announcements, subjects, publishAnnouncement } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('normal');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = subjects.find((s) => s.id === subjectId) || subjects[0];
    publishAnnouncement({
      classroomId: selSub.id,
      subjectName: selSub.name,
      title,
      content,
      priority
    });
    setModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50">
              <h3 className="font-bold text-slate-900 text-base">Post Classroom Broadcast</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handlePublish} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Target Course</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next lab session will be held in Lab 2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Broadcast Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the message for enrolled students..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'important', 'urgent'] as const).map((pr) => (
                    <button
                      key={pr}
                      type="button"
                      onClick={() => setPriority(pr)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        priority === pr
                          ? pr === 'urgent'
                            ? 'bg-red-600 text-white shadow'
                            : pr === 'important'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-teal-600 text-white shadow'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow">Send Broadcast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Classroom Feeds</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Course Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Send urgent reminders, schedule alerts, and journal submission deadlines.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Announcement</span>
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="space-y-4">
        {announcements.map((anc) => (
          <div
            key={anc.id}
            className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase px-2 py-0.5 rounded text-[10px] bg-teal-50 text-teal-700">
                  {anc.priority}
                </span>
                <span className="font-bold text-slate-700">{anc.subjectName}</span>
              </div>
              <span className="text-slate-400">{anc.publishDate}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{anc.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{anc.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
