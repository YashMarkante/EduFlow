import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Clock,
  MapPin,
  User,
  FileText,
  BookOpen,
  Bell,
  MessageSquare,
  CheckSquare,
  Award,
  Calendar,
  AlertTriangle,
  Download,
  Upload,
  Plus,
  Bookmark,
  ThumbsUp,
  CheckCircle2,
  Share2,
  Paperclip,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ReportClassroomModal } from '../../components/common/ReportClassroomModal';

interface DigitalClassroomProps {
  classroomId?: string;
}

export const DigitalClassroomView: React.FC<DigitalClassroomProps> = ({ classroomId }) => {
  const {
    currentPath,
    subjects,
    timetable,
    assignments,
    materials,
    announcements,
    discussions,
    attendance,
    grades,
    currentUser,
    submitAssignment,
    createAssignment,
    uploadStudyMaterial,
    publishAnnouncement,
    createDiscussionPost,
    addDiscussionComment,
    toggleOfficialAnswer,
    toggleLikePost,
    toggleBookmarkMaterial,
    navigate,
    addToast
  } = useApp();

  // Extract ID from prop or url
  const id = classroomId || currentPath.split('/').pop() || 'sub-cs301';
  const subject = subjects.find((s) => s.id === id) || subjects[0];

  const isTeacher = currentUser.role === 'TEACHER';

  // Tabs
  type TabType = 'overview' | 'announcements' | 'assignments' | 'materials' | 'discussion' | 'attendance' | 'grades' | 'calendar';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Modals / Input states
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState<any>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  // Teacher Creation States
  const [createAsgModalOpen, setCreateAsgModalOpen] = useState(false);
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgDesc, setNewAsgDesc] = useState('');
  const [newAsgMarks, setNewAsgMarks] = useState(50);
  const [newAsgDue, setNewAsgDue] = useState('2026-10-10');
  const [newAsgTime, setNewAsgTime] = useState('11:59 PM');

  // Teacher Upload Material
  const [uploadMatModalOpen, setUploadMatModalOpen] = useState(false);
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatUnit, setNewMatUnit] = useState('Unit 1');
  const [newMatType, setNewMatType] = useState<'pdf' | 'ppt' | 'doc' | 'video' | 'link' | 'zip' | 'question_paper'>('pdf');
  const [newMatFile, setNewMatFile] = useState('Course_Notes.pdf');

  // Teacher Announcement
  const [ancModalOpen, setAncModalOpen] = useState(false);
  const [newAncTitle, setNewAncTitle] = useState('');
  const [newAncContent, setNewAncContent] = useState('');
  const [newAncPriority, setNewAncPriority] = useState<'normal' | 'important' | 'urgent'>('normal');

  // Discussion Post input
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Filter materials / announcements / assignments for this classroom
  const classAssignments = assignments.filter(
    (a) => a.classroomId === subject.id || a.subjectName === subject.name
  );
  const classMaterials = materials.filter(
    (m) => m.classroomId === subject.id || m.subjectName === subject.name
  );
  const classAnnouncements = announcements.filter(
    (a) => a.classroomId === subject.id || a.subjectName === subject.name
  );
  const classDiscussions = discussions.filter(
    (d) => d.classroomId === subject.id || d.subjectName === subject.name
  );
  const classAttendance = attendance.find(
    (at) => at.subjectId === subject.id || at.subjectName === subject.name
  ) || {
    subjectId: subject.id,
    subjectName: subject.name,
    subjectCode: subject.code,
    attended: 22,
    missed: 3,
    total: 25,
    percentage: 88,
    minimumRequired: 75,
    status: 'safe' as const
  };

  const classGrades = grades.filter(
    (g) => g.subjectId === subject.id || g.subjectName === subject.name
  );

  // Active or upcoming timetable session
  const timetableSession = timetable.find(
    (t) => t.subjectId === subject.id || t.subjectCode === subject.code
  );

  const isRelocated = timetableSession?.status === 'moved';

  // Submissions handler
  const handleOpenSubmission = (asg: any) => {
    setSelectedAssignmentForSubmission(asg);
    setUploadedFileName(`${currentUser.name.replace(/ /g, '_')}_${asg.subjectCode}_Solution.pdf`);
    setSubmissionModalOpen(true);
  };

  const handleConfirmSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAssignmentForSubmission) {
      submitAssignment(
        selectedAssignmentForSubmission.id,
        uploadedFileName,
        '2.4 MB',
        submissionNotes
      );
      setSubmissionModalOpen(false);
      setSubmissionNotes('');
    }
  };

  // Discussion Handlers
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) return;
    createDiscussionPost(subject.id, newDiscussionTitle, newDiscussionContent);
    setNewDiscussionTitle('');
    setNewDiscussionContent('');
  };

  const handleSendReply = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;
    addDiscussionComment(postId, text);
    setReplyTextMap({ ...replyTextMap, [postId]: '' });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Report Modal */}
      <ReportClassroomModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        defaultSubject={subject.name}
        defaultRoom={subject.roomNumber}
      />

      {/* Assignment Submission Modal */}
      {submissionModalOpen && selectedAssignmentForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Submit Assignment</h3>
                <p className="text-xs text-slate-500">{selectedAssignmentForSubmission.title}</p>
              </div>
              <button
                onClick={() => setSubmissionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmSubmission} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subject:</span>
                  <span className="font-semibold text-slate-900">{selectedAssignmentForSubmission.subjectName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-bold text-amber-700">{selectedAssignmentForSubmission.dueDate} {selectedAssignmentForSubmission.dueTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Marks:</span>
                  <span className="font-semibold text-slate-900">{selectedAssignmentForSubmission.maxMarks} marks</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Attach Solution File (PDF, DOCX, ZIP)
                </label>
                <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">{uploadedFileName}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Ready to upload • 2.4 MB PDF Document</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Submission Notes for Professor (Optional)
                </label>
                <textarea
                  rows={2}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="e.g. Added time complexity derivation in Appendix section."
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSubmissionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20"
                >
                  Confirm &amp; Submit Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Create Assignment Modal */}
      {createAsgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50">
              <h3 className="font-bold text-slate-900 text-base">Create New Assignment</h3>
              <button onClick={() => setCreateAsgModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createAssignment({
                  classroomId: subject.id,
                  subjectName: subject.name,
                  subjectCode: subject.code,
                  title: newAsgTitle,
                  description: newAsgDesc,
                  maxMarks: Number(newAsgMarks),
                  dueDate: newAsgDue,
                  dueTime: newAsgTime,
                  startDate: new Date().toISOString().split('T')[0],
                  allowLate: true,
                  attachments: [{ name: 'Assignment_Guidelines.pdf', url: '#', size: '1.1 MB' }],
                  submissionInstructions: 'Submit verified code and execution results.'
                });
                setCreateAsgModalOpen(false);
                setNewAsgTitle('');
                setNewAsgDesc('');
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Algorithms & Shortest Path"
                  value={newAsgTitle}
                  onChange={(e) => setNewAsgTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed task instructions and requirements..."
                  value={newAsgDesc}
                  onChange={(e) => setNewAsgDesc(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={newAsgMarks}
                    onChange={(e) => setNewAsgMarks(Number(e.target.value))}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newAsgDue}
                    onChange={(e) => setNewAsgDue(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Due Time</label>
                  <input
                    type="text"
                    value={newAsgTime}
                    onChange={(e) => setNewAsgTime(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setCreateAsgModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow">Publish Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Upload Material Modal */}
      {uploadMatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-teal-50/50">
              <h3 className="font-bold text-slate-900 text-base">Upload Study Material</h3>
              <button onClick={() => setUploadMatModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                uploadStudyMaterial({
                  classroomId: subject.id,
                  subjectName: subject.name,
                  subjectCode: subject.code,
                  title: newMatTitle,
                  description: `Official course study reference for ${newMatUnit}.`,
                  unit: newMatUnit,
                  materialType: newMatType,
                  fileName: newMatFile,
                  fileUrl: '#',
                  fileSize: '3.8 MB'
                });
                setUploadMatModalOpen(false);
                setNewMatTitle('');
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3: Graph Traversals & Trees Notes"
                  value={newMatTitle}
                  onChange={(e) => setNewMatTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Unit / Module</label>
                  <select
                    value={newMatUnit}
                    onChange={(e) => setNewMatUnit(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    <option value="Unit 3">Unit 3</option>
                    <option value="Unit 4">Unit 4</option>
                    <option value="Exam Prep">Exam Prep / Question Papers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Format</label>
                  <select
                    value={newMatType}
                    onChange={(e) => setNewMatType(e.target.value as any)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="ppt">PPT Slide Deck</option>
                    <option value="doc">Word DOCX</option>
                    <option value="question_paper">Question Paper</option>
                    <option value="zip">Source Code ZIP</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Select File</label>
                <input
                  type="text"
                  value={newMatFile}
                  onChange={(e) => setNewMatFile(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2 bg-slate-50"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setUploadMatModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow">Upload Resource</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Announcement Modal */}
      {ancModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
              <h3 className="font-bold text-slate-900 text-base">Post Classroom Announcement</h3>
              <button onClick={() => setAncModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                publishAnnouncement({
                  classroomId: subject.id,
                  subjectName: subject.name,
                  title: newAncTitle,
                  content: newAncContent,
                  priority: newAncPriority
                });
                setAncModalOpen(false);
                setNewAncTitle('');
                setNewAncContent('');
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab assessment rescheduled to Friday"
                  value={newAncTitle}
                  onChange={(e) => setNewAncTitle(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Content</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Type official classroom broadcast..."
                  value={newAncContent}
                  onChange={(e) => setNewAncContent(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Priority Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'important', 'urgent'] as const).map((pr) => (
                    <button
                      key={pr}
                      type="button"
                      onClick={() => setNewAncPriority(pr)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        newAncPriority === pr
                          ? pr === 'urgent'
                            ? 'bg-red-600 text-white shadow'
                            : pr === 'important'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-blue-600 text-white shadow'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setAncModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow">Publish Broadcast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HERO CLASSROOM HEADER (Section 11) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {subject.code} • {subject.department}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                {subject.credits} Credits
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {subject.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-teal-400" />
                <span className="font-semibold text-white">{subject.teacherName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Next class: <strong>{subject.nextLectureTime}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                {isRelocated ? (
                  <span className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded font-bold border border-amber-400/30">
                    Relocated: Room {timetableSession?.roomName} ({timetableSession?.building})
                  </span>
                ) : (
                  <span>Room: <strong className="text-white">{subject.roomNumber}</strong> ({subject.building})</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Classroom Header Action */}
          <div className="flex flex-wrap items-center gap-2">
            {isTeacher ? (
              <>
                <button
                  onClick={() => setCreateAsgModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Assignment</span>
                </button>
                <button
                  onClick={() => setUploadMatModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>+ Material</span>
                </button>
                <button
                  onClick={() => setAncModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                >
                  Broadcast
                </button>
              </>
            ) : (
              <button
                onClick={() => setReportModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Report Room Issue</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CLASSROOM TABS (Sections 11 & 12) */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {[
            { id: 'overview', label: 'Overview', icon: GraduationCap },
            { id: 'announcements', label: 'Announcements', icon: Bell, count: classAnnouncements.length },
            { id: 'assignments', label: 'Assignments', icon: FileText, count: classAssignments.length },
            { id: 'materials', label: 'Study Materials', icon: BookOpen, count: classMaterials.length },
            { id: 'discussion', label: 'Discussion', icon: MessageSquare, count: classDiscussions.length },
            { id: 'attendance', label: 'Attendance', icon: CheckSquare },
            { id: 'grades', label: 'Grades', icon: Award },
            { id: 'calendar', label: 'Calendar', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW (Section 12 specification) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* NEXT CLASS CARD */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-2">
                Next Class
              </span>
              <h3 className="font-bold text-slate-900 text-base">{subject.name}</h3>
              <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold">{subject.nextLectureTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-slate-900">Room {subject.roomNumber}</span>
                  <span className="text-slate-400">({subject.building})</span>
                </div>
              </div>
            </div>

            {/* UPCOMING ASSIGNMENT */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-2">
                Upcoming Assignment
              </span>
              {classAssignments[0] ? (
                <div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                    {classAssignments[0].title}
                  </h3>
                  <div className="mt-2 text-xs">
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                      Due: {classAssignments[0].dueDate} at {classAssignments[0].dueTime}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Max {classAssignments[0].maxMarks} marks</span>
                    <button
                      onClick={() => setActiveTab('assignments')}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      View &amp; Submit →
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active assignments</p>
              )}
            </div>

            {/* ATTENDANCE IN THIS COURSE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-2">
                Course Attendance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  {classAttendance.percentage}%
                </span>
                <span className="text-xs text-slate-500">
                  ({classAttendance.attended}/{classAttendance.total} Lectures)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${classAttendance.percentage}%` }}
                />
              </div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-2">
                ✓ Above institutional 75% requirement
              </span>
            </div>
          </div>

          {/* LATEST MATERIAL & ANNOUNCEMENT PREVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Latest Material */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Latest Study Material</span>
                </h3>
                <button
                  onClick={() => setActiveTab('materials')}
                  className="text-xs font-semibold text-teal-600 hover:underline"
                >
                  View all ({classMaterials.length})
                </button>
              </div>

              {classMaterials[0] ? (
                <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {classMaterials[0].materialType}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{classMaterials[0].title}</h4>
                      <p className="text-xs text-slate-500">{classMaterials[0].unit} • {classMaterials[0].fileSize}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      addToast({
                        type: 'success',
                        title: 'Downloading Material',
                        message: `Started download: ${classMaterials[0].fileName}`
                      });
                    }}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No resources published yet</p>
              )}
            </div>

            {/* Latest Announcement */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>Latest Announcement</span>
                </h3>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  All ({classAnnouncements.length})
                </button>
              </div>

              {classAnnouncements[0] ? (
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500">
                      {classAnnouncements[0].authorName} • {classAnnouncements[0].publishDate}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      {classAnnouncements[0].priority}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">
                    {classAnnouncements[0].title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {classAnnouncements[0].content}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No announcements yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS (Section 13 specification) */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Class Announcements &amp; Updates
            </h3>
            {isTeacher && (
              <button
                onClick={() => setAncModalOpen(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>New Announcement</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {classAnnouncements.map((anc) => {
              const isUrgent = anc.priority === 'urgent';
              const isImportant = anc.priority === 'important';
              return (
                <div
                  key={anc.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isUrgent
                      ? 'bg-red-50/50 border-red-200'
                      : isImportant
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            isUrgent
                              ? 'bg-red-200 text-red-900'
                              : isImportant
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {anc.priority}
                        </span>
                        <span className="text-xs text-slate-400">
                          {anc.publishDate}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{anc.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1 whitespace-pre-line">
                        {anc.content}
                      </p>

                      {anc.attachments && anc.attachments.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {anc.attachments.map((att, i) => (
                            <div
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs"
                            >
                              <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                              <span className="font-medium">{att.name}</span>
                              <span className="text-slate-400">({att.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-slate-800 block">
                        {anc.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {anc.authorRole}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENTS (Section 14 specification) */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Assignments &amp; Projects</h3>
              <p className="text-xs text-slate-500">Track deadlines, guidelines, submissions, and grades</p>
            </div>
            {isTeacher && (
              <button
                onClick={() => setCreateAsgModalOpen(true)}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create Assignment</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {classAssignments.map((asg) => {
              const isGraded = asg.status === 'graded';
              const isSubmitted = asg.status === 'submitted';
              return (
                <div
                  key={asg.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            isGraded
                              ? 'bg-emerald-100 text-emerald-800'
                              : isSubmitted
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isGraded ? 'Graded' : isSubmitted ? 'Submitted' : 'Pending Submission'}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {asg.maxMarks} Marks Maximum
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{asg.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {asg.description}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-[11px] uppercase font-bold text-slate-400 block">
                        Submission Deadline
                      </span>
                      <span className="text-xs font-bold text-slate-900 block">
                        {asg.dueDate} • {asg.dueTime}
                      </span>
                    </div>
                  </div>

                  {/* Submission instructions and attachments */}
                  {asg.attachments && asg.attachments.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-500 font-semibold">Teacher Attachments:</span>
                      {asg.attachments.map((att, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            addToast({
                              type: 'info',
                              title: 'Opening Specification',
                              message: `Downloaded ${att.name}`
                            });
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{att.name}</span>
                          <span className="text-slate-400 text-[10px]">({att.size})</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Evaluation feedback if graded */}
                  {isGraded && asg.grade !== undefined && (
                    <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-emerald-900">
                        <span>Teacher Evaluation: Graded</span>
                        <span className="text-sm">{asg.grade} / {asg.maxMarks} Marks</span>
                      </div>
                      {asg.teacherFeedback && (
                        <p className="text-emerald-800 italic">
                          "{asg.teacherFeedback}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">
                      {asg.allowLate ? 'Late submissions accepted' : 'Strict deadline (no late submissions)'}
                    </span>

                    {!isTeacher && !isSubmitted && !isGraded && (
                      <button
                        onClick={() => handleOpenSubmission(asg)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Assignment Work</span>
                      </button>
                    )}

                    {!isTeacher && (isSubmitted || isGraded) && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submitted &amp; Logged</span>
                      </span>
                    )}

                    {isTeacher && (
                      <button
                        onClick={() => navigate('/teacher/assignments')}
                        className="text-xs font-bold text-teal-600 hover:underline"
                      >
                        Review Student Submissions →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: STUDY MATERIALS (Section 15 specification) */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Study Materials Library</h3>
              <p className="text-xs text-slate-500">Organized lecture slides, notes, manuals, and previous year papers</p>
            </div>
            {isTeacher && (
              <button
                onClick={() => setUploadMatModalOpen(true)}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Material</span>
              </button>
            )}
          </div>

          {/* Grouped by Unit */}
          {['Unit 1', 'Unit 2', 'Unit 3', 'Exam Prep'].map((unit) => {
            const unitMaterials = classMaterials.filter((m) => m.unit === unit);
            if (unitMaterials.length === 0) return null;

            return (
              <div key={unit} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{unit}</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-semibold">
                    {unitMaterials.length} Resources
                  </span>
                </div>

                <div className="space-y-2">
                  {unitMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-blue-100 text-blue-700 shrink-0">
                          {mat.materialType}
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{mat.title}</h5>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{mat.description}</p>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                            <span>Uploaded: {mat.uploadDate}</span>
                            <span>•</span>
                            <span>{mat.fileSize}</span>
                            <span>•</span>
                            <span>{mat.downloadCount} Downloads</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => toggleBookmarkMaterial(mat.id)}
                          className={`p-2 rounded-xl border text-xs transition-colors ${
                            mat.bookmarked
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                          title="Bookmark material"
                        >
                          <Bookmark className="w-3.5 h-3.5" fill={mat.bookmarked ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => {
                            addToast({
                              type: 'success',
                              title: 'Download Started',
                              message: `Saving "${mat.fileName}" (${mat.fileSize}) to your device.`
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 5: DISCUSSION (Section 16 specification with 'Official Answer ✓') */}
      {activeTab === 'discussion' && (
        <div className="space-y-6">
          {/* Create Question / Discussion Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Ask a Question / Start a Discussion</span>
            </h4>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <input
                type="text"
                value={newDiscussionTitle}
                onChange={(e) => setNewDiscussionTitle(e.target.value)}
                placeholder="Question topic or doubt (e.g. 'Should Assignment 2 be handwritten?')"
                className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                rows={2}
                value={newDiscussionContent}
                onChange={(e) => setNewDiscussionContent(e.target.value)}
                placeholder="Detailed context or algorithm doubt..."
                className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Classroom</span>
                </button>
              </div>
            </form>
          </div>

          {/* Discussion List */}
          <div className="space-y-4">
            {classDiscussions.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{post.authorName}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {post.authorRole}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{post.createdAt}</span>
                    </div>
                  </div>

                  {post.tag && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      {post.tag}
                    </span>
                  )}
                </div>

                {/* Title & Content */}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{post.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{post.content}</p>
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      post.userLiked
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    {post.comments.length} Replies
                  </span>
                </div>

                {/* Comments / Replies */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {post.comments.map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-3 rounded-xl border text-xs ${
                        comm.isOfficial
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : 'bg-slate-50/60 border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{comm.authorName}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            {comm.authorRole}
                          </span>
                          {comm.isOfficial && (
                            <span className="inline-flex items-center gap-1 font-bold text-[10px] text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              Official Answer
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{comm.content}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Reply Bar */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={replyTextMap[post.id] || ''}
                    onChange={(e) => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                    placeholder={isTeacher ? "Answer as faculty (marks as Official Answer)..." : "Write a peer reply..."}
                    className="flex-1 text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleSendReply(post.id)}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ATTENDANCE (Section 20 specification) */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Attendance Statistics</h3>
              <p className="text-xs text-slate-500">Subject: {subject.name} ({subject.code})</p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Min Required: {classAttendance.minimumRequired}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-3xl font-black text-slate-900">{classAttendance.attended}</span>
              <span className="block text-xs text-slate-500 mt-1 font-medium">Lectures Attended</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-3xl font-black text-red-600">{classAttendance.missed}</span>
              <span className="block text-xs text-slate-500 mt-1 font-medium">Lectures Missed</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-3xl font-black text-blue-600">{classAttendance.percentage}%</span>
              <span className="block text-xs text-slate-500 mt-1 font-medium">Current Percentage</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                classAttendance.percentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'
              }`}
              style={{ width: `${classAttendance.percentage}%` }}
            />
          </div>

          {classAttendance.percentage < 75 && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                <strong>Warning:</strong> Your attendance in {subject.name} is currently below the 75% threshold required to appear for semester end examinations.
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: GRADES (Section 21 specification) */}
      {activeTab === 'grades' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Grades &amp; Academic Scores</h3>
          <div className="divide-y divide-slate-100">
            {classGrades.map((grd) => (
              <div key={grd.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{grd.title}</span>
                  <span className="text-slate-400">{grd.type} • {grd.date}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900 text-sm block">
                    {grd.score} / {grd.maxScore}
                  </span>
                  <span className="font-extrabold text-emerald-600">{grd.grade} ({grd.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: CALENDAR (Subject specific sessions) */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Classroom Calendar Schedule</h3>
          <div className="space-y-3">
            {timetable
              .filter((t) => t.subjectId === subject.id || t.subjectCode === subject.code)
              .map((sess) => (
                <div key={sess.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-20 font-bold text-blue-600">{sess.dayOfWeek}</span>
                    <span className="font-semibold text-slate-900">{sess.startTime} - {sess.endTime}</span>
                  </div>
                  <div className="text-slate-500">
                    Room {sess.roomName} ({sess.building})
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
