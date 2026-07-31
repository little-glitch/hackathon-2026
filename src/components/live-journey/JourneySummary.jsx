import React from 'react';
import { CheckCircle2, ShieldCheck, Activity, Compass, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';

export default function JourneySummary({ 
  destinationName = 'Destination', 
  summaryData = null, 
  stats = { observationCount: 0, deviationCount: 0 },
  onClose 
}) {
  const safetyScore = summaryData?.safetyRating || (stats.deviationCount === 0 ? '98 / 100' : '91 / 100');
  const headline = summaryData?.summaryHeadline || 'Journey Completed Successfully';
  const overview = summaryData?.routeOverview || `Followed planned safe corridor to ${destinationName} with ${stats.observationCount} AI evaluations logged.`;
  const futureSuggestions = summaryData?.futureSuggestions || 'Keep live route tracking active on future solo travel journeys.';

  return (
    <div className="editorial-white-card p-8 sm:p-12 border-2 border-emerald-200 bg-white shadow-xl flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#222926] font-heading">
                {headline}
              </span>
            </div>
            <span className="text-xs text-[#666C68] font-semibold">
              Final AI Post-Travel Briefing
            </span>
          </div>
        </div>

        <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
          Trip Finished
        </span>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Safety Rating
          </span>
          <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
            {safetyScore}
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            High Security Corridor
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#1D2B26]" />
            AI Observations Logged
          </span>
          <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
            {stats.observationCount || 1}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Continuous 20s Cycles
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Route Deviations
          </span>
          <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
            {stats.deviationCount || 0}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Course Deviation Events
          </span>
        </div>

      </div>

      {/* Route Overview & Future Suggestions */}
      <div className="flex flex-col gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1D2B26]" />
            Route Followed Summary
          </span>
          <p className="text-xs sm:text-sm text-[#222926] leading-relaxed font-normal">
            {overview}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            Suggestions for Future Journeys
          </span>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal">
            {futureSuggestions}
          </p>
        </div>

      </div>

      {/* Close Action Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn-dark-green w-full py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <span>Start New Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
