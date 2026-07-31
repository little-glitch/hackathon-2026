import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Navigation, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

export default function EmergencySummary({ 
  emergencySummaryData = null, 
  durationFormatted = '2m 30s',
  destinationName = 'Destination',
  onClose 
}) {
  const headline = emergencySummaryData?.outcomeHeadline || 'Emergency Mode Resolved Safely';
  const description = emergencySummaryData?.summaryDescription || `Emergency session of ${durationFormatted} concluded cleanly. User guided to verified safe status.`;
  const actionsSummary = emergencySummaryData?.actionsTakenSummary || 'Location sync verified and safe haven coordinates confirmed.';
  const advice = emergencySummaryData?.futureSafetyAdvice || 'Keep emergency quick contacts pinned for instant 1-click location sharing on future trips.';

  return (
    <div className="editorial-white-card p-8 sm:p-12 border-2 border-[#1D2B26] bg-white shadow-2xl flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              {headline}
            </h2>
            <span className="text-xs text-[#666C68] font-semibold">
              Post-Emergency Safety Report
            </span>
          </div>
        </div>

        <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
          Emergency Resolved
        </span>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#1D2B26]" />
            Emergency Duration
          </span>
          <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
            {durationFormatted}
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            Resolved Cleanly
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1D2B26]" />
            Actions Confirmed
          </span>
          <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
            3 Steps
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            User Confirmed Safety
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-[#1D2B26]" />
            Safety Outcome
          </span>
          <span className="text-2xl font-extrabold text-[#1D2B26] font-heading">
            Safe Corridor
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            No Crisis Incident
          </span>
        </div>

      </div>

      {/* Details & Future Safety Advice */}
      <div className="flex flex-col gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#1D2B26]" />
            Emergency Session Overview
          </span>
          <p className="text-xs sm:text-sm text-[#222926] leading-relaxed font-normal">
            {description}
          </p>
          <p className="text-xs text-[#666C68] font-normal mt-1">
            {actionsSummary}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            AI Safety Recommendation
          </span>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal">
            {advice}
          </p>
        </div>

      </div>

      {/* Dismiss Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn-dark-green w-full py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <span>Return to Live Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
