import React from 'react';
import { Sparkles, Check } from 'lucide-react';

export default function PreferenceSelector({ selectedPreferences = [], onTogglePreference }) {
  const preferences = [
    'Adventure',
    'Nature',
    'Food',
    'Shopping',
    'Historical Places',
    'Museums',
    'Photography',
    'Nightlife',
    'Beach',
    'Mountains',
    'Wildlife',
    'Local Experiences',
    'Relaxation',
    'Hidden Gems'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 4 • Travel Preferences</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          What Do You Want to Experience?
        </h2>
        <p className="text-xs text-[#666C68]">
          Select all categories that match your travel style.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {preferences.map((pref) => {
          const isSelected = selectedPreferences.includes(pref);
          return (
            <button
              key={pref}
              type="button"
              onClick={() => onTogglePreference(pref)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                  : 'bg-slate-50 text-[#666C68] border-black/10 hover:border-black/30 hover:bg-slate-100'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              <span>{pref}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
