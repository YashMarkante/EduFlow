import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterInstitutionPage } from './pages/auth/RegisterInstitutionPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentSchedule } from './pages/student/StudentSchedule';
import { StudentClassrooms } from './pages/student/StudentClassrooms';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentMaterials } from './pages/student/StudentMaterials';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentCalendar } from './pages/student/StudentCalendar';
import { StudentGrades } from './pages/student/StudentGrades';
import { StudentNotices } from './pages/student/StudentNotices';
import { StudentProfile } from './pages/student/StudentProfile';

// Classroom View
import { DigitalClassroomView } from './pages/classroom/DigitalClassroomView';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherSchedule } from './pages/teacher/TeacherSchedule';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { TeacherMaterials } from './pages/teacher/TeacherMaterials';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherAnnouncements } from './pages/teacher/TeacherAnnouncements';
import { TeacherProfile } from './pages/teacher/TeacherProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminTimetable } from './pages/admin/AdminTimetable';
import { AdminClassrooms } from './pages/admin/AdminClassrooms';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminFaculty } from './pages/admin/AdminFaculty';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminSubjects } from './pages/admin/AdminSubjects';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminSettings } from './pages/admin/AdminSettings';

const AppRouter: React.FC = () => {
  const { currentPath, currentUser } = useApp();

  // Normalize path without trailing slash if not root
  const cleanPath = currentPath.length > 1 && currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;

  // Public Routes (No AppLayout)
  if (cleanPath === '/' || cleanPath === '') {
    return <LandingPage />;
  }
  if (cleanPath === '/features') {
    return <FeaturesPage />;
  }
  if (cleanPath === '/solutions') {
    return <SolutionsPage />;
  }
  if (cleanPath === '/how-it-works') {
    return <HowItWorksPage />;
  }
  if (cleanPath === '/about') {
    return <AboutPage />;
  }
  if (cleanPath === '/contact') {
    return <ContactPage />;
  }
  if (cleanPath === '/login') {
    return <LoginPage />;
  }
  if (cleanPath === '/register-institution') {
    return <RegisterInstitutionPage />;
  }

  // Digital Classroom Dynamic Route: /student/classrooms/:id or /teacher/classrooms/:id
  if (cleanPath.startsWith('/student/classrooms/') || cleanPath.startsWith('/teacher/classrooms/')) {
    const parts = cleanPath.split('/');
    const classroomId = parts[3];
    return (
      <AppLayout>
        <DigitalClassroomView classroomId={classroomId} />
      </AppLayout>
    );
  }

  // Student Routes
  if (cleanPath === '/student/dashboard') {
    return (
      <AppLayout>
        <StudentDashboard />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/schedule') {
    return (
      <AppLayout>
        <StudentSchedule />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/classrooms') {
    return (
      <AppLayout>
        <StudentClassrooms />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/assignments') {
    return (
      <AppLayout>
        <StudentAssignments />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/materials') {
    return (
      <AppLayout>
        <StudentMaterials />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/attendance') {
    return (
      <AppLayout>
        <StudentAttendance />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/calendar') {
    return (
      <AppLayout>
        <StudentCalendar />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/grades') {
    return (
      <AppLayout>
        <StudentGrades />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/notices') {
    return (
      <AppLayout>
        <StudentNotices />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/discussion') {
    return (
      <AppLayout>
        <DigitalClassroomView />
      </AppLayout>
    );
  }
  if (cleanPath === '/student/profile') {
    return (
      <AppLayout>
        <StudentProfile />
      </AppLayout>
    );
  }

  // Teacher Routes
  if (cleanPath === '/teacher/dashboard') {
    return (
      <AppLayout>
        <TeacherDashboard />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/schedule') {
    return (
      <AppLayout>
        <TeacherSchedule />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/classrooms') {
    return (
      <AppLayout>
        <StudentClassrooms />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/assignments') {
    return (
      <AppLayout>
        <TeacherAssignments />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/materials') {
    return (
      <AppLayout>
        <TeacherMaterials />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/attendance') {
    return (
      <AppLayout>
        <TeacherAttendance />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/announcements') {
    return (
      <AppLayout>
        <TeacherAnnouncements />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/discussion') {
    return (
      <AppLayout>
        <DigitalClassroomView />
      </AppLayout>
    );
  }
  if (cleanPath === '/teacher/profile') {
    return (
      <AppLayout>
        <TeacherProfile />
      </AppLayout>
    );
  }

  // Admin Routes
  if (cleanPath === '/admin/dashboard') {
    return (
      <AppLayout>
        <AdminDashboard />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/timetable') {
    return (
      <AppLayout>
        <AdminTimetable />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/classrooms') {
    return (
      <AppLayout>
        <AdminClassrooms />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/reports') {
    return (
      <AppLayout>
        <AdminReports />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/analytics') {
    return (
      <AppLayout>
        <AdminAnalytics />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/faculty') {
    return (
      <AppLayout>
        <AdminFaculty />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/students' || cleanPath === '/admin/divisions') {
    return (
      <AppLayout>
        <AdminStudents />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/subjects') {
    return (
      <AppLayout>
        <AdminSubjects />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/announcements') {
    return (
      <AppLayout>
        <AdminAnnouncements />
      </AppLayout>
    );
  }
  if (cleanPath === '/admin/settings') {
    return (
      <AppLayout>
        <AdminSettings />
      </AppLayout>
    );
  }

  // Fallback to role-specific dashboard if logged in, or landing page
  if (currentUser.role === 'STUDENT') {
    return (
      <AppLayout>
        <StudentDashboard />
      </AppLayout>
    );
  }
  if (currentUser.role === 'TEACHER') {
    return (
      <AppLayout>
        <TeacherDashboard />
      </AppLayout>
    );
  }
  if (currentUser.role === 'ADMIN') {
    return (
      <AppLayout>
        <AdminDashboard />
      </AppLayout>
    );
  }

  return <LandingPage />;
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
        {/* Floating Quick Role Switcher Banner */}
        <RoleSwitcherBanner />

        {/* Global Search Dialog */}
        <GlobalSearchModal />

        {/* App Notification Toasts */}
        <ToastContainer />

        {/* Router Viewport */}
        <div className="flex-1 flex flex-col">
          <AppRouter />
        </div>
      </div>
    </AppProvider>
  );
}
