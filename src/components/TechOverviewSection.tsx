import React, { useState } from 'react';
import { 
  User, 
  Watch, 
  Filter, 
  Database, 
  Cpu, 
  Lock, 
  LayoutDashboard, 
  Users, 
  ArrowDown, 
  ShieldCheck, 
  Cloud, 
  Network, 
  Key, 
  HardDrive,
  Building2,
  ChevronRight
} from 'lucide-react';

export const TechOverviewSection: React.FC = () => {
  const [selectedSubTab, setSelectedSubTab] = useState<'architecture' | 'data-org' | 'security' | 'cloud'>('architecture');

  const architectureSteps = [
    { label: 'Patient', icon: User, desc: 'Generates personal readings' },
    { label: 'Wearables / Smart Devices', icon: Watch, desc: 'Captures pulse, SpO₂, temperature & steps' },
    { label: 'Data Processing', icon: Filter, desc: 'Filters noise & validates readings' },
    { label: 'Healthcare Database', icon: Database, desc: 'Organizes records in secure 3NF tables' },
    { label: 'AI Engine', icon: Cpu, desc: 'Evaluates patterns & flags risk alerts' },
    { label: 'Secure API Services', icon: Network, desc: 'Transfers encrypted data between services' },
    { label: 'Healthcare Dashboard', icon: LayoutDashboard, desc: 'Visualizes clear insights for clinicians' },
    { label: 'Care Team', icon: Users, desc: 'Doctors & nurses provide timely care' },
  ];

  const dataEntities = [
    { title: 'Patients', desc: 'Secure baseline profile, age, emergency contact, and authorized permissions.' },
    { title: 'Appointments', desc: 'Consultation scheduling, doctor availability, and clinic room assignments.' },
    { title: 'Diagnostics', desc: 'Official medical diagnoses and clinical assessment notes.' },
    { title: 'Prescriptions', desc: 'Medication names, dosage schedules, frequency, and pharmacy refill status.' },
    { title: 'Sensor Data', desc: 'Continuous time-stamped streams from connected smartwatches and monitors.' },
    { title: 'Billing & Insurance', desc: 'Itemized claim coverage, approved insurance statements, and invoices.' },
    { title: 'Staff Directory', desc: 'Licensed attending physicians, triage nurses, and on-duty rosters.' },
    { title: 'Emergency Alerts', desc: 'Real-time alert registry logged when unusual readings are flagged.' },
  ];

  const securityRoles = [
    { role: 'Patient', access: 'Can view own personal health readings, appointments, and prescriptions.' },
    { role: 'Doctor', access: 'Can review assigned patients, diagnose conditions, and sign prescriptions.' },
    { role: 'Nurse', access: 'Can monitor ward telemetry, log administered doses, and acknowledge alerts.' },
    { role: 'Administrator', access: 'Manages clinic room logistics, equipment, and anonymized billing records.' },
  ];

  return (
    <section className="py-20 bg-slate-950/90 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
            Behind CareConnect
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            How CareConnect Works
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            A look at how smart devices, secure data storage, artificial intelligence, and healthcare providers connect seamlessly behind the scenes.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'architecture', label: '1. How It Connects' },
            { id: 'data-org', label: '2. Data Organization' },
            { id: 'security', label: '3. Security & Access' },
            { id: 'cloud', label: '4. Cloud & Multi-Clinic' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedSubTab === tab.id
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SUB-VIEW 1: ARCHITECTURE WORKFLOW */}
        {selectedSubTab === 'architecture' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-white mb-1">
              End-to-End Care Connection Workflow
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              How health information travels safely from your wearable device directly to your doctor's desk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {architectureSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{step.label}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-VIEW 2: DATA ORGANIZATION */}
        {selectedSubTab === 'data-org' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-white mb-1">
              How Your Healthcare Information is Organized Securely
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              CareConnect structures personal health information into eight secure, interconnected categories ensuring accuracy and privacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataEntities.map((ent) => (
                <div key={ent.title} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <h4 className="text-sm font-bold text-teal-300 mb-1">{ent.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{ent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-VIEW 3: SECURITY & ACCESS */}
        {selectedSubTab === 'security' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-white mb-1">
              Role-Based Access & Patient Privacy
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              “Different users see only the information they are authorized to access.”
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {securityRoles.map((r) => (
                <div key={r.role} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono uppercase text-teal-400 font-bold block mb-1">
                    ROLE: {r.role}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{r.access}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1">Core Security Standards:</span>
              Industry standard AES-256 encryption at rest, secure TLS 1.3 in transit, automated multi-factor authentication, and encrypted cloud backups compliant with patient privacy regulations.
            </div>
          </div>
        )}

        {/* SUB-VIEW 4: CLOUD & MULTI-CLINIC */}
        {selectedSubTab === 'cloud' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-white mb-1">
              Multi-Clinic & Cloud Platform Network
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              How individual clinics, specialist hospital wards, and partner pharmacies communicate through an elastic cloud backbone.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono text-teal-400 font-bold block">PARTNER CLINICS</span>
                <span className="text-sm font-semibold text-white">Clinic A · Clinic B · Clinic C</span>
              </div>
              <span className="text-teal-400 font-bold text-lg hidden md:block">→</span>
              <div className="space-y-1">
                <span className="text-xs font-mono text-teal-400 font-bold block">SECURE BACKBONE</span>
                <span className="text-sm font-semibold text-white">Cloud Healthcare Platform</span>
              </div>
              <span className="text-teal-400 font-bold text-lg hidden md:block">→</span>
              <div className="space-y-1">
                <span className="text-xs font-mono text-teal-400 font-bold block">SHARED SERVICES</span>
                <span className="text-sm font-semibold text-white">Records, AI & Pharmacy Logistics</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Built on scalable microservice foundations (FastAPI, Flask, Spring Boot) with high-availability relational databases and containerized AI prediction services.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
