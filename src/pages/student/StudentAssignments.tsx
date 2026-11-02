import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Filter,
  Paperclip,
  Check
} from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const { assignments, submitAssignment, currentUser, addToast } = useApp();
  const [filterTab, setFilterTab] = useState<'All' | 'due_soon' | 'submitted' | 'graded'>('All');
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedAsg, setSelectedAsg] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const [notes, setNotes] = useState('');

  const filtered = assignments.filter((a) => {
    if (filterTab === 'All') return true;
    return a.status === filterTab;
  });

  const handleOpenModal = (asg: any) => {
    setSelectedAsg(asg);
    setFileName(`${currentUser.name.replace(/ /g, '_')}_${asg.subjectCode}_Solution.pdf`);
    setSubmissionModalOpen(true);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAsg) {
      submitAssignment(selectedAsg.id, fileName, '2.1 MB', notes);
      setSubmissionModalOpen(false);
      setNotes('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Submission Modal */}
      {submissionModalOpen && selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
              <h3 className="font-bold text-slate-900 text-base">Submit Assignment</h3>
              <button onClick={() => setSubmissionModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleConfirmSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <div className="font-bold text-slate-900">{selectedAsg.title}</div>
                <div className="text-slate-500">{selectedAsg.subjectName} • Due: {selectedAsg.dueDate} {selectedAsg.dueTime}</div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Upload Solution File
                </label>
                <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center bg-blue-50/20">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">{fileName}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Ready for submission (2.1 MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Notes for Faculty (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Attached test case traces."
                  className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setSubmissionModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl shadow">Confirm &amp; Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Academic Deliverables</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Assignments &amp; Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit coursework, track due dates, and view instructor evaluations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'All', label: 'All' },
            { id: 'due_soon', label: 'Upcoming' },
            { id: 'submitted', label: 'Submitted' },
            { id: 'graded', label: 'Graded' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTab === tab.id
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ASSIGNMENTS LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">You're all caught up!</h3>
            <p className="text-xs text-slate-500 mt-1">No pending assignments matching this category.</p>
          </div>
        ) : (
          filtered.map((asg) => {
            const isGraded = asg.status === 'graded';
            const isSubmitted = asg.status === 'submitted';
            return (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {asg.subjectCode}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {asg.subjectName}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      {asg.description}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                    <span className="text-xs font-bold text-slate-900 block">{asg.dueDate} • {asg.dueTime}</span>
                    <span className="text-xs font-bold text-amber-600 mt-0.5 block">{asg.maxMarks} Marks</span>
                  </div>
                </div>

                {asg.teacherFeedback && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                    <strong>Feedback from Faculty:</strong> "{asg.teacherFeedback}" (Score: {asg.grade}/{asg.maxMarks})
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    {asg.attachments && asg.attachments.length > 0 && (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        {asg.attachments.length} attached guidelines
                      </span>
                    )}
                  </div>

                  {!isSubmitted && !isGraded ? (
                    <button
                      onClick={() => handleOpenModal(asg)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  ) : (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{isGraded ? `Graded: ${asg.grade}/${asg.maxMarks}` : 'Turned In'}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
