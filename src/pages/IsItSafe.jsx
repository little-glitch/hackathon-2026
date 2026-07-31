import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Footprints, 
  Car, 
  Bus, 
  ShieldCheck, 
  Users, 
  Hospital, 
  CloudSun, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Building, 
  CheckCircle2
} from 'lucide-react';

export default function IsItSafe() {
  const [locationSearch, setLocationSearch] = useState('Trastevere, Rome');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [travelType, setTravelType] = useState('walking');

  const travelTypes = [
    { id: 'walking', name: 'Walking', icon: Footprints },
    { id: 'driving', name: 'Driving', icon: Car },
    { id: 'public', name: 'Public Transport', icon: Bus }
  ];

  const riskCategories = [
    {
      title: 'Personal Safety',
      desc: 'Assesses crime index and historical pedestrian security data.',
      icon: ShieldCheck,
      status: '--'
    },
    {
      title: 'Traffic Conditions',
      desc: 'Evaluates vehicle density, road speed, and pedestrian crossings.',
      icon: Car,
      status: '--'
    },
    {
      title: 'Area Activity',
      desc: 'Monitors commercial opening hours and pedestrian foot traffic.',
      icon: Users,
      status: '--'
    },
    {
      title: 'Emergency Access',
      desc: 'Proximity to nearest medical centers and law enforcement hubs.',
      icon: Hospital,
      status: '--'
    },
    {
      title: 'Weather Conditions',
      desc: 'Local precipitation, visibility, and environmental alerts.',
      icon: CloudSun,
      status: '--'
    },
    {
      title: 'Travel Alerts',
      desc: 'Active regional advisories and transit disruption warnings.',
      icon: AlertTriangle,
      status: '--'
    }
  ];

  const nearbyResources = [
    { name: 'Hospitals', icon: Hospital, distance: '--' },
    { name: 'Police Stations', icon: ShieldCheck, distance: '--' },
    { name: 'Safe Public Places', icon: Building, distance: '--' },
    { name: 'Transport Hubs', icon: Bus, distance: '--' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Risk Scoring Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Is It Safe?
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Analyze the safety of any destination before you travel using HALO's AI-powered safety intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#search-card"
              className="btn-dark-green w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Analyze Location</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#report-card"
              className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
            >
              View Sample Report
            </a>
          </div>

        </div>
      </section>


      {/* SECTION 2: Location Search Card */}
      <section id="search-card" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Search className="w-4 h-4 text-[#1D2B26]" />
              <span>Location Query</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Destination Safety Analysis
            </h2>
            <p className="text-[#666C68] text-sm font-normal">
              Enter any city, neighborhood, or street to compute safety scores.
            </p>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Location Search Input */}
            <div className="flex flex-col gap-2 md:col-span-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1D2B26]" />
                Location Search Input
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search city, neighborhood, or specific address..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date (Optional) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1D2B26]" />
                Date (Optional)
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

            {/* Time (Optional) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1D2B26]" />
                Time (Optional)
              </label>
              <input
                type="time"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-black/10 text-sm text-[#222926] font-medium focus:outline-none focus:border-[#1D2B26] focus:bg-white transition-all"
              />
            </div>

            {/* Travel Type Selectors */}
            <div className="flex flex-col gap-2 md:col-span-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                Travel Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {travelTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = travelType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setTravelType(type.id)}
                      className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
                        isSelected
                          ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-md'
                          : 'bg-slate-50 text-[#666C68] border-black/5 hover:bg-slate-100 hover:text-[#222926]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Full-width Analyze Safety Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('report-card');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-dark-green w-full py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
          >
            <span>Analyze Safety</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </section>


      {/* SECTION 3: Safety Report Card */}
      <section id="report-card" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4 text-[#1D2B26]" />
                <span>AI Intelligence Report</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
                Safety Analysis Report Placeholder
              </h2>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-[#1D2B26] border border-black/5">
              Awaiting Input
            </span>
          </div>

          {/* Report Grid Placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Overall Safety Score
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending AI Analysis
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Risk Level
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Risk Assessment
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Recommended Time to Travel
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Schedule Sync
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Crowd Level
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Foot Traffic Data
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Lighting Conditions
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Street Grid Sync
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Emergency Services Nearby
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Responder Query
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 4: Risk Categories Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#1D2B26]" />
            <span>Environmental Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Risk Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="editorial-white-card p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-slate-600">
                      Status: {cat.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#222926] font-heading mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-black/5 text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>Category Evaluation</span>
                  <span>--</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 5: AI Recommendations */}
      <section className="editorial-white-card p-8 sm:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              AI Safety Recommendations
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-center sm:text-left flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-[#666C68] leading-relaxed font-normal">
              "Your personalized travel recommendations will appear here after analysis."
            </p>
          </div>
        </div>
      </section>


      {/* SECTION 6: Nearby Resources */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Building className="w-4 h-4 text-[#1D2B26]" />
            <span>Local Emergency Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Nearby Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyResources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div key={idx} className="editorial-white-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#222926] font-heading">
                    {res.name}
                  </span>
                  <span className="text-xs text-[#666C68] font-semibold mt-0.5">
                    Distance: {res.distance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 7: Bottom CTA */}
      <section className="reference-hero-container p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-5">
        <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-white font-heading tracking-tight">
          Travel with confidence.
        </h2>

        <p className="text-white/90 text-sm sm:text-base max-w-lg font-light leading-relaxed">
          Analyze locations before every journey with HALO.
        </p>

        <a
          href="#search-card"
          className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-xl mt-2"
        >
          <span>Start Safety Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}
