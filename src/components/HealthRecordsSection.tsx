import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Activity, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Download
} from 'lucide-react';
import { 
  PATIENT_PROFILE, 
  MEDICAL_HISTORY, 
  DIAGNOSES, 
  LAB_REPORTS, 
  INITIAL_PRESCRIPTIONS 
} from '../data/mockData';

interface HealthRecordsSectionProps {
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const HealthRecordsSection: React.FC<HealthRecordsSectionProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'diagnoses' | 'labs' | 'prescriptions' | 'sensors'>('profile');

  const sensorHistoryRows = [
    { time: 'Today 10:15 AM', hr: '72 bpm', spo2: '98%', bp: '118/76 mmHg', temp: '36.8°C', device: 'CareWatch Pro 4' },
    { time: 'Today 08:00 AM', hr: '70 bpm', spo2: '97%', bp: '119/78 mmHg', temp: '36.7°C', device: 'OmniPressure Hub' },
    { time: 'Yesterday 10:30 PM', hr: '66 bpm', spo2: '99%', bp: '116/74 mmHg', temp: '36.8°C', device: 'CareWatch Pro 4' },
    { time: 'Yesterday 02:00 PM', hr: '78 bpm', spo2: '98%', bp: '122/80 mmHg', temp: '36.9°C', device: 'VitalTrack Band' },
    { time: 'Oct 1, 2026', hr: '74 bpm', spo2: '97%', bp: '120/78 mmHg', temp: '36.8°C', device: 'CareWatch Pro 4' },
  ];

  const handleDownloadSummary = () => {
    onShowToast('Personal Health Summary downloaded (Sample PDF format).', 'success');
  };

  return (
    <section id="health-records" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Electronic Health Records
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              Health Records
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              View your medical history, reports, prescriptions and previous visits.
            </p>
          </div>

          <button
            onClick={handleDownloadSummary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Download Summary</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'profile', label: 'Patient Profile', icon: User },
            { id: 'history', label: 'Medical History', icon: FileText },
            { id: 'diagnoses', label: 'Diagnoses', icon: Stethoscope },
            { id: 'labs', label: 'Lab Reports', icon: FlaskConical },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
            { id: 'sensors', label: 'Sensor History', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Canvas */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl min-h-[340px]">
          
          {/* TAB 1: PATIENT PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xl">
                    SJ
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{PATIENT_PROFILE.name}</h3>
                    <span className="text-xs text-teal-400 font-mono">Patient ID: {PATIENT_PROFILE.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Identity · EHR Synchronized</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Age & Gender</span>
                  <span className="text-sm font-bold text-white">{PATIENT_PROFILE.age} Years · {PATIENT_PROFILE.gender}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Blood Group</span>
                  <span className="text-sm font-bold text-teal-300 font-mono">{PATIENT_PROFILE.bloodGroup}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Emergency Contact</span>
                  <span className="text-sm font-bold text-white block">{PATIENT_PROFILE.emergencyContact.name} ({PATIENT_PROFILE.emergencyContact.relationship})</span>
                  <span className="text-[11px] text-slate-400 font-mono">{PATIENT_PROFILE.emergencyContact.phone}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Primary Care Physician</span>
                  <span className="text-sm font-bold text-white">{PATIENT_PROFILE.primaryPhysician}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDICAL HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-white mb-2">
                Documented Medical Baseline & Allergies
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {MEDICAL_HISTORY.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-800">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{item.yearDiagnosed}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.detail}</p>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Status: <span className="text-teal-300">{item.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGNOSES */}
          {activeTab === 'diagnoses' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-white mb-2">
                Physician Diagnosis Records
              </h3>
              <div className="space-y-3">
                {DIAGNOSES.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="text-sm font-bold text-white">{d.diagnosis}</h4>
                      <span className="text-xs text-teal-400 font-mono">{d.date}</span>
                    </div>
                    <div className="text-xs text-slate-400 mb-2">
                      Attending: <span className="text-slate-200 font-medium">{d.doctor}</span> · {d.clinic}
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      {d.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LAB REPORTS */}
          {activeTab === 'labs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-white mb-2">
                Laboratory Test Results
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Test Name</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Result Summary</th>
                      <th className="py-3 px-4">Reference Range</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {LAB_REPORTS.map((lab) => (
                      <tr key={lab.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-semibold text-white">{lab.testName}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{lab.date}</td>
                        <td className="py-3 px-4 font-mono text-teal-300">{lab.result}</td>
                        <td className="py-3 px-4 text-slate-400">{lab.normalRange}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                            {lab.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-white mb-2">
                Active Prescriptions & Regimens
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {INITIAL_PRESCRIPTIONS.map((rx) => (
                  <div key={rx.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-teal-300 font-mono">{rx.dosage}</span>
                        <span className="text-[10px] text-slate-400">{rx.timeOfDay}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{rx.medicine}</h4>
                      <p className="text-xs text-slate-400 mb-2">{rx.frequency} · {rx.duration}</p>
                      <p className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        {rx.instructions}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                      Prescribed by {rx.prescribedBy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SENSOR HISTORY */}
          {activeTab === 'sensors' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-white mb-2">
                Connected Device Telemetry Log
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Recorded Time</th>
                      <th className="py-3 px-4">Heart Rate</th>
                      <th className="py-3 px-4">SpO₂ Level</th>
                      <th className="py-3 px-4">Blood Pressure</th>
                      <th className="py-3 px-4">Temperature</th>
                      <th className="py-3 px-4">Source Device</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {sensorHistoryRows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-semibold text-slate-200">{row.time}</td>
                        <td className="py-3 px-4 text-teal-400 font-bold">{row.hr}</td>
                        <td className="py-3 px-4 text-teal-300">{row.spo2}</td>
                        <td className="py-3 px-4 text-slate-200">{row.bp}</td>
                        <td className="py-3 px-4 text-slate-200">{row.temp}</td>
                        <td className="py-3 px-4 font-sans text-slate-400">{row.device}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
