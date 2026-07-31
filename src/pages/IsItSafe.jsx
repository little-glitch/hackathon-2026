import React from 'react';
import { ShieldAlert, Search, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageContainer from '../components/PageContainer';

export default function IsItSafe() {
  return (
    <PageContainer
      title="Is It Safe?"
      subtitle="Select or search any destination to analyze environmental context, calculate an instant safety score, and receive solo travel precautions."
      icon={ShieldAlert}
      badge="Risk Assessment"
    >
      <div className="flex flex-col gap-6">
        
        {/* Shell Banner */}
        <div className="editorial-white-card p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-5">
          
          <div className="w-20 h-20 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-lg mb-2">
            <ShieldAlert className="w-10 h-10 animate-pulse text-white" />
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-[#1D2B26]">
            <Search className="w-4 h-4 text-[#1D2B26]" />
            <span>AI Risk Scoring Engine Ready</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            Risk Assessment Location Analyzer
          </h2>

          <p className="text-[#666C68] text-sm max-w-lg leading-relaxed font-normal">
            This module will allow users to pick a location, compute dynamic safety scores (0-100), classify risk levels, and present safety recommendations.
          </p>

          {/* Metric Wireframe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mt-8 pt-8 border-t border-black/5 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Safety Index Score</div>
                <div className="text-[11px] text-[#666C68]">Contextual Rating</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Risk Breakdown</div>
                <div className="text-[11px] text-[#666C68]">Time & Environment</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Recommendations</div>
                <div className="text-[11px] text-[#666C68]">Precautions & Tips</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
