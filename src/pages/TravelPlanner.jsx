import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Footprints, 
  Bike, 
  Car, 
  Bus, 
  Train, 
  ShieldCheck, 
  Zap, 
  Sun, 
  Users, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  FileText
} from 'lucide-react';

export default function TravelPlanner() {
  // Form State for Interactive UI (Frontend only, no API/AI)
  const [startLocation, setStartLocation] = useState('Central Station, Downtown');
  const [destination, setDestination] = useState('Grand Market Square');
  const [travelDate, setTravelDate] = useState('2026-08-01');
  const [travelTime, setTravelTime] = useState('09:30');
  const [transportMode, setTransportMode] = useState('walking');
  const [preference, setPreference] = useState('safest');
  const [additionalNotes, setAdditionalNotes] = useState('Prefer well-lit streets and active pedestrian paths.');

  const transportModes = [
    { id: 'walking', name: 'Walking', icon: Footprints },
    { id: 'bike', name: 'Bike', icon: Bike },
    { id: 'car', name: 'Car', icon: Car },
    { id: 'bus', name: 'Bus', icon: Bus },
    { id: 'train', name: 'Train', icon: Train },
  ];

  const preferences = [
    { id: 'fastest', name: 'Fastest Route', desc: 'Direct transit path' },
    { id: 'safest', name: 'Safest Corridor', desc: 'Maximized safety index' },
    { id: 'balanced', name: 'Balanced', desc: 'Optimized speed & safety' },
  ];

  const travelTips = [
    {
      title: 'Travel during daylight whenever possible.',
      desc: 'Daytime journeys benefit from higher visibility, active public transit, and open emergency hubs.',
      icon: Sun
    },
    {
      title: 'Share your trip with trusted contacts.',
      desc: 'Send live itinerary links to emergency contacts so trusted friends stay informed of your path.',
      icon: Users
    },
    {
      title: 'Keep emergency contacts accessible.',
      desc: 'Ensure local emergency numbers and HALO 1-click SOS are pinned to your phone quick dial.',
      icon: PhoneCall
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Travel Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            AI Travel Planner
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Plan a safer journey with AI-assisted route planning, destination insights, and travel recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#planner-form"
              className="btn-dark-green w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Generate Safe Route</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#journey-preview"
              className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
            >
              View Sample Plan
            </a>
          </div>

        </div>
      </section>


      {/* SECTION 2: Travel Planning Form */}
      <section id="planner-form" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          {/* Form Header */}
          <div className="flex flex-col gap-2 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Sliders className="w-4 h-4" />
              <span>Journey Configuration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Trip Details & Safety Preferences
            </h2>
            <p className="text-[#666C68] text-sm font-normal">
              Specify your origin, destination, schedule, and preferred mode of transit.
            </p>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Starting Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1D2B26]" />
                Starting Location
              </label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="e.g. Central Station, 5th Ave"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

            {/* Destination */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#1D2B26]" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Grand Market Square"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

            {/* Travel Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1D2B26]" />
                Travel Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

            {/* Travel Time */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1D2B26]" />
                Travel Time
              </label>
              <input
                type="time"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

          </div>

          {/* Mode of Transport */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              Mode of Transport
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {transportModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = transportMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setTransportMode(mode.id)}
                    className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-md'
                        : 'bg-slate-50 text-[#666C68] border-black/5 hover:bg-slate-100 hover:text-[#222926]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{mode.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Preference */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              Travel Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {preferences.map((pref) => {
                const isSelected = preference === pref.id;
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => setPreference(pref.id)}
                    className={`flex flex-col items-start p-4 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-slate-100 border-[#1D2B26] text-[#1D2B26] shadow-sm'
                        : 'bg-slate-50 border-black/5 text-[#666C68] hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#222926] flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-[#1D2B26]' : 'text-slate-400'}`} />
                      {pref.name}
                    </span>
                    <span className="text-[11px] text-[#666C68] mt-1 font-normal">
                      {pref.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1D2B26]" />
              Additional Notes
            </label>
            <textarea
              rows={3}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Prefer well-lit streets, avoiding isolated alleys."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Generate Route Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('journey-preview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-dark-green w-full py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
          >
            <span>Generate Safe Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </section>


      {/* SECTION 3: Journey Preview */}
      <section id="journey-preview" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Route Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
                Journey Dashboard Preview
              </h2>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-[#1D2B26] border border-emerald-200">
              High Safety Corridor
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Estimated Distance
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1D2B26] font-heading">
                14.2 km
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Direct Transit Corridor
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Estimated Time
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1D2B26] font-heading">
                22 mins
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Optimal Traffic Conditions
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Safety Index Score
              </span>
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1D2B26] font-heading">
                  96 / 100
                </span>
                <Zap className="w-5 h-5 text-emerald-600 animate-pulse" />
              </div>
              <span className="text-[11px] text-emerald-700 font-bold">
                Level 1 Low Risk Rating
              </span>
            </div>

          </div>

          {/* Recommended Route Breakdown */}
          <div className="flex flex-col gap-4 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1D2B26]">
              Recommended Safe Route Steps
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#222926] font-heading">{startLocation}</div>
                    <div className="text-xs text-[#666C68]">Departure Terminal • Well-lit public access</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Verified Origin
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#222926] font-heading">Main Ave Safe Corridor</div>
                    <div className="text-xs text-[#666C68]">Active pedestrian zone • 3 emergency hubs along path</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  3 Patrol Hubs
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#222926] font-heading">{destination}</div>
                    <div className="text-xs text-[#666C68]">Arrival Zone • Safe Haven Location</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Verified Haven
                </span>
              </div>
            </div>
          </div>

          {/* Travel Notes Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Safety Advisory & Route Notes
            </span>
            <p className="text-xs text-[#222926] leading-relaxed font-normal">
              This route stays strictly within monitored pedestrian corridors with continuous street lighting, high foot traffic, and immediate proximity to 4 emergency response centers. Live GPS deviation alerts will stay active throughout your trip.
            </p>
          </div>

        </div>
      </section>


      {/* SECTION 4: Travel Tips */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-[#1D2B26]" />
            <span>Essential Precautions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Solo Traveler Safety Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div 
                key={idx}
                className="editorial-white-card p-8 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#222926] font-heading leading-snug">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                  {tip.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 5: Bottom CTA */}
      <section className="reference-hero-container p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-5">
        <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-white font-heading tracking-tight">
          Ready to travel safely?
        </h2>

        <p className="text-white/90 text-sm sm:text-base max-w-lg font-light leading-relaxed">
          Start your journey with confidence using HALO's proactive safety intelligence and real-time route monitoring.
        </p>

        <a
          href="#planner-form"
          className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-xl mt-2"
        >
          <span>Start Planning</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}
