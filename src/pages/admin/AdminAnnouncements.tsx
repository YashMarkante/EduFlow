import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Plus, Paperclip, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const { notices, publishInstitutionalNotice, institution } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'General' | 'Examination' | 'Placements' | 'Scholarships' | 'Events' | 'Forms' | 'Internships' | 'Holidays' | 'Important'>('Important');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('high');
  const [targetAudience, setTargetAudience] = useState<'all' | 'students' | 'teachers'>('all');
  const [attachment, setAttachment] = useState('Official_Circular.pdf');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    publishInstitutionalNotice({
      title,
      content,
      category,
      priority,
      targetAudience,
      attachment
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
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-base">Publish Official Notice</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handlePublish} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End Semester Exam Fee Submission Deadline"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    <option value="Scholarships">Scholarships</option>
                    <option value="Placements">Placements</option>
                    <option value="Examination">Examination</option>
                    <option value="Events">Events</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Forms">Forms</option>
                    <option value="Important">Important</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Notice Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Official notice body text..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Attachment (Optional)</label>
                <input
                  type="text"
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow">Dispatch to Campus</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Campus Wide Dispatches</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Official Institutional Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publish verified notices for scholarships, examination schedules, campus placements, and holidays.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Circular</span>
        </button>
      </div>

      {/* NOTICES LIST */}
      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700">
                  {n.category}
                </span>
                <span className="text-slate-400">Published: {n.publishDate}</span>
              </div>
              <span className="font-bold text-slate-700">{n.authorName}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
