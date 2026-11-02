import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Institution,
  ClassroomRoom,
  Subject,
  TimetableEntry,
  Assignment,
  AssignmentSubmission,
  StudyMaterial,
  ClassroomAnnouncement,
  DiscussionPost,
  InstitutionalNotice,
  StudentAttendance,
  GradeItem,
  ClassroomReport,
  AppNotification,
  CalendarEvent,
  UserRole
} from '../types';
import {
  initialInstitution,
  initialUsers,
  initialClassrooms,
  initialSubjects,
  initialTimetable,
  initialAssignments,
  initialSubmissions,
  initialStudyMaterials,
  initialAnnouncements,
  initialDiscussions,
  initialNotices,
  initialAttendance,
  initialGrades,
  initialNotifications,
  initialReports,
  initialCalendarEvents
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;

  // Search
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth & Roles
  currentUser: User;
  users: User[];
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  institution: Institution;
  registerInstitution: (data: Partial<Institution>) => void;

  // Data
  rooms: ClassroomRoom[];
  subjects: Subject[];
  timetable: TimetableEntry[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  materials: StudyMaterial[];
  announcements: ClassroomAnnouncement[];
  discussions: DiscussionPost[];
  notices: InstitutionalNotice[];
  attendance: StudentAttendance[];
  grades: GradeItem[];
  reports: ClassroomReport[];
  notifications: AppNotification[];
  calendarEvents: CalendarEvent[];

  // Interconnected Actions
  // 1. Management Classroom Change
  updateClassroomSchedule: (
    entryId: string,
    newRoomId: string,
    reason: string
  ) => void;

  // 2. Student reporting issue
  submitClassroomReport: (report: Omit<ClassroomReport, 'id' | 'reportedAt' | 'status' | 'studentId' | 'studentName' | 'studentRoll' | 'division'>) => void;
  verifyClassroomReport: (reportId: string, newRoomId: string, note: string) => void;
  dismissClassroomReport: (reportId: string) => void;

  // 3. Timetable Add/Update
  addTimetableEntry: (entry: Omit<TimetableEntry, 'id' | 'institutionId'>) => { success: boolean; conflict?: string };
  deleteTimetableEntry: (id: string) => void;
  resetToOfficialTimetable: () => void;

  // 4. Assignments & Submissions
  createAssignment: (asg: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (assignmentId: string, fileName: string, fileSize: string, notes?: string) => void;
  gradeSubmission: (submissionId: string, grade: number, feedback: string) => void;

  // 5. Materials
  uploadStudyMaterial: (mat: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadCount'>) => void;
  toggleBookmarkMaterial: (materialId: string) => void;

  // 6. Announcements
  publishAnnouncement: (announcement: Omit<ClassroomAnnouncement, 'id' | 'publishDate' | 'authorName' | 'authorRole'>) => void;
  publishInstitutionalNotice: (notice: Omit<InstitutionalNotice, 'id' | 'institutionId' | 'publishDate' | 'authorName'>) => void;

  // 7. Discussions
  createDiscussionPost: (classroomId: string, title: string, content: string, tag?: string) => void;
  addDiscussionComment: (postId: string, content: string) => void;
  toggleOfficialAnswer: (postId: string, commentId: string) => void;
  toggleLikePost: (postId: string) => void;

  // 8. Attendance Marking
  recordStudentAttendance: (subjectId: string, studentId: string, present: boolean) => void;

  // 9. Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // 10. Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Path state with browser popstate sync
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global search modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 5500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State initializers from localStorage or defaults with ICEM SY 2026-27 Version 5 check
  if (typeof window !== 'undefined') {
    const DATA_VERSION_KEY = 'eduflow_data_v5_icem';
    if (localStorage.getItem(DATA_VERSION_KEY) !== 'v5.0') {
      localStorage.removeItem('eduflow_timetable');
      localStorage.removeItem('eduflow_institution');
      localStorage.removeItem('eduflow_user');
      localStorage.removeItem('eduflow_rooms');
      localStorage.removeItem('eduflow_assignments');
      localStorage.removeItem('eduflow_submissions');
      localStorage.removeItem('eduflow_materials');
      localStorage.removeItem('eduflow_announcements');
      localStorage.removeItem('eduflow_discussions');
      localStorage.removeItem('eduflow_notices');
      localStorage.removeItem('eduflow_attendance');
      localStorage.removeItem('eduflow_reports');
      localStorage.removeItem('eduflow_notifications');
      localStorage.removeItem('eduflow_events');
      localStorage.setItem(DATA_VERSION_KEY, 'v5.0');
    }
  }

  const [institution, setInstitution] = useState<Institution>(() => {
    const saved = localStorage.getItem('eduflow_institution');
    return saved ? JSON.parse(saved) : initialInstitution;
  });

  const [users] = useState<User[]>(initialUsers);

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('eduflow_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialUsers[0]; // Yash Markante (Student)
  });

  const [rooms, setRooms] = useState<ClassroomRoom[]>(() => {
    const saved = localStorage.getItem('eduflow_rooms');
    return saved ? JSON.parse(saved) : initialClassrooms;
  });

  const [subjects] = useState<Subject[]>(initialSubjects);

  const [timetable, setTimetable] = useState<TimetableEntry[]>(() => {
    const saved = localStorage.getItem('eduflow_timetable');
    return saved ? JSON.parse(saved) : initialTimetable;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('eduflow_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const saved = localStorage.getItem('eduflow_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('eduflow_materials');
    return saved ? JSON.parse(saved) : initialStudyMaterials;
  });

  const [announcements, setAnnouncements] = useState<ClassroomAnnouncement[]>(() => {
    const saved = localStorage.getItem('eduflow_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [discussions, setDiscussions] = useState<DiscussionPost[]>(() => {
    const saved = localStorage.getItem('eduflow_discussions');
    return saved ? JSON.parse(saved) : initialDiscussions;
  });

  const [notices, setNotices] = useState<InstitutionalNotice[]>(() => {
    const saved = localStorage.getItem('eduflow_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [attendance, setAttendance] = useState<StudentAttendance[]>(() => {
    const saved = localStorage.getItem('eduflow_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [grades] = useState<GradeItem[]>(initialGrades);

  const [reports, setReports] = useState<ClassroomReport[]>(() => {
    const saved = localStorage.getItem('eduflow_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('eduflow_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('eduflow_events');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('eduflow_institution', JSON.stringify(institution));
  }, [institution]);

  useEffect(() => {
    localStorage.setItem('eduflow_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eduflow_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('eduflow_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('eduflow_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('eduflow_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('eduflow_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('eduflow_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('eduflow_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('eduflow_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('eduflow_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('eduflow_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('eduflow_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('eduflow_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Auth Functions
  const switchRole = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      addToast({
        type: 'info',
        title: `Switched Role to ${role}`,
        message: `Now logged in as ${found.name} (${found.department})`
      });

      // Route to relevant role dashboard
      if (role === 'STUDENT') navigate('/student/dashboard');
      else if (role === 'TEACHER') navigate('/teacher/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    }
  };

  const login = (email: string, role?: UserRole): boolean => {
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user && role) {
      user = users.find((u) => u.role === role);
    }
    if (user) {
      setCurrentUser(user);
      addToast({
        type: 'success',
        title: 'Welcome Back!',
        message: `Signed in as ${user.name}`
      });
      if (user.role === 'STUDENT') navigate('/student/dashboard');
      else if (user.role === 'TEACHER') navigate('/teacher/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been safely signed out.'
    });
    navigate('/');
  };

  const registerInstitution = (data: Partial<Institution>) => {
    const code = 'EDU-' + (data.city ? data.city.substring(0, 3).toUpperCase() : 'MET') + '-' + Math.floor(100 + Math.random() * 900);
    const newInst: Institution = {
      id: 'inst-' + Math.random().toString(36).substring(2, 7),
      name: data.name || 'New Educational Institution',
      code,
      type: data.type || 'College',
      email: data.email || 'admin@newcampus.edu',
      phone: data.phone || '+91 98765 43210',
      address: data.address || 'Academic Complex',
      city: data.city || 'Pune',
      state: data.state || 'Maharashtra',
      country: data.country || 'India',
      website: data.website || 'https://campus.edu',
      adminName: data.adminName || 'Academic Director',
      adminEmail: data.adminEmail || 'director@campus.edu',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInstitution(newInst);

    // Create admin user for this institution
    const newAdmin: User = {
      id: 'admin-' + Math.random().toString(36).substring(2, 7),
      name: newInst.adminName,
      email: newInst.adminEmail,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      institutionId: newInst.id,
      department: 'Management Operations',
      title: 'Institutional Administrator'
    };
    setCurrentUser(newAdmin);

    addToast({
      type: 'success',
      title: 'Institution Registered!',
      message: `Assigned Institutional Workspace ID: ${code}`
    });
    navigate('/admin/dashboard');
  };

  // CORE FEATURE: Real-time Classroom Change
  const updateClassroomSchedule = (
    entryId: string,
    newRoomId: string,
    reason: string
  ) => {
    const entry = timetable.find((t) => t.id === entryId);
    const targetRoom = rooms.find((r) => r.id === newRoomId);

    if (!entry || !targetRoom) {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not find timetable entry or destination classroom.'
      });
      return;
    }

    const oldRoomName = entry.roomName;
    const newRoomName = targetRoom.roomNumber;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Update timetable
    setTimetable((prev) =>
      prev.map((item) => {
        if (item.id === entryId) {
          return {
            ...item,
            roomId: newRoomId,
            roomName: newRoomName,
            building: targetRoom.building,
            status: 'moved',
            originalRoomName: oldRoomName,
            changeReason: reason || 'Facility maintenance & optimization',
            changedAt: `Today, ${nowTime}`,
            changedBy: currentUser.name
          };
        }
        return item;
      })
    );

    // 2. Update room statuses
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === entry.roomId) {
          return { ...r, status: 'maintenance' };
        }
        if (r.id === newRoomId) {
          return { ...r, status: 'occupied' };
        }
        return r;
      })
    );

    // 3. Create high priority in-app notification for all affected students & faculty
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'classroom_change',
      priority: 'urgent',
      title: `Classroom Changed: ${entry.subjectName}`,
      message: `${entry.subjectName} (${entry.startTime} - ${entry.endTime}) moved from ${oldRoomName} to ${newRoomName}. Reason: ${reason}`,
      timestamp: `Today, ${nowTime}`,
      read: false,
      link: '/student/schedule',
      meta: {
        oldRoom: oldRoomName,
        newRoom: newRoomName,
        subject: entry.subjectName,
        reason,
        updatedBy: currentUser.name
      }
    };
    setNotifications((prev) => [notif, ...prev]);

    // 4. Create urgent classroom announcement in that subject
    const announcement: ClassroomAnnouncement = {
      id: 'anc-' + Date.now(),
      classroomId: entry.subjectId,
      subjectName: entry.subjectName,
      title: `URGENT: Classroom Relocated to ${newRoomName}`,
      content: `The lecture scheduled for ${entry.startTime} - ${entry.endTime} has been officially relocated from ${oldRoomName} to ${newRoomName} in ${targetRoom.building}. Please proceed directly to the new room. Reason: ${reason}`,
      priority: 'urgent',
      publishDate: `Today, ${nowTime}`,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'ADMIN' ? 'Dean Academic' : 'Course Faculty'
    };
    setAnnouncements((prev) => [announcement, ...prev]);

    // 5. Update calendar event if present
    setCalendarEvents((prev) =>
      prev.map((ev) => {
        if (ev.subjectName?.toLowerCase().includes(entry.subjectName.toLowerCase()) || entry.subjectName.toLowerCase().includes(ev.subjectName || '')) {
          return { ...ev, location: `Room ${newRoomName}` };
        }
        return ev;
      })
    );

    // 6. Trigger active Toast
    addToast({
      type: 'warning',
      title: 'Classroom Change Broadcasted',
      message: `${entry.subjectName} updated: ${oldRoomName} ➔ ${newRoomName}. Students and faculty notified immediately!`
    });
  };

  // CORE FEATURE: Classroom Issue Reporting (Students report, Admin verifies)
  const submitClassroomReport = (reportData: Omit<ClassroomReport, 'id' | 'reportedAt' | 'status' | 'studentId' | 'studentName' | 'studentRoll' | 'division'>) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newReport: ClassroomReport = {
      ...reportData,
      id: 'rep-' + Date.now(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || 'BE-CS-042',
      division: currentUser.division || 'Division A',
      reportedAt: `Today, ${nowTime}`,
      status: 'pending'
    };

    setReports((prev) => [newReport, ...prev]);

    // Alert Admin
    const adminNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'notice',
      priority: 'high',
      title: `Student Classroom Report: ${reportData.subjectName}`,
      message: `${currentUser.name} reported "${reportData.reportType.replace(/_/g, ' ')}" in Room ${reportData.reportedRoom}. Verification required.`,
      timestamp: `Today, ${nowTime}`,
      read: false,
      link: '/admin/reports'
    };
    setNotifications((prev) => [adminNotif, ...prev]);

    addToast({
      type: 'success',
      title: 'Report Submitted',
      message: 'Management has received your report. It will be verified before official schedule updates.'
    });
  };

  const verifyClassroomReport = (reportId: string, newRoomId: string, note: string) => {
    const rep = reports.find((r) => r.id === reportId);
    const room = rooms.find((r) => r.id === newRoomId);
    if (!rep || !room) return;

    // Update report status
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'verified',
              resolvedRoom: room.roomNumber,
              resolvedNote: note
            }
          : r
      )
    );

    // Find timetable entry and update it
    const entry = timetable.find((t) => t.subjectName.toLowerCase().includes(rep.subjectName.toLowerCase()) || rep.subjectName.toLowerCase().includes(t.subjectName.toLowerCase()));
    if (entry) {
      updateClassroomSchedule(entry.id, newRoomId, `Student-reported issue verified: ${note}`);
    } else {
      addToast({
        type: 'success',
        title: 'Report Verified',
        message: `Issue verified and assigned to Room ${room.roomNumber}.`
      });
    }
  };

  const dismissClassroomReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'dismissed' } : r))
    );
    addToast({
      type: 'info',
      title: 'Report Dismissed',
      message: 'Classroom report was dismissed after verification.'
    });
  };

  // Timetable Conflict Detection & Scheduler
  const addTimetableEntry = (
    entryData: Omit<TimetableEntry, 'id' | 'institutionId'>
  ): { success: boolean; conflict?: string } => {
    // Detect room conflict
    const roomConflict = timetable.find(
      (t) =>
        t.dayOfWeek === entryData.dayOfWeek &&
        t.roomId === entryData.roomId &&
        ((entryData.startTime >= t.startTime && entryData.startTime < t.endTime) ||
          (entryData.endTime > t.startTime && entryData.endTime <= t.endTime))
    );
    if (roomConflict) {
      return {
        success: false,
        conflict: `Room Conflict: ${entryData.roomName} is already booked for ${roomConflict.subjectName} (${roomConflict.startTime} - ${roomConflict.endTime}) on ${entryData.dayOfWeek}.`
      };
    }

    // Detect teacher conflict
    const teacherConflict = timetable.find(
      (t) =>
        t.dayOfWeek === entryData.dayOfWeek &&
        t.teacherId === entryData.teacherId &&
        ((entryData.startTime >= t.startTime && entryData.startTime < t.endTime) ||
          (entryData.endTime > t.startTime && entryData.endTime <= t.endTime))
    );
    if (teacherConflict) {
      return {
        success: false,
        conflict: `Teacher Conflict: ${entryData.teacherName} is already teaching ${teacherConflict.subjectName} in ${teacherConflict.roomName} (${teacherConflict.startTime} - ${teacherConflict.endTime}) on ${entryData.dayOfWeek}.`
      };
    }

    // Detect division conflict
    const divisionConflict = timetable.find(
      (t) =>
        t.dayOfWeek === entryData.dayOfWeek &&
        t.division === entryData.division &&
        ((entryData.startTime >= t.startTime && entryData.startTime < t.endTime) ||
          (entryData.endTime > t.startTime && entryData.endTime <= t.endTime))
    );
    if (divisionConflict) {
      return {
        success: false,
        conflict: `Division Conflict: ${entryData.division} already has ${divisionConflict.subjectName} scheduled during this timeslot (${divisionConflict.startTime} - ${divisionConflict.endTime}).`
      };
    }

    const newEntry: TimetableEntry = {
      ...entryData,
      id: 'tt-' + Date.now(),
      institutionId: institution.id
    };
    setTimetable((prev) => [...prev, newEntry]);

    addToast({
      type: 'success',
      title: 'Lecture Scheduled',
      message: `${entryData.subjectName} allocated to ${entryData.roomName} on ${entryData.dayOfWeek}.`
    });

    return { success: true };
  };

  const deleteTimetableEntry = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
    addToast({
      type: 'info',
      title: 'Timetable Entry Removed',
      message: 'Slot has been freed.'
    });
  };

  const resetToOfficialTimetable = () => {
    setTimetable(initialTimetable);
    setRooms(initialClassrooms);
    setAttendance(initialAttendance);
    setCalendarEvents(initialCalendarEvents);
    setNotices(initialNotices);
    localStorage.setItem('eduflow_timetable', JSON.stringify(initialTimetable));
    localStorage.setItem('eduflow_rooms', JSON.stringify(initialClassrooms));
    localStorage.setItem('eduflow_attendance', JSON.stringify(initialAttendance));
    localStorage.setItem('eduflow_events', JSON.stringify(initialCalendarEvents));
    localStorage.setItem('eduflow_notices', JSON.stringify(initialNotices));
    addToast({
      type: 'success',
      title: 'Official Timetable Restored',
      message: 'Active schedule reset to Indira College of Engineering & Management (ICEM) S.Y. 2026-27 Version 5.'
    });
  };

  // Assignments
  const createAssignment = (asgData: Omit<Assignment, 'id' | 'status'>) => {
    const newAsg: Assignment = {
      ...asgData,
      id: 'asg-' + Date.now(),
      status: 'due_soon'
    };
    setAssignments((prev) => [newAsg, ...prev]);

    // Notify all students in this subject
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'assignment',
      priority: 'high',
      title: `New Assignment: ${newAsg.title}`,
      message: `Prof. posted "${newAsg.title}" in ${newAsg.subjectName}. Due: ${newAsg.dueDate} ${newAsg.dueTime}.`,
      timestamp: 'Just now',
      read: false,
      link: '/student/assignments'
    };
    setNotifications((prev) => [notif, ...prev]);

    // Add to Calendar
    setCalendarEvents((prev) => [
      ...prev,
      {
        id: 'ev-' + Date.now(),
        title: `${newAsg.subjectCode}: ${newAsg.title} Due`,
        category: 'Assignment',
        date: newAsg.dueDate.includes('-') ? newAsg.dueDate : new Date().toISOString().split('T')[0],
        startTime: newAsg.dueTime,
        subjectName: newAsg.subjectName,
        color: '#ef4444'
      }
    ]);

    addToast({
      type: 'success',
      title: 'Assignment Published',
      message: `Enrolled students notified of "${newAsg.title}".`
    });
  };

  const submitAssignment = (
    assignmentId: string,
    fileName: string,
    fileSize: string,
    notes?: string
  ) => {
    const asg = assignments.find((a) => a.id === assignmentId);
    const newSubm: AssignmentSubmission = {
      id: 'subm-' + Date.now(),
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || 'BE-CS-042',
      submittedAt: 'Just now',
      fileName,
      fileSize,
      fileUrl: '#',
      notes,
      status: 'submitted'
    };
    setSubmissions((prev) => [newSubm, ...prev]);

    // Update assignment status for current student
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status: 'submitted' } : a))
    );

    // Notify teacher
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'assignment',
      priority: 'normal',
      title: `Submission Received: ${asg?.title || 'Assignment'}`,
      message: `${currentUser.name} (${currentUser.rollNumber}) uploaded ${fileName}.`,
      timestamp: 'Just now',
      read: false,
      link: '/teacher/assignments'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast({
      type: 'success',
      title: 'Assignment Submitted!',
      message: `Your file "${fileName}" was successfully recorded with timestamp.`
    });
  };

  const gradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, grade, feedback, status: 'graded' }
          : s
      )
    );

    const subm = submissions.find((s) => s.id === submissionId);
    if (subm) {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === subm.assignmentId
            ? { ...a, status: 'graded', grade, teacherFeedback: feedback }
            : a
        )
      );

      // Student notification
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        type: 'assignment',
        priority: 'normal',
        title: 'Assignment Graded',
        message: `Your submission for assignment has been evaluated. Marks: ${grade}. Feedback: "${feedback}"`,
        timestamp: 'Just now',
        read: false,
        link: '/student/grades'
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    addToast({
      type: 'success',
      title: 'Graded Successfully',
      message: `Recorded grade ${grade} with teacher feedback.`
    });
  };

  // Study Materials
  const uploadStudyMaterial = (
    matData: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadCount'>
  ) => {
    const newMat: StudyMaterial = {
      ...matData,
      id: 'mat-' + Date.now(),
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 1,
      bookmarked: false
    };
    setMaterials((prev) => [newMat, ...prev]);

    // Student notification
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'material',
      priority: 'normal',
      title: `New Study Material in ${newMat.subjectName}`,
      message: `Prof. uploaded "${newMat.title}" (${newMat.materialType.toUpperCase()}) in ${newMat.unit}.`,
      timestamp: 'Just now',
      read: false,
      link: '/student/materials'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast({
      type: 'success',
      title: 'Material Uploaded',
      message: `Added "${newMat.title}" to digital classroom library.`
    });
  };

  const toggleBookmarkMaterial = (materialId: string) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === materialId ? { ...m, bookmarked: !m.bookmarked } : m
      )
    );
  };

  // Announcements
  const publishAnnouncement = (
    ancData: Omit<ClassroomAnnouncement, 'id' | 'publishDate' | 'authorName' | 'authorRole'>
  ) => {
    const newAnc: ClassroomAnnouncement = {
      ...ancData,
      id: 'anc-' + Date.now(),
      publishDate: 'Just now',
      authorName: currentUser.name,
      authorRole: currentUser.role === 'ADMIN' ? 'Administration' : 'Course Instructor',
      authorAvatar: currentUser.avatar
    };
    setAnnouncements((prev) => [newAnc, ...prev]);

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'announcement',
      priority: newAnc.priority === 'urgent' ? 'urgent' : newAnc.priority === 'important' ? 'high' : 'normal',
      title: `Classroom Announcement: ${newAnc.subjectName}`,
      message: newAnc.title,
      timestamp: 'Just now',
      read: false,
      link: `/student/classrooms/${newAnc.classroomId}`
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast({
      type: 'success',
      title: 'Announcement Published',
      message: `Posted to ${newAnc.subjectName} feed.`
    });
  };

  const publishInstitutionalNotice = (
    noticeData: Omit<InstitutionalNotice, 'id' | 'institutionId' | 'publishDate' | 'authorName'>
  ) => {
    const newNotice: InstitutionalNotice = {
      ...noticeData,
      id: 'not-' + Date.now(),
      institutionId: institution.id,
      publishDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      authorName: currentUser.name,
      read: false
    };
    setNotices((prev) => [newNotice, ...prev]);

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'notice',
      priority: newNotice.priority === 'urgent' ? 'urgent' : 'high',
      title: `Campus Notice: ${newNotice.title}`,
      message: newNotice.content.substring(0, 120) + '...',
      timestamp: 'Just now',
      read: false,
      link: '/student/notices'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast({
      type: 'success',
      title: 'Official Notice Published',
      message: `Dispatched to ${newNotice.targetAudience === 'all' ? 'all campus members' : newNotice.targetAudience}.`
    });
  };

  // Discussions
  const createDiscussionPost = (classroomId: string, title: string, content: string, tag?: string) => {
    const sub = subjects.find((s) => s.id === classroomId);
    const newPost: DiscussionPost = {
      id: 'disc-' + Date.now(),
      classroomId,
      subjectName: sub?.name || 'Classroom Discussion',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'STUDENT' ? 'student' : 'teacher',
      authorAvatar: currentUser.avatar,
      title,
      content,
      createdAt: 'Just now',
      pinned: false,
      officialAnswer: false,
      likes: 0,
      userLiked: false,
      tag: tag || 'General Question',
      comments: []
    };
    setDiscussions((prev) => [newPost, ...prev]);

    addToast({
      type: 'success',
      title: 'Question Posted',
      message: 'Your discussion thread is live for peers and faculty.'
    });
  };

  const addDiscussionComment = (postId: string, content: string) => {
    const isTeacher = currentUser.role === 'TEACHER';
    const comment = {
      id: 'comm-' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'STUDENT' ? ('student' as const) : ('teacher' as const),
      authorAvatar: currentUser.avatar,
      content,
      createdAt: 'Just now',
      isOfficial: isTeacher
    };

    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            officialAnswer: isTeacher ? true : p.officialAnswer,
            comments: [...p.comments, comment]
          };
        }
        return p;
      })
    );

    addToast({
      type: 'info',
      title: 'Response Added',
      message: isTeacher ? 'Your answer is marked as Official Answer ✓' : 'Comment added to thread.'
    });
  };

  const toggleOfficialAnswer = (postId: string, commentId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = p.comments.map((c) =>
            c.id === commentId ? { ...c, isOfficial: !c.isOfficial } : c
          );
          const hasOfficial = updatedComments.some((c) => c.isOfficial);
          return {
            ...p,
            officialAnswer: hasOfficial,
            comments: updatedComments
          };
        }
        return p;
      })
    );
  };

  const toggleLikePost = (postId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const userLiked = !p.userLiked;
          return {
            ...p,
            userLiked,
            likes: userLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      })
    );
  };

  // Record Attendance
  const recordStudentAttendance = (subjectId: string, _studentId: string, present: boolean) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.subjectId === subjectId) {
          const attended = present ? item.attended + 1 : item.attended;
          const missed = present ? item.missed : item.missed + 1;
          const total = item.total + 1;
          const percentage = Math.round((attended / total) * 100);
          return {
            ...item,
            attended,
            missed,
            total,
            percentage,
            status: percentage < 75 ? (percentage < 65 ? 'critical' : 'warning') : 'safe'
          };
        }
        return item;
      })
    );

    addToast({
      type: 'success',
      title: 'Attendance Recorded',
      message: present ? 'Marked as Present (+1 lecture)' : 'Marked as Absent'
    });
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'All Cleared',
      message: 'All notifications marked as read.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        searchModalOpen,
        setSearchModalOpen,
        searchQuery,
        setSearchQuery,
        currentUser,
        users,
        setCurrentUser,
        switchRole,
        login,
        logout,
        institution,
        registerInstitution,
        rooms,
        subjects,
        timetable,
        assignments,
        submissions,
        materials,
        announcements,
        discussions,
        notices,
        attendance,
        grades,
        reports,
        notifications,
        calendarEvents,
        updateClassroomSchedule,
        submitClassroomReport,
        verifyClassroomReport,
        dismissClassroomReport,
        addTimetableEntry,
        deleteTimetableEntry,
        resetToOfficialTimetable,
        createAssignment,
        submitAssignment,
        gradeSubmission,
        uploadStudyMaterial,
        toggleBookmarkMaterial,
        publishAnnouncement,
        publishInstitutionalNotice,
        createDiscussionPost,
        addDiscussionComment,
        toggleOfficialAnswer,
        toggleLikePost,
        recordStudentAttendance,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
