import React from 'react';
import { Activity, ShieldCheck, ArrowUp, Heart } from 'lucide-react';
import { AcademicNotice } from './AcademicNotice';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'My Health', id: 'my-health' },
    { label: 'Health Records', id: 'health-records' },
    { label: 'AI Health', id: 'ai-health' },
    { label: 'Appointments', id: 'appointments' },
    { label: 'Medications', id: 'medications' },
    { label: 'Emergency Care', id: 'emergency' },
    { label: 'Find Care', id: 'find-care' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Support & Help', id: 'support' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      
      {/* Notice in Footer */}
      <div className="border-b border-slate-900/80 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AcademicNotice />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                <Activity className="w-4 h-4 text-teal-400" />
              </div>
              <span className="font-extrabold text-base tracking-tight">
                CareConnect
              </span>
            </div>

            <p className="text-sm font-semibold text-teal-400">
              Smart Healthcare Platform
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              CareConnect brings your health information, connected devices, appointments, health insights, and healthcare services together in one simple, accessible platform.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Connected Devices · Health Insights · Telemetry
              </span>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              CareConnect Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-slate-400 hover:text-teal-400 transition-colors text-xs"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Policy & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] text-slate-400 space-y-1 md:text-right">
              <div className="flex flex-wrap md:justify-end gap-2">
                <span className="hover:text-teal-400 cursor-pointer">Privacy</span>
                <span>·</span>
                <span className="hover:text-teal-400 cursor-pointer">Security</span>
                <span>·</span>
                <span className="hover:text-teal-400 cursor-pointer">Support</span>
                <span>·</span>
                <span className="hover:text-teal-400 cursor-pointer">Emergency Information</span>
                <span>·</span>
                <span className="hover:text-teal-400 cursor-pointer">Terms</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 CareConnect Smart Healthcare Platform. All rights reserved.
          </div>
          <div className="text-center sm:text-right font-mono text-teal-400/90 font-medium">
            Academic Demonstration — Sample Data Only — Not for clinical decision-making.
          </div>
        </div>

      </div>
    </footer>
  );
};
