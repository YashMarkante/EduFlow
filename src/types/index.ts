export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface Institution {
  id: string;
  name: string;
  code: string; // e.g. EDU-PUN-001
  type: 'College' | 'University' | 'School' | 'Coaching Institute';
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website: string;
  logo?: string;
  adminName: string;
  adminEmail: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institutionId: string;
  department: string;
  division?: string;
  rollNumber?: string;
  title?: string; // e.g. "Prof.", "Dr.", "Dean"
  enrolledSubjectIds?: string[];
  assignedSubjectIds?: string[];
}

export interface ClassroomRoom {
  id: string;
  building: string;
  floor: string;
  roomNumber: string;
  roomType: 'Lecture Hall' | 'Computer Lab' | 'Tutorial Room' | 'Auditorium' | 'Seminar Hall';
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  equipment: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  color: string;
  teacherId: string;
  teacherName: string;
  credits: number;
  roomNumber: string;
  building: string;
  nextLectureTime?: string;
  division: string;
}

export interface TimetableEntry {
  id: string;
  institutionId: string;
  division: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  teacherId: string;
  teacherName: string;
  roomId: string;
  roomName: string;
  building: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // "08:45"
  endTime: string;   // "09:45"
  status: 'scheduled' | 'live' | 'completed' | 'cancelled' | 'moved';
  originalRoomName?: string;
  changeReason?: string;
  changedAt?: string;
  changedBy?: string;
  batch?: string;
  type?: 'Lecture' | 'Practical' | 'Tutorial' | 'Mentoring' | 'Seminar';
}

export interface Assignment {
  id: string;
  classroomId: string;
  subjectName: string;
  subjectCode: string;
  title: string;
  description: string;
  maxMarks: number;
  dueDate: string; // ISO date string or formatted date
  dueTime: string;
  startDate: string;
  allowLate: boolean;
  status: 'due_soon' | 'submitted' | 'overdue' | 'graded';
  attachments: { name: string; url: string; size: string }[];
  submissionInstructions?: string;
  teacherFeedback?: string;
  grade?: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  submittedAt: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  notes?: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface StudyMaterial {
  id: string;
  classroomId: string;
  subjectName: string;
  subjectCode: string;
  title: string;
  description: string;
  unit: string; // "Unit 1", "Unit 2", etc.
  materialType: 'pdf' | 'ppt' | 'doc' | 'video' | 'link' | 'zip' | 'question_paper';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  bookmarked?: boolean;
}

export interface ClassroomAnnouncement {
  id: string;
  classroomId: string;
  subjectName: string;
  title: string;
  content: string;
  priority: 'normal' | 'important' | 'urgent';
  publishDate: string;
  expiryDate?: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  attachments?: { name: string; size: string }[];
}

export interface DiscussionComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'teacher';
  authorAvatar: string;
  content: string;
  createdAt: string;
  isOfficial?: boolean;
}

export interface DiscussionPost {
  id: string;
  classroomId: string;
  subjectName: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'teacher';
  authorAvatar: string;
  title: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
  officialAnswer?: boolean;
  likes: number;
  userLiked?: boolean;
  comments: DiscussionComment[];
  attachmentName?: string;
  tag?: string;
}

export interface InstitutionalNotice {
  id: string;
  institutionId: string;
  title: string;
  content: string;
  category: 'General' | 'Examination' | 'Placements' | 'Scholarships' | 'Events' | 'Forms' | 'Internships' | 'Holidays' | 'Important';
  priority: 'normal' | 'high' | 'urgent';
  publishDate: string;
  authorName: string;
  targetAudience: 'all' | 'students' | 'teachers';
  attachment?: string;
  read?: boolean;
}

export interface StudentAttendance {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  attended: number;
  missed: number;
  total: number;
  percentage: number;
  minimumRequired: number; // default 75%
  status: 'safe' | 'warning' | 'critical';
}

export interface GradeItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  type: 'Assignment' | 'Quiz' | 'Internal' | 'Practical' | 'Mid-Term Exam';
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  date: string;
  status: 'graded' | 'pending';
}

export interface ClassroomReport {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  division: string;
  subjectName: string;
  reportedRoom: string;
  currentScheduledRoom: string;
  reportType: 'teacher_not_arrived' | 'room_occupied' | 'lecture_moved' | 'equipment_issue' | 'maintenance_needed';
  notes: string;
  reportedAt: string;
  status: 'pending' | 'verified' | 'dismissed';
  resolvedRoom?: string;
  resolvedNote?: string;
}

export interface AppNotification {
  id: string;
  userId?: string;
  roleTarget?: UserRole | 'ALL';
  title: string;
  message: string;
  type: 'classroom_change' | 'assignment' | 'material' | 'announcement' | 'class_starting' | 'notice' | 'report_verified';
  timestamp: string;
  read: boolean;
  link?: string;
  priority?: 'normal' | 'high' | 'urgent';
  meta?: {
    oldRoom?: string;
    newRoom?: string;
    subject?: string;
    reason?: string;
    updatedBy?: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'Lecture' | 'Assignment' | 'Exam' | 'Practical' | 'Viva' | 'Event' | 'Holiday';
  date: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  subjectName?: string;
  location?: string;
  color?: string;
  description?: string;
}
