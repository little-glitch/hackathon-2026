import React from 'react';
import { PlayCircle, Navigation, Sparkles, RefreshCw } from 'lucide-react';

export default function DemoToggle({ 
  isDemoMode, 
  onToggleDemoMode, 
  onRestartDemo 
}) {
  return (
    <div className="editorial-white-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-black/10 bg-white shadow-sm">
      
      {/* Title info */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all ${
          isDemoMode ? 'bg-[#1D2B26]' : 'bg-slate-700'
        }`}>
          {isDemoMode ? <Sparkles className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#222926] font-heading">
              {isDemoMode ? 'Hackathon Demo Mode Active' : 'Normal Live GPS Mode'}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
              isDemoMode ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {isDemoMode ? 'Simulated AI Run' : 'Real Location'}
            </span>
          </div>
          <span className="text-[11px] text-[#666C68]">
            {isDemoMode 
              ? 'Simulates entire route movement, deviation alerts & AI updates in ~2 minutes.' 
              : 'Uses live browser Geolocation watchPosition.'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0">
        
        {isDemoMode && onRestartDemo && (
          <button
            type="button"
            onClick={onRestartDemo}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D2B26] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 border border-black/5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Demo</span>
          </button>
        )}

        {/* Toggle Pill Switch */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-black/10">
          <button
            type="button"
            onClick={() => onToggleDemoMode(false)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
              !isDemoMode ? 'bg-[#1D2B26] text-white shadow-sm' : 'text-[#666C68] hover:text-[#222926]'
            }`}
          >
            Normal
          </button>
          
          <button
            type="button"
            onClick={() => onToggleDemoMode(true)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isDemoMode ? 'bg-[#1D2B26] text-white shadow-sm' : 'text-[#666C68] hover:text-[#222926]'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Demo Mode</span>
          </button>
        </div>

      </div>

    </div>
  );
}
