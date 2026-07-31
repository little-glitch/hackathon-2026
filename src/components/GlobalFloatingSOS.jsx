import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Siren, 
  AlertTriangle, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Navigation, 
  Hospital, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { journeyMemory } from '../services/JourneyMemory';

export default function GlobalFloatingSOS() {
  const location = useLocation();
  const navigate = useNavigate();

  // Workflow State: 'IDLE' | 'CONFIRM' | 'RESOURCES_READY'
  const [sosState, setSosState] = useState('IDLE');

  // Do not render floating button on Emergency Escape page
  if (location.pathname === '/emergency-escape') {
    return null;
  }

  const handleActivateSOSConfirm = (e) => {
    if (e) e.preventDefault();
    console.log('[HALO SOS] 1. Activate SOS clicked in confirmation dialog. Updating state to RESOURCES_READY...');

    try {
      if (journeyMemory && typeof journeyMemory.recordEvent === 'function') {
        journeyMemory.recordEvent('Manual SOS Triggered', 'User confirmed emergency SOS activation. Preparing resources.', 'Critical');
      }
    } catch (err) {
      console.warn('[HALO SOS] journeyMemory record error ignored:', err);
    }

    // Step 2: Transition state from CONFIRM -> RESOURCES_READY
    setSosState('RESOURCES_READY');
  };

  const handleContinueToEmergencyCenter = (e) => {
    if (e) e.preventDefault();
    console.log('[HALO SOS] 2. Continue to Emergency Center clicked. Navigating to /emergency-escape...');
    setSosState('IDLE');
    navigate('/emergency-escape');
  };

  const checklistItems = [
    { title: "Live location prepared", desc: "Encrypted sync link ready to share.", icon: MapPin },
    { title: "Emergency contact ready to call", desc: "Speed dial prepared for Sarah Miller.", icon: PhoneCall },
    { title: "WhatsApp/SMS message prepared", desc: "Location text draft ready with coordinates.", icon: MessageSquare },
    { title: "Nearest safe route generated", desc: "Escape corridor plotted via Via Nazionale.", icon: Navigation },
    { title: "Nearby police station identified", desc: "Central Police Station (0.4 km).", icon: ShieldCheck },
    { title: "Nearby hospital identified", desc: "City General Hospital (0.8 km).", icon: Hospital },
    { title: "Emergency Command Center ready", desc: "Situation report & action panel initialized.", icon: Sparkles }
  ];

  return (
    <>
      {/* Floating SOS Button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setSosState('CONFIRM')}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/40 cursor-pointer"
          title="Trigger Manual SOS"
        >
          {/* Subtle Radar Pulse Ping */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
          
          <Siren className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 text-white group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Emergency SOS</span>
        </button>
      </div>

      {/* STEP 1: Initial Confirmation Modal */}
      {sosState === 'CONFIRM' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="editorial-white-card p-6 sm:p-8 max-w-md w-full border-2 border-rose-300 shadow-2xl flex flex-col gap-6 text-left relative animate-in zoom-in-95 duration-200">
            
            <button
              type="button"
              onClick={() => setSosState('IDLE')}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-800">Manual Emergency</span>
                <h3 className="text-xl font-bold text-[#222926] font-heading">
                  Emergency SOS
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#666C68] font-normal leading-relaxed">
              Are you sure you want to activate Emergency Mode? Activating Emergency Mode will:
            </p>

            <div className="flex flex-col gap-2 text-xs font-medium text-[#222926]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Prepare your encrypted live location</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Open dialer with primary emergency contact</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Navigate to nearest verified safe place</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Siren className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Launch the Emergency Command Center</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={() => setSosState('IDLE')}
                className="px-5 py-2.5 rounded-xl border border-black/10 text-xs font-extrabold uppercase tracking-wider text-[#666C68] hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleActivateSOSConfirm}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Activate SOS
              </button>
            </div>

          </div>
        </div>
      )}

      {/* STEP 2: Emergency Resources Ready Summary Modal */}
      {sosState === 'RESOURCES_READY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="editorial-white-card p-7 sm:p-9 max-w-lg w-full border-2 border-emerald-300 shadow-2xl bg-white/95 backdrop-blur-xl flex flex-col gap-6 text-left relative animate-in zoom-in-95 duration-300">
            
            <div className="flex items-center gap-3.5 border-b border-black/5 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">HALO Ready</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <h3 className="text-2xl font-bold text-[#222926] font-heading">
                  Emergency Resources Ready
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#666C68] font-normal leading-relaxed">
              HALO has prepared the following emergency resources for you:
            </p>

            {/* Staggered Checklist */}
            <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {checklistItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-400"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    </div>

                    <div className="flex flex-col text-left flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#222926]">
                          {item.title}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-[11px] text-[#666C68]">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t border-black/5 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleContinueToEmergencyCenter}
                className="btn-dark-green w-full py-4 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.005] transition-all cursor-pointer"
              >
                <span>Continue to Emergency Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
