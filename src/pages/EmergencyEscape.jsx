import React from 'react';
import { LifeBuoy, Hospital, ShieldCheck, Pill, MapPin, Zap } from 'lucide-react';
import PageContainer from '../components/PageContainer';

export default function EmergencyEscape() {
  return (
    <PageContainer
      title="Emergency Escape"
      subtitle="Instantly locate nearest emergency services including hospitals, police stations, pharmacies, and safe havens with the safest escape route guidance."
      icon={LifeBuoy}
      badge="Emergency SOS"
    >
      <div className="flex flex-col gap-6">
        
        {/* Shell Banner */}
        <div className="editorial-white-card p-10 sm:p-14 border border-rose-200 bg-rose-50/40 flex flex-col items-center justify-center text-center gap-5">
          
          <div className="w-20 h-20 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg mb-2">
            <LifeBuoy className="w-10 h-10 animate-spin text-white" style={{ animationDuration: '10s' }} />
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-100 text-rose-700">
            <Zap className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Emergency Escape Network Ready</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            Emergency Escape Planner & Safe Haven Search
          </h2>

          <p className="text-[#666C68] text-sm max-w-lg leading-relaxed font-normal">
            This module will query nearest medical centers, law enforcement hubs, 24/7 pharmacies, and compute the safest, fastest escape route.
          </p>

          {/* Emergency Category Wireframe */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-4xl mt-8 pt-8 border-t border-rose-200/60 text-left">
            <div className="p-5 rounded-2xl bg-white flex items-center gap-3.5 border border-rose-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Hospital className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Hospitals</div>
                <div className="text-[11px] text-[#666C68]">Emergency Care</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white flex items-center gap-3.5 border border-black/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Police Stations</div>
                <div className="text-[11px] text-[#666C68]">Law Enforcement</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white flex items-center gap-3.5 border border-black/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Pharmacies</div>
                <div className="text-[11px] text-[#666C68]">Medical Supplies</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white flex items-center gap-3.5 border border-black/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#222926] font-heading">Safe Havens</div>
                <div className="text-[11px] text-[#666C68]">Verified Zones</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
