import {
  Institution,
  User,
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
  CalendarEvent
} from '../types';

export const initialInstitution: Institution = {
  id: 'inst-icem-001',
  name: 'Indira College of Engineering and Management (ICEM)',
  code: 'ICEM-EN6179',
  type: 'College',
  email: 'info@indiraicem.ac.in',
  phone: '+91 (02114) 661500 / 661600',
  address: 'Sector No. 64, Parandwadi, Off Pune-Mumbai Expressway, Taluka Maval',
  city: 'Pune',
  state: 'Maharashtra',
  country: 'India',
  website: 'https://indiraicem.ac.in',
  adminName: 'Dr. Arvind Sharma',
  adminEmail: 'timetable.committee@indiraicem.ac.in',
  createdAt: '2026-06-15'
};

export const initialUsers: User[] = [
  {
    id: 'user-student-1',
    name: 'Yash Markante',
    email: 'markanteyash@gmail.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Computer Engineering',
    division: 'S.Y. Computer Engineering - Div A (Batch S2)',
    rollNumber: 'SY-CS-042',
    enrolledSubjectIds: [
      'sub-cs201', // DM
      'sub-cs202', // DSA
      'sub-cs203', // OOP
      'sub-cs204', // CG
      'sub-cs205', // DELD
      'sub-cs206', // DSL
      'sub-cs207', // OOP&CGL
      'sub-cs208', // DELDL
      'sub-cs209'  // BCS & PBL
    ]
  },
  {
    id: 'user-teacher-1',
    name: 'Prof. Rajesh Patil',
    email: 'rajesh.patil@indiraicem.ac.in',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Computer Engineering',
    title: 'Associate Professor & Class Teacher (S.Y. Div A)',
    assignedSubjectIds: ['sub-cs202', 'sub-cs206']
  },
  {
    id: 'user-teacher-2',
    name: 'Prof. Sneha Kulkarni',
    email: 'sneha.kulkarni@indiraicem.ac.in',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Computer Engineering',
    title: 'Assistant Professor (OOP & Software Systems)',
    assignedSubjectIds: ['sub-cs203', 'sub-cs207']
  },
  {
    id: 'user-teacher-3',
    name: 'Prof. Nilesh Shinde',
    email: 'nilesh.shinde@indiraicem.ac.in',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Computer Engineering',
    title: 'Assistant Professor & Timetable Coordinator',
    assignedSubjectIds: ['sub-cs205', 'sub-cs208']
  },
  {
    id: 'user-teacher-4',
    name: 'Prof. Pooja More',
    email: 'pooja.more@indiraicem.ac.in',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Computer Engineering',
    title: 'Assistant Professor (Graphics & Soft Skills Lead)',
    assignedSubjectIds: ['sub-cs204', 'sub-cs209']
  },
  {
    id: 'user-teacher-5',
    name: 'Prof. Deshmukh',
    email: 'deshmukh.math@indiraicem.ac.in',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Applied Science & Mathematics',
    title: 'Assistant Professor (Discrete Mathematics & Stats)',
    assignedSubjectIds: ['sub-cs201']
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Arvind Sharma',
    email: 'arvind.sharma@indiraicem.ac.in',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    institutionId: 'inst-icem-001',
    department: 'Academic Operations & HOD Computer Engineering',
    title: 'HOD Computer Engineering & Timetable Committee Chairperson'
  }
];

export const initialClassrooms: ClassroomRoom[] = [
  {
    id: 'room-204',
    building: 'Academic Block (Main)',
    floor: '2nd Floor',
    roomNumber: 'Room 204',
    roomType: 'Lecture Hall',
    capacity: 75,
    status: 'occupied',
    equipment: [
      'Interactive Smart Board',
      'Ceiling Full HD Projector',
      'Acoustic Sound & Collar Mic',
      'Air Conditioned',
      'Smart Instructor Podium'
    ]
  },
  {
    id: 'room-205',
    building: 'Academic Block (Main)',
    floor: '2nd Floor',
    roomNumber: 'Room 205',
    roomType: 'Lecture Hall',
    capacity: 65,
    status: 'available',
    equipment: ['Dual Projectors', 'Surround Sound', 'Smart Podium', 'Whiteboard Grid']
  },
  {
    id: 'room-cslab2',
    building: 'Computer Lab Wing',
    floor: 'Ground Floor',
    roomNumber: 'CS Lab 2 (DSA Lab)',
    roomType: 'Computer Lab',
    capacity: 40,
    status: 'occupied',
    equipment: [
      '40 Linux/Ubuntu Workstations',
      'GCC/Clang Compiler Suite',
      'Dual Projectors',
      'Instructor Console',
      'High-Speed LAN'
    ]
  },
  {
    id: 'room-cslab1',
    building: 'Computer Lab Wing',
    floor: 'Ground Floor',
    roomNumber: 'CS Lab 1 (OOP Lab)',
    roomType: 'Computer Lab',
    capacity: 40,
    status: 'available',
    equipment: [
      '40 Windows/Eclipse & JDK Workstations',
      'Gigabit LAN',
      'Instructor Screen Broadcast System'
    ]
  },
  {
    id: 'room-cslab3',
    building: 'Computer Lab Wing',
    floor: '1st Floor',
    roomNumber: 'CS Lab 3 (Graphics Lab)',
    roomType: 'Computer Lab',
    capacity: 35,
    status: 'available',
    equipment: [
      '35 GPU Accelerated Workstations',
      'OpenGL & Blender Design Suite',
      'Color-calibrated Displays'
    ]
  },
  {
    id: 'room-hwlab',
    building: 'Electronics & Hardware Block',
    floor: '1st Floor',
    roomNumber: 'Hardware & DELD Lab',
    roomType: 'Computer Lab',
    capacity: 35,
    status: 'available',
    equipment: [
      'Digital IC Trainer Kits',
      'Dual-Trace Oscilloscopes',
      'Logic State Analyzers',
      'Breadboard Prototyping Units'
    ]
  },
  {
    id: 'room-langlab',
    building: 'Central Academic Block',
    floor: '2nd Floor',
    roomNumber: 'Language & Soft Skills Lab',
    roomType: 'Tutorial Room',
    capacity: 40,
    status: 'available',
    equipment: ['Language Audio Headsets', 'Interactive Phonetics Software', 'Overhead Projector']
  },
  {
    id: 'room-seminar1',
    building: 'Main Academic Block',
    floor: 'Ground Floor',
    roomNumber: 'Seminar Hall 1',
    roomType: 'Seminar Hall',
    capacity: 150,
    status: 'available',
    equipment: ['Tiered Auditorium Seating', 'Stage Lighting', 'Wireless Mic System', 'Laser Projection']
  }
];

export const initialSubjects: Subject[] = [
  {
    id: 'sub-cs201',
    name: 'Discrete Mathematics',
    code: '210241 (DM)',
    department: 'Computer Engineering',
    color: '#059669', // Emerald
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    credits: 4,
    roomNumber: 'Room 204',
    building: 'Academic Block (Main)',
    nextLectureTime: 'Today, 08:45 AM - 09:45 AM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs202',
    name: 'Data Structures & Algorithms',
    code: '210242 (DSA)',
    department: 'Computer Engineering',
    color: '#2563eb', // Blue
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    credits: 4,
    roomNumber: 'Room 204',
    building: 'Academic Block (Main)',
    nextLectureTime: 'Today, 09:45 AM - 10:45 AM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs203',
    name: 'Object Oriented Programming',
    code: '210243 (OOP)',
    department: 'Computer Engineering',
    color: '#0d9488', // Teal
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    credits: 3,
    roomNumber: 'Room 204',
    building: 'Academic Block (Main)',
    nextLectureTime: 'Today, 11:00 AM - 12:00 PM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs204',
    name: 'Computer Graphics',
    code: '210244 (CG)',
    department: 'Computer Engineering',
    color: '#8b5cf6', // Violet
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    credits: 3,
    roomNumber: 'Room 204',
    building: 'Academic Block (Main)',
    nextLectureTime: 'Tomorrow, 08:45 AM - 09:45 AM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs205',
    name: 'Digital Electronics & Logic Design',
    code: '210245 (DELD)',
    department: 'Computer Engineering',
    color: '#ea580c', // Orange
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    credits: 3,
    roomNumber: 'Room 205', // Relocated from 204 for scheduled audio test
    building: 'Academic Block (Main)',
    nextLectureTime: 'Today, 12:00 PM - 01:00 PM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs206',
    name: 'Data Structures Laboratory',
    code: '210246 (DSL)',
    department: 'Computer Engineering',
    color: '#1d4ed8', // Dark Blue
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    credits: 2,
    roomNumber: 'CS Lab 2',
    building: 'Computer Lab Wing',
    nextLectureTime: 'Today, 01:45 PM - 03:45 PM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs207',
    name: 'OOP & Computer Graphics Laboratory',
    code: '210247 (OOP&CGL)',
    department: 'Computer Engineering',
    color: '#0891b2', // Cyan
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    credits: 2,
    roomNumber: 'CS Lab 1',
    building: 'Computer Lab Wing',
    nextLectureTime: 'Wednesday, 01:45 PM - 03:45 PM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs208',
    name: 'Digital Electronics Laboratory',
    code: '210248 (DELDL)',
    department: 'Computer Engineering',
    color: '#c2410c', // Rust
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    credits: 1,
    roomNumber: 'Hardware Lab',
    building: 'Electronics Block',
    nextLectureTime: 'Thursday, 01:45 PM - 03:45 PM',
    division: 'S.Y. Div A'
  },
  {
    id: 'sub-cs209',
    name: 'Business Communication & PBL',
    code: '210249 (BCS&PBL)',
    department: 'Computer Engineering',
    color: '#475569', // Slate
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    credits: 1,
    roomNumber: 'Seminar Hall 1',
    building: 'Main Academic Block',
    nextLectureTime: 'Wednesday, 03:45 PM - 04:45 PM',
    division: 'S.Y. Div A'
  }
];

export const initialTimetable: TimetableEntry[] = [
  // ================= MONDAY =================
  {
    id: 'tt-mon-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics (DM)',
    subjectCode: '210241',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Monday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'completed',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms (DSA)',
    subjectCode: '210242',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Monday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'live',
    type: 'Lecture'
  },
  // Recess: 10:45 - 11:00 AM
  {
    id: 'tt-mon-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming (OOP)',
    subjectCode: '210243',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Monday',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design (DELD)',
    subjectCode: '210245',
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    roomId: 'room-205',
    roomName: 'Room 205',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Monday',
    startTime: '12:00',
    endTime: '13:00',
    status: 'moved',
    originalRoomName: 'Room 204',
    changeReason: 'Interactive Smart Board & Audio Podium recalibration in Room 204',
    changedAt: 'Today, 10:15 AM',
    changedBy: 'Timetable Committee / HOD Computer',
    type: 'Lecture'
  },
  // Lunch Break: 13:00 - 13:45
  {
    id: 'tt-mon-5',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs207',
    subjectName: 'OOP Lab (Batch S2: Roll 21-40)',
    subjectCode: '210247',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-cslab1',
    roomName: 'CS Lab 1 (OOP Lab)',
    building: 'Computer Lab Wing',
    dayOfWeek: 'Monday',
    startTime: '13:45',
    endTime: '15:45',
    status: 'scheduled',
    batch: 'Batch S2',
    type: 'Practical'
  },
  {
    id: 'tt-mon-6',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Teacher Guardian (TG) & Student Mentoring',
    subjectCode: 'TG-201',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Monday',
    startTime: '15:45',
    endTime: '16:45',
    status: 'scheduled',
    type: 'Mentoring'
  },

  // ================= TUESDAY =================
  {
    id: 'tt-tue-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics (CG)',
    subjectCode: '210244',
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Tuesday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics (DM)',
    subjectCode: '210241',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Tuesday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms (DSA)',
    subjectCode: '210242',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Tuesday',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design (DELD)',
    subjectCode: '210245',
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Tuesday',
    startTime: '12:00',
    endTime: '13:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-5',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs206',
    subjectName: 'Data Structures Lab (Batch S2: Roll 21-40)',
    subjectCode: '210246',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-cslab2',
    roomName: 'CS Lab 2 (DSA Lab)',
    building: 'Computer Lab Wing',
    dayOfWeek: 'Tuesday',
    startTime: '13:45',
    endTime: '15:45',
    status: 'scheduled',
    batch: 'Batch S2',
    type: 'Practical'
  },
  {
    id: 'tt-tue-6',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs203',
    subjectName: 'Remedial & Code Optimization Tutorial',
    subjectCode: '210243-TUT',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Tuesday',
    startTime: '15:45',
    endTime: '16:45',
    status: 'scheduled',
    type: 'Tutorial'
  },

  // ================= WEDNESDAY =================
  {
    id: 'tt-wed-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming (OOP)',
    subjectCode: '210243',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Wednesday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms (DSA)',
    subjectCode: '210242',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Wednesday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics (DM)',
    subjectCode: '210241',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Wednesday',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics (CG)',
    subjectCode: '210244',
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Wednesday',
    startTime: '12:00',
    endTime: '13:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-5',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics Lab (Batch S2: Roll 21-40)',
    subjectCode: '210247',
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    roomId: 'room-cslab3',
    roomName: 'CS Lab 3 (Graphics Lab)',
    building: 'Computer Lab Wing',
    dayOfWeek: 'Wednesday',
    startTime: '13:45',
    endTime: '15:45',
    status: 'scheduled',
    batch: 'Batch S2',
    type: 'Practical'
  },
  {
    id: 'tt-wed-6',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs209',
    subjectName: 'Business Communication & Presentation Skills',
    subjectCode: '210249',
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    roomId: 'room-seminar1',
    roomName: 'Seminar Hall 1',
    building: 'Main Academic Block',
    dayOfWeek: 'Wednesday',
    startTime: '15:45',
    endTime: '16:45',
    status: 'scheduled',
    type: 'Seminar'
  },

  // ================= THURSDAY =================
  {
    id: 'tt-thu-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design (DELD)',
    subjectCode: '210245',
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Thursday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming (OOP)',
    subjectCode: '210243',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Thursday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms (DSA)',
    subjectCode: '210242',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Thursday',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics (DM)',
    subjectCode: '210241',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Thursday',
    startTime: '12:00',
    endTime: '13:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-5',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs208',
    subjectName: 'DELD Hardware Lab (Batch S2: Roll 21-40)',
    subjectCode: '210248',
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    roomId: 'room-hwlab',
    roomName: 'Hardware & DELD Lab',
    building: 'Electronics Block',
    dayOfWeek: 'Thursday',
    startTime: '13:45',
    endTime: '15:45',
    status: 'scheduled',
    batch: 'Batch S2',
    type: 'Practical'
  },
  {
    id: 'tt-thu-6',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs209',
    subjectName: 'Project Based Learning (PBL) Mentoring',
    subjectCode: '210249-PBL',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Thursday',
    startTime: '15:45',
    endTime: '16:45',
    status: 'scheduled',
    type: 'Tutorial'
  },

  // ================= FRIDAY =================
  {
    id: 'tt-fri-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics (CG)',
    subjectCode: '210244',
    teacherId: 'user-teacher-4',
    teacherName: 'Prof. Pooja More',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Friday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design (DELD)',
    subjectCode: '210245',
    teacherId: 'user-teacher-3',
    teacherName: 'Prof. Nilesh Shinde',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Friday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming (OOP)',
    subjectCode: '210243',
    teacherId: 'user-teacher-2',
    teacherName: 'Prof. Sneha Kulkarni',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Friday',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics (DM)',
    subjectCode: '210241',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Friday',
    startTime: '12:00',
    endTime: '13:00',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-5',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs206',
    subjectName: 'Technical Activity / Competitive Coding Club',
    subjectCode: 'CLUB-CS',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-cslab2',
    roomName: 'CS Lab 2 (DSA Lab)',
    building: 'Computer Lab Wing',
    dayOfWeek: 'Friday',
    startTime: '13:45',
    endTime: '15:45',
    status: 'scheduled',
    type: 'Practical'
  },
  {
    id: 'tt-fri-6',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'Weekly Academic Review & Departmental Forum',
    subjectCode: 'FORUM-01',
    teacherId: 'user-admin-1',
    teacherName: 'Dr. Arvind Sharma',
    roomId: 'room-seminar1',
    roomName: 'Seminar Hall 1',
    building: 'Main Academic Block',
    dayOfWeek: 'Friday',
    startTime: '15:45',
    endTime: '16:45',
    status: 'scheduled',
    type: 'Seminar'
  },

  // ================= SATURDAY =================
  {
    id: 'tt-sat-1',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs202',
    subjectName: 'DSA Problem Solving & Advanced Trees Revision',
    subjectCode: '210242-REV',
    teacherId: 'user-teacher-1',
    teacherName: 'Prof. Rajesh Patil',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Saturday',
    startTime: '08:45',
    endTime: '09:45',
    status: 'scheduled',
    type: 'Lecture'
  },
  {
    id: 'tt-sat-2',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics Tutorial & Problem Solving',
    subjectCode: '210241-TUT',
    teacherId: 'user-teacher-5',
    teacherName: 'Prof. Deshmukh',
    roomId: 'room-204',
    roomName: 'Room 204',
    building: 'Academic Block (Main)',
    dayOfWeek: 'Saturday',
    startTime: '09:45',
    endTime: '10:45',
    status: 'scheduled',
    type: 'Tutorial'
  },
  {
    id: 'tt-sat-3',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs209',
    subjectName: 'Expert Industry Seminar & Tech Webinar',
    subjectCode: 'IND-WEBINAR',
    teacherId: 'user-admin-1',
    teacherName: 'Dr. Arvind Sharma & Guest Experts',
    roomId: 'room-seminar1',
    roomName: 'Seminar Hall 1',
    building: 'Main Academic Block',
    dayOfWeek: 'Saturday',
    startTime: '11:00',
    endTime: '13:00',
    status: 'scheduled',
    type: 'Seminar'
  },
  {
    id: 'tt-sat-4',
    institutionId: 'inst-icem-001',
    division: 'S.Y. Div A',
    subjectId: 'sub-cs207',
    subjectName: 'Sports & Co-curricular / Library Research Hours',
    subjectCode: 'EXTRA-01',
    teacherId: 'user-teacher-4',
    teacherName: 'Faculty Coordinators',
    roomId: 'room-langlab',
    roomName: 'Language & Soft Skills Lab',
    building: 'Central Academic Block',
    dayOfWeek: 'Saturday',
    startTime: '13:00',
    endTime: '14:30',
    status: 'scheduled',
    type: 'Mentoring'
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: 'asg-001',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: '210242',
    title: 'Assignment 2: Doubly Linked Lists & Floyd Cycle Detection',
    description: 'Implement singly linked list, doubly linked list with sentinel nodes, and Floyd\'s Cycle-Finding Algorithm in C++ with space and time complexity derivations.',
    maxMarks: 50,
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    startDate: '2026-09-20',
    allowLate: true,
    status: 'due_soon',
    attachments: [
      { name: 'DSA_Assignment_2_Specification.pdf', url: '#', size: '1.2 MB' },
      { name: 'LinkedList_Test_Cases.zip', url: '#', size: '450 KB' }
    ],
    submissionInstructions: 'Upload a single PDF containing your source code screenshots and complexity derivation, plus a zipped source file.'
  },
  {
    id: 'asg-002',
    classroomId: 'sub-cs203',
    subjectName: 'Object Oriented Programming',
    subjectCode: '210243',
    title: 'Assignment 3: Polymorphism & Virtual Functions in C++',
    description: 'Design an academic employee payroll hierarchy demonstrating pure virtual functions, runtime polymorphism, and template exception handlers.',
    maxMarks: 50,
    dueDate: '02 Oct 2026',
    dueTime: '05:00 PM',
    startDate: '2026-09-24',
    allowLate: false,
    status: 'due_soon',
    attachments: [
      { name: 'OOP_Payroll_Polymorphism_Guidelines.pdf', url: '#', size: '980 KB' }
    ],
    submissionInstructions: 'Submit your compiled C++ solution file (.cpp) and class diagram documentation.'
  },
  {
    id: 'asg-003',
    classroomId: 'sub-cs201',
    subjectName: 'Discrete Mathematics',
    subjectCode: '210241',
    title: 'Assignment 1: Propositional Logic & Set Theory Proofs',
    description: 'Solve problem set covering mathematical induction, relations, equivalence classes, and pigeonhole principle proofs.',
    maxMarks: 40,
    dueDate: '20 Sep 2026',
    dueTime: '11:59 PM',
    startDate: '2026-09-10',
    allowLate: true,
    status: 'submitted',
    attachments: [
      { name: 'DM_Problem_Set_1.pdf', url: '#', size: '1.8 MB' }
    ],
    grade: 38,
    teacherFeedback: 'Well structured proofs! Good handling of inductive hypothesis step.'
  },
  {
    id: 'asg-004',
    classroomId: 'sub-cs204',
    subjectName: 'Computer Graphics',
    subjectCode: '210244',
    title: 'Assignment 1: Bresenham Line & Circle Generation Algorithms',
    description: 'Implement Bresenham\'s line drawing algorithm and midpoint circle drawing algorithm in OpenGL/C++ without floating point operations.',
    maxMarks: 30,
    dueDate: '16 Sep 2026',
    dueTime: '05:00 PM',
    startDate: '2026-09-08',
    allowLate: false,
    status: 'submitted',
    attachments: [{ name: 'CG_Rasterization_Spec.pdf', url: '#', size: '820 KB' }],
    grade: 29,
    teacherFeedback: 'Excellent mathematical derivation and smooth raster output.'
  }
];

export const initialSubmissions: AssignmentSubmission[] = [
  {
    id: 'subm-001',
    assignmentId: 'asg-003',
    studentId: 'user-student-1',
    studentName: 'Yash Markante',
    studentRoll: 'SY-CS-042',
    submittedAt: '19 Sep 2026, 09:30 PM',
    fileName: 'Yash_Markante_DM_Assignment1.pdf',
    fileSize: '2.4 MB',
    fileUrl: '#',
    grade: 38,
    feedback: 'Well structured proofs! Good handling of inductive hypothesis step.',
    status: 'graded'
  },
  {
    id: 'subm-002',
    assignmentId: 'asg-004',
    studentId: 'user-student-1',
    studentName: 'Yash Markante',
    studentRoll: 'SY-CS-042',
    submittedAt: '15 Sep 2026, 04:12 PM',
    fileName: 'Yash_Markante_Bresenham_Circle.zip',
    fileSize: '1.6 MB',
    fileUrl: '#',
    grade: 29,
    feedback: 'Excellent mathematical derivation and smooth raster output.',
    status: 'graded'
  }
];

export const initialStudyMaterials: StudyMaterial[] = [
  {
    id: 'mat-001',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: '210242',
    title: 'Unit 2: Linear Data Structures, Stacks & Queues Master Notes',
    description: 'Comprehensive lecture handouts with C++ implementations of Array and Linked List based stacks, evaluation of postfix expressions, and circular queues.',
    unit: 'Unit 2',
    materialType: 'pdf',
    fileUrl: '#',
    fileName: 'DSA_Unit2_Stacks_Queues_Notes.pdf',
    fileSize: '4.2 MB',
    uploadDate: '24 Sep 2026',
    downloadCount: 68,
    bookmarked: true
  },
  {
    id: 'mat-002',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: '210242',
    title: 'Unit 3: Doubly Linked Lists & Circular References Slide Deck',
    description: 'Interactive presentation slides used in lectures covering memory representation, insertion, deletion, and Floyd loop detection.',
    unit: 'Unit 3',
    materialType: 'ppt',
    fileUrl: '#',
    fileName: 'DSA_Unit3_LinkedList_Lectures.pptx',
    fileSize: '6.5 MB',
    uploadDate: '26 Sep 2026',
    downloadCount: 54,
    bookmarked: false
  },
  {
    id: 'mat-003',
    classroomId: 'sub-cs203',
    subjectName: 'Object Oriented Programming',
    subjectCode: '210243',
    title: 'Unit 1 & 2: Object Oriented Concepts & Constructor Mechanics',
    description: 'Deep dive into copy constructors, deep vs shallow copies, static members, and `this` pointer in modern C++.',
    unit: 'Unit 1',
    materialType: 'pdf',
    fileUrl: '#',
    fileName: 'OOP_Unit1_Constructors_DeepCopy.pdf',
    fileSize: '3.1 MB',
    uploadDate: '21 Sep 2026',
    downloadCount: 72,
    bookmarked: true
  },
  {
    id: 'mat-004',
    classroomId: 'sub-cs201',
    subjectName: 'Discrete Mathematics',
    subjectCode: '210241',
    title: 'Unit 1: Set Theory, Relations, Functions & Induction Cheat Sheet',
    description: 'Formulas, standard truth tables, and equivalence relation verification templates for SPPU end-sem examinations.',
    unit: 'Unit 1',
    materialType: 'pdf',
    fileUrl: '#',
    fileName: 'DM_Unit1_Formula_Cheatsheet.pdf',
    fileSize: '1.9 MB',
    uploadDate: '18 Sep 2026',
    downloadCount: 88,
    bookmarked: true
  },
  {
    id: 'mat-005',
    classroomId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design',
    subjectCode: '210245',
    title: 'Unit 2: Karnaugh Map (K-Map) Minimization & Quine-McCluskey Method',
    description: 'Handout on 4-variable and 5-variable K-maps with don\'t care conditions and tabular minimization method.',
    unit: 'Unit 2',
    materialType: 'pdf',
    fileUrl: '#',
    fileName: 'DELD_Unit2_KMap_Minimization.pdf',
    fileSize: '2.8 MB',
    uploadDate: '22 Sep 2026',
    downloadCount: 61,
    bookmarked: false
  }
];

export const initialAnnouncements: ClassroomAnnouncement[] = [
  {
    id: 'ann-001',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    title: 'Assignment 2 Submission Portal Open & Clarification',
    content: 'Doubly Linked List & Floyd\'s cycle detection assignment is now live. Please review test cases attached in assignment instructions. No handwritten submissions permitted.',
    priority: 'important',
    publishDate: '25 Sep 2026',
    authorName: 'Prof. Rajesh Patil',
    authorRole: 'Class Teacher & Subject Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    attachments: [{ name: 'Assignment2_Clarification_Notes.pdf', size: '320 KB' }]
  },
  {
    id: 'ann-002',
    classroomId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design',
    title: 'Classroom Relocation Notice for Today\'s 12:00 PM Lecture',
    content: 'Please note: Today\'s 12:00 PM DELD lecture will be conducted in Room 205 (adjacent) instead of Room 204 due to scheduled smart board calibration.',
    priority: 'urgent',
    publishDate: 'Today, 10:15 AM',
    authorName: 'Prof. Nilesh Shinde',
    authorRole: 'Timetable Coordinator',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialDiscussions: DiscussionPost[] = [
  {
    id: 'disc-001',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    authorId: 'user-student-1',
    authorName: 'Yash Markante',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Should Assignment 2 be handwritten or submitted as code + PDF report?',
    content: 'Sir, do we need to handwrite the cycle detection algorithm trace on paper and scan it, or is a typed PDF report with code snippets and execution screenshots acceptable?',
    createdAt: 'Today, 08:45 AM',
    pinned: true,
    officialAnswer: true,
    likes: 8,
    userLiked: true,
    tag: 'Assignment Clarification',
    comments: [
      {
        id: 'comm-001',
        authorId: 'user-teacher-1',
        authorName: 'Prof. Rajesh Patil',
        authorRole: 'teacher',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'No handwritten submission needed. Submit the typed PDF along with your source code ZIP directly through EduFlow portal.',
        createdAt: 'Today, 09:12 AM',
        isOfficial: true
      },
      {
        id: 'comm-002',
        authorId: 'user-student-2',
        authorName: 'Aarav Mehta',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        content: 'Thank you Sir! That saves a lot of time.',
        createdAt: 'Today, 09:18 AM'
      }
    ]
  },
  {
    id: 'disc-002',
    classroomId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    authorId: 'user-student-3',
    authorName: 'Riya Sen',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Question regarding Floyd\'s Cycle Detection Time Complexity',
    content: 'When the fast pointer moves at 2 steps and slow at 1 step, why is the worst-case time complexity O(n) even when the loop start point is near the end?',
    createdAt: 'Yesterday, 03:20 PM',
    pinned: false,
    officialAnswer: true,
    likes: 5,
    userLiked: false,
    tag: 'Concept Doubt',
    comments: [
      {
        id: 'comm-003',
        authorId: 'user-teacher-1',
        authorName: 'Prof. Rajesh Patil',
        authorRole: 'teacher',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'Because in each step after entering the cycle of length C, the relative distance between slow and fast reduces by exactly 1. Hence fast will catch slow in at most C steps, where C <= n.',
        createdAt: 'Yesterday, 04:30 PM',
        isOfficial: true
      }
    ]
  }
];

export const initialNotices: InstitutionalNotice[] = [
  {
    id: 'not-001',
    institutionId: 'inst-icem-001',
    title: 'Official Notification: S.Y. Timetable Version 5.0 Effective w.e.f. September 2026',
    content: 'The revised Academic Timetable Version 5.0 for Second Year (S.Y.) Computer Engineering has been officially published by the ICEM Timetable Committee. All theory sessions will be conducted in Room 204 (Academic Block) and batch-wise practicals in CS Labs 1, 2, 3 and Hardware Lab. Students are requested to refer to their EduFlow schedule.',
    category: 'Important',
    priority: 'urgent',
    publishDate: '26 Sep 2026',
    authorName: 'Dr. Arvind Sharma (Timetable Chairperson)',
    targetAudience: 'all',
    attachment: 'SY_26-27_Time_Table_Version 5.pdf',
    read: false
  },
  {
    id: 'not-002',
    institutionId: 'inst-icem-001',
    title: 'Government MahaDBT & National Merit Scholarship Application Portal Open',
    content: 'All eligible students with family income under prescribed limits can submit their verified documentation for state & national merit scholarships. Final portal submission deadline is 30 September 2026. Submit hard copies to Student Welfare Section.',
    category: 'Scholarships',
    priority: 'urgent',
    publishDate: '26 Sep 2026',
    authorName: 'Student Welfare & Finance Office',
    targetAudience: 'students',
    attachment: 'Scholarship_Guidelines_2026.pdf',
    read: false
  },
  {
    id: 'not-003',
    institutionId: 'inst-icem-001',
    title: 'Mid-Semester In-Sem Examination Schedule Notification (SPPU Pattern)',
    content: 'The official schedule for SPPU In-Sem Examinations for S.Y. Computer Engineering (30 Marks per subject) will commence in the second week of October. Hall tickets and seating plans will be issued digitally on EduFlow.',
    category: 'Examination',
    priority: 'high',
    publishDate: '24 Sep 2026',
    authorName: 'Controller of Examinations',
    targetAudience: 'all',
    read: true
  },
  {
    id: 'not-004',
    institutionId: 'inst-icem-001',
    title: 'Gandhi Jayanti Campus Holiday',
    content: 'The institution campus and administrative offices will remain closed on Friday, 2nd October on the occasion of Gandhi Jayanti. Regular schedule resumes on Saturday.',
    category: 'Holidays',
    priority: 'normal',
    publishDate: '22 Sep 2026',
    authorName: 'Registrar Office',
    targetAudience: 'all',
    read: true
  }
];

export const initialAttendance: StudentAttendance[] = [
  {
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics',
    subjectCode: '210241',
    attended: 24,
    missed: 2,
    total: 26,
    percentage: 92,
    minimumRequired: 75,
    status: 'safe'
  },
  {
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: '210242',
    attended: 25,
    missed: 1,
    total: 26,
    percentage: 96,
    minimumRequired: 75,
    status: 'safe'
  },
  {
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming',
    subjectCode: '210243',
    attended: 22,
    missed: 3,
    total: 25,
    percentage: 88,
    minimumRequired: 75,
    status: 'safe'
  },
  {
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics',
    subjectCode: '210244',
    attended: 20,
    missed: 3,
    total: 23,
    percentage: 87,
    minimumRequired: 75,
    status: 'safe'
  },
  {
    subjectId: 'sub-cs205',
    subjectName: 'Digital Electronics & Logic Design',
    subjectCode: '210245',
    attended: 19,
    missed: 4,
    total: 23,
    percentage: 83,
    minimumRequired: 75,
    status: 'safe'
  },
  {
    subjectId: 'sub-cs206',
    subjectName: 'Data Structures Laboratory',
    subjectCode: '210246',
    attended: 12,
    missed: 0,
    total: 12,
    percentage: 100,
    minimumRequired: 75,
    status: 'safe'
  }
];

export const initialGrades: GradeItem[] = [
  {
    id: 'grd-01',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    title: 'Assignment 1: Big-O Complexity Analysis',
    type: 'Assignment',
    score: 48,
    maxScore: 50,
    percentage: 96,
    grade: 'A+',
    date: '10 Sep 2026',
    status: 'graded'
  },
  {
    id: 'grd-02',
    subjectId: 'sub-cs202',
    subjectName: 'Data Structures & Algorithms',
    title: 'Quiz 1: Stack & Queue Applications',
    type: 'Quiz',
    score: 19,
    maxScore: 20,
    percentage: 95,
    grade: 'A+',
    date: '18 Sep 2026',
    status: 'graded'
  },
  {
    id: 'grd-03',
    subjectId: 'sub-cs201',
    subjectName: 'Discrete Mathematics',
    title: 'Assignment 1: Logic & Induction Proofs',
    type: 'Assignment',
    score: 38,
    maxScore: 40,
    percentage: 95,
    grade: 'A+',
    date: '19 Sep 2026',
    status: 'graded'
  },
  {
    id: 'grd-04',
    subjectId: 'sub-cs204',
    subjectName: 'Computer Graphics',
    title: 'Assignment 1: Rasterization Line & Circle',
    type: 'Assignment',
    score: 29,
    maxScore: 30,
    percentage: 97,
    grade: 'A+',
    date: '15 Sep 2026',
    status: 'graded'
  },
  {
    id: 'grd-05',
    subjectId: 'sub-cs203',
    subjectName: 'Object Oriented Programming',
    title: 'Unit 1 Practical Viva & Evaluation',
    type: 'Practical',
    score: 24,
    maxScore: 25,
    percentage: 96,
    grade: 'A+',
    date: '20 Sep 2026',
    status: 'graded'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-001',
    type: 'classroom_change',
    priority: 'urgent',
    title: 'Classroom Relocation: DELD Today at 12:00 PM',
    message: 'Digital Electronics (DELD) lecture moved from Room 204 to Room 205 due to scheduled smart board calibration.',
    timestamp: 'Today, 10:15 AM',
    read: false,
    link: '/student/schedule',
    meta: {
      oldRoom: 'Room 204',
      newRoom: 'Room 205',
      subject: 'Digital Electronics & Logic Design (DELD)',
      reason: 'Interactive Smart Board & Audio Podium recalibration in Room 204',
      updatedBy: 'Timetable Committee / HOD Computer'
    }
  },
  {
    id: 'notif-002',
    type: 'class_starting',
    priority: 'normal',
    title: 'Live Lecture in Progress',
    message: 'Data Structures & Algorithms with Prof. Rajesh Patil is currently live in Room 204.',
    timestamp: 'Today, 09:45 AM',
    read: false,
    link: '/student/classrooms/sub-cs202'
  },
  {
    id: 'notif-003',
    type: 'assignment',
    priority: 'high',
    title: 'Assignment Deadline Tomorrow',
    message: 'Linked List Implementation assignment in Data Structures is due tomorrow at 11:59 PM.',
    timestamp: 'Today, 08:00 AM',
    read: false,
    link: '/student/assignments'
  },
  {
    id: 'notif-004',
    type: 'notice',
    priority: 'urgent',
    title: 'S.Y. Timetable Version 5.0 Active',
    message: 'Official ICEM S.Y. 2026-27 Version 5 schedule is active across all academic portals.',
    timestamp: 'Yesterday, 04:00 PM',
    read: true,
    link: '/student/schedule'
  }
];

export const initialReports: ClassroomReport[] = [
  {
    id: 'rep-001',
    studentId: 'user-student-1',
    studentName: 'Yash Markante',
    studentRoll: 'SY-CS-042',
    division: 'S.Y. Div A',
    subjectName: 'Digital Electronics & Logic Design',
    reportedRoom: 'Room 204',
    currentScheduledRoom: 'Room 204',
    reportType: 'equipment_issue',
    notes: 'The interactive smart board touch grid is being recalibrated by the technical support team.',
    reportedAt: 'Today, 10:05 AM',
    status: 'verified',
    resolvedRoom: 'Room 205',
    resolvedNote: 'Verified with technician. Relocated session to Room 205.'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-01',
    title: 'Data Structures & Algorithms Lecture',
    category: 'Lecture',
    date: '2026-09-28',
    startTime: '09:45',
    endTime: '10:45',
    subjectName: 'Data Structures & Algorithms',
    location: 'Room 204',
    color: '#2563eb'
  },
  {
    id: 'ev-02',
    title: 'OOP Practical Lab (Batch S2)',
    category: 'Practical',
    date: '2026-09-28',
    startTime: '13:45',
    endTime: '15:45',
    subjectName: 'Object Oriented Programming',
    location: 'CS Lab 1',
    color: '#0d9488'
  },
  {
    id: 'ev-03',
    title: 'DSA Assignment 2 Deadline',
    category: 'Assignment',
    date: '2026-09-29',
    startTime: '23:59',
    subjectName: 'Data Structures & Algorithms',
    color: '#ef4444',
    description: 'Doubly linked lists & Floyd cycle detection code submission'
  },
  {
    id: 'ev-04',
    title: 'MahaDBT Scholarship Form Deadline',
    category: 'Event',
    date: '2026-09-30',
    startTime: '17:00',
    location: 'Student Welfare Cell',
    color: '#f59e0b'
  },
  {
    id: 'ev-05',
    title: 'Gandhi Jayanti (Holiday)',
    category: 'Holiday',
    date: '2026-10-02',
    color: '#10b981',
    description: 'National Campus Holiday'
  },
  {
    id: 'ev-06',
    title: 'SPPU In-Sem Examinations Begin',
    category: 'Exam',
    date: '2026-10-12',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Room 204 / Room 205',
    color: '#8b5cf6'
  }
];
