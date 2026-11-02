import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Building, Briefcase, Award } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const { currentUser, institution, subjects } = useApp();

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-teal-500/10 shadow-md"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {currentUser.role}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentUser.title || 'Course Lead'}
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentUser.name}
            </h1>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                <span>{currentUser.department}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                <span>{institution.name} ({institution.code})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
