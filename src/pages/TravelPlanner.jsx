import React from 'react';
import { Compass, Sparkles, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import PageContainer from '../components/PageContainer';

export default function TravelPlanner() {
  return (
    <PageContainer
      title="AI Travel Planner"
      subtitle="Enter your starting point, destination, date, and mode of travel to receive customized safety tips, route advisories, and nearby emergency contacts."
      icon={Compass}
      badge="Step 1"
    >
      <div className="flex flex-col gap-6">
        
        {/* Shell Banner */}
        <div className="editorial-white-card p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-5">
          
          <div className="w-16 h-16 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-lg mb-2">
            <Compass className="w-8 h-8 animate-pulse text-white" />
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-[#1D2B26]">
            <Sparkles className="w-4 h-4" />
            <span>Ready for AI Integration</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            AI Travel Planner Input Shell
          </h2>

          <p className="text-[#666C68] text-sm max-w-lg leading-relaxed font-normal">
            This module will accept source, destination, date, and transit mode to produce safety scores, recommended routes, and emergency resource listings.
          </p>

          {/* Wireframe Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mt-8 pt-8 border-t border-black/5 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Route Coordinates</div>
                <div className="text-[11px] text-[#666C68]">Source & Destination</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Schedule & Mode</div>
                <div className="text-[11px] text-[#666C68]">Date, Time & Transit</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 flex items-center gap-4 border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Safety Briefing</div>
                <div className="text-[11px] text-[#666C68]">AI Advice & Emergency</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
