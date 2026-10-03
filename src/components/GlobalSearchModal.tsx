import React, { useState } from 'react';
import { Search, X, User, MapPin, FileText, Calendar, Pill, ArrowRight } from 'lucide-react';
import { HEALTHCARE_FACILITIES, INITIAL_APPOINTMENTS, LAB_REPORTS, INITIAL_PRESCRIPTIONS } from '../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingFacilities = trimmed.length > 1
    ? HEALTHCARE_FACILITIES.filter(f => 
        f.name.toLowerCase().includes(trimmed) || 
        f.type.toLowerCase().includes(trimmed) ||
        f.services.some(s => s.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingAppointments = trimmed.length > 1
    ? INITIAL_APPOINTMENTS.filter(a =>
        a.doctor.toLowerCase().includes(trimmed) ||
        a.specialty.toLowerCase().includes(trimmed) ||
        a.reason.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingLabs = trimmed.length > 1
    ? LAB_REPORTS.filter(l =>
        l.testName.toLowerCase().includes(trimmed) ||
        l.result.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingMeds = trimmed.length > 1
    ? INITIAL_PRESCRIPTIONS.filter(p =>
        p.medicine.toLowerCase().includes(trimmed) ||
        p.dosage.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSelect = (sectionId: string) => {
    onClose();
    onNavigate(sectionId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-5 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-teal-400 shrink-0" />
          <input
            type="text"
            placeholder="Search doctors, clinics, medications, tests, appointments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto space-y-4 text-xs">
          {trimmed.length <= 1 ? (
            <div className="py-6 text-center text-slate-400">
              <p>Type at least 2 characters to search across CareConnect.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {['Dr. Evelyn Carter', 'Cardiology', 'Clinic', 'Blood Pressure', 'Lisinopril', 'Blood Oxygen'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-teal-300 hover:border-teal-500/50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchingFacilities.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-2">
                    Healthcare Facilities ({matchingFacilities.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingFacilities.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleSelect('find-care')}
                        className="w-full p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white block">{f.name}</span>
                            <span className="text-[11px] text-slate-400">{f.type} · {f.distanceKm} km away</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingAppointments.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-2">
                    Appointments & Doctors ({matchingAppointments.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingAppointments.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect('appointments')}
                        className="w-full p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white block">{a.doctor}</span>
                            <span className="text-[11px] text-slate-400">{a.specialty} · {a.date}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingMeds.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-2">
                    Medications ({matchingMeds.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingMeds.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleSelect('medications')}
                        className="w-full p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Pill className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white block">{m.medicine} ({m.dosage})</span>
                            <span className="text-[11px] text-slate-400">{m.frequency} · {m.timeOfDay}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingLabs.length > 0 && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-2">
                    Lab Reports ({matchingLabs.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingLabs.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => handleSelect('health-records')}
                        className="w-full p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white block">{l.testName}</span>
                            <span className="text-[11px] text-slate-400">{l.result} · {l.status}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingFacilities.length === 0 && matchingAppointments.length === 0 && matchingMeds.length === 0 && matchingLabs.length === 0 && (
                <div className="py-6 text-center text-slate-400">
                  No matching healthcare results found for "{query}".
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
