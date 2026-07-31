import React, { useState } from 'react';
import { Play, Pause, Square, MapPin, Navigation, ArrowRight } from 'lucide-react';

export default function JourneyControls({ 
  journeyState, 
  onStartJourney, 
  onPauseJourney, 
  onEndJourney, 
  onSetManualDestination 
}) {
  const [destInput, setDestInput] = useState('');
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (latInput && lngInput) {
      onSetManualDestination({
        lat: parseFloat(latInput),
        lng: parseFloat(lngInput),
        name: destInput || `Custom Coordinates (${latInput}, ${lngInput})`
      });
    } else if (destInput) {
      // Fallback example coordinates if only text entered
      onSetManualDestination({
        lat: 41.8902,
        lng: 12.4922,
        name: destInput
      });
    }
  };

  return (
    <div className="editorial-white-card p-8 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Navigation className="w-4 h-4" />
          <span>Journey Control Panel</span>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#666C68]">
          Live Dispatch
        </span>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        
        {journeyState === 'Idle' && (
          <button
            type="button"
            onClick={onStartJourney}
            className="btn-dark-green w-full py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Live Journey</span>
          </button>
        )}

        {journeyState === 'Active' && (
          <>
            <button
              type="button"
              onClick={onPauseJourney}
              className="w-full sm:w-1/2 py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause Journey</span>
            </button>

            <button
              type="button"
              onClick={onEndJourney}
              className="w-full sm:w-1/2 py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>End Journey</span>
            </button>
          </>
        )}

        {journeyState === 'Paused' && (
          <>
            <button
              type="button"
              onClick={onStartJourney}
              className="btn-dark-green w-full sm:w-1/2 py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume Journey</span>
            </button>

            <button
              type="button"
              onClick={onEndJourney}
              className="w-full sm:w-1/2 py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>End Journey</span>
            </button>
          </>
        )}

      </div>

      {/* Destination Form Input */}
      <form onSubmit={handleManualSubmit} className="flex flex-col gap-4 pt-4 border-t border-black/5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Set Destination Manually (Or Click on Map)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Destination Name / Spot"
            value={destInput}
            onChange={(e) => setDestInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium focus:outline-none focus:border-[#1D2B26]"
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude (e.g. 41.8902)"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium focus:outline-none focus:border-[#1D2B26]"
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude (e.g. 12.4922)"
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium focus:outline-none focus:border-[#1D2B26]"
          />
        </div>

        <button
          type="submit"
          className="self-end px-6 py-2.5 rounded-xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
        >
          <span>Set Destination Pin</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
