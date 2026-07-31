import React from 'react';
import { Activity, Gauge, MapPin, Clock, Navigation } from 'lucide-react';

export default function JourneyStatusCard({ 
  status = 'Ready', 
  destinationName = 'Not Selected', 
  distanceRemaining = null, 
  estimatedTime = null, 
  currentSpeed = 0, 
  progressPercentage = 0 
}) {
  const getStatusBadge = () => {
    switch (status) {
      case 'Active':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Tracking Active</span>
          </div>
        );
      case 'Paused':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Tracking Paused</span>
          </div>
        );
      case 'Ready':
      default:
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#1D2B26] border border-black/5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Status: Ready</span>
          </div>
        );
    }
  };

  return (
    <div className="editorial-white-card p-8 sm:p-12">
      <div className="flex flex-col gap-8">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Activity className="w-4 h-4 text-[#1D2B26]" />
              <span>Real-Time Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222926] font-heading">
              Journey Status Card
            </h2>
          </div>
          
          {getStatusBadge()}
        </div>

        {/* Telemetry Placeholders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Destination */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1D2B26]" />
              Destination
            </span>
            <span className="text-xl font-bold text-[#1D2B26] font-heading truncate">
              {destinationName}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {status === 'Active' ? 'Monitored Corridor' : 'Select on map or form'}
            </span>
          </div>

          {/* Current Speed */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#1D2B26]" />
              Current Speed
            </span>
            <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
              {status === 'Active' ? `${currentSpeed.toFixed(1)} km/h` : '--'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Live GPS Velocity
            </span>
          </div>

          {/* Estimated Time */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1D2B26]" />
              Estimated Time
            </span>
            <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
              {estimatedTime !== null ? `${estimatedTime} mins` : '--'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              OpenRoute Transit Estimate
            </span>
          </div>

          {/* Distance Remaining */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#1D2B26]" />
              Distance Remaining
            </span>
            <span className="text-3xl font-extrabold text-[#1D2B26] font-heading">
              {distanceRemaining !== null ? `${distanceRemaining.toFixed(1)} km` : '--'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Haversine Vector Distance
            </span>
          </div>

        </div>

        {/* Journey Progress Bar */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            <span>Journey Completion</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden border border-black/5">
            <div 
              className="h-full bg-[#1D2B26] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
