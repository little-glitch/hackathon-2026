import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function AlertManager({ 
  alerts = [], 
  onDismissAlert, 
  onConfirmStationaryFine, 
  onConfirmStationaryHelp 
}) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {alerts.map((alert) => {
        const isCritical = alert.level === 'Critical';
        const isWarning = alert.level === 'Warning';
        const isInfo = alert.level === 'Information';

        return (
          <div
            key={alert.id}
            className={`editorial-white-card p-6 sm:p-7 flex flex-col gap-4 border transition-all animate-in fade-in slide-in-from-top-3 duration-300 ${
              isCritical
                ? 'border-rose-300 bg-rose-50/70 text-rose-950'
                : isWarning
                ? 'border-amber-300 bg-amber-50/70 text-amber-950'
                : 'border-emerald-200 bg-emerald-50/50 text-[#1D2B26]'
            }`}
          >
            {/* Alert Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                  isCritical
                    ? 'bg-rose-600 text-white'
                    : isWarning
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#1D2B26] text-white'
                }`}>
                  {isCritical ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-heading">
                      {alert.title || 'AI Safety Advisory'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                      isCritical
                        ? 'bg-rose-200 text-rose-900'
                        : isWarning
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {alert.level || 'Information'}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-75 font-medium">
                    Timestamp: {alert.timestamp}
                  </span>
                </div>
              </div>

              {/* Dismiss X button */}
              {onDismissAlert && (
                <button
                  type="button"
                  onClick={() => onDismissAlert(alert.id)}
                  className="p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 transition-all"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Alert Explanation Body */}
            <p className="text-xs sm:text-sm leading-relaxed font-normal opacity-90 pl-13">
              {alert.explanation}
            </p>

            {/* Feature 4: Stationary Check Interactive Buttons ("I'm Fine" vs "Need Help") */}
            {alert.isStationaryCheck && (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 pl-13">
                <button
                  type="button"
                  onClick={() => onConfirmStationaryFine(alert.id)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I'm Fine</span>
                </button>

                <button
                  type="button"
                  onClick={() => onConfirmStationaryHelp(alert.id)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Need Help</span>
                </button>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}
