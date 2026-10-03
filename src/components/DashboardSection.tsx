import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Building2, 
  Activity, 
  Heart, 
  Clock, 
  Calendar, 
  Pill, 
  AlertTriangle, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  CLINIC_PATIENTS, 
  CLINIC_RESOURCES, 
  INITIAL_VITALS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_DEVICES 
} from '../data/mockData';
import { ClinicPatientRow, ClinicResourceItem } from '../types';

interface DashboardSectionProps {
  onNavigate: (sectionId: string) => void;
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ onNavigate, onShowToast }) => {
  const [activeDashboardView, setActiveDashboardView] = useState<'patient' | 'clinic'>('patient');
  const [clinicPatients, setClinicPatients] = useState<ClinicPatientRow[]>(CLINIC_PATIENTS);
  const [resources, setResources] = useState<ClinicResourceItem[]>(CLINIC_RESOURCES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic Refresh Handler
  const handleRefreshDashboard = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Mutate clinic patients slightly
      setClinicPatients(prev => prev.map(p => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const hr = Math.max(62, Math.min(130, p.heartRate + delta));
        return {
          ...p,
          heartRate: hr,
          lastUpdated: 'Just now',
        };
      }));

      // Mutate resource percentages
      setResources(prev => prev.map(r => {
        const diff = Math.floor(Math.random() * 3) - 1;
        const nextPct = Math.min(99, Math.max(30, r.percentage + diff));
        return {
          ...r,
          percentage: nextPct,
        };
      }));

      setIsRefreshing(false);
      onShowToast('Dashboard telemetry values refreshed.', 'success');
    }, 450);
  };

  const priorityColors = {
    'High Attention': 'text-rose-400 bg-rose-500/10 border-rose-500/30 font-bold',
    'Watch': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'Normal': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  };

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Health & Clinic Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              Healthcare Dashboard
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Switch between your personal health overview and the smart clinic coordination cockpit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher Pill */}
            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveDashboardView('patient')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeDashboardView === 'patient'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Patient View</span>
              </button>

              <button
                onClick={() => setActiveDashboardView('clinic')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeDashboardView === 'clinic'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Clinic View</span>
              </button>
            </div>

            <button
              onClick={handleRefreshDashboard}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all active:scale-95"
              title="Refresh simulated values"
            >
              <RefreshCw className={`w-4 h-4 text-teal-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* VIEW 1: PATIENT DASHBOARD */}
        {activeDashboardView === 'patient' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Quick Status Banners */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Overall Health Status */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">HEALTH STATUS</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  Overall Health: <span className="text-emerald-400">Normal</span>
                </div>
                <p className="text-xs text-slate-400">
                  Resting vitals and activity are well-aligned with personal baselines.
                </p>
              </div>

              {/* AI Health Insight */}
              <div className="p-5 rounded-2xl border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-teal-400 mb-2 font-mono">
                  <span className="font-bold uppercase tracking-wider text-[10px]">AI HEALTH OBSERVATION</span>
                  <Activity className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  Low Risk Profile (14/100)
                </div>
                <p className="text-xs text-slate-300">
                  Blood pressure is within target range after daily morning routine.
                </p>
              </div>

              {/* Connected Devices Status */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">WEARABLES & SENSORS</span>
                  <span className="text-xs text-teal-400 font-mono">4 of 5 Connected</span>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  CareWatch Pro 4 Synced
                </div>
                <p className="text-xs text-slate-400">
                  Transmitting real-time heart rate, steps, and sleep telemetry.
                </p>
              </div>

            </div>

            {/* Vitals Summary & Actions */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  Today's Physiological Readings
                </h3>
                <button
                  onClick={() => onNavigate('my-health')}
                  className="text-xs text-teal-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Detailed Trends</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {INITIAL_VITALS.slice(0, 4).map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">{v.name}</span>
                    <div className="text-2xl font-bold font-mono text-white tabular-nums">
                      {v.value} <span className="text-xs text-slate-400 font-sans">{v.unit}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Status: {v.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments and Medication Reminders Dual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Upcoming Appointment */}
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span>Next Medical Visit</span>
                    </h4>
                    <span className="text-xs text-teal-400 font-mono font-bold">Oct 4 · 10:30 AM</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4">
                    <div className="text-sm font-bold text-white">Dr. Evelyn Carter, MD</div>
                    <div className="text-xs text-slate-400">Internal Medicine · CareConnect Central Clinic</div>
                    <div className="text-xs text-slate-300 mt-2">Annual preventive screening & vitals review.</div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('appointments')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Manage Appointments
                </button>
              </div>

              {/* Medication Reminders */}
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Pill className="w-4 h-4 text-teal-400" />
                      <span>Medication Schedule</span>
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">1 of 3 Taken Today</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {INITIAL_PRESCRIPTIONS.slice(0, 2).map((rx) => (
                      <div key={rx.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white block">{rx.medicine} ({rx.dosage})</span>
                          <span className="text-[11px] text-slate-400">{rx.timeOfDay}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          rx.takenToday ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {rx.takenToday ? 'Taken' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('medications')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Open Medication Tracker
                </button>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: CLINIC DASHBOARD */}
        {activeDashboardView === 'clinic' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Explanatory Banner */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-200 text-xs sm:text-sm leading-relaxed">
              <strong>Smart Clinic Overview: </strong>
              This demonstration shows how healthcare systems can organize patients for review using sample health indicators and dynamically allocate clinic resources like beds and staff.
            </div>

            {/* Patient Prioritization Table */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Patient Prioritization Queue
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Patients categorized by vital sign stability and algorithmic risk indicators.
                  </p>
                </div>

                <span className="text-xs font-mono text-teal-400">
                  {clinicPatients.length} Active Inpatients Monitored
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4 text-center">Heart Rate</th>
                      <th className="py-3 px-4 text-center">SpO₂</th>
                      <th className="py-3 px-4 text-center">Blood Pressure</th>
                      <th className="py-3 px-4 text-center">Risk Tier</th>
                      <th className="py-3 px-4 text-center">Priority</th>
                      <th className="py-3 px-4 text-right">Last Signal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {clinicPatients.map((p) => (
                      <tr key={p.patientId} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4">
                          <span className="font-bold text-white block font-sans">{p.name}</span>
                          <span className="text-[11px] text-slate-400">{p.patientId} · {p.age}y</span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-teal-400">
                          {p.heartRate} bpm
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-teal-300">
                          {p.spo2}%
                        </td>
                        <td className="py-3 px-4 text-center text-slate-200">
                          {p.bloodPressure}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${priorityColors[p.riskLevel]}`}>
                            {p.riskLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold">
                          {p.priorityScore}/100
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 font-sans text-[11px]">
                          {p.lastUpdated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Smart Clinic Resources & Progress Bars */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Clinic Resources & Operational Capacity
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Dynamic occupancy tracking for facility beds, on-duty clinical staff, and appointment slots.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((res) => (
                  <div key={res.name} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-slate-300">{res.name}</span>
                      <span className="font-mono text-teal-400 font-bold">{res.percentage}%</span>
                    </div>

                    <div className="text-[11px] text-slate-400 mb-2">
                      {res.used} of {res.total} {res.unit}
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          res.percentage > 85 ? 'bg-amber-400' : 'bg-teal-500'
                        }`}
                        style={{ width: `${res.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
