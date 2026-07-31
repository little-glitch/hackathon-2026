import React, { useState } from 'react';
import { 
  Siren, 
  Shield, 
  Phone, 
  Building, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  CheckSquare, 
  Square, 
  Hospital, 
  ShieldCheck, 
  HeartHandshake, 
  Compass, 
  Navigation, 
  Zap, 
  AlertCircle, 
  Bus,
  LifeBuoy
} from 'lucide-react';

export default function EmergencyEscape() {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);

  const toggleCheck = (idx) => {
    const next = [...checkedItems];
    next[idx] = !next[idx];
    setCheckedItems(next);
  };

  const actionCards = [
    {
      title: 'Emergency SOS',
      desc: 'Instantly trigger emergency assistance.',
      icon: Siren,
      btnText: 'Send SOS',
      isSos: true
    },
    {
      title: 'Safe Places',
      desc: 'Locate nearby safe locations.',
      icon: Shield,
      btnText: 'View Safe Places'
    },
    {
      title: 'Emergency Contacts',
      desc: 'Quickly contact trusted people.',
      icon: Phone,
      btnText: 'Open Contacts'
    },
    {
      title: 'Emergency Services',
      desc: 'Find hospitals and police stations.',
      icon: Building,
      btnText: 'View Services'
    }
  ];

  const checklistItems = [
    'Stay calm',
    'Share your live location',
    'Contact emergency services',
    'Move to a safe place',
    'Inform a trusted contact'
  ];

  const resources = [
    { title: 'Police', icon: ShieldCheck, contact: 'Available after integration' },
    { title: 'Hospital', icon: Hospital, contact: 'Available after integration' },
    { title: 'Women\'s Helpline', icon: HeartHandshake, contact: 'Available after integration' },
    { title: 'Tourist Assistance', icon: Compass, contact: 'Available after integration' }
  ];

  const futureCapabilities = [
    'Fastest safe route',
    'Traffic awareness',
    'Safe corridor guidance',
    'Alternative exits'
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Crisis Action Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Emergency Escape
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Access emergency resources, locate nearby safe places, and quickly take action when you need it most.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#safe-locations"
              className="btn-dark-green w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Find Safe Places</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#checklist"
              className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
            >
              Emergency Guide
            </a>
          </div>

        </div>
      </section>


      {/* SECTION 2: Emergency Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actionCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              className={`editorial-white-card p-8 flex flex-col justify-between group transition-all ${
                card.isSos ? 'border-rose-200 bg-rose-50/40' : ''
              }`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mb-6 ${
                  card.isSos ? 'bg-rose-600 text-white' : 'bg-[#1D2B26] text-white'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className={`text-xl font-bold font-heading mb-2 ${
                  card.isSos ? 'text-rose-900' : 'text-[#222926]'
                }`}>
                  {card.title}
                </h3>
                <p className="text-xs text-[#666C68] leading-relaxed font-normal mb-8">
                  {card.desc}
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  card.isSos 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md' 
                    : 'btn-dark-green'
                }`}
              >
                <span>{card.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </section>


      {/* SECTION 3: Nearby Safe Locations */}
      <section id="safe-locations" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[#1D2B26]" />
              <span>Safe Haven Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Nearby Safe Locations
            </h2>
          </div>

          {/* Placeholder Banner */}
          <div className="w-full min-h-[160px] rounded-2xl bg-slate-50 border border-black/10 flex flex-col items-center justify-center p-8 text-center gap-3">
            <MapPin className="w-8 h-8 text-slate-400" />
            <h3 className="text-lg font-bold text-[#222926] font-heading">
              "Nearby safe places will appear here after map integration."
            </h3>
            <p className="text-xs text-[#666C68] font-normal">
              Reserved space for real-time proximity queries to verified safe zones.
            </p>
          </div>

          {/* Reserved Space Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926] font-heading">Police Stations</span>
                <span className="text-[11px] text-[#666C68]">Law Enforcement Hubs</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Hospital className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926] font-heading">Hospitals</span>
                <span className="text-[11px] text-[#666C68]">Emergency Care Facilities</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926] font-heading">Public Safe Spaces</span>
                <span className="text-[11px] text-[#666C68]">Verified Safe Zones</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shrink-0">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#222926] font-heading">Transport Hubs</span>
                <span className="text-[11px] text-[#666C68]">Evacuation Terminals</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 4: Emergency Checklist */}
      <section id="checklist" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 text-[#1D2B26]" />
              <span>Step-by-Step Response Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Emergency Checklist
            </h2>
          </div>

          {/* Checklist Items */}
          <div className="flex flex-col gap-4">
            {checklistItems.map((item, idx) => {
              const isChecked = checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isChecked 
                      ? 'bg-emerald-50/70 border-emerald-200 text-[#1D2B26]' 
                      : 'bg-slate-50 border-black/5 text-[#222926] hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-lg bg-[#1D2B26] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-bold font-heading">
                      {item}
                    </span>
                  </div>

                  <div className="text-[#1D2B26]">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* SECTION 5: Emergency Resources */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Phone className="w-4 h-4 text-[#1D2B26]" />
            <span>Support Hotlines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Emergency Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div key={idx} className="editorial-white-card p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-[#222926] font-heading">
                    {res.title}
                  </h3>
                  <span className="text-xs text-[#666C68] font-normal">
                    {res.contact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 6: Escape Route Placeholder */}
      <section className="editorial-white-card p-8 sm:p-12 flex flex-col gap-8">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Navigation className="w-4 h-4 text-[#1D2B26]" />
            <span>Evacuation Vector</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            Escape Route Guidance
          </h2>
        </div>

        {/* Route Placeholder Box */}
        <div className="w-full min-h-[300px] rounded-2xl bg-slate-50 border border-black/10 flex flex-col items-center justify-center p-8 text-center gap-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-lg">
            <Navigation className="w-8 h-8 animate-pulse text-white" />
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-xl font-bold text-[#222926] font-heading">
              "Emergency escape route will appear here."
            </h3>
            <p className="text-xs text-[#666C68] font-normal">
              Reserved space for dynamic evacuation path calculations during active crisis situations.
            </p>
          </div>
        </div>

        {/* Future Capabilities List */}
        <div className="flex flex-col gap-3 pt-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D2B26]">
            Future Capabilities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {futureCapabilities.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-black/5 text-xs font-bold text-[#1D2B26] flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1D2B26] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 7: Bottom CTA */}
      <section className="reference-hero-container p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-5">
        <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md">
          <LifeBuoy className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-white font-heading tracking-tight">
          Stay prepared before every journey.
        </h2>

        <p className="text-white/90 text-sm sm:text-base max-w-lg font-light leading-relaxed">
          HALO helps you react quickly during emergencies by providing fast access to essential resources.
        </p>

        <a
          href="#checklist"
          className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-xl mt-2"
        >
          <span>Prepare Emergency Plan</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}
