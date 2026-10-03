import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Menu, 
  X, 
  Search, 
  Bell, 
  AlertTriangle, 
  Check, 
  ChevronRight,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import { AppNotification } from '../types';

interface NavbarProps {
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  notifications,
  onMarkNotificationRead,
  onOpenSearch,
  isDarkMode,
  toggleDarkMode,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'my-health', label: 'My Health' },
    { id: 'health-records', label: 'Health Records' },
    { id: 'ai-health', label: 'AI Health' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'medications', label: 'Medications' },
    { id: 'emergency', label: 'Emergency', isAlert: true },
    { id: 'find-care', label: 'Find Care' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'support', label: 'Support' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setShowNotificationDrawer(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 text-white group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-teal-300 transition-colors">
              CareConnect
            </span>
            <span className="hidden sm:inline-block text-[10px] text-teal-400/90 font-medium ml-2 px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              Healthcare Assistant
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  item.isAlert
                    ? isActive
                      ? 'text-rose-200 bg-rose-500/20 border border-rose-500/40 font-bold'
                      : 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
                    : isActive
                      ? 'text-teal-300 bg-teal-500/15 border border-teal-500/30 font-bold'
                      : 'hover:text-white hover:bg-slate-900/80'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Notification, Emergency Quick, Theme, Mobile Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-colors"
            title="Search healthcare information"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Search...</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white relative transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-slate-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotificationDrawer && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowNotificationDrawer(false)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">
                    Notifications & Reminders ({unreadCount} new)
                  </span>
                  <span className="text-[10px] text-teal-400 font-medium">Demo Alerts</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-xl border text-xs transition-all ${
                        notif.read
                          ? 'bg-slate-950/40 border-slate-800/80 opacity-70'
                          : 'bg-slate-950 border-teal-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold ${notif.read ? 'text-slate-300' : 'text-teal-300'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed mb-2">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/50">
                        {notif.actionUrl ? (
                          <button
                            onClick={() => {
                              setShowNotificationDrawer(false);
                              handleNavClick(notif.actionUrl!.replace('#', ''));
                            }}
                            className="text-[10px] font-semibold text-teal-400 hover:underline flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : <span />}
                        {!notif.read && (
                          <button
                            onClick={() => onMarkNotificationRead(notif.id)}
                            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isDarkMode ? 'Switch theme surface' : 'Switch theme surface'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-400" />}
          </button>

          {/* Emergency Quick Action */}
          <button
            onClick={() => handleNavClick('emergency')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-200 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 rounded-lg transition-all active:scale-95"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    item.isAlert
                      ? 'text-rose-300 bg-rose-500/15 border border-rose-500/30'
                      : isActive
                        ? 'text-teal-300 bg-teal-500/15 border border-teal-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">CareConnect Smart Healthcare</span>
            <button
              onClick={() => handleNavClick('emergency')}
              className="text-rose-400 font-bold flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Emergency Help →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
