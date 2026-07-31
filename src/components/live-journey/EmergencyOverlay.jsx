import React, { useState, useEffect } from 'react';
import { 
  Siren, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Share2, 
  PhoneCall, 
  Navigation, 
  XCircle, 
  Hospital, 
  ShieldCheck, 
  Pill, 
  Building, 
  Sparkles, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import { generateEmergencyAnalysisWithAI } from '../../services/aiService';

export default function EmergencyOverlay({ 
  currentLocation, 
  destination, 
  progressPercentage = 0, 
  riskLevel = 'Moderate', 
  triggerReason = 'User Triggered SOS', 
  onCloseEmergencyMode 
}) {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [actionNotice, setActionNotice] = useState(null);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      const res = await generateEmergencyAnalysisWithAI({
        currentLocation,
        destination,
        progressPercentage,
        riskLevel,
        triggerReason
      });
      setAnalysis(res);
      setIsAnalyzing(false);
    };

    fetchAnalysis();
  }, []);

  const handleActionClick = (actionName) => {
    setActionNotice(`Action initiated: ${actionName}. Confirmation logged.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const nearbyPlaces = [
    { title: 'Hospital', desc: 'Central Emergency Center', distance: '0.8 km', icon: Hospital },
    { title: 'Police Station', desc: 'District 4 Police Precinct', distance: '1.2 km', icon: ShieldCheck },
    { title: '24-hour Pharmacy', desc: 'Care Pharmacy Hub', distance: '0.4 km', icon: Pill },
    { title: 'Public Safe Space', desc: 'Verified Public Station', distance: '0.3 km', icon: Building }
  ];

  return (
    <div className="fixed inset-0 z-[5000] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-300 flex flex-col gap-8 my-auto relative">
        
        {/* Top Emergency Mode Header (Feature 1) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-200 pb-6 bg-rose-50/70 p-6 rounded-2xl border border-rose-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shrink-0 animate-pulse">
              <Siren className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-heading tracking-tight">
                  Emergency Mode Activated
                </h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-rose-600 text-white shadow-sm">
                  Active
                </span>
              </div>
              <span className="text-xs text-rose-800 font-semibold mt-0.5">
                Triggered via: {triggerReason}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseEmergencyMode}
            className="px-5 py-2.5 rounded-xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0"
          >
            <XCircle className="w-4 h-4 text-white" />
            <span>Cancel Emergency Mode</span>
          </button>
        </div>

        {/* Telemetry Context Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#1D2B26]" /> Current Time
            </span>
            <span className="font-bold text-[#1D2B26] text-sm">{currentTime}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#1D2B26]" /> Current Location
            </span>
            <span className="font-bold text-[#1D2B26] text-sm truncate">
              {currentLocation ? `Lat ${currentLocation.lat.toFixed(4)}, Lng ${currentLocation.lng.toFixed(4)}` : 'GPS Sync Active'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">
              Destination
            </span>
            <span className="font-bold text-[#1D2B26] text-sm truncate">
              {destination?.name || 'Target Corridor'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">
              Current Risk Level
            </span>
            <span className="font-bold text-rose-700 text-sm font-heading">
              {riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Action Confirmation Banner */}
        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 border border-emerald-300 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Feature 7: AI Reassurance Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
            <Heart className="w-5 h-5 text-rose-300 fill-rose-300/30" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              AI Reassurance
            </span>
            <p className="text-sm sm:text-base font-bold text-emerald-950 leading-relaxed font-heading">
              "{analysis?.reassuranceText || "Take a deep breath. You're not alone. HALO is actively guiding your next steps."}"
            </p>
          </div>
        </div>

        {/* Feature 2: AI Situation Analysis */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            AI Situation Analysis
          </span>
          <p className="text-xs sm:text-sm text-[#222926] leading-relaxed font-normal">
            {isAnalyzing 
              ? "Gemini AI is evaluating live journey telemetry and safety parameters..." 
              : analysis?.situationSummary
            }
          </p>
        </div>

        {/* Feature 3: Recommended Prioritized Actions */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Prioritized Recommended Actions:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(analysis?.recommendedActions || [
              "Move toward a well-lit, populated area if safe to do so.",
              "Share your live location with a trusted contact.",
              "Navigate to the nearest verified safe haven or police hub.",
              "Remain calm and stay on this screen for guidance."
            ]).map((actionText, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3 text-xs font-medium text-[#222926]">
                <div className="w-6 h-6 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </div>
                <span className="pt-0.5 leading-relaxed">{actionText}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature 4: Emergency Action Panel (4 Large Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => handleActionClick('Share Live Location')}
            className="p-4 rounded-2xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all"
          >
            <Share2 className="w-4 h-4 text-white" />
            <span>Share Live Location</span>
          </button>

          <button
            type="button"
            onClick={() => handleActionClick('Call Trusted Contact')}
            className="p-4 rounded-2xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Call Trusted Contact</span>
          </button>

          <button
            type="button"
            onClick={() => handleActionClick('Navigate to Safe Place')}
            className="p-4 rounded-2xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all"
          >
            <Navigation className="w-4 h-4 text-white" />
            <span>Navigate Safe Place</span>
          </button>

          <button
            type="button"
            onClick={onCloseEmergencyMode}
            className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all"
          >
            <XCircle className="w-4 h-4 text-white" />
            <span>Cancel Emergency</span>
          </button>
        </div>

        {/* Feature 5: Nearby Safe Locations Cards */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Nearby Verified Safe Havens:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nearbyPlaces.map((place, idx) => {
              const Icon = place.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#222926] font-heading">{place.title}</span>
                    <span className="text-[11px] text-[#666C68]">{place.distance} away</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
