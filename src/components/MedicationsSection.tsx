import React, { useState } from 'react';
import { 
  Pill, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Plus, 
  X, 
  Check, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { INITIAL_PRESCRIPTIONS } from '../data/mockData';
import { Prescription } from '../types';

interface MedicationsSectionProps {
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const MedicationsSection: React.FC<MedicationsSectionProps> = ({ onShowToast }) => {
  const [medications, setMedications] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New medication form states
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFreq, setNewFreq] = useState('Once daily');
  const [newTime, setNewTime] = useState('Morning (08:00 AM)');
  const [newDuration, setNewDuration] = useState('30 days');
  const [newInstructions, setNewInstructions] = useState('Take with meals');

  // Toggle Taken
  const handleToggleTaken = (id: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.takenToday;
        onShowToast(
          nextState ? `Marked ${m.medicine} as taken today.` : `Reset ${m.medicine} status.`,
          nextState ? 'success' : 'info'
        );
        return { ...m, takenToday: nextState };
      }
      return m;
    }));
  };

  // Snooze Reminder
  const handleSnooze = (med: Prescription) => {
    onShowToast(`Reminder for ${med.medicine} snoozed by 15 minutes.`, 'info');
  };

  // Toggle Reminder
  const handleToggleReminder = (id: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        const nextReminder = !m.reminderActive;
        onShowToast(
          nextReminder ? `Reminder activated for ${m.medicine}.` : `Reminder turned off for ${m.medicine}.`,
          nextReminder ? 'success' : 'info'
        );
        return { ...m, reminderActive: nextReminder };
      }
      return m;
    }));
  };

  // Add Medication Submit
  const handleAddMedicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) {
      onShowToast('Please provide a medication name.', 'alert');
      return;
    }

    const createdMed: Prescription = {
      id: `rx-${Date.now()}`,
      medicine: newMedName,
      dosage: newDosage || 'Standard dose',
      frequency: newFreq,
      timeOfDay: newTime,
      duration: newDuration,
      prescribedBy: 'Self-Logged / Physician',
      reminderActive: true,
      takenToday: false,
      instructions: newInstructions,
    };

    setMedications(prev => [...prev, createdMed]);
    setShowAddModal(false);
    setNewMedName('');
    setNewDosage('');
    onShowToast(`Medication ${createdMed.medicine} added to daily tracker.`, 'success');
  };

  const takenCount = medications.filter(m => m.takenToday).length;

  return (
    <section id="medications" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Daily Prescriptions & Schedule
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              Medications
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Track your daily medicines, log doses taken, and set reminders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Today: <strong className="text-teal-400">{takenCount} of {medications.length}</strong> Completed
            </span>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          </div>
        </div>

        {/* Progress Bar of Daily Meds */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
            <span>Daily Medication Adherence</span>
            <span className="font-mono text-teal-400">{Math.round((takenCount / (medications.length || 1)) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div 
              className="h-full rounded-full bg-teal-500 transition-all duration-300"
              style={{ width: `${(takenCount / (medications.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Medication Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {medications.map((med) => (
            <div
              key={med.id}
              className={`rounded-2xl border p-5 backdrop-blur-sm transition-all flex flex-col justify-between ${
                med.takenToday
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-80'
                  : 'bg-slate-900/80 border-slate-800 hover:border-teal-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      med.takenToday ? 'bg-emerald-500/10 text-emerald-400' : 'bg-teal-500/10 text-teal-400'
                    }`}>
                      <Pill className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-teal-300 font-mono">
                      {med.dosage}
                    </span>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    med.takenToday
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {med.takenToday ? 'Taken Today ✓' : 'Due Today'}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">
                  {med.medicine}
                </h4>

                <div className="space-y-1 text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{med.timeOfDay} · {med.frequency}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Duration: {med.duration}
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed mb-4">
                  {med.instructions}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleTaken(med.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    med.takenToday
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20 active:scale-95'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{med.takenToday ? 'Mark as Not Taken' : 'Mark as Taken'}</span>
                </button>

                <button
                  onClick={() => handleSnooze(med)}
                  disabled={med.takenToday}
                  className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white text-xs disabled:opacity-40"
                  title="Snooze reminder by 15 mins"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleToggleReminder(med.id)}
                  className={`p-2 rounded-xl border text-xs transition-colors ${
                    med.reminderActive
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                  title={med.reminderActive ? 'Reminder active' : 'Reminder off'}
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Medication Modal */}
        {showAddModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setShowAddModal(false)}
          >
            <div 
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white mb-1">
                Add Medication Reminder
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Record a prescription or daily wellness supplement.
              </p>

              <form onSubmit={handleAddMedicationSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Medicine Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Metformin or Vitamin D3"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. 500 mg"
                      value={newDosage}
                      onChange={(e) => setNewDosage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Frequency</label>
                    <select
                      value={newFreq}
                      onChange={(e) => setNewFreq(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="As needed (PRN)">As needed (PRN)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Time of Day</label>
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Morning (08:00 AM)">Morning (08:00 AM)</option>
                      <option value="Lunch (12:30 PM)">Lunch (12:30 PM)</option>
                      <option value="Dinner (07:00 PM)">Dinner (07:00 PM)</option>
                      <option value="Bedtime (10:00 PM)">Bedtime (10:00 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 30 days"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Special Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Take with food, drink full glass of water"
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                  >
                    Save Medication
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
