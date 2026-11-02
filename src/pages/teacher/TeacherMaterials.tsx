import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Download, Upload, Trash2, Search } from 'lucide-react';

export const TeacherMaterials: React.FC = () => {
  const { materials, subjects, uploadStudyMaterial, addToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [unit, setUnit] = useState('Unit 1');
  const [materialType, setMaterialType] = useState<'pdf' | 'ppt' | 'doc' | 'video' | 'link' | 'zip' | 'question_paper'>('pdf');
  const [fileName, setFileName] = useState('Lecture_Slides_2026.pdf');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = subjects.find((s) => s.id === subjectId) || subjects[0];
    uploadStudyMaterial({
      classroomId: selSub.id,
      subjectName: selSub.name,
      subjectCode: selSub.code,
      title,
      description: `Course notes for ${unit}.`,
      unit,
      materialType,
      fileName,
      fileUrl: '#',
      fileSize: '3.4 MB'
    });
    setModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50">
              <h3 className="font-bold text-slate-900 text-base">Upload Course Study Material</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3: Graph Traversal Algorithms & BFS/DFS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Target Subject</label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Unit / Module</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    <option value="Unit 3">Unit 3</option>
                    <option value="Exam Prep">Exam Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow">Upload to Students</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Courseware Distribution</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Study Materials &amp; Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Upload slides, manuals, and problem sets accessible to all enrolled students.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Material</span>
        </button>
      </div>

      {/* MATERIALS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-700">
                  {mat.materialType}
                </span>
                <span className="text-slate-400 font-semibold">{mat.unit}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-1">{mat.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{mat.subjectName}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{mat.fileSize} • {mat.downloadCount} downloads</span>
              <span className="font-semibold text-teal-700">Live ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
