import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, GraduationCap, Building, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentUser, institution, subjects, attendance } = useApp();

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-blue-500/10 shadow-md"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {currentUser.role}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Roll No: {currentUser.rollNumber}
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentUser.name}
            </h1>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentUser.department} • {currentUser.division}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{institution.name} ({institution.code})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ENROLLED SUBJECTS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Enrolled Semester V Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-extrabold text-blue-700 block">{sub.code}</span>
                <span className="font-bold text-slate-900">{sub.name}</span>
                <span className="text-slate-400 block text-[11px]">{sub.teacherName}</span>
              </div>
              <span className="font-bold text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                {sub.credits} Credits
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
