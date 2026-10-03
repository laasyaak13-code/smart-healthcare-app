import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  ShieldCheck, 
  AlertTriangle, 
  Send,
  BookOpen
} from 'lucide-react';
import { FAQS } from '../data/mockData';

interface SupportSectionProps {
  onNavigate: (sectionId: string) => void;
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onNavigate, onShowToast }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) {
      onShowToast('Please type a message before submitting.', 'alert');
      return;
    }
    onShowToast('Your inquiry has been submitted to the CareConnect Support Desk.', 'success');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <section id="support" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
            Assistance & Guidance
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            CareConnect Support & Help Center
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Everything you need to navigate your digital health assistant with confidence.
          </p>
        </div>

        {/* 4 Quick Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          <div 
            onClick={() => onNavigate('my-health')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold text-teal-300 block mb-1">Checking Health Readings</span>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Visit <strong className="text-white">My Health</strong> to view live vitals like heart rate, oxygen levels, blood pressure, and steps.
            </p>
            <span className="text-[11px] text-teal-400 font-semibold">Open My Health →</span>
          </div>

          <div 
            onClick={() => onNavigate('appointments')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold text-teal-300 block mb-1">Booking a Doctor Visit</span>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Open <strong className="text-white">Appointments</strong> and click "Book Appointment" to pick your preferred physician and time slot.
            </p>
            <span className="text-[11px] text-teal-400 font-semibold">Open Appointments →</span>
          </div>

          <div 
            onClick={() => onNavigate('find-care')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold text-teal-300 block mb-1">Locating a Clinic / Pharmacy</span>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Open <strong className="text-white">Find Care</strong>, select Clinic or Pharmacy, and preview shortest transit routes on the visual map.
            </p>
            <span className="text-[11px] text-teal-400 font-semibold">Open Find Care →</span>
          </div>

          <div 
            onClick={() => onNavigate('emergency')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-rose-500/30 hover:border-rose-500/50 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold text-rose-300 block mb-1">Handling an Emergency</span>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Use the <strong className="text-white">Emergency</strong> section to dial emergency dispatch or view the fastest route to a trauma hospital.
            </p>
            <span className="text-[11px] text-rose-400 font-semibold">Emergency Section →</span>
          </div>

        </div>

        {/* FAQs & Contact Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQs Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-2.5">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-teal-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <div className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact / Help Desk Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Contact Healthcare Support
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Have questions about your devices, data privacy, or doctor appointments? Send our team a message.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah.jenkins@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Message or Question</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Support Line: +1 (800) 555-CARE (08:00 AM – 08:00 PM)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your contact data is securely protected and never shared.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
