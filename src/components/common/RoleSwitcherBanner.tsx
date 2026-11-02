import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Briefcase, ShieldAlert, Sparkles, RefreshCw, ChevronDown, ChevronUp, BellRing } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentUser, switchRole, updateClassroomSchedule, timetable, rooms, addToast } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const simulateMove = () => {
    // Pick DELD or DSA lecture
    const targetEntry = timetable.find((t) => t.subjectCode === '210245' || t.subjectCode === '210242') || timetable[0];
    const destinationRoom = rooms.find((r) => r.roomNumber === 'Room 205' || r.roomNumber.includes('205')) || rooms[1];
    
    if (targetEntry && destinationRoom) {
      updateClassroomSchedule(
        targetEntry.id,
        destinationRoom.id,
        'Scheduled Smart Board recalibration & audio testing in original lecture hall'
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border-b border-slate-700/50 text-xs px-3 py-1.5 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Role Switcher
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Active: <strong className="text-white font-medium">{currentUser.name}</strong> ({currentUser.role})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => switchRole('STUDENT')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                currentUser.role === 'STUDENT'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Switch to Student Yash Markante"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => switchRole('TEACHER')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                currentUser.role === 'TEACHER'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Switch to Prof. Rajesh Patil"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Teacher</span>
            </button>

            <button
              onClick={() => switchRole('ADMIN')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                currentUser.role === 'ADMIN'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Switch to Dean Dr. Arvind Sharma"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Management</span>
            </button>
          </div>

          <button
            onClick={simulateMove}
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-md transition-colors font-medium shadow-xs"
            title="Simulate instant classroom relocation notification to all students"
          >
            <BellRing className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden md:inline">Test Classroom Move Alert</span>
            <span className="md:hidden">Move Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
