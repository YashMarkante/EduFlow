import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'dark'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Brand Icon: Interconnected flowing rings / academic gradient badge */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-teal-500 text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20 shrink-0 ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5/8 h-5/8"
        >
          {/* Graduation cap base + dynamic flow wave */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" opacity="0.9" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
        </span>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <div className={`flex items-baseline font-black tracking-tight ${textSizes[size]}`}>
            <span className={theme === 'light' ? 'text-white' : 'text-slate-900'}>Edu</span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Flow</span>
          </div>
          <span className={`text-[9px] font-semibold tracking-wider uppercase mt-0.5 ${theme === 'light' ? 'text-slate-300' : 'text-slate-400'}`}>
            Smart Campus OS
          </span>
        </div>
      )}
    </div>
  );
};
