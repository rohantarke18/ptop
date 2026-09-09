import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Language } from '../../types';
import {
  Menu,
  X,
  FileSpreadsheet,
  PlusCircle,
  Search,
  Lightbulb,
  Vote,
  BarChart3,
  Globe,
  Bell,
  User,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, isAdminOrOfficer } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.howItWorks, path: '/how-it-works' },
    { label: t.nav.reportProblem, path: '/report' },
    { label: t.nav.trackProblem, path: '/track' },
    { label: t.nav.innovations, path: '/innovations' },
    { label: t.nav.consultations, path: '/consultations' },
    { label: t.nav.publicDashboard, path: '/public-dashboard' },
  ];

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'EN' },
    { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top micro-banner for institutional identity */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-medium text-slate-200">
            Civic Participation & Public Grievance Portal
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">
            {t.brand.tagline}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="text-slate-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span>{t.nav.adminLogin}</span>
          </Link>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-slate-900 hover:opacity-95 focus:outline-blue-600 rounded py-1"
            >
              {/* Refined civic symbol */}
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xs border border-slate-800">
                <span className="text-white font-serif tracking-tight">C</span>
                <span className="text-amber-500 font-serif tracking-tight">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight leading-none text-slate-900">
                  {t.brand.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide leading-tight mt-0.5">
                  {t.brand.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    active
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector (Always visible on navbar) */}
            <div className="relative">
              <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    type="button"
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      language === l.code
                        ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={`Switch language to ${l.label}`}
                  >
                    {l.nativeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification bell for logged-in user */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label={`Notifications (${unreadCount} unread)`}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </Link>
            )}

            {/* Auth / Dashboard CTA */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdminOrOfficer ? '/admin' : '/dashboard'}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-[120px]">{user?.name}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold px-3 py-1.5 rounded text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t.nav.login}
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.nav.reportProblem}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick language toggle on mobile */}
            <button
              type="button"
              onClick={() => {
                const nextLang = language === 'en' ? 'mr' : language === 'mr' ? 'hi' : 'en';
                setLanguage(nextLang);
              }}
              className="text-xs font-semibold px-2 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 uppercase"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-blue-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle main menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              {t.nav.menu}
            </span>
            <div className="flex items-center gap-1 text-xs">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-0.5 rounded text-xs ${
                    language === l.code ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-blue-700 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <Link
              to="/report"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-blue-600 text-white text-sm font-semibold shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.nav.reportProblem}</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center justify-between pt-1">
                <Link
                  to={isAdminOrOfficer ? '/admin' : '/dashboard'}
                  onClick={closeMobileMenu}
                  className="text-xs font-medium text-slate-800 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user?.name} ({t.nav.dashboard})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center py-2 px-4 rounded border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                {t.nav.login}
              </Link>
            )}

            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-500 hover:text-slate-800"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.adminLogin}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
