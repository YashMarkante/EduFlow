import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Download,
  Bookmark,
  FileText,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const StudentMaterials: React.FC = () => {
  const { materials, subjects, toggleBookmarkMaterial, addToast } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedUnit, setSelectedUnit] = useState('ALL');

  const filtered = materials.filter((m) => {
    if (selectedSubject !== 'ALL' && m.subjectName !== selectedSubject) return false;
    if (selectedType !== 'ALL' && m.materialType !== selectedType) return false;
    if (selectedUnit !== 'ALL' && m.unit !== selectedUnit) return false;
    if (
      searchFilter &&
      !m.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
      !m.description.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleDownload = (fileName: string, size: string) => {
    addToast({
      type: 'success',
      title: 'Downloading Study Material',
      message: `Saved ${fileName} (${size}) to local downloads.`
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Curated Academic Repository</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Study Materials &amp; Lecture Notes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Access course slides, practical manuals, syllabi, and previous years' solved university papers.
        </p>

        {/* FILTERS BAR */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search in materials..."
              className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Units / Modules</option>
            <option value="Unit 1">Unit 1</option>
            <option value="Unit 2">Unit 2</option>
            <option value="Unit 3">Unit 3</option>
            <option value="Exam Prep">Exam Prep / Papers</option>
          </select>

          {/* Material Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white font-medium text-slate-700"
          >
            <option value="ALL">All File Formats</option>
            <option value="pdf">PDF Documents</option>
            <option value="ppt">PowerPoint Decks</option>
            <option value="doc">Word Docs</option>
            <option value="question_paper">Question Papers</option>
            <option value="zip">Source Archives</option>
          </select>
        </div>
      </div>

      {/* MATERIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No resources matched your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the subject or file format filter.</p>
          </div>
        ) : (
          filtered.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {mat.materialType}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {mat.unit}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors line-clamp-2">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-slate-700">
                  {mat.subjectName}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {mat.fileSize} • {mat.downloadCount} dl
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleBookmarkMaterial(mat.id)}
                    className={`p-2 rounded-xl border text-xs ${
                      mat.bookmarked
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title="Bookmark"
                  >
                    <Bookmark className="w-3.5 h-3.5" fill={mat.bookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleDownload(mat.fileName, mat.fileSize)}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
