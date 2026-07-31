import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Siren, AlertTriangle, ShieldCheck, PhoneCall, MapPin, X } from 'lucide-react';
import { journeyMemory } from '../services/JourneyMemory';

export default function GlobalFloatingSOS() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Do not render floating button on Emergency Escape page
  if (location.pathname === '/emergency-escape') {
    return null;
  }

  const handleConfirmSOS = () => {
    setShowModal(false);
    
    // Ingest emergency state into journeyMemory
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    journeyMemory.updateMemory({
      riskLevel: 'High',
      emergencyActive: true,
      emergencyStartTime: currentTime,
      aiCompanionMessages: [
        { id: Date.now(), timestamp: currentTime, text: "Manual SOS triggered. Activating Emergency Command Center.", isEmergency: true },
        ...(journeyMemory.getMemory().aiCompanionMessages || [])
      ]
    });

    navigate('/emergency-escape');
  };

  return (
    <>
      {/* Floating SOS Button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/40"
          title="Trigger Manual SOS"
        >
          {/* Subtle Radar Pulse Ping */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
          
          <Siren className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 text-white group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Emergency SOS</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="editorial-white-card p-6 sm:p-8 max-w-md w-full border-2 border-rose-300 shadow-2xl flex flex-col gap-6 text-left relative animate-in zoom-in-95 duration-200">
            
            <button
              type="button"
              onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-black/10 text-xs font-extrabold uppercase tracking-wider text-[#666C68] hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmSOS}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all"
              >
                Activate SOS
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
