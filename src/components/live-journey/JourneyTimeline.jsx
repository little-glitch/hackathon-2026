import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Flag
} from 'lucide-react';

export default function JourneyTimeline({ events = [] }) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'Journey Started':
        return MapPin;
      case 'Destination Selected':
        return Navigation;
      case 'Deviation Detected':
        return AlertTriangle;
      case 'Stationary Check':
        return Clock;
      case 'Journey Completed':
        return Flag;
      case 'AI Check Completed':
      default:
        return Sparkles;
    }
  };

  return (
    <div className="editorial-white-card p-8 sm:p-12">
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Clock className="w-4 h-4 text-[#1D2B26]" />
            <span>AI Observation Log</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            AI Observations Timeline
          </h2>
          <p className="text-xs text-[#666C68] font-normal">
            Newest AI evaluations and telemetry checkpoints logged at the top.
          </p>
        </div>

        {/* Timeline Events List (Newest at top) */}
        {events.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 text-center text-xs text-[#666C68] font-medium border border-black/5">
            No AI observations logged yet. Start journey to initialize active telemetry logging.
          </div>
        ) : (
          <div className="flex flex-col gap-6 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {events.map((evt) => {
              const Icon = getEventIcon(evt.type);
              const isWarning = evt.level === 'Warning';
              const isCritical = evt.level === 'Critical';

              return (
                <div key={evt.id} className="flex items-start gap-5 relative z-10 animate-in fade-in duration-300">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isCritical
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : isWarning
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col pt-0.5 flex-grow">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-bold text-[#222926] font-heading">
                          {evt.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {evt.level || 'Info'}
                        </span>
                      </div>
                      
                      <span className="text-[11px] text-[#666C68] font-medium">
                        {evt.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#666C68] leading-relaxed font-normal mt-1">
                      {evt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
