import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  FileText,
  BookOpen,
  Calendar,
  CheckSquare,
  Award,
  Bell,
  User as UserIcon,
  LogOut,
  Search,
  MessageSquare,
  AlertTriangle,
  Building,
  Users,
  Grid,
  BarChart3,
  Settings,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { ReportClassroomModal } from '../common/ReportClassroomModal';
import { EmergencyRoomChangeModal } from '../common/EmergencyRoomChangeModal';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentUser,
    institution,
    currentPath,
    navigate,
    logout,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setSearchModalOpen
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);

  interface NavItem {
    label: string;
    path: string;
    icon: any;
    badge?: string;
  }

  // Navigation Items per role
  const studentNav: NavItem[] = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Schedule', path: '/student/schedule', icon: CalendarDays },
    { label: 'My Classrooms', path: '/student/classrooms', icon: GraduationCap },
    { label: 'Assignments', path: '/student/assignments', icon: FileText, badge: '3' },
    { label: 'Study Materials', path: '/student/materials', icon: BookOpen },
    { label: 'Discussions', path: '/student/discussion', icon: MessageSquare },
    { label: 'Calendar', path: '/student/calendar', icon: Calendar },
    { label: 'Attendance', path: '/student/attendance', icon: CheckSquare },
    { label: 'Grades', path: '/student/grades', icon: Award },
    { label: 'Campus Notices', path: '/student/notices', icon: Bell },
    { label: 'Student Profile', path: '/student/profile', icon: UserIcon }
  ];

  const teacherNav: NavItem[] = [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Teaching Schedule', path: '/teacher/schedule', icon: CalendarDays },
    { label: 'My Classrooms', path: '/teacher/classrooms', icon: GraduationCap },
    { label: 'Assignments & Grading', path: '/teacher/assignments', icon: FileText },
    { label: 'Study Materials', path: '/teacher/materials', icon: BookOpen },
    { label: 'Mark Attendance', path: '/teacher/attendance', icon: CheckSquare },
    { label: 'Announcements', path: '/teacher/announcements', icon: Bell },
    { label: 'Class Discussions', path: '/teacher/discussion', icon: MessageSquare },
    { label: 'Faculty Profile', path: '/teacher/profile', icon: UserIcon }
  ];

  const adminNav: NavItem[] = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Timetable Manager', path: '/admin/timetable', icon: CalendarDays },
    { label: 'Rooms & Labs', path: '/admin/classrooms', icon: Building },
    { label: 'Faculty Roster', path: '/admin/faculty', icon: Users },
    { label: 'Students & Divisions', path: '/admin/students', icon: GraduationCap },
    { label: 'Curriculum & Subjects', path: '/admin/subjects', icon: Grid },
    { label: 'Official Notices', path: '/admin/announcements', icon: Bell },
    { label: 'Classroom Reports', path: '/admin/reports', icon: AlertTriangle, badge: '1' },
    { label: 'Campus Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Institution Settings', path: '/admin/settings', icon: Settings }
  ];

  const navItems =
    currentUser.role === 'STUDENT'
      ? studentNav
      : currentUser.role === 'TEACHER'
      ? teacherNav
      : adminNav;

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Modals */}
      <ReportClassroomModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
      <EmergencyRoomChangeModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-2"
          >
            <Logo size="sm" />
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs">
            <span className="font-bold text-slate-800 truncate max-w-[220px] lg:max-w-xs">
              {institution.name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100/80">
              {institution.code}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs transition-colors border border-slate-200/60"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Quick Search...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Quick Issue / Relocate action button */}
          {currentUser.role === 'STUDENT' ? (
            <button
              onClick={() => setReportModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition-all shadow-xs"
              title="Report if room is occupied or teacher has not arrived"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Report Room Issue</span>
            </button>
          ) : (
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 transition-all shadow-xs"
              title="Emergency relocation of classroom with instant notification"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Relocate Classroom</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-[11px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                      {unreadNotifications.length} new
                    </span>
                  </div>
                  {unreadNotifications.length > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 6).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.link) navigate(notif.link);
                        setNotificationsOpen(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.type === 'classroom_change' ? (
                          <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                            <RefreshCw className="w-4 h-4" />
                          </div>
                        ) : notif.type === 'assignment' ? (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                            <FileText className="w-4 h-4" />
                          </div>
                        ) : notif.type === 'material' ? (
                          <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Bell className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {notif.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/student/notices');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View All Institutional Notices →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 shadow-xs"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {currentUser.role}
                </div>
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                  <div className="mt-1 inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {currentUser.department}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate(currentUser.role === 'STUDENT' ? '/student/profile' : currentUser.role === 'TEACHER' ? '/teacher/profile' : '/admin/settings');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile &amp; Preferences</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Public Website</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200/80 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mb-4 px-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
              {currentUser.role === 'STUDENT' ? 'Academic Portal' : currentUser.role === 'TEACHER' ? 'Faculty Suite' : 'Campus Administration'}
            </span>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path.includes('/classrooms') && currentPath.startsWith('/student/classrooms/'));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Help / Bottom Card */}
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-100/60 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>EduFlow Sync</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Timetable, classroom rooms, and notifications are synced live across all student &amp; faculty screens.
            </p>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white p-4 shadow-2xl z-50 animate-in slide-in-from-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-3 px-2">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500">{currentUser.role} • {institution.code}</div>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto pt-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN VIEWPORT CONTENT */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {currentUser.role === 'STUDENT' ? (
          <>
            <button
              onClick={() => navigate('/student/dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/student/dashboard' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Today</span>
            </button>
            <button
              onClick={() => navigate('/student/schedule')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/student/schedule' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <button
              onClick={() => navigate('/student/classrooms')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath.includes('/student/classrooms') ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Classes</span>
            </button>
            <button
              onClick={() => navigate('/student/assignments')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/student/assignments' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tasks</span>
            </button>
            <button
              onClick={() => navigate('/student/materials')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/student/materials' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Notes</span>
            </button>
          </>
        ) : currentUser.role === 'TEACHER' ? (
          <>
            <button
              onClick={() => navigate('/teacher/dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/teacher/dashboard' ? 'text-teal-600' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Classes</span>
            </button>
            <button
              onClick={() => navigate('/teacher/schedule')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/teacher/schedule' ? 'text-teal-600' : 'text-slate-500'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <button
              onClick={() => navigate('/teacher/assignments')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/teacher/assignments' ? 'text-teal-600' : 'text-slate-500'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Grading</span>
            </button>
            <button
              onClick={() => navigate('/teacher/attendance')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/teacher/attendance' ? 'text-teal-600' : 'text-slate-500'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Attendance</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/admin/dashboard' ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => navigate('/admin/timetable')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/admin/timetable' ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Timetable</span>
            </button>
            <button
              onClick={() => navigate('/admin/classrooms')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/admin/classrooms' ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Rooms</span>
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold ${
                currentPath === '/admin/reports' ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Reports</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
