import React, { useState, useEffect } from 'react';
import { Database, Download, History } from 'lucide-react';

export default function JourneyRecorder({ 
  journeyState, 
  currentLocation, 
  distanceRemaining, 
  progressPercentage 
}) {
  const [telemetryLogs, setTelemetryLogs] = useState([]);

  useEffect(() => {
    if (journeyState !== 'Active' || !currentLocation) return;

    const interval = setInterval(() => {
      const logEntry = {
        id: `rec-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        speed: currentLocation.speed ? currentLocation.speed.toFixed(1) : '0.0',
        distanceRemaining: distanceRemaining ? distanceRemaining.toFixed(2) : '0.00',
        progress: Math.round(progressPercentage)
      };

      setTelemetryLogs(prev => [logEntry, ...prev.slice(0, 49)]); // keep last 50 entries
    }, 15000);

    return () => clearInterval(interval);
  }, [journeyState, currentLocation?.lat, currentLocation?.lng, distanceRemaining, progressPercentage]);

  if (telemetryLogs.length === 0) return null;

  return (
    <div className="editorial-white-card p-6 sm:p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Database className="w-4 h-4 text-[#1D2B26]" />
          <span>Telemetry Journey Recorder</span>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#666C68]">
          {telemetryLogs.length} Snapshots Recorded
        </span>
      </div>

      <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1">
        {telemetryLogs.map((log) => (
          <div 
            key={log.id} 
            className="p-3 rounded-xl bg-slate-50 border border-black/5 text-[11px] font-medium text-[#222926] flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1D2B26]">{log.timestamp}</span>
              <span className="text-[#666C68]">Lat {log.lat.toFixed(4)}, Lng {log.lng.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <span>{log.speed} km/h</span>
              <span>{log.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
