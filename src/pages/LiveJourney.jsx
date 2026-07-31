import React, { useState, useEffect } from 'react';
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
  Clock
} from 'lucide-react';
import JourneyTracker, { calculateHaversineDistance } from '../components/live-journey/JourneyTracker';
import LiveMap from '../components/live-journey/LiveMap';
import JourneyStatusCard from '../components/live-journey/JourneyStatusCard';
import JourneyControls from '../components/live-journey/JourneyControls';

export default function LiveJourney() {
  // Journey State: 'Idle' | 'Active' | 'Paused'
  const [journeyState, setJourneyState] = useState('Idle');
  
  // Destination State (Selected via Map Click or Form Input)
  const [destination, setDestination] = useState({
    lat: 41.8902,
    lng: 12.4922,
    name: 'Colosseum Safe Hub, Rome'
  });

  // Telemetry Calculations State
  const [initialDistance, setInitialDistance] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState(null);

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

  // Fetch OSRM Route line if available
  const fetchRouteLine = async (startLat, startLng, destLat, destLng) => {
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`);
      const data = await res.json();
      if (data && data.routes && data.routes[0]) {
        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        setRouteCoordinates(coords);
        const durationMins = Math.round(data.routes[0].duration / 60);
        setEstimatedTime(durationMins);
      }
    } catch (err) {
      // Fallback: direct vector line between points
      setRouteCoordinates([
        [startLat, startLng],
        [destLat, destLng]
      ]);
    }
  };

  const handleStartJourney = (currentLocation) => {
    setJourneyState('Active');
    if (currentLocation && destination) {
      const dist = calculateHaversineDistance(
        currentLocation.lat,
        currentLocation.lng,
        destination.lat,
        destination.lng
      );
      setInitialDistance(dist);
    }
  };

  const handlePauseJourney = () => {
    setJourneyState('Paused');
  };

  const handleEndJourney = () => {
    setJourneyState('Idle');
  };

  const handleSelectDestination = (newDest) => {
    setDestination(newDest);
  };

  return (
    <JourneyTracker>
      {({ currentLocation, geoError }) => {
        // Calculate dynamic real-time distance remaining
        const currentLat = currentLocation ? currentLocation.lat : 41.9028;
        const currentLng = currentLocation ? currentLocation.lng : 12.4964;

        const distanceRemaining = destination && currentLocation
          ? calculateHaversineDistance(currentLat, currentLng, destination.lat, destination.lng)
          : null;

        // Calculate completion progress percentage
        let progressPercentage = 0;
        if (journeyState === 'Active' && initialDistance > 0 && distanceRemaining !== null) {
          const travelled = initialDistance - distanceRemaining;
          progressPercentage = (travelled / initialDistance) * 100;
        }

        // Fetch route line on location/destination updates
        useEffect(() => {
          if (currentLocation && destination) {
            fetchRouteLine(currentLat, currentLng, destination.lat, destination.lng);
          }
        }, [currentLat, currentLng, destination.lat, destination.lng]);

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
                  <button
                    type="button"
                    onClick={() => handleStartJourney(currentLocation)}
                    className="btn-dark-green w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    <span>Start Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePauseJourney}
                    className="w-full sm:w-auto text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-white border-b-2 border-white/50 hover:border-white pb-1 transition-all text-center"
                  >
                    Pause / Resume
                  </button>
                </div>

              </div>
            </section>


            {/* SECTION 2: Journey Controls & Status Card */}
            <section id="journey-controls" className="flex flex-col gap-8 scroll-mt-24">
              
              {/* Journey Controls Panel */}
              <JourneyControls
                journeyState={journeyState}
                onStartJourney={() => handleStartJourney(currentLocation)}
                onPauseJourney={handlePauseJourney}
                onEndJourney={handleEndJourney}
                onSetManualDestination={handleSelectDestination}
              />

              {/* Real-time Journey Status Card */}
              <JourneyStatusCard
                status={journeyState === 'Active' ? 'Active' : (journeyState === 'Paused' ? 'Paused' : 'Ready')}
                destinationName={destination ? destination.name : 'Not Selected'}
                distanceRemaining={distanceRemaining}
                estimatedTime={estimatedTime || (distanceRemaining ? Math.round(distanceRemaining * 3) : null)}
                currentSpeed={currentLocation ? currentLocation.speed : 0}
                progressPercentage={progressPercentage}
              />

            </section>


            {/* SECTION 3: Live Interactive Leaflet Map */}
            <section className="editorial-white-card p-8 sm:p-12 flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-6">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Activity className="w-4 h-4 text-[#1D2B26]" />
                  <span>Interactive Map Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
                  Live Journey Map
                </h2>
                <p className="text-xs text-[#666C68] font-normal">
                  Pans automatically with your GPS position. Click anywhere on the map to set a new destination.
                </p>
              </div>

              {/* Interactive Leaflet Map Component */}
              <LiveMap
                currentLocation={currentLocation}
                destination={destination}
                routeCoordinates={routeCoordinates}
                onSelectDestination={handleSelectDestination}
              />
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
                    const isStepActive = (journeyState === 'Active' && idx === 0) || (journeyState === 'Active' && progressPercentage > (idx * 30));
                    
                    return (
                      <div key={idx} className="flex items-start gap-5 relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isStepActive 
                            ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-md' 
                            : 'bg-slate-100 text-slate-400 border-black/10'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col pt-1">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-bold text-[#222926] font-heading">
                              {step.title}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                              isStepActive 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {isStepActive ? 'Active' : 'Pending'}
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
                      {estimatedTime ? `${estimatedTime}m` : '--'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Estimated Transit
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                      Safety Rating
                    </span>
                    <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                      {journeyState === 'Active' ? '96/100' : '--'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Corridor Score
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                      Weather Status
                    </span>
                    <span className="text-3xl font-extrabold text-[#1D2B26] font-heading flex items-center gap-2">
                      Clear
                      <CloudSun className="w-5 h-5 text-[#1D2B26]" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      22°C Clear Skies
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                      Route Status
                    </span>
                    <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
                      {journeyState === 'Active' ? 'On Track' : 'Pending'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Safe Corridor Status
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

              <button
                type="button"
                onClick={() => handleStartJourney(currentLocation)}
                className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-xl mt-2"
              >
                <span>Start Live Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>

          </div>
        );
      }}
    </JourneyTracker>
  );
}
