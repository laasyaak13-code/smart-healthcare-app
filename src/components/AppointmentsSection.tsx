import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  X, 
  Plus, 
  Bell, 
  Video, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '../data/mockData';
import { Appointment } from '../types';

interface AppointmentsSectionProps {
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const AppointmentsSection: React.FC<AppointmentsSectionProps> = ({ onShowToast }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

  // Form states
  const [specialty, setSpecialty] = useState('Internal Medicine');
  const [doctor, setDoctor] = useState('Dr. Evelyn Carter');
  const [clinic, setClinic] = useState('CareConnect Central Medical');
  const [date, setDate] = useState('2026-10-12');
  const [time, setTime] = useState('11:00 AM');
  const [appointmentType, setAppointmentType] = useState<'In-Person' | 'Video Consultation' | 'Lab Follow-Up'>('In-Person');
  const [reason, setReason] = useState('General wellness check-up and vitals review');

  // Cancel Appointment
  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    onShowToast('Appointment cancelled successfully.', 'info');
  };

  // Reschedule
  const handleReschedule = (apt: Appointment) => {
    onShowToast(`Reschedule request opened for visit with ${apt.doctor}.`, 'info');
    setShowBookingModal(true);
  };

  // Set Reminder
  const handleSetReminder = (apt: Appointment) => {
    onShowToast(`Reminder set for visit with ${apt.doctor} on ${apt.date}.`, 'success');
  };

  // Submit Booking Form
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctor,
      specialty,
      clinic,
      date,
      time,
      type: appointmentType,
      status: 'Upcoming',
      reason,
    };

    setAppointments(prev => [newApt, ...prev]);
    setShowBookingModal(false);
    onShowToast('Appointment request submitted successfully.', 'success');
  };

  const upcomingList = appointments.filter(a => a.status === 'Upcoming');
  const previousList = appointments.filter(a => a.status !== 'Upcoming');

  return (
    <section id="appointments" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Care Scheduling
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              Appointments
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Manage your doctor visits, consultations, and medical follow-ups.
            </p>
          </div>

          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Upcoming Appointments List */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            <span>Upcoming Visits ({upcomingList.length})</span>
          </h3>

          {upcomingList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
              You have no upcoming appointments scheduled.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingList.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold uppercase">
                        {apt.type}
                      </span>
                      <span className="text-xs text-teal-300 font-bold font-mono">
                        {apt.date} · {apt.time}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-0.5">
                      {apt.doctor}
                    </h4>
                    <span className="text-xs text-slate-400 block mb-2">{apt.specialty}</span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{apt.clinic}</span>
                    </div>

                    <p className="text-xs text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                      Reason: <span className="text-slate-200">{apt.reason}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => handleSetReminder(apt)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      <span>Set Reminder</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReschedule(apt)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previous Appointments Archive */}
        <div>
          <h3 className="text-base font-bold text-white mb-3">
            Previous Consultations & History
          </h3>
          <div className="space-y-3">
            {previousList.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{apt.doctor}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{apt.specialty}</span>
                  </div>
                  <span className="text-slate-400">{apt.clinic} · {apt.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    apt.status === 'Completed'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {apt.status}
                  </span>

                  <button
                    onClick={() => {
                      setDoctor(apt.doctor);
                      setSpecialty(apt.specialty);
                      setShowBookingModal(true);
                    }}
                    className="text-teal-400 hover:underline font-semibold"
                  >
                    Book Again →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Booking Modal */}
        {showBookingModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setShowBookingModal(false)}
          >
            <div 
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white mb-1">
                Book a Medical Consultation
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Select your provider and preferred consultation timing.
              </p>

              <form onSubmit={handleSubmitBooking} className="space-y-3.5 text-xs">
                
                {/* Specialty */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Medical Specialty</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Internal Medicine">Internal Medicine (Primary Care)</option>
                    <option value="Cardiology Specialist">Cardiology (Heart Health)</option>
                    <option value="Family Medicine">Family Medicine & Pediatrics</option>
                    <option value="Pulmonology">Pulmonology (Respiratory)</option>
                    <option value="Endocrinology">Endocrinology (Metabolism)</option>
                  </select>
                </div>

                {/* Doctor */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Physician / Doctor</label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Dr. Evelyn Carter">Dr. Evelyn Carter, MD (Internal Medicine)</option>
                    <option value="Dr. Priya Sharma">Dr. Priya Sharma, MD (Cardiology)</option>
                    <option value="Dr. Marcus Vance">Dr. Marcus Vance, MD (Family Care)</option>
                    <option value="Dr. Robert Hastings">Dr. Robert Hastings, MD (Pulmonology)</option>
                  </select>
                </div>

                {/* Clinic */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Clinic Facility</label>
                  <select
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="CareConnect Central Medical">CareConnect Central Medical (1420 Healthcare Blvd)</option>
                    <option value="Heart & Vascular Pavilion">Heart & Vascular Pavilion (800 Medical Center Way)</option>
                    <option value="Westside Family Practice">Westside Family Practice (310 West End Ave)</option>
                  </select>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Time Slot</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:15 AM">11:15 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Consultation Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['In-Person', 'Video Consultation', 'Lab Follow-Up'] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setAppointmentType(t)}
                        className={`p-2 rounded-xl text-center font-medium transition-all ${
                          appointmentType === t
                            ? 'bg-teal-500 text-slate-950 font-bold'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Reason for Visit</label>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or visit purpose..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                  >
                    Book Appointment
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
