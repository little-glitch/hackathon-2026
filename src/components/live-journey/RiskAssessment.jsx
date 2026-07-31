import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity, Sparkles } from 'lucide-react';

export default function RiskAssessment({ 
  riskLevel = 'Low', 
  confidence = 94, 
  riskExplanation = "Current journey risk is LOW because you are following the planned route and moving through populated areas." 
}) {
  const getRiskColorClasses = () => {
    switch (riskLevel) {
      case 'High':
        return {
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          iconBg: 'bg-rose-600 text-white',
          icon: ShieldAlert
        };
      case 'Moderate':
        return {
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          iconBg: 'bg-amber-600 text-white',
          icon: AlertTriangle
        };
      case 'Low':
      default:
        return {
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          iconBg: 'bg-emerald-700 text-white',
          icon: ShieldCheck
        };
    }
  };

  const config = getRiskColorClasses();
  const Icon = config.icon;

  return (
    <div className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md">
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Activity className="w-4 h-4 text-[#1D2B26]" />
            <span>AI Risk Scoring Engine</span>
          </div>

          {/* Confidence Indicator (Feature 5) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#1D2B26] border border-black/5">
            <Sparkles className="w-3.5 h-3.5 text-[#1D2B26]" />
            <span>{confidence}% Confidence</span>
          </div>
        </div>

        {/* Risk Level Callout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-black/5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${config.iconBg} flex items-center justify-center shadow-md shrink-0`}>
              <Icon className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Overall Journey Risk
              </span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-[#222926] font-heading">
                  {riskLevel} Risk
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border ${config.badgeBg}`}>
                  {riskLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:flex flex-col">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
              Assessment Status
            </span>
            <span className="text-sm font-bold text-[#1D2B26]">
              Continuous Predictive Sync
            </span>
          </div>
        </div>

        {/* AI Explanation Text */}
        <p className="text-xs sm:text-sm text-[#666C68] leading-relaxed font-normal">
          {riskExplanation}
        </p>

      </div>
    </div>
  );
}
