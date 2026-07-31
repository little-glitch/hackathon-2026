import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Siren, 
  Shield, 
  Phone, 
  Building, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Hospital, 
  ShieldCheck, 
  HeartHandshake, 
  Compass, 
  Navigation, 
  Zap, 
  AlertCircle, 
  Clock,
  Share2,
  PhoneCall,
  Play,
  Check,
  Radio,
  RotateCcw,
  Flag
} from 'lucide-react';
import { journeyMemory } from '../services/JourneyMemory';
import { generateEmergencyAnalysisWithAI } from '../services/aiService';

export default function EmergencyEscape() {
  const navigate = useNavigate();

  // Ingest Active Journey Context from Memory
  const [journeyContext, setJourneyContext] = useState(() => journeyMemory.getMemory());
  const [aiReport, setAiReport] = useState(null);
  const [actionFeedback, setActionFeedback] = useState('');

  const emergencyStartTime = journeyContext.emergencyStartTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  useEffect(() => {
    // Generate dynamic AI emergency analysis
    async function loadAnalysis() {
      const report = await generateEmergencyAnalysisWithAI({
        currentLocation: journeyContext.currentLocation || 'Trastevere Corridor, Sector 4',
        destination: journeyContext.destination || 'Piazza Navona, Rome',
        riskLevel: journeyContext.riskLevel || 'Moderate',
        journeyState: 'Emergency Active',
        emergencyStartTime
      });
      setAiReport(report);
    }
    loadAnalysis();
  }, [journeyContext]);

  // Action Button Handlers
  const handleShareLocation = () => {
    setActionFeedback('Live location link encrypted & dispatched to primary contact (Sarah Miller).');
    setTimeout(() => setActionFeedback(''), 5000);
  };

  const handleNavigateSafeHaven = () => {
    setActionFeedback('Plotting safest corridor to Central Police Station (0.4 km). Navigating now...');
    setTimeout(() => setActionFeedback(''), 5000);
  };

  const handleCallTrustedContact = () => {
    setActionFeedback('Initiating priority speed dial to Sarah Miller (+1-555-0192)...');
    setTimeout(() => setActionFeedback(''), 5000);
  };

  const handleResumeJourney = () => {
    journeyMemory.updateMemory({
      riskLevel: 'Low',
      stationaryAlertActive: false,
      aiCompanionMessages: [
        { id: Date.now(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: "Thanks for confirming. Resuming journey monitoring.", isEmergency: false },
        ...(journeyContext.aiCompanionMessages || [])
      ]
    });
    navigate('/live-journey');
  };

  const handleEndJourney = () => {
    journeyMemory.clearMemory();
    navigate('/live-journey');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-10 sm:gap-14">
      
      {/* Header Banner */}
      <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col gap-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/90">
            <Siren className="w-4 h-4 text-rose-300 animate-pulse" />
            <span>AI Emergency Command Center</span>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-rose-500/80 text-white border border-rose-300 backdrop-blur-md self-start sm:self-auto">
            Emergency Mode Active
          </span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <h1 className="text-3xl sm:text-5xl font-normal font-heading tracking-tight">
            HALO Emergency Response
          </h1>
          <p className="text-white/80 text-xs sm:text-sm font-light">
            Real-time AI situation assessment, prioritized recommendations, and emergency quick actions.
          </p>
        </div>
      </section>


      {/* SECTION 1: AI Situation Report (Highest Priority & Visual Focus) */}
      <section className="editorial-white-card p-8 sm:p-12 border-2 border-rose-300 shadow-2xl bg-white flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        
        {/* Card Header & Risk Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-rose-900 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>AI Situation Assessment</span>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-extrabold text-[#666C68] uppercase tracking-wider">Risk Rating:</span>
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              {journeyContext.riskLevel || 'Moderate Risk'}
            </span>
          </div>
        </div>

        {/* Dynamic Telemetry Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Current Situation</span>
            <span className="text-xs font-bold text-rose-950 font-heading">
              {aiReport?.currentSituation || 'Unexpected Stop & Route Deviation'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Current Location</span>
            <span className="text-xs font-bold text-[#222926] font-heading">
              {journeyContext.currentLocation || 'Trastevere Corridor, Sector 4'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Destination</span>
            <span className="text-xs font-bold text-[#222926] font-heading">
              {journeyContext.destination || 'Piazza Navona, Rome'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Emergency Trigger Time</span>
            <span className="text-xs font-bold text-[#222926] font-heading">
              {emergencyStartTime}
            </span>
          </div>
        </div>

        {/* AI Narrative Box */}
        <div className="p-6 rounded-2xl bg-[#1D2B26] text-white flex flex-col gap-2 text-left shadow-lg">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>HALO Situation Report</span>
          </div>
          <p className="text-sm sm:text-base font-light leading-relaxed text-white/90">
            "{aiReport?.aiSituationSummary || `You stopped unexpectedly after deviating from your planned route to ${journeyContext.destination || 'Piazza Navona'}. Your current risk level is ${journeyContext.riskLevel || 'Moderate'}. HALO recommends moving toward a well-lit populated area and sharing your live location.`}"
          </p>
        </div>

      </section>


      {/* SECTION 2: AI Recommended First Action */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-150">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4 text-left">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Prioritized Guidance</span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            HALO Recommendation
          </h2>
        </div>

        {/* Primary Top Action (Highlighted) */}
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900">Highest Priority Action</span>
              <span className="text-base font-bold text-amber-950 font-heading">
                {aiReport?.primaryRecommendation || "Move toward a well-lit public area & share live location immediately."}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShareLocation}
            className="px-5 py-2.5 rounded-xl bg-amber-900 text-white text-xs font-extrabold uppercase tracking-wider shrink-0 hover:bg-amber-950 transition-all shadow-md self-start sm:self-auto"
          >
            Execute Priority Action
          </button>
        </div>

        {/* Secondary Recommendations */}
        <div className="flex flex-col gap-3 text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">Secondary Recommendations</span>
          {(aiReport?.secondaryRecommendations || [
            "Share your live location sync link with primary contact (Sarah Miller).",
            "Navigate to nearest verified Safe Haven (Central Police Station - 0.4 km).",
            "Keep emergency contact speed dial ready."
          ]).map((recText, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center gap-3 text-xs font-semibold text-[#222926]">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>{recText}</span>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 3: Immediate Actions (Unified Command Panel) */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 animate-in fade-in duration-700 delay-300">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4 text-left">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Radio className="w-4 h-4 text-emerald-700" />
            <span>Emergency Command Bar</span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            Immediate Actions Panel
          </h2>
        </div>

        {/* Feedback Alert Banner */}
        {actionFeedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Unified 5 Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Action 1: Share Live Location */}
          <button
            type="button"
            onClick={handleShareLocation}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-center justify-center text-center gap-2.5 transition-all shadow-md group"
          >
            <Share2 className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Share Live Location</span>
          </button>

          {/* Action 2: Navigate to Safe Place */}
          <button
            type="button"
            onClick={handleNavigateSafeHaven}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-center justify-center text-center gap-2.5 transition-all shadow-md group"
          >
            <ShieldCheck className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Navigate to Safe Place</span>
          </button>

          {/* Action 3: Call Trusted Contact */}
          <button
            type="button"
            onClick={handleCallTrustedContact}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-center justify-center text-center gap-2.5 transition-all shadow-md group"
          >
            <PhoneCall className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Call Trusted Contact</span>
          </button>

          {/* Action 4: Resume Journey */}
          <button
            type="button"
            onClick={handleResumeJourney}
            className="p-5 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-900 flex flex-col items-center justify-center text-center gap-2.5 transition-all shadow-md group"
          >
            <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Resume Journey</span>
          </button>

          {/* Action 5: End Journey */}
          <button
            type="button"
            onClick={handleEndJourney}
            className="p-5 rounded-2xl bg-rose-800 text-white hover:bg-rose-900 flex flex-col items-center justify-center text-center gap-2.5 transition-all shadow-md group"
          >
            <Flag className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold uppercase tracking-wider">End Journey</span>
          </button>

        </div>
      </section>


      {/* SECTION 4: Nearby Verified Emergency Services */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Building className="w-4 h-4 text-[#1D2B26]" />
            <span>Verified Support Corridors</span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            Nearby Emergency Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold font-heading">Central Police Station</span>
            </div>
            <span className="text-[11px] text-[#666C68]">0.4 km • Verified Safe Haven</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26]">
              <Hospital className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold font-heading">City General Hospital</span>
            </div>
            <span className="text-[11px] text-[#666C68]">0.8 km • 24/7 Emergency Care</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26]">
              <HeartHandshake className="w-4 h-4 text-rose-700" />
              <span className="text-xs font-bold font-heading">Women's Safety Helpline</span>
            </div>
            <span className="text-[11px] text-[#666C68]">Direct Speed Dial Ready</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26]">
              <Compass className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold font-heading">Tourist Support Center</span>
            </div>
            <span className="text-[11px] text-[#666C68]">1.2 km • Multilingual Help</span>
          </div>
        </div>
      </section>

    </div>
  );
}
