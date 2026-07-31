import React from 'react';
import { Navigation, Radio, MapPin, AlertTriangle } from 'lucide-react';
import PageContainer from '../components/PageContainer';

export default function LiveJourney() {
  return (
    <PageContainer
      title="Live Journey"
      subtitle="Displays your current location on an interactive map, renders your planned route, and actively monitors for route deviations in real-time."
      icon={Navigation}
      badge="Live Monitor"
    >
      <div className="flex flex-col gap-6">
        
        {/* Map Shell */}
        <div className="editorial-white-card p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-5 min-h-[400px]">
          
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1D2B26] text-white shadow-lg mb-2">
            <Radio className="w-10 h-10 animate-pulse text-white" />
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-50 text-[#1D2B26] border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Map & Deviation Engine Ready</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            Live Journey Interactive Map Area
          </h2>

          <p className="text-[#666C68] text-sm max-w-lg leading-relaxed font-normal">
            This module will display real-time user GPS tracking, overlay the planned route line, and trigger route deviation alerts if off-course.
          </p>

          {/* Status Wireframe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mt-8 pt-8 border-t border-black/5 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">GPS Tracker</div>
                <div className="text-[11px] text-[#666C68]">Current Position</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Route Overlay</div>
                <div className="text-[11px] text-[#666C68]">Planned Safe Corridor</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Deviation Guard</div>
                <div className="text-[11px] text-[#666C68]">Automated Alerts</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
