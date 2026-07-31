import React from 'react';
import { Utensils, Check } from 'lucide-react';

export default function FoodSelector({ selectedFoodPreferences = [], onToggleFood }) {
  const options = [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Local Cuisine',
    'Street Food',
    'Fine Dining',
    'No Preference'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Utensils className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 7 • Food Preferences</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          Dietary & Dining Preferences
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const isSelected = selectedFoodPreferences.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggleFood(opt)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                  : 'bg-slate-50 text-[#666C68] border-black/10 hover:border-black/30'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
