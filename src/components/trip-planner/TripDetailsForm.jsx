import React from 'react';
import { MapPin, Calendar, Users, Compass, Clock } from 'lucide-react';

export default function TripDetailsForm({ formData, onChange, onTravelersChange, onTripTypeChange }) {
  const tripTypes = ['Solo', 'Couple', 'Friends', 'Family', 'Business'];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Compass className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 1 & 2 • Trip Overview & Travelers</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          Destination & Schedule
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Starting Location */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Starting Location *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
            <input
              type="text"
              name="startingLocation"
              value={formData.startingLocation}
              onChange={onChange}
              placeholder="e.g. New Delhi, India"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Destination *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-emerald-700 absolute left-4 top-3.5" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={onChange}
              placeholder="e.g. Kochi, Kerala / Tokyo, Japan"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Departure Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={onChange}
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Return Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={onChange}
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

        {/* Auto-calculated Number of Days */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 sm:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Calculated Trip Duration:</span>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-700 text-white shadow-sm">
            {formData.numberOfDays} {formData.numberOfDays === 1 ? 'Day' : 'Days'}
          </span>
        </div>

        {/* Number of Travelers */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Number of Travelers
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
            <input
              type="number"
              min="1"
              max="20"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={onTravelersChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

        {/* Trip Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Trip Type
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {tripTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onTripTypeChange(type)}
                className={`py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  formData.tripType === type
                    ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                    : 'bg-slate-50 text-[#666C68] border-black/10 hover:border-black/30'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
