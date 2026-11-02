import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Check,
  Send,
  Upload
} from 'lucide-react';

export const TeacherAssignments: React.FC = () => {
  const { assignments, submissions, createAssignment, gradeSubmission, subjects, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'submissions' | 'create'>('submissions');

  // Create Assignment State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [maxMarks, setMaxMarks] = useState(50);
  const [dueDate, setDueDate] = useState('2026-10-15');
  const [dueTime, setDueTime] = useState('11:59 PM');
  const [allowLate, setAllowLate] = useState(true);

  // Grade Modal
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [selectedSubm, setSelectedSubm] = useState<any>(null);
  const [scoreInput, setScoreInput] = useState<number>(45);
  const [feedbackInput, setFeedbackInput] = useState('Well structured code and clear complexity derivation.');

  const handleOpenGradeModal = (subm: any) => {
    setSelectedSubm(subm);
    setScoreInput(subm.grade || 45);
    setFeedbackInput(subm.feedback || 'Good work! Code logic is sound and well commented.');
    setGradeModalOpen(true);
  };

  const handleConfirmGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubm) {
      gradeSubmission(selectedSubm.id, Number(scoreInput), feedbackInput);
      setGradeModalOpen(false);
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = subjects.find((s) => s.id === subjectId) || subjects[0];
    createAssignment({
      classroomId: selSub.id,
      subjectName: selSub.name,
      subjectCode: selSub.code,
      title,
      description,
      maxMarks: Number(maxMarks),
      dueDate,
      dueTime,
      startDate: new Date().toISOString().split('T')[0],
      allowLate,
      attachments: [{ name: 'Assignment_Requirements.pdf', url: '#', size: '1.2 MB' }],
      submissionInstructions: 'Upload a single source archive or PDF solution.'
    });

    setTitle('');
    setDescription('');
    setActiveTab('submissions');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Grading Modal */}
      {gradeModalOpen && selectedSubm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Evaluate Submission</h3>
                <p className="text-xs text-slate-500">{selectedSubm.studentName} ({selectedSubm.studentRoll})</p>
              </div>
              <button onClick={() => setGradeModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleConfirmGrade} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <span className="text-slate-500 block">Submitted File:</span>
                <span className="font-bold text-slate-900 block">{selectedSubm.fileName} ({selectedSubm.fileSize})</span>
                <span className="text-slate-400 block text-[10px]">Received at {selectedSubm.submittedAt}</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Marks Awarded (out of 50)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={scoreInput}
                  onChange={(e) => setScoreInput(Number(e.target.value))}
                  className="w-full text-base font-bold rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Written Feedback / Remarks for Student
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setGradeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow"
                >
                  Save &amp; Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Faculty Grading Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Assignments &amp; Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Create tasks, evaluate uploaded student solutions, and publish official scores.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'submissions' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'create' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Task</span>
          </button>
        </div>
      </div>

      {/* SUBMISSIONS TAB */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Student Coursework Submissions</h3>
            <span className="text-xs text-slate-400 font-semibold">{submissions.length} Total Uploads</span>
          </div>

          <div className="divide-y divide-slate-100">
            {submissions.map((subm) => {
              const isGraded = subm.status === 'graded';
              return (
                <div
                  key={subm.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-xl transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{subm.studentName}</span>
                      <span className="text-xs text-slate-400">({subm.studentRoll})</span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isGraded ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isGraded ? 'Graded' : 'Needs Evaluation'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>File: <strong className="text-slate-700">{subm.fileName}</strong> ({subm.fileSize})</span>
                      <span>•</span>
                      <span>Uploaded {subm.submittedAt}</span>
                    </div>
                    {subm.notes && (
                      <p className="text-xs text-slate-500 italic">Student note: "{subm.notes}"</p>
                    )}
                    {isGraded && subm.feedback && (
                      <p className="text-xs text-emerald-700 font-medium">Remarks: "{subm.feedback}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {isGraded && (
                      <span className="text-base font-black text-slate-900">
                        {subm.grade} <span className="text-xs text-slate-400 font-normal">marks</span>
                      </span>
                    )}
                    <button
                      onClick={() => handleOpenGradeModal(subm)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors ${
                        isGraded
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      {isGraded ? 'Edit Grade' : 'Grade & Feedback'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE TASK TAB (Section 24 specification) */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
          <h3 className="font-bold text-slate-900 text-lg mb-1">Publish New Course Assignment</h3>
          <p className="text-xs text-slate-500 mb-6">
            All students enrolled in the digital classroom will receive immediate in-app and schedule notifications.
          </p>

          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Assignment Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Binary Search Tree Balancing & AVL Rotations"
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Target Subject / Classroom
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Description &amp; Problem Statements
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify requirements, constraints, input test cases, and expected deliverables..."
                className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Maximum Marks
                </label>
                <input
                  type="number"
                  required
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Deadline Time
                </label>
                <input
                  type="text"
                  required
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="allowLate"
                checked={allowLate}
                onChange={(e) => setAllowLate(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600"
              />
              <label htmlFor="allowLate" className="text-xs text-slate-700 font-medium">
                Allow late submissions with timestamp recording
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('submissions')}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-500/20"
              >
                Publish Assignment to Class
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
