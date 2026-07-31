import React from 'react';
import { Sparkles, Shield, Activity } from 'lucide-react';

export default function CompanionCard({ 
  companionMessage = "HALO AI Companion active and monitoring your safe corridor.", 
  isAnalyzing = false,
  lastUpdated = null 
}) {
  return (
    <div className="editorial-white-card p-8 sm:p-10 relative overflow-hidden bg-white border border-black/5 shadow-md">
      <div className="flex flex-col gap-5 relative z-10">
        
        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#1D2B26] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Live AI Companion</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{isAnalyzing ? 'Evaluating...' : 'Online & Analyzing'}</span>
          </div>
        </div>

        {/* Companion Main Guidance Message Bubble */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-black/5">
          <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
              Proactive AI Guidance
            </span>
            <p className="text-base sm:text-lg font-bold text-[#222926] font-heading leading-snug">
              "{companionMessage}"
            </p>
          </div>
        </div>

        {/* Footer info */}
        {lastUpdated && (
          <div className="flex items-center justify-between text-[11px] text-[#666C68] font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Continuous 20s AI Telemetry Cycle</span>
            </span>
            <span>Last check: {lastUpdated}</span>
          </div>
        )}

      </div>
    </div>
  );
}
