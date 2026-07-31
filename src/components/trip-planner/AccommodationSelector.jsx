import React from 'react';
import { Home } from 'lucide-react';

export default function AccommodationSelector({ selectedAccommodation, onSelect }) {
  const options = [
    'Hotel',
    'Hostel',
    'Resort',
    'Homestay',
    'Apartment',
    'Camping',
    'No Preference'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Home className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 5 • Accommodation Preference</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          Where Would You Like to Stay?
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedAccommodation === opt
                ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                : 'bg-slate-50 text-[#666C68] border-black/10 hover:border-black/30'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
