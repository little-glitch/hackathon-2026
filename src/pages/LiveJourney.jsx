import React from 'react';
import { 
  Navigation, 
  Radio, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Flag, 
  Siren, 
  Hospital, 
  Share2, 
  PhoneCall, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  CloudSun, 
  Clock, 
  Map
} from 'lucide-react';

export default function LiveJourney() {
  const futureIntegrations = [
    'Live GPS Tracking',
    'Route Tracking',
    'Route Deviation Detection',
    'Safe Corridor Monitoring',
    'Nearby Emergency Services'
  ];

  const timelineSteps = [
    { title: 'Journey Started', desc: 'Departure recorded at origin terminal', icon: MapPin },
    { title: 'Checkpoint Monitoring', desc: 'Active corridor patrol verification', icon: ShieldCheck },
    { title: 'Safe Zone Detection', desc: 'Verified haven zone check-in', icon: CheckCircle2 },
    { title: 'Arrival', desc: 'Destination reached & journey complete', icon: Flag }
  ];

  const emergencyActions = [
    {
      title: 'Emergency SOS',
      desc: 'Instant 1-click responder callout & distress alert',
      icon: Siren,
      badge: 'Priority SOS',
      isAlert: true
    },
    {
      title: 'Nearest Safe Place',
      desc: 'Locate nearest hospital, police, or 24/7 safe zone',
      icon: Hospital,
      badge: 'Safe Haven'
    },
    {
      title: 'Share Live Location',
      desc: 'Send live tracking corridor link to emergency contacts',
      icon: Share2,
      badge: 'Live Sync'
    },
    {
      title: 'Call Emergency Contact',
      desc: 'Speed dial your designated emergency contact person',
      icon: PhoneCall,
      badge: 'Speed Dial'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Real-Time Route Monitor</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Live Journey
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Monitor your trip in real time and stay informed with proactive safety updates throughout your journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#journey-status"
              className="btn-dark-green w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Start Journey</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#quick-actions"
              className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
            >
              Resume Journey
            </a>
          </div>

        </div>
      </section>


      {/* SECTION 2: Journey Status Card */}
      <section id="journey-status" className="editorial-white-card p-8 sm:p-12 scroll-mt-24">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Activity className="w-4 h-4 text-[#1D2B26]" />
                <span>Live Route Monitor</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
                Journey Status
              </h2>
            </div>
            
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#1D2B26] border border-black/5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Current Status: Ready</span>
            </div>
          </div>

          {/* Placeholders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Destination
              </span>
              <span className="text-2xl font-bold text-[#1D2B26] font-heading">
                Not Started
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending User Dispatch
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Estimated Time
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Awaiting GPS Signal
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Distance Remaining
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Awaiting Journey Dispatch
              </span>
            </div>

          </div>

          {/* Journey Progress Bar at 0% */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              <span>Journey Progress</span>
              <span>0%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-black/5">
              <div className="h-full bg-[#1D2B26] w-0 transition-all duration-500" />
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 3: Live Map Placeholder */}
      <section className="editorial-white-card p-8 sm:p-12 flex flex-col gap-8">
        <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Map className="w-4 h-4 text-[#1D2B26]" />
            <span>Spatial Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
            Live Route Map Container
          </h2>
        </div>

        {/* Map Container Box */}
        <div className="w-full min-h-[360px] rounded-2xl bg-slate-50 border border-black/10 flex flex-col items-center justify-center p-8 text-center gap-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-lg">
            <Navigation className="w-8 h-8 animate-pulse text-white" />
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-xl font-bold text-[#222926] font-heading">
              "Interactive Map will appear here"
            </h3>
            <p className="text-xs text-[#666C68] font-normal leading-relaxed">
              This area is reserved for live GPS rendering, vector route overlays, and automated safe corridor tracking.
            </p>
          </div>
        </div>

        {/* Future Integration List */}
        <div className="flex flex-col gap-3 pt-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D2B26]">
            Future Integration Modules:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {futureIntegrations.map((item, idx) => (
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


      {/* SECTION 4: Safety Timeline */}
      <section className="editorial-white-card p-8 sm:p-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Clock className="w-4 h-4 text-[#1D2B26]" />
              <span>Route Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Safety Timeline
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="flex flex-col gap-6 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-5 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 border border-black/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#222926] font-heading">
                        {step.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-slate-500">
                        Inactive
                      </span>
                    </div>
                    <span className="text-xs text-[#666C68] font-normal mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SECTION 5: Emergency Quick Actions */}
      <section id="quick-actions" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Siren className="w-4 h-4 text-rose-600" />
            <span>High Priority Responders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
            Emergency Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div 
                key={idx}
                className={`editorial-white-card p-7 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer ${
                  action.isAlert ? 'border-rose-200 bg-rose-50/40' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                      action.isAlert ? 'bg-rose-600 text-white' : 'bg-[#1D2B26] text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                      action.isAlert ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-[#1D2B26]'
                    }`}>
                      {action.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 font-heading ${
                    action.isAlert ? 'text-rose-900' : 'text-[#222926]'
                  }`}>
                    {action.title}
                  </h3>
                  <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                    {action.desc}
                  </p>
                </div>

                <div className={`pt-4 mt-6 border-t text-xs font-extrabold uppercase tracking-wider flex items-center justify-between ${
                  action.isAlert ? 'border-rose-200 text-rose-700' : 'border-black/5 text-[#1D2B26]'
                }`}>
                  <span>Action Shell</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 6: Journey Insights */}
      <section className="editorial-white-card p-8 sm:p-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#1D2B26]" />
              <span>Real-Time Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Journey Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Travel Time
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Dispatch
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Safety Rating
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Route Evaluation
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Weather Status
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading flex items-center gap-2">
                --
                <CloudSun className="w-5 h-5 text-slate-400" />
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Local Sync
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                Route Status
              </span>
              <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                --
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pending Dispatch
              </span>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 7: Bottom CTA */}
      <section className="reference-hero-container p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-5">
        <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md">
          <Navigation className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-white font-heading tracking-tight">
          Ready to begin your journey?
        </h2>

        <p className="text-white/90 text-sm sm:text-base max-w-lg font-light leading-relaxed">
          Start live monitoring and let HALO stay with you every step of the way.
        </p>

        <a
          href="#journey-status"
          className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-xl mt-2"
        >
          <span>Start Live Journey</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}
