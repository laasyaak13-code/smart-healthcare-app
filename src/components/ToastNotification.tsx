import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'alert' | 'info';
  text: string;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-950/95 border-emerald-500/40 text-emerald-200',
          alert: 'bg-rose-950/95 border-rose-500/40 text-rose-200',
          info: 'bg-slate-900/95 border-teal-500/40 text-slate-100',
        }[toast.type];

        const Icon = toast.type === 'success' 
          ? CheckCircle2 
          : toast.type === 'alert' 
            ? AlertTriangle 
            : Info;

        const iconColor = toast.type === 'success' 
          ? 'text-emerald-400' 
          : toast.type === 'alert' 
            ? 'text-rose-400' 
            : 'text-teal-400';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl border p-3.5 shadow-2xl flex items-center justify-between gap-3 text-xs backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 ${bgColors}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span className="font-medium leading-snug">{toast.text}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
