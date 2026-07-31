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
  Flag,
  MessageSquare,
  Copy,
  ChevronRight,
  Pill,
  ShieldAlert,
  Smile,
  X
} from 'lucide-react';
import { journeyMemory } from '../services/JourneyMemory';
import { generateEmergencyAnalysisWithAI } from '../services/aiService';

export default function EmergencyEscape() {
  const navigate = useNavigate();

  // Ingest Active Journey Telemetry Context from Memory
  const [journeyContext, setJourneyContext] = useState(() => journeyMemory.getMemory());
  const [aiReport, setAiReport] = useState(null);
  const [actionFeedback, setActionFeedback] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showToast, setShowToast] = useState(true);

  const emergencyStartTime = journeyContext.emergencyStartTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Generated Emergency Action Links (NEVER Auto-Sent/Auto-Called!)
  const contactPhone = "+15550192";
  const shareLocationText = `HALO Emergency SOS: I need assistance. My current location: ${journeyContext.currentLocation || 'Trastevere Corridor, Sector 4, Rome'}. Live sync link: https://halo-safety.app/live-sync?ref=sos-${Date.now()}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareLocationText)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(shareLocationText)}`;
  const telUrl = `tel:${contactPhone}`;

  // 4-Second Auto Dismiss for Reassuring Floating Toast
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
  const handleCopyLiveLocation = () => {
    navigator.clipboard.writeText(shareLocationText);
    setCopiedLink(true);
    setActionFeedback('Encrypted live location link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 4000);
    setTimeout(() => setActionFeedback(''), 4000);
  };

  const handleNavigateSafeHaven = () => {
    setActionFeedback('Plotting safest escape route to Central Police Station (0.4 km). Guidance active.');
    setTimeout(() => setActionFeedback(''), 5000);
  };

  const handleResumeJourney = () => {
    journeyMemory.updateMemory({
      riskLevel: 'Low',
      emergencyActive: false,
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-10 sm:gap-14 relative">
      
      {/* REASSURING FLOATING GLASS TOAST (Top-Right, 4s Auto-Dismiss) */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-6 duration-500 max-w-sm w-full px-2">
          <div className="editorial-white-card p-5 border border-emerald-300 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl flex items-start gap-4 text-left border-l-4 border-l-emerald-600">
            <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1D2B26]">
                  HALO
                </span>
                <button 
                  type="button"
                  onClick={() => setShowToast(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-bold text-[#222926] font-heading">
                Everything is ready.
              </h4>

              <p className="text-xs text-[#666C68] font-normal leading-relaxed">
                I'll stay with you while you handle the situation.
              </p>
            </div>
          </div>
        </div>
      )}


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
            HALO Emergency Command Center
          </h1>
          <p className="text-white/80 text-xs sm:text-sm font-light">
            Real-time AI situation assessment, emergency action preparation, and safe route guidance.
          </p>
        </div>
      </section>


      {/* MODULE 1: AI Situation Report (Highest Priority & Visual Focus) */}
      <section className="editorial-white-card p-8 sm:p-12 border-2 border-rose-300 shadow-2xl bg-white flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-rose-900 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>1 • AI Situation Report</span>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-extrabold text-[#666C68] uppercase tracking-wider">Risk Level:</span>
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              {journeyContext.riskLevel || 'Moderate Risk'}
            </span>
          </div>
        </div>

        {/* Telemetry Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Current Situation</span>
            <span className="text-xs font-bold text-rose-950 font-heading">
              {aiReport?.currentSituation || 'Stationary Stop & Route Deviation'}
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
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Time Emergency Started</span>
            <span className="text-xs font-bold text-[#222926] font-heading">
              {emergencyStartTime}
            </span>
          </div>
        </div>

        {/* AI Narrative Box */}
        <div className="p-6 rounded-2xl bg-[#1D2B26] text-white flex flex-col gap-2 text-left shadow-lg">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>HALO AI Assessment</span>
          </div>
          <p className="text-sm sm:text-base font-light leading-relaxed text-white/90">
            "{aiReport?.aiSituationSummary || `You stopped unexpectedly after deviating from your planned route to ${journeyContext.destination || 'Piazza Navona'}. Your current risk level is ${journeyContext.riskLevel || 'Moderate'}. HALO recommends moving toward a well-lit populated area and preparing your live location.`}"
          </p>
        </div>

      </section>


      {/* MODULE 2: HALO Recommendation */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-150">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4 text-left">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>2 • Prioritized Guidance</span>
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
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900">Primary AI Recommendation</span>
              <span className="text-base font-bold text-amber-950 font-heading">
                {aiReport?.primaryRecommendation || "Move toward a well-lit public area & share live location immediately."}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyLiveLocation}
            className="px-5 py-2.5 rounded-xl bg-amber-900 text-white text-xs font-extrabold uppercase tracking-wider shrink-0 hover:bg-amber-950 transition-all shadow-md self-start sm:self-auto"
          >
            Prepare Location Link
          </button>
        </div>

        {/* Secondary Recommendations */}
        <div className="flex flex-col gap-3 text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">Secondary Action Points</span>
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


      {/* MODULE 3: Emergency Actions (Unified Command Panel) */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 animate-in fade-in duration-700 delay-300">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Radio className="w-4 h-4 text-emerald-700" />
              <span>3 • Emergency Action Panel</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              User Confirmation Required for All Outer Actions
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            Prepared Action Commands
          </h2>
        </div>

        {/* Feedback Alert Banner */}
        {actionFeedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Action 1: Prepare Live Location */}
          <button
            type="button"
            onClick={handleCopyLiveLocation}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <Share2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded-full">
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">Prepare Live Location</span>
              <span className="text-[11px] text-white/70">Copy encrypted sync link to clipboard</span>
            </div>
          </button>

          {/* Action 2: Open Phone Dialer (HTML tel: Link - NEVER auto-calls!) */}
          <a
            href={telUrl}
            onClick={() => setActionFeedback(`Opened phone dialer for ${contactPhone}. Please confirm call.`)}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <PhoneCall className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-white/10 px-2 py-0.5 rounded-full">
                tel: Link
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">Open Phone Dialer</span>
              <span className="text-[11px] text-white/70">Prepare call to Sarah Miller ({contactPhone})</span>
            </div>
          </a>

          {/* Action 3: Navigate to Safe Place */}
          <button
            type="button"
            onClick={handleNavigateSafeHaven}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-blue-400 bg-white/10 px-2 py-0.5 rounded-full">
                Route Prepared
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">Navigate to Safe Place</span>
              <span className="text-[11px] text-white/70">Guide to Central Police Station (0.4 km)</span>
            </div>
          </button>

          {/* Action 4: Open WhatsApp / SMS (HTML wa.me / sms Link - NEVER auto-sends!) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setActionFeedback('Opened WhatsApp draft. Confirm sending message.')}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded-full">
                wa.me Draft
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">Open WhatsApp / SMS</span>
              <span className="text-[11px] text-white/70">Prepare location text draft for contacts</span>
            </div>
          </a>

          {/* Action 5: Resume Journey */}
          <button
            type="button"
            onClick={handleResumeJourney}
            className="p-5 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-900 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full">
                Return
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">Resume Journey</span>
              <span className="text-[11px] text-white/80">Clear emergency state & continue journey</span>
            </div>
          </button>

          {/* Action 6: End Journey */}
          <button
            type="button"
            onClick={handleEndJourney}
            className="p-5 rounded-2xl bg-rose-800 text-white hover:bg-rose-900 flex flex-col items-start gap-2.5 transition-all shadow-md group text-left"
          >
            <div className="flex items-center justify-between w-full">
              <Flag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase text-rose-200 bg-white/10 px-2 py-0.5 rounded-full">
                Finish
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold font-heading">End Journey</span>
              <span className="text-[11px] text-white/80">Clear live session data & generate report</span>
            </div>
          </button>

        </div>
      </section>


      {/* MODULE 4 & 5: Nearby Safe Places & Safe Escape Route Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 4: Nearby Safe Places */}
        <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Building className="w-4 h-4 text-[#1D2B26]" />
              <span>4 • Verified Emergency Havens</span>
            </div>
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              Nearby Safe Places
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Central Police Station</span>
                  <span className="text-[11px] text-[#666C68]">Verified Safe Sanctuary</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                0.4 km
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hospital className="w-5 h-5 text-blue-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">City General Hospital</span>
                  <span className="text-[11px] text-[#666C68]">24/7 Emergency Medical Care</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                0.8 km
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Pill className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">24-Hour Express Pharmacy</span>
                  <span className="text-[11px] text-[#666C68]">Open All Night • Medical Supplies</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                0.3 km
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-purple-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Public Safe Promenade</span>
                  <span className="text-[11px] text-[#666C68]">High Street Lighting & Active Crowds</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                0.5 km
              </span>
            </div>
          </div>
        </section>

        {/* Module 5: Recommended Safe Route Stepper */}
        <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <span>5 • Recommended Escape Route</span>
            </div>
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              Safe Route Guidance
            </h2>
          </div>

          <div className="flex flex-col gap-3 relative pl-4 border-l-2 border-emerald-600 my-2">
            
            <div className="flex items-start gap-3 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 -ml-[25px]">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">Current Position</span>
                <span className="text-[11px] text-[#666C68]">{journeyContext.currentLocation || 'Trastevere Corridor, Sector 4'}</span>
              </div>
            </div>

            <div className="py-2 pl-2">
              <ChevronRight className="w-4 h-4 text-emerald-600 rotate-90" />
            </div>

            <div className="flex items-start gap-3 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 -ml-[25px]">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">Main Lit Avenue (Via Nazionale)</span>
                <span className="text-[11px] text-[#666C68]">0.2 km • High CCTV & Public Lighting Corridor</span>
              </div>
            </div>

            <div className="py-2 pl-2">
              <ChevronRight className="w-4 h-4 text-emerald-600 rotate-90" />
            </div>

            <div className="flex items-start gap-3 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 -ml-[25px]">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">Central Police Station</span>
                <span className="text-[11px] text-[#666C68]">0.4 km • Verified Safe Haven</span>
              </div>
            </div>

            <div className="py-2 pl-2">
              <ChevronRight className="w-4 h-4 text-emerald-600 rotate-90" />
            </div>

            <div className="flex items-start gap-3 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 -ml-[25px]">
                4
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">City General Hospital</span>
                <span className="text-[11px] text-[#666C68]">0.8 km • Final Emergency Station</span>
              </div>
            </div>

          </div>
        </section>

      </div>


      {/* MODULE 6: Emergency Timeline */}
      <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-xl flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Clock className="w-4 h-4 text-[#1D2B26]" />
            <span>6 • Event Log</span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            Emergency Timeline
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { time: emergencyStartTime, event: "Emergency Mode Activated", type: "Critical" },
            { time: emergencyStartTime, event: "AI Situation Analysis Completed", type: "AI" },
            { time: emergencyStartTime, event: "Safe Escape Route Plotted", type: "Navigation" },
            { time: emergencyStartTime, event: "Encrypted Live Location Prepared", type: "Security" },
            { time: emergencyStartTime, event: "Emergency Phone Dialer Prepared", type: "Contact" }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between text-xs text-[#222926]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-500">{item.time}</span>
                <span className="font-semibold">{item.event}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* MODULE 7: Journey Recovery Banner */}
      <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col items-center justify-center text-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md">
          <Smile className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-normal font-heading tracking-tight">
          "I'm glad you're safe."
        </h2>

        <p className="text-white/90 text-xs sm:text-sm font-light max-w-md">
          You can resume your live journey monitoring or end the session to generate your final trip report.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleResumeJourney}
            className="btn-dark-green px-7 py-3 text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 text-white" />
            <span>Resume Journey</span>
          </button>

          <button
            type="button"
            onClick={handleEndJourney}
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md transition-all"
          >
            <Flag className="w-4 h-4 text-white" />
            <span>End Journey</span>
          </button>
        </div>
      </section>

    </div>
  );
}
