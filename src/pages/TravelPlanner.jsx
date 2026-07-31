import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Wallet, 
  Home, 
  Bus, 
  Utensils, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

import TripDetailsForm from '../components/trip-planner/TripDetailsForm';
import BudgetSelector from '../components/trip-planner/BudgetSelector';
import PreferenceSelector from '../components/trip-planner/PreferenceSelector';
import AccommodationSelector from '../components/trip-planner/AccommodationSelector';
import TransportSelector from '../components/trip-planner/TransportSelector';
import FoodSelector from '../components/trip-planner/FoodSelector';
import TripNotes from '../components/trip-planner/TripNotes';

export default function TravelPlanner() {
  // Comprehensive Trip Form State
  const [formData, setFormData] = useState({
    startingLocation: 'New Delhi, India',
    destination: 'Kochi, Kerala',
    departureDate: '2026-08-10',
    returnDate: '2026-08-15',
    numberOfDays: 6,
    numberOfTravelers: 1,
    tripType: 'Solo',
    budgetType: 'Standard',
    currency: 'INR',
    budgetAmount: '35000',
    selectedPreferences: ['Nature', 'Food', 'Local Experiences', 'Relaxation'],
    accommodation: 'Resort',
    transport: 'Public Transport',
    foodPreferences: ['Local Cuisine', 'Vegetarian'],
    notes: 'I want a peaceful trip focusing on photography and local culture.'
  });

  const [validationError, setValidationError] = useState('');
  const [savedTripPayload, setSavedTripPayload] = useState(null);

  // Auto-calculate Number of Days on Date Change
  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      const start = new Date(formData.departureDate);
      const end = new Date(formData.returnDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const finalDays = Math.max(1, diffDays);
        setFormData(prev => ({ ...prev, numberOfDays: finalDays }));
      }
    }
  }, [formData.departureDate, formData.returnDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTravelersChange = (e) => {
    const val = parseInt(e.target.value, 10) || 1;
    setFormData(prev => ({ ...prev, numberOfTravelers: Math.max(1, val) }));
  };

  const handleTripTypeChange = (type) => {
    setFormData(prev => ({ ...prev, tripType: type }));
  };

  const handleBudgetTypeChange = (bType) => {
    setFormData(prev => ({ ...prev, budgetType: bType }));
  };

  const handleCurrencyChange = (curr) => {
    setFormData(prev => ({ ...prev, currency: curr }));
  };

  const handleBudgetAmountChange = (e) => {
    setFormData(prev => ({ ...prev, budgetAmount: e.target.value }));
  };

  const handleTogglePreference = (pref) => {
    setFormData(prev => {
      const exists = prev.selectedPreferences.includes(pref);
      const updated = exists
        ? prev.selectedPreferences.filter(p => p !== pref)
        : [...prev.selectedPreferences, pref];
      return { ...prev, selectedPreferences: updated };
    });
  };

  const handleAccommodationSelect = (acc) => {
    setFormData(prev => ({ ...prev, accommodation: acc }));
  };

  const handleTransportSelect = (tr) => {
    setFormData(prev => ({ ...prev, transport: tr }));
  };

  const handleToggleFood = (foodOpt) => {
    setFormData(prev => {
      if (foodOpt === 'No Preference') {
        return { ...prev, foodPreferences: ['No Preference'] };
      }
      const filtered = prev.foodPreferences.filter(f => f !== 'No Preference');
      const exists = filtered.includes(foodOpt);
      const updated = exists
        ? filtered.filter(f => f !== foodOpt)
        : [...filtered, foodOpt];
      return { ...prev, foodPreferences: updated.length === 0 ? ['No Preference'] : updated };
    });
  };

  // Section 9: Form Submission & State Validation (Phase 1: No Gemini API call yet)
  const handleSubmitTripForm = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.startingLocation.trim() || !formData.destination.trim()) {
      setValidationError('Please specify both Starting Location and Destination.');
      return;
    }

    if (!formData.departureDate || !formData.returnDate) {
      setValidationError('Please select valid Departure and Return dates.');
      return;
    }

    if (new Date(formData.returnDate) < new Date(formData.departureDate)) {
      setValidationError('Return Date cannot be earlier than Departure Date.');
      return;
    }

    // Save validated state payload
    const tripPayload = {
      timestamp: new Date().toISOString(),
      ...formData
    };

    console.log('[HALO AI Trip Planner - Phase 1] Form Data Validated & Stored:', tripPayload);
    setSavedTripPayload(tripPayload);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>AI Trip Planning Engine • Phase 1</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            AI Trip Planner
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Configure your complete travel preferences, dates, budget, accommodations, transit, and dietary choices.
          </p>

          <a
            href="#trip-form"
            className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-xl"
          >
            <span>Start Trip Setup</span>
            <ArrowRight className="w-4 h-4" />
          </a>

        </div>
      </section>


      {/* Form Container (Section 1 through 8) */}
      <section id="trip-form" className="editorial-white-card p-8 sm:p-12 border border-black/5 shadow-md">
        <form onSubmit={handleSubmitTripForm} className="flex flex-col gap-12">
          
          {/* SECTION 1 & 2: Trip Overview & Travelers */}
          <TripDetailsForm
            formData={formData}
            onChange={handleInputChange}
            onTravelersChange={handleTravelersChange}
            onTripTypeChange={handleTripTypeChange}
          />

          {/* SECTION 3: Budget & Currency */}
          <BudgetSelector
            formData={formData}
            onBudgetTypeChange={handleBudgetTypeChange}
            onCurrencyChange={handleCurrencyChange}
            onAmountChange={handleBudgetAmountChange}
          />

          {/* SECTION 4: Travel Preferences */}
          <PreferenceSelector
            selectedPreferences={formData.selectedPreferences}
            onTogglePreference={handleTogglePreference}
          />

          {/* SECTION 5: Accommodation Preferences */}
          <AccommodationSelector
            selectedAccommodation={formData.accommodation}
            onSelect={handleAccommodationSelect}
          />

          {/* SECTION 6: Transportation Preference */}
          <TransportSelector
            selectedTransport={formData.transport}
            onSelect={handleTransportSelect}
          />

          {/* SECTION 7: Food Preferences */}
          <FoodSelector
            selectedFoodPreferences={formData.foodPreferences}
            onToggleFood={handleToggleFood}
          />

          {/* SECTION 8: Additional Notes */}
          <TripNotes
            notes={formData.notes}
            onChange={handleInputChange}
          />

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs font-bold text-rose-800">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* SECTION 9: Generate Button CTA */}
          <div className="pt-6 border-t border-black/5 flex flex-col gap-3">
            <button
              type="submit"
              className="btn-dark-green w-full py-5 text-sm font-extrabold tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:scale-[1.005] transition-all"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>✨ Generate AI Trip Plan</span>
            </button>

            <span className="text-[11px] text-[#666C68] text-center font-medium">
              * Phase 1 Data Collection: Validates inputs and stores trip payload in state.
            </span>
          </div>

        </form>
      </section>


      {/* SECTION 9 Output View: Stored Payload Summary */}
      {savedTripPayload && (
        <section className="editorial-white-card p-8 sm:p-12 border border-emerald-200 bg-emerald-50/40 shadow-lg flex flex-col gap-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200/80 pb-6">
            <div className="flex items-center gap-2 text-emerald-950 text-xs font-extrabold uppercase tracking-widest">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Phase 1 Trip Data Collected & Validated</span>
            </div>

            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-700 text-white shadow-sm">
              State Validated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/80 border border-emerald-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Route & Duration
              </span>
              <span className="text-sm font-bold text-[#1D2B26] font-heading">
                {savedTripPayload.startingLocation} → {savedTripPayload.destination}
              </span>
              <span className="text-xs text-emerald-800 font-semibold">
                {savedTripPayload.numberOfDays} Days ({savedTripPayload.departureDate} to {savedTripPayload.returnDate})
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/80 border border-emerald-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Travelers & Type
              </span>
              <span className="text-sm font-bold text-[#1D2B26] font-heading">
                {savedTripPayload.numberOfTravelers} Traveler ({savedTripPayload.tripType})
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {savedTripPayload.transport} Transit
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/80 border border-emerald-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Budget & Stay
              </span>
              <span className="text-sm font-bold text-[#1D2B26] font-heading">
                {savedTripPayload.budgetType} ({savedTripPayload.currency} {savedTripPayload.budgetAmount || 'Default'})
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {savedTripPayload.accommodation}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/80 border border-emerald-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Preferences
              </span>
              <span className="text-xs font-bold text-[#1D2B26] font-heading truncate">
                {savedTripPayload.selectedPreferences.join(', ')}
              </span>
              <span className="text-xs text-slate-600 font-medium truncate">
                Diet: {savedTripPayload.foodPreferences.join(', ')}
              </span>
            </div>

          </div>

          {savedTripPayload.notes && (
            <div className="p-4 rounded-xl bg-white/80 border border-emerald-100 flex flex-col gap-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Additional Notes
              </span>
              <p className="text-xs text-[#222926] font-medium leading-relaxed">
                "{savedTripPayload.notes}"
              </p>
            </div>
          )}

        </section>
      )}

    </div>
  );
}
