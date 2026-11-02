import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { currentPath, navigate } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'How it Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => handleNav('/')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <Logo size="md" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Auth / Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav('/login')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => handleNav('/register-institution')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
          >
            <span>Register Institution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => handleNav('/login')}
            className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg"
          >
            Sign In
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNav('/login')}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-800"
            >
              Sign In to Your Campus
            </button>
            <button
              onClick={() => handleNav('/register-institution')}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 shadow-md shadow-blue-500/20"
            >
              Register Your Institution
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
