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
  XCircle, 
  Play, 
  Radio, 
  Lock, 
  Cpu, 
  Mic, 
  Watch, 
  Globe, 
  Activity, 
  Clock, 
  ChevronRight,
  Shield,
  HeartHandshake,
  Car,
  Briefcase,
  UserCheck
} from 'lucide-react';

export default function Home() {
  // Live Product Preview Message Rotator (Section 3)
  const previewMessages = [
    { text: "Journey started. HALO active.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100" },
    { text: "Everything looks safe on your corridor.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100" },
    { text: "Route deviation detected. Monitoring alternative path.", level: "Moderate Risk", color: "text-amber-800 bg-amber-100" },
    { text: "Risk level restored. Continuing safely.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100" },
    { text: "Journey completed successfully.", level: "Low Risk", color: "text-emerald-700 bg-emerald-100" }
  ];

  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMsgIdx(prev => (prev + 1) % previewMessages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentPreviewMsg = previewMessages[currentMsgIdx];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-20 sm:gap-28">
      
      {/* SECTION 1: Hero Section */}
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


      {/* SECTION 2: Meet HALO Floating AI Companion Card */}
      <section className="relative -mt-10 sm:-mt-16 z-20 max-w-4xl mx-auto w-full px-2">
        <div className="editorial-white-card p-8 sm:p-10 border border-black/10 shadow-2xl backdrop-blur-xl bg-white/95 flex flex-col sm:flex-row items-start gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="w-14 h-14 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="w-7 h-7 text-emerald-400" />
          </div>

          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D2B26]">
                👋 Meet HALO
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
                AI Companion
              </span>
            </div>

            <p className="text-base sm:text-lg font-medium text-[#222926] leading-relaxed font-heading">
              "Hello, I'm HALO. I'm more than a travel app. I help you before your journey, stay with you while you travel, and guide you if something goes wrong. Where would you like to go today?"
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <NavLink
                to="/planner"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D2B26] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Plan a Trip</span>
              </NavLink>

              <NavLink
                to="/is-it-safe"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D2B26] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Check Safety</span>
              </NavLink>

              <NavLink
                to="/live-journey"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D2B26] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-700" />
                <span>Start Live Journey</span>
              </NavLink>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 3: Live Product Preview Card (MacOS Window Simulation) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Radio className="w-4 h-4 text-[#1D2B26]" />
            <span>Interactive Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Live Journey Preview
          </h2>
          <p className="text-xs sm:text-sm text-[#666C68]">
            Simulated real-time AI companion monitoring window.
          </p>
        </div>

        {/* MacOS Styled Card Container */}
        <div className="editorial-white-card border border-black/10 shadow-2xl overflow-hidden max-w-4xl mx-auto w-full">
          
          {/* Window Title Bar */}
          <div className="bg-slate-100 px-5 py-3 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              HALO Live Journey Monitor v2.4
            </span>
            <div className="w-12" />
          </div>

          {/* Window Body */}
          <div className="p-8 sm:p-10 flex flex-col gap-8">
            
            {/* Top Telemetry Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Current Route</span>
                <span className="text-xs font-bold text-[#1D2B26] font-heading">Trastevere Corridor</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Risk Rating</span>
                <span className="text-xs font-bold text-emerald-700 font-heading">Low Risk (94%)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">ETA</span>
                <span className="text-xs font-bold text-[#1D2B26] font-heading">14 Mins Remaining</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666C68]">Progress</span>
                <span className="text-xs font-bold text-[#1D2B26] font-heading">64% Completed</span>
              </div>
            </div>

            {/* Rotating AI Companion Message */}
            <div className="p-6 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-between gap-4 shadow-lg transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                    Live AI Status Update
                  </span>
                  <span className="text-sm font-semibold font-heading text-white">
                    "{currentPreviewMsg.text}"
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shrink-0 ${currentPreviewMsg.color}`}>
                {currentPreviewMsg.level}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold text-[#666C68]">
                <span>Corridor Departure</span>
                <span>Destination Arrival</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-black/5">
                <div className="bg-emerald-600 h-full w-[64%] transition-all duration-700" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 4: How HALO Works (Storytelling Timeline) */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Route className="w-4 h-4 text-[#1D2B26]" />
            <span>Continuous Safety Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            How HALO Works
          </h2>
          <p className="text-xs sm:text-sm text-[#666C68]">
            One continuous journey from pre-travel planning to safe arrival.
          </p>
        </div>

        {/* 5 Connected Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              num: 1,
              title: "Plan Your Trip",
              desc: "AI creates a complete personalized travel itinerary.",
              icon: Compass
            },
            {
              num: 2,
              title: "Check Safety",
              desc: "HALO evaluates your destination before departure.",
              icon: ShieldAlert
            },
            {
              num: 3,
              title: "Start Journey",
              desc: "HALO continuously monitors your route corridor in real time.",
              icon: Navigation
            },
            {
              num: 4,
              title: "Receive Guidance",
              desc: "Proactive recommendations and unusual stop detection.",
              icon: Sparkles
            },
            {
              num: 5,
              title: "Arrive Safely",
              desc: "Receive a complete AI journey summary & check-in confirmation.",
              icon: CheckCircle2
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="editorial-white-card p-6 border border-black/5 shadow-md flex flex-col justify-between gap-4 relative group hover:border-black/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center font-extrabold text-sm font-heading shadow-sm">
                    {step.num}
                  </div>
                  <Icon className="w-5 h-5 text-[#666C68] group-hover:text-[#1D2B26] transition-colors" />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <h3 className="text-base font-bold text-[#222926] font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 5: Why HALO (Comparison Matrix) */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Activity className="w-4 h-4 text-[#1D2B26]" />
            <span>Product Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Why HALO?
          </h2>
          <p className="text-xs sm:text-sm text-[#666C68]">
            Built for proactive safety, not just static mapping.
          </p>
        </div>

        {/* 2-Column Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          
          {/* Column 1: Traditional Travel Apps */}
          <div className="editorial-white-card p-8 border border-black/5 shadow-md flex flex-col gap-6 bg-slate-50/50">
            <div className="border-b border-black/10 pb-4 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Legacy Approach
              </span>
              <h3 className="text-xl font-bold text-[#666C68] font-heading">
                Traditional Travel Apps
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs text-[#666C68]">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Navigation & GPS turn-by-turn directions only</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Static, unpersonalized travel itineraries</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Generic safety advice with no context</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>No active monitoring for stops or course deviations</span>
              </div>
            </div>
          </div>

          {/* Column 2: HALO AI */}
          <div className="editorial-white-card p-8 border border-emerald-200 shadow-xl flex flex-col gap-6 bg-emerald-50/30">
            <div className="border-b border-emerald-200 pb-4 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                Next-Gen AI Companion
              </span>
              <h3 className="text-xl font-bold text-[#1D2B26] font-heading">
                HALO AI Companion
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs text-[#1D2B26] font-semibold">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>AI-generated 100% personalized travel plans</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Continuous real-time Live Journey monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Gemini-powered destination safety intelligence</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Intelligent Emergency Mode & safe haven guidance</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 6: Who HALO Is For */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Users className="w-4 h-4 text-[#1D2B26]" />
            <span>Target Personas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Who HALO Is For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Solo Travelers", desc: "Travel with confidence anywhere in the world.", icon: UserCheck },
            { title: "Women Travelers", desc: "Proactive security and verified safe corridors.", icon: ShieldCheck },
            { title: "Families", desc: "Peace of mind for loved ones on vacation.", icon: HeartHandshake },
            { title: "Road Trips", desc: "Real-time route monitoring and waypoint alerts.", icon: Car },
            { title: "International Tourists", desc: "Local safety intelligence and 24/7 AI support.", icon: Globe },
            { title: "Business Travelers", desc: "Efficient transit and instant emergency response.", icon: Briefcase }
          ].map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div key={idx} className="editorial-white-card p-7 border border-black/5 shadow-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h3 className="text-base font-bold text-[#222926] font-heading">
                    {persona.title}
                  </h3>
                  <p className="text-xs text-[#666C68] font-normal leading-relaxed">
                    {persona.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 7: Future Vision */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-[#1D2B26]" />
            <span>Product Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Future Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Offline AI Assistance", desc: "On-device neural reasoning without network latency.", icon: Cpu },
            { title: "Voice Companion", desc: "Hands-free conversational safety updates.", icon: Mic },
            { title: "Smartwatch Integration", desc: "Haptic alerts and wrist check-ins.", icon: Watch },
            { title: "Real-time Translation", desc: "Instant local language emergency phrase translation.", icon: Globe },
            { title: "Community Safety Network", desc: "Crowdsourced safe corridor intelligence.", icon: Users }
          ].map((vision, idx) => {
            const Icon = vision.icon;
            return (
              <div key={idx} className="editorial-white-card p-7 border border-black/5 shadow-md flex flex-col gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1D2B26] flex items-center justify-center shrink-0 border border-black/5">
                  <Icon className="w-5 h-5 text-[#1D2B26]" />
                </div>
                <h3 className="text-base font-bold text-[#222926] font-heading">
                  {vision.title}
                </h3>
                <p className="text-xs text-[#666C68] font-normal leading-relaxed">
                  {vision.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 8: Minimalist Footer Banner */}
      <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col items-center justify-center text-center gap-4 shadow-xl">
        <Shield className="w-8 h-8 text-white" />
        <h2 className="text-2xl sm:text-3xl font-normal font-heading">
          Built with AI. Designed for safer journeys. HALO.
        </h2>
        <NavLink
          to="/planner"
          className="btn-dark-green px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest mt-2 flex items-center gap-2 shadow-lg"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </section>

    </div>
  );
}
