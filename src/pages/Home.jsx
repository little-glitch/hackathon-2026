import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Navigation, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Play, 
  Radio, 
  Cpu, 
  Globe, 
  Activity, 
  Clock, 
  Shield, 
  HeartHandshake, 
  Car, 
  Briefcase, 
  UserCheck, 
  Route,
  Sunrise,
  Sun,
  Sunset,
  Siren,
  Hospital,
  PhoneCall,
  UserPlus,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function Home() {
  // Live Product Preview Message Rotator (Showcase 3)
  const previewMessages = [
    { text: "Journey started. HALO active.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    { text: "Everything looks safe on your corridor.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    { text: "Route deviation detected. Monitoring alternative path.", level: "Moderate Risk", color: "text-amber-800 bg-amber-100 border-amber-300" },
    { text: "Risk level restored. Continuing safely.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    { text: "Journey completed successfully.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100 border-emerald-300" }
  ];

  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMsgIdx(prev => (prev + 1) % previewMessages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentPreviewMsg = previewMessages[currentMsgIdx];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-24 sm:gap-32">
      
      {/* SECTION 1: Hero Section (PRESERVED 100% UNCHANGED) */}
      <section className="reference-hero-container p-8 sm:p-16 lg:p-20 relative overflow-hidden">
        <div className="flex flex-col items-start gap-8 text-left max-w-3xl relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>HALO • Next-Gen AI Safety System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-white font-heading tracking-tight leading-[1.08]">
            Never Travel Alone Again.
          </h1>

          <p className="text-white/90 text-base sm:text-xl leading-relaxed font-light max-w-2xl">
            HALO is your AI travel companion that plans smarter trips, monitors your journey in real time, and helps keep you safe wherever you go.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            {/* Primary CTA */}
            <NavLink
              to="/planner"
              className="btn-dark-green px-8 py-4 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-2xl hover:scale-[1.02] transition-all"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>

            {/* Secondary CTA - Launches Demo Mode */}
            <NavLink
              to="/live-journey?demo=true"
              className="px-8 py-4 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Live Demo</span>
            </NavLink>
          </div>

        </div>
      </section>


      {/* SHOWCASE 1: AI TRIP PLANNER */}
      <section className="editorial-white-card p-8 sm:p-14 border border-black/5 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-black/15 transition-all">
        
        {/* Left Column: Storytelling & Editorial Copy */}
        <div className="flex flex-col items-start gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>01 • AI TRIP PLANNER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight leading-[1.15]">
            Personalized Journeys, Curated in Seconds.
          </h2>

          <p className="text-base sm:text-lg text-[#666C68] font-light leading-relaxed">
            Travel should feel effortless. HALO crafts complete day-by-day itineraries tailored strictly to your pace, budget, and travel style, so you spend less time planning and more time exploring.
          </p>

          <NavLink
            to="/planner"
            className="btn-dark-green px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Try AI Planner</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Right Column: Realistic Generated Itinerary UI Preview */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Sample Day 1 Itinerary • Fort Kochi</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-200 text-slate-800">
              Personalized Plan
            </span>
          </div>

          {/* Time Slots */}
          <div className="flex flex-col gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunrise className="w-4 h-4 text-amber-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Morning Promenade & Hotel Check-in</span>
                  <span className="text-[11px] text-[#666C68]">09:00 AM - 11:30 AM</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-amber-900">₹0</span>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-4 h-4 text-orange-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Historic Spice Market & Art Walk</span>
                  <span className="text-[11px] text-[#666C68]">01:30 PM - 04:30 PM</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-orange-900">₹400</span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunset className="w-4 h-4 text-indigo-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Sunset Viewpoint & Local Dining</span>
                  <span className="text-[11px] text-[#666C68]">05:30 PM - 08:30 PM</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-indigo-900">₹800</span>
            </div>
          </div>
        </div>

      </section>


      {/* SHOWCASE 2: PRE-TRAVEL SAFETY CHECK */}
      <section className="editorial-white-card p-8 sm:p-14 border border-black/5 shadow-xl flex flex-col lg:flex-row-reverse items-center justify-between gap-12 group hover:border-black/15 transition-all">
        
        {/* Right Column: Storytelling & Editorial Copy */}
        <div className="flex flex-col items-start gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
            <span>02 • PRE-TRAVEL SAFETY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight leading-[1.15]">
            Know Before You Go.
          </h2>

          <p className="text-base sm:text-lg text-[#666C68] font-light leading-relaxed">
            Uncertainty disappears when you have clarity. HALO evaluates your destination before departure, analyzing local lighting, foot traffic density, and crime corridors so you step out prepared.
          </p>

          <NavLink
            to="/is-it-safe"
            className="btn-dark-green px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Analyze Destination</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Left Column: Realistic HALO Safety Index UI Preview */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>HALO Safety Index • Kochi Corridor</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300">
              Low Risk
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#1D2B26] text-white flex flex-col items-center justify-center font-heading shadow-md shrink-0">
              <span className="text-2xl font-extrabold text-emerald-400">88</span>
              <span className="text-[9px] uppercase tracking-widest text-white/70">Score</span>
            </div>
            <div className="flex flex-col text-left gap-1">
              <span className="text-xs font-bold text-[#222926]">Safe Corridor Assessment</span>
              <p className="text-xs text-[#666C68] leading-relaxed">
                "High street lighting index and active public security. Recommended travel window: 08:00 AM - 09:30 PM."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5">
            <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold uppercase text-[#666C68]">Personal Safety</span>
              <span className="text-xs font-bold text-emerald-700 font-heading">88%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold uppercase text-[#666C68]">Transit Score</span>
              <span className="text-xs font-bold text-emerald-700 font-heading">85%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold uppercase text-[#666C68]">Visibility</span>
              <span className="text-xs font-bold text-emerald-700 font-heading">90%</span>
            </div>
          </div>
        </div>

      </section>


      {/* SHOWCASE 3: REAL-TIME LIVE JOURNEY COMPANION */}
      <section className="editorial-white-card p-8 sm:p-14 border border-black/5 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-black/15 transition-all">
        
        {/* Left Column: Storytelling & Editorial Copy */}
        <div className="flex flex-col items-start gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Radio className="w-3.5 h-3.5 text-emerald-700" />
            <span>03 • REAL-TIME MONITORING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight leading-[1.15]">
            An Intelligent Guardian on Every Step.
          </h2>

          <p className="text-base sm:text-lg text-[#666C68] font-light leading-relaxed">
            You are never truly alone on the road. As you move, HALO continuously syncs with your location, monitoring route deviations and unexpected pauses without ever draining your battery.
          </p>

          <NavLink
            to="/live-journey"
            className="btn-dark-green px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Start Live Journey</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Right Column: Realistic Live Companion UI Window Preview */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <span>Live Monitor • Trastevere Corridor</span>
            </div>
            <span className="text-[11px] font-extrabold uppercase text-[#666C68]">ETA: 14 Mins</span>
          </div>

          {/* Rotating AI Companion Message */}
          <div className="p-5 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Live AI Message</span>
                <span className="text-xs font-semibold text-white font-heading">
                  "{currentPreviewMsg.text}"
                </span>
              </div>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border shrink-0 ${currentPreviewMsg.color}`}>
              {currentPreviewMsg.level}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 pt-1 text-left">
            <div className="flex justify-between text-[11px] font-bold text-[#666C68]">
              <span>Departure Point</span>
              <span>64% Route Completed</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-black/5">
              <div className="bg-emerald-600 h-full w-[64%] transition-all duration-700" />
            </div>
          </div>
        </div>

      </section>


      {/* SHOWCASE 4: INTELLIGENT EMERGENCY MODE */}
      <section className="editorial-white-card p-8 sm:p-14 border border-black/5 shadow-xl flex flex-col lg:flex-row-reverse items-center justify-between gap-12 group hover:border-black/15 transition-all">
        
        {/* Right Column: Storytelling & Editorial Copy */}
        <div className="flex flex-col items-start gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-rose-100 text-rose-900 border border-rose-300">
            <Siren className="w-3.5 h-3.5 text-rose-700" />
            <span>04 • EMERGENCY RESPONSE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight leading-[1.15]">
            Instant Guidance When Seconds Count.
          </h2>

          <p className="text-base sm:text-lg text-[#666C68] font-light leading-relaxed">
            When unexpected situations arise, confusion disappears. HALO instantly transforms into an emergency command center, locating nearby safe havens and dispatching SOS alerts to your trusted circle.
          </p>

          <NavLink
            to="/emergency-escape"
            className="btn-dark-green px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Emergency Support</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Left Column: Realistic Emergency Mode Command Center UI Preview */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col gap-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-rose-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-950">
              <Siren className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>HALO Emergency Command Center</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-rose-200 text-rose-900 border border-rose-300">
              Active Mode
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-rose-200 flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-rose-950">AI Situation Analysis</span>
            <p className="text-xs text-[#666C68] leading-relaxed">
              "Emergency signal acknowledged. 1-Tap SOS dispatched to trusted contacts. Verified safe havens available within 0.5 km."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3 rounded-xl bg-white border border-rose-200 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">Central Police</span>
                <span className="text-[10px] text-[#666C68]">0.4 km • Verified Haven</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-rose-200 flex items-center gap-2.5">
              <Hospital className="w-4 h-4 text-blue-700 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926]">City Hospital</span>
                <span className="text-[10px] text-[#666C68]">0.8 km • Emergency Care</span>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* SHOWCASE 5: SAFETY CIRCLE NETWORK */}
      <section className="editorial-white-card p-8 sm:p-14 border border-black/5 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-black/15 transition-all">
        
        {/* Left Column: Storytelling & Editorial Copy */}
        <div className="flex flex-col items-start gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>05 • TRUSTED NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight leading-[1.15]">
            Keep Your Loved Ones Close.
          </h2>

          <p className="text-base sm:text-lg text-[#666C68] font-light leading-relaxed">
            Peace of mind extends beyond your journey. Automatically keep your trusted network informed with encrypted location check-ins and instant arrival confirmations.
          </p>

          <NavLink
            to="/safety-circle"
            className="btn-dark-green px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Manage Safety Circle</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        {/* Right Column: Realistic Safety Circle UI Card Preview */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Safety Circle Network • 2 Contacts</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
              Live Sync Ready
            </span>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-white border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1D2B26] text-white flex items-center justify-center font-bold text-xs font-heading">
                  SM
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">Sarah Miller</span>
                  <span className="text-[11px] text-[#666C68]">Primary Contact • Live Location Sync</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-emerald-700 bg-emerald-50">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs font-heading">
                  DM
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926]">David Miller</span>
                  <span className="text-[11px] text-[#666C68]">Secondary Contact • SOS Dispatch</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-700 bg-slate-100">Ready</span>
            </div>
          </div>
        </div>

      </section>


      {/* MINIMALIST FOOTER BANNER */}
      <section className="reference-hero-container p-8 sm:p-14 text-white flex flex-col items-center justify-center text-center gap-4 shadow-xl">
        <Shield className="w-9 h-9 text-white" />
        <h2 className="text-2xl sm:text-4xl font-normal font-heading tracking-tight">
          Built with AI. Designed for safer journeys. HALO.
        </h2>
        <NavLink
          to="/planner"
          className="btn-dark-green px-8 py-4 text-xs font-extrabold uppercase tracking-widest mt-2 flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </section>

    </div>
  );
}
