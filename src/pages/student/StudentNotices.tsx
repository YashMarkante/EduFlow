import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Download,
  AlertTriangle,
  Paperclip,
  CheckCircle2,
  Calendar,
  Filter
} from 'lucide-react';

export const StudentNotices: React.FC = () => {
  const { notices, institution, addToast } = useApp();
  const [selectedCat, setSelectedCat] = useState('ALL');

  const categories = [
    'ALL',
    'Scholarships',
    'Placements',
    'Examination',
    'Events',
    'Holidays',
    'Forms'
  ];

  const filtered = notices.filter((n) => {
    if (selectedCat !== 'ALL' && n.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4" />
          <span>Official Institutional Circulars</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Campus Notice Board
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Verified announcements from Office of the Dean, Placement Directorate, Examination Controller &amp; Student Welfare.
        </p>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* NOTICES LIST */}
      <div className="space-y-4">
        {filtered.map((notice) => {
          const isUrgent = notice.priority === 'urgent';
          const isHigh = notice.priority === 'high';

          return (
            <div
              key={notice.id}
              className={`p-6 rounded-2xl border transition-all ${
                isUrgent
                  ? 'bg-gradient-to-r from-red-50/60 via-white to-red-50/20 border-red-200 shadow-xs'
                  : isHigh
                  ? 'bg-gradient-to-r from-amber-50/50 via-white to-amber-50/20 border-amber-200 shadow-xs'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      isUrgent
                        ? 'bg-red-200 text-red-900'
                        : isHigh
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Published: {notice.publishDate}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-700 sm:text-right">
                  {notice.authorName}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-2">{notice.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                {notice.content}
              </p>

              {notice.attachment && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{notice.attachment}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToast({
                        type: 'success',
                        title: 'Notice Downloaded',
                        message: `Saved official circular: ${notice.attachment}`
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Circular</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
