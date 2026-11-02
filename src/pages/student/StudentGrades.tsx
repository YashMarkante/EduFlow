import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, TrendingUp, CheckCircle2, BookOpen } from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const { grades, subjects, currentUser } = useApp();

  const totalScore = grades.reduce((acc, g) => acc + g.score, 0);
  const totalMax = grades.reduce((acc, g) => acc + g.maxScore, 0);
  const avgPercentage = Math.round((totalScore / totalMax) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Academic Evaluation Scorecard</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Grades &amp; Performance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Cumulative performance for {currentUser.name} ({currentUser.rollNumber}) • Current Semester
        </p>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Current GPA / CGPA
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">8.92</span>
            <span className="text-xs text-slate-400 font-semibold">/ 10.0</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-2">
            First Class with Distinction
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Average Score Percentage
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgPercentage}%</span>
            <span className="text-xs text-slate-400 font-semibold">Across all assessments</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${avgPercentage}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
            Evaluated Submissions
          </span>
          <span className="text-3xl font-black text-emerald-600">{grades.length}</span>
          <span className="text-xs text-slate-400 block mt-1">Assignments, Quizzes &amp; Vivas</span>
        </div>
      </div>

      {/* DETAILED GRADES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Assessment Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-2">Subject</th>
                <th className="py-3 px-2">Assessment Title</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2 text-right">Score</th>
                <th className="py-3 px-2 text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {grades.map((grd) => (
                <tr key={grd.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-900">{grd.subjectName}</td>
                  <td className="py-3 px-2 text-slate-800">{grd.title}</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {grd.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-400">{grd.date}</td>
                  <td className="py-3 px-2 text-right font-black text-slate-900">
                    {grd.score} / {grd.maxScore}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {grd.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
