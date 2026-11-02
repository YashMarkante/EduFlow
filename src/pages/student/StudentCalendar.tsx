import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Tag,
  Filter
} from 'lucide-react';

export const StudentCalendar: React.FC = () => {
  const { calendarEvents, timetable } = useApp();
  const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Agenda'>('Agenda');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Lecture', 'Assignment', 'Exam', 'Practical', 'Event', 'Holiday'];

  const filteredEvents = calendarEvents.filter((ev) => {
    if (selectedCategory !== 'ALL' && ev.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Institutional Planner</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Academic Calendar &amp; Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Lectures, lab practicals, assignment due dates, and semester exams in unified view.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {(['Month', 'Week', 'Agenda'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === mode
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'All Events' : cat}
          </button>
        ))}
      </div>

      {/* AGENDA VIEW */}
      {viewMode === 'Agenda' && (
        <div className="space-y-4">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-24 shrink-0">
                  <span className="text-xs font-bold text-slate-400 block uppercase">
                    {ev.date}
                  </span>
                  {ev.startTime && (
                    <span className="text-xs font-black text-slate-900 block mt-0.5">
                      {ev.startTime}
                    </span>
                  )}
                </div>

                <div className="border-l-2 border-slate-200 pl-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: ev.color || '#2563eb' }}
                    >
                      {ev.category}
                    </span>
                    {ev.subjectName && (
                      <span className="text-xs font-bold text-slate-500">
                        {ev.subjectName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{ev.title}</h3>
                  {ev.description && (
                    <p className="text-xs text-slate-500">{ev.description}</p>
                  )}
                  {ev.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MONTH / WEEK GRID (Interactive preview) */}
      {(viewMode === 'Month' || viewMode === 'Week') && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">September - October 2026</h3>
            <span className="text-xs text-slate-400 font-semibold">Semester V</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-2 border-b">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = ((i + 28) % 31) + 1;
              const isToday = dayNum === 28;
              return (
                <div
                  key={i}
                  className={`min-h-[70px] p-2 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    isToday
                      ? 'border-blue-500 bg-blue-50/30'
                      : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <span className={`font-bold ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                    {dayNum}
                  </span>
                  {dayNum === 28 && (
                    <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded truncate">
                      4 Lectures
                    </span>
                  )}
                  {dayNum === 29 && (
                    <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1 py-0.5 rounded truncate">
                      DSA Due
                    </span>
                  )}
                  {dayNum === 2 && (
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded truncate">
                      Holiday
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
