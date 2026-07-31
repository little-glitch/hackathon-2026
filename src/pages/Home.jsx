import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  Map, 
  Navigation, 
  Siren, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Radio, 
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Check
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const trustPartners = [
    { name: 'Afterpay', logo: 'afterpay ↪' },
    { name: 'Pipedrive', logo: 'Pipedrive' },
    { name: 'Airtasker', logo: 'Airtasker' },
    { name: 'Rippling', logo: 'Rippling' },
    { name: 'Atlassian', logo: 'Atlassian' },
    { name: 'Attentive', logo: 'Attentive' }
  ];

  const featureCards = [
    {
      title: 'AI Travel Planner',
      description: 'Plan safer journeys with customized route recommendations, transit safety tips, and emergency contacts.',
      icon: Map,
      path: '/planner',
      badge: 'Smart Route'
    },
    {
      title: 'Live Journey',
      description: 'Track your trip in real time on dynamic maps with immediate route deviation alert detection.',
      icon: Navigation,
      path: '/live-journey',
      badge: 'Live Track'
    },
    {
      title: 'Is It Safe?',
      description: 'Analyze the safety index and environmental risk factors of any location on demand.',
      icon: Shield,
      path: '/is-it-safe',
      badge: 'Risk Engine'
    },
    {
      title: 'Emergency Escape',
      description: 'Instantly locate nearby hospitals, police stations, and 24/7 safe havens with safest escape routing.',
      icon: Siren,
      path: '/emergency',
      badge: 'Instant SOS'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* 1. Pastel Mint Hero Frame (EXACT MATCH of image.jpeg) */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        
        {/* Top Navbar inside Hero Container */}
        <div className="flex items-center justify-between gap-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              HALO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/90">
            <NavLink to="/planner" className="hover:text-white transition-colors">PLANNER</NavLink>
            <NavLink to="/live-journey" className="hover:text-white transition-colors">LIVE MONITOR</NavLink>
            <NavLink to="/is-it-safe" className="hover:text-white transition-colors">RISK ENGINE</NavLink>
            <NavLink to="/emergency" className="hover:text-white transition-colors">EMERGENCY</NavLink>
          </div>

          <NavLink
            to="/planner"
            className="btn-dark-green px-5 py-2.5 text-xs font-extrabold tracking-widest uppercase"
          >
            PLAN JOURNEY
          </NavLink>
        </div>

        {/* Hero Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Huge Display Typography & Dual Buttons (image.jpeg exact layout) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            
            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-white font-heading tracking-tight leading-[1.08]">
              Safe before you left the departure gate
            </h1>

            {/* Subtext */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              A voice AI answers your travel safety risks 24/7 and manages your itinerary corridor itself.
            </p>

            {/* Dual CTAs: Dark Capsule + Text Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <NavLink
                to="/planner"
                className="btn-dark-green w-full sm:w-auto px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <span>PLAN YOUR TRIP</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink
                to="/live-journey"
                className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
              >
                TRY A LIVE CALL
              </NavLink>
            </div>

          </div>

          {/* Right Column: Floating Conversation Card (image.jpeg exact match) */}
          <div className="lg:col-span-5 relative">
            
            <div className="reference-chat-card p-6 sm:p-7 flex flex-col gap-4 text-[#222926] relative">
              
              {/* Card Top Indicator */}
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1D2B26]">
                    ONLINE NOW
                  </span>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  LISTENING...
                </span>
              </div>

              {/* Chat Conversation Bubbles */}
              <div className="flex flex-col gap-3 text-xs">
                
                {/* Bubble 1 User */}
                <div className="self-start bg-slate-100 text-slate-700 p-3 rounded-xl max-w-[85%] font-medium">
                  Hi, I need to check safety for my solo walk in Rome tonight.
                </div>

                {/* Bubble 2 AI */}
                <div className="self-end bg-[#E8F1EC] text-[#1D2B26] p-3 rounded-xl max-w-[85%] font-medium">
                  Of course — what's the reason for your route today?
                </div>

                {/* Bubble 3 User */}
                <div className="self-start bg-slate-100 text-slate-700 p-3 rounded-xl max-w-[85%] font-medium">
                  Walking from Colosseum to Monti at 10 PM.
                </div>

                {/* Bubble 4 AI Response */}
                <div className="self-end bg-[#1D2B26] text-white p-3.5 rounded-xl max-w-[90%] font-normal leading-relaxed">
                  I found your route for tonight at 10pm. Safe corridor active with 4 emergency hubs logged. You'll get confirmation text shortly.
                </div>

                {/* Confirm Action Button */}
                <button className="self-end px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-[10px] font-extrabold uppercase tracking-widest text-[#1D2B26] transition-colors">
                  CONFIRM
                </button>

              </div>

            </div>

            {/* Bottom-Right Floating Emblem Widget */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-white text-[#1D2B26] flex items-center justify-center shadow-xl border border-black/5">
              <Shield className="w-6 h-6" />
            </div>

          </div>

        </div>

      </section>


      {/* 2. Sub-Hero Logo Strip (EXACT MATCH of image.jpeg logo bar) */}
      <section className="flex flex-col gap-4">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#666C68] text-center">
          USED BY SOLO TRAVELERS ACROSS THE GLOBE
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustPartners.map((partner) => (
            <div 
              key={partner.name}
              className="subhero-trust-card p-4 sm:p-5 flex items-center justify-center text-center text-sm font-extrabold text-[#1D2B26] tracking-tight font-heading"
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </section>


      {/* 3. Core Safety Modules */}
      <section id="features" className="flex flex-col gap-8 scroll-mt-24">
        
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Proactive Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight">
            Intelligent Travel Safety
          </h2>
          <p className="text-[#666C68] text-base max-w-xl font-normal">
            Designed to keep you informed before you set off and safe while on the move.
          </p>
        </div>

        {/* 4 Pure White Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

      </section>


      {/* 4. Why HALO Section */}
      <section className="flex flex-col gap-8">
        
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>Why Choose HALO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#222926] font-heading tracking-tight">
            Designed for Ultimate Peace of Mind
          </h2>
          <p className="text-[#666C68] text-base max-w-xl font-normal">
            Why solo travelers trust HALO to keep them safe on every step of their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="editorial-white-card p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-[#1D2B26]">
                24/7 Context
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#222926] font-heading">
              ✔ AI Powered
            </h3>
            <p className="text-sm text-[#666C68] leading-relaxed font-normal">
              Context-aware risk intelligence tailored specifically for solo travelers before and during travel.
            </p>
          </div>

          <div className="editorial-white-card p-8 flex flex-col gap-4 bg-[#1D2B26] text-white">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/15 text-white">
                GPS Sync
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              ✔ Real-Time Monitoring
            </h3>
            <p className="text-sm text-white/90 leading-relaxed font-normal">
              Continuous GPS route tracking with instant automated path deviation alerts.
            </p>
          </div>

          <div className="editorial-white-card p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-[#1D2B26]">
                Privacy First
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#222926] font-heading">
              ✔ Proactive Safety
            </h3>
            <p className="text-sm text-[#666C68] leading-relaxed font-normal">
              Early warning advisories and emergency escape guidance before hazards occur.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
