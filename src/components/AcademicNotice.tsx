import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AcademicNoticeProps {
  compact?: boolean;
}

export const AcademicNotice: React.FC<AcademicNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <aside aria-label="Academic prototype notice" className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-200 flex items-center justify-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-semibold tracking-wide uppercase">
          ACADEMIC DEMONSTRATION — SAMPLE DATA ONLY — NOT FOR CLINICAL DECISION-MAKING.
        </span>
      </aside>
    );
  }

  return (
    <aside aria-label="Academic prototype disclaimer" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs sm:text-sm flex items-start gap-3 shadow-lg shadow-amber-950/20 backdrop-blur-sm">
      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div>
        <p className="font-bold tracking-wide text-amber-300 uppercase">
          Academic Demonstration — Sample Data Only — Not for Clinical Decision-Making
        </p>
        <p className="mt-1 text-amber-200/90 leading-relaxed text-xs">
          CareConnect is an educational healthcare assistant prototype developed to demonstrate how digital health readings, connected devices, appointments, and AI-assisted insights can work together in a simple patient application. All patient metrics, hospital records, and AI observations are simulated demo data and do not replace licensed healthcare diagnosis or real medical professionals.
        </p>
      </div>
    </aside>
  );
};
