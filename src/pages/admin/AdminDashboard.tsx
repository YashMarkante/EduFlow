import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  GraduationCap,
  Building,
  CalendarDays,
  DoorOpen,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { EmergencyRoomChangeModal } from '../../components/common/EmergencyRoomChangeModal';

export const AdminDashboard: React.FC = () => {
  const {
    institution,
    rooms,
    timetable,
    reports,
    subjects,
    currentUser,
    navigate
  } = useApp();

  const [relocateModalOpen, setRelocateModalOpen] = useState(false);

  // Compute metrics
  const totalStudents = 420;
  const totalTeachers = 38;
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const availableRooms = rooms.filter((r) => r.status === 'available').length;
  const maintenanceRooms = rooms.filter((r) => r.status === 'maintenance').length;
  const todayClasses = timetable.filter((t) => t.dayOfWeek === 'Monday').length;
  const pendingReports = reports.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6 pb-12">
      <EmergencyRoomChangeModal
        isOpen={relocateModalOpen}
        onClose={() => setRelocateModalOpen(false)}
      />

      {/* ADMIN HERO HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Dean &amp; Operations Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Institutional Operations: {institution.code}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {institution.name} • Active Term: Fall Semester 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRelocateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Relocate Classroom</span>
          </button>
          <button
            onClick={() => navigate('/admin/timetable')}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Timetable Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KEY METRIC CARDS (Section 26 specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
            Total Students
          </span>
          <span className="text-2xl font-black text-slate-900">{totalStudents}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Enrolled full-time</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
            Faculty Members
          </span>
          <span className="text-2xl font-black text-slate-900">{totalTeachers}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Teaching staff</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
            Classes Today
          </span>
          <span className="text-2xl font-black text-blue-600">{todayClasses}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Scheduled Monday</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
            Occupied Rooms
          </span>
          <span className="text-2xl font-black text-indigo-600">{occupiedRooms}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">In active session</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
            Available Rooms
          </span>
          <span className="text-2xl font-black text-emerald-600">{availableRooms}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Ready for booking</span>
        </div>

        <div
          onClick={() => navigate('/admin/reports')}
          className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs hover:border-amber-300 cursor-pointer transition-colors"
        >
          <span className="text-[10px] font-extrabold uppercase text-amber-700 block mb-1">
            Pending Reports
          </span>
          <span className="text-2xl font-black text-amber-600">{pendingReports.length}</span>
          <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">Verify incidents →</span>
        </div>
      </div>

      {/* LIVE CAMPUS OVERVIEW & RECENT RELOCATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Active Classroom Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Physical Rooms &amp; Lab Utilization</h2>
              <p className="text-xs text-slate-500">Live campus status across buildings</p>
            </div>
            <button
              onClick={() => navigate('/admin/classrooms')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              All Classrooms ({rooms.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rooms.map((room) => {
              const isOccupied = room.status === 'occupied';
              const isMaintenance = room.status === 'maintenance';
              return (
                <div
                  key={room.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    isOccupied
                      ? 'bg-blue-50/40 border-blue-200'
                      : isMaintenance
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-emerald-50/40 border-emerald-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Room {room.roomNumber}</span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-white border text-slate-700">
                        {room.roomType}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {room.building} • Cap: {room.capacity}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isOccupied
                        ? 'bg-blue-100 text-blue-800'
                        : isMaintenance
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 col: Pending student reports needing admin verification */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Student Reports Verification</span>
              </h3>
              <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {pendingReports.length} Pending
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Only verified changes become official notifications to prevent misinformation.
            </p>

            <div className="space-y-3 pt-1">
              {pendingReports.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <span>No unverified incidents reported</span>
                </div>
              ) : (
                pendingReports.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={() => navigate('/admin/reports')}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{rep.studentName}</span>
                      <span className="text-[10px] text-slate-400">{rep.reportedAt}</span>
                    </div>
                    <div className="text-xs text-amber-900 font-semibold">
                      {rep.subjectName} in {rep.reportedRoom}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{rep.notes}</p>
                    <div className="text-[10px] font-bold text-blue-600 pt-1">
                      Verify &amp; Relocate Room →
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
