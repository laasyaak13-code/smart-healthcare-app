import React from 'react';
import { 
  Heart, 
  Activity, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Watch,
  Pill,
  Clock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { PATIENT_PROFILE } from '../data/mockData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:py-20 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Welcome Card for First-Time Users */}
        <div className="mb-8 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-slate-900/80 to-slate-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">👋</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Welcome to CareConnect
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Use CareConnect to check your health information, manage appointments, view health records, receive reminders and find healthcare services.
            </p>
          </div>
          <button
            onClick={() => onNavigate('my-health')}
            className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-teal-500/20 shrink-0 active:scale-95 flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            CareConnect
          </h1>
          <p className="mt-2 text-xl sm:text-2xl font-bold text-teal-400 tracking-tight">
            “Your healthcare, smarter and simpler.”
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            CareConnect brings your health information, connected devices, appointments, health insights and healthcare services together in one simple platform.
          </p>

          {/* 4 Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('my-health')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/25 flex items-center gap-2 active:scale-95"
            >
              <Activity className="w-4 h-4" />
              <span>View My Health</span>
            </button>

            <button
              onClick={() => onNavigate('appointments')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 transition-all flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => onNavigate('find-care')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 transition-all flex items-center gap-2 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Find Care</span>
            </button>

            <button
              onClick={() => onNavigate('emergency')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Emergency Help</span>
            </button>
          </div>
        </div>

        {/* Health Summary Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">
                  Personal Health Snapshot
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Patient: {PATIENT_PROFILE.name}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Current Health Status: <span className="text-emerald-400">Good & Stable</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Smartwatch Synced 2m ago</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Heart Rate</span>
                <Heart className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                72 <span className="text-xs font-normal text-slate-400">bpm</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Normal Range</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Blood Oxygen</span>
                <Activity className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                98% <span className="text-xs font-normal text-slate-400">SpO₂</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Optimal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Blood Pressure</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                118/76
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Target Goal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Daily Activity</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                7,420
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">92% of step goal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Temperature</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                36.8°C
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Normal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Sleep Last Night</span>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                7h 35m
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Restful</span>
            </div>

          </div>

          {/* Upcoming Appointment Banner inside Snapshot */}
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">
                  Upcoming Appointment
                </span>
                <p className="text-sm font-semibold text-white">
                  Routine Health Check-Up with Dr. Evelyn Carter
                </p>
                <span className="text-xs text-slate-400">
                  Tomorrow, Oct 4 at 10:30 AM · CareConnect Central Medical
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('appointments')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all shrink-0"
            >
              View Appointment →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
