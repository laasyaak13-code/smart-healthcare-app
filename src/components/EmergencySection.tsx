import React from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  ShieldAlert, 
  Heart, 
  Activity, 
  Clock, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PATIENT_PROFILE } from '../data/mockData';

interface EmergencySectionProps {
  onNavigate: (sectionId: string) => void;
  onSelectFacility?: (facilityId: string) => void;
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({ onNavigate, onSelectFacility, onShowToast }) => {
  const sampleAlerts = [
    {
      id: 'em-1',
      title: 'High Heart Rate Detected',
      metric: 'Heart Rate: 122 bpm',
      desc: 'Resting pulse exceeded safe clinical threshold for more than 5 minutes.',
      action: 'Rest in a seated position. If paired with chest tightness, seek immediate emergency care.',
      urgency: 'Critical Attention',
    },
    {
      id: 'em-2',
      title: 'Low Oxygen Reading',
      metric: 'SpO₂: 89% (Below 92% goal)',
      desc: 'Pulse oximeter sensor captured acute desaturation during resting monitoring.',
      action: 'Check device sensor placement. If shortness of breath persists, proceed to the nearest emergency room.',
      urgency: 'Urgent Care',
    },
    {
      id: 'em-3',
      title: 'Unusual Sensor Reading',
      metric: 'Blood Pressure: 158/98 mmHg',
      desc: 'Systolic and diastolic pressures significantly higher than your personal baseline.',
      action: 'Re-test in 15 minutes. Contact your attending physician if readings remain elevated.',
      urgency: 'Caution Watch',
    },
  ];

  const handleSimulateCallEmergency = () => {
    onShowToast('Simulating emergency call protocol: Dialing regional emergency dispatcher (911)...', 'alert');
  };

  const handleSimulateCallContact = () => {
    onShowToast(`Calling emergency contact: ${PATIENT_PROFILE.emergencyContact.name} (${PATIENT_PROFILE.emergencyContact.phone})...`, 'info');
  };

  return (
    <section id="emergency" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Urgent Callout Box */}
        <div className="rounded-3xl border-2 border-rose-500/40 bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-rose-500/30">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-bold block">
                  URGENT CARE SUPPORT
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-0.5">
                  Emergency Care
                </h2>
              </div>
            </div>

            {/* Quick Emergency Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSimulateCallEmergency}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency (911)</span>
              </button>

              <button
                onClick={handleSimulateCallContact}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-200 border border-rose-500/30 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Call Contact ({PATIENT_PROFILE.emergencyContact.name})</span>
              </button>
            </div>
          </div>

          {/* Prominent Warning Statement */}
          <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs sm:text-sm leading-relaxed font-medium">
            “If you believe you are experiencing a medical emergency, contact your local emergency service or go to the nearest emergency facility.”
          </div>

          {/* Action CTAs: Find Emergency Facility & View Route */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onSelectFacility) onSelectFacility('fac-5');
                onNavigate('find-care');
                onShowToast('Navigating to Emergency Facilities on the map.', 'info');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Find Emergency Facility</span>
            </button>

            <button
              onClick={() => {
                if (onSelectFacility) onSelectFacility('fac-5');
                onNavigate('find-care');
                onShowToast('Plotting shortest route to Regional Trauma & Emergency Hospital (3.9 km).', 'info');
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 text-teal-400" />
              <span>View Route to Regional Trauma Hospital (3.9 km)</span>
            </button>
          </div>

          <p className="mt-6 text-[11px] text-slate-400 font-mono">
            * NOTICE: CareConnect is an academic simulation prototype and does not provide real clinical dispatch or replace local 911 emergency telecommunications.
          </p>
        </div>

        {/* Sample Health Alerts Section */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">
              Demonstration Urgent Health Alerts
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Examples of automated vital sign alerts generated when connected wearable readings move outside safe thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="rounded-2xl border border-rose-500/20 bg-slate-900/60 p-5 flex flex-col justify-between backdrop-blur-sm hover:border-rose-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold uppercase">
                      {alert.urgency}
                    </span>
                    <span className="text-xs text-rose-300 font-mono font-bold">{alert.metric}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {alert.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {alert.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-teal-400 font-semibold block mb-1">Recommended Action:</span>
                  <p className="leading-snug text-slate-300">{alert.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
