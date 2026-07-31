import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Wallet, 
  Home, 
  Bus, 
  Utensils, 
  ShieldCheck, 
  Luggage, 
  Route, 
  Lightbulb, 
  History, 
  Loader2,
  DollarSign,
  AlertCircle,
  Sun,
  Sunset,
  Moon,
  Sunrise,
  Building2,
  Coffee,
  Check
} from 'lucide-react';

import TripDetailsForm from '../components/trip-planner/TripDetailsForm';
import BudgetSelector from '../components/trip-planner/BudgetSelector';
import PreferenceSelector from '../components/trip-planner/PreferenceSelector';
import AccommodationSelector from '../components/trip-planner/AccommodationSelector';
import TransportSelector from '../components/trip-planner/TransportSelector';
import FoodSelector from '../components/trip-planner/FoodSelector';
import TripNotes from '../components/trip-planner/TripNotes';

import { generateFullTripItineraryWithAI } from '../services/aiService';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullItinerary, setFullItinerary] = useState(null);
  const [checkedPacking, setCheckedPacking] = useState({});
  const [activeDayTab, setActiveDayTab] = useState(1);

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

  const handleTripTypeChange = (type) => setFormData(prev => ({ ...prev, tripType: type }));
  const handleBudgetTypeChange = (bType) => setFormData(prev => ({ ...prev, budgetType: bType }));
  const handleCurrencyChange = (curr) => setFormData(prev => ({ ...prev, currency: curr }));
  const handleBudgetAmountChange = (e) => setFormData(prev => ({ ...prev, budgetAmount: e.target.value }));

  const handleTogglePreference = (pref) => {
    setFormData(prev => {
      const exists = prev.selectedPreferences.includes(pref);
      const updated = exists
        ? prev.selectedPreferences.filter(p => p !== pref)
        : [...prev.selectedPreferences, pref];
      return { ...prev, selectedPreferences: updated };
    });
  };

  const handleAccommodationSelect = (acc) => setFormData(prev => ({ ...prev, accommodation: acc }));
  const handleTransportSelect = (tr) => setFormData(prev => ({ ...prev, transport: tr }));

  const handleToggleFood = (foodOpt) => {
    setFormData(prev => {
      if (foodOpt === 'No Preference') return { ...prev, foodPreferences: ['No Preference'] };
      const filtered = prev.foodPreferences.filter(f => f !== 'No Preference');
      const exists = filtered.includes(foodOpt);
      const updated = exists ? filtered.filter(f => f !== foodOpt) : [...filtered, foodOpt];
      return { ...prev, foodPreferences: updated.length === 0 ? ['No Preference'] : updated };
    });
  };

  const handleTogglePacking = (idx) => {
    setCheckedPacking(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Form Submission & Full Itinerary AI Generation with Robust try...catch...finally
  const handleSubmitTripForm = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.startingLocation || !formData.startingLocation.trim() || !formData.destination || !formData.destination.trim()) {
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

    console.log('[HALO AI Travel Planner] Form submitted, initiating personalized AI itinerary generation...');
    setFullItinerary(null);
    setIsGenerating(true);

    try {
      const res = await generateFullTripItineraryWithAI(formData);
      if (res) {
        setFullItinerary(res);
        setActiveDayTab(1);
      } else {
        setValidationError('Received empty response from AI planner. Please try again.');
      }
    } catch (err) {
      console.error('[HALO AI Travel Planner] Error during itinerary generation:', err);
      setValidationError('An error occurred while generating your travel itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Professional Personalized AI Planner</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            AI Trip Planner
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Configure your complete travel preferences, dates, budget, accommodations, and transit to generate a 100% personalized day-by-day vacation itinerary.
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
              disabled={isGenerating}
              className="btn-dark-green w-full py-5 text-sm font-extrabold tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:scale-[1.005] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Generating Personalized Vacation Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>✨ Generate AI Trip Plan</span>
                </>
              )}
            </button>
          </div>

        </form>
      </section>


      {/* Loading Indicator */}
      {isGenerating && (
        <div className="editorial-white-card p-14 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in duration-200">
          <Loader2 className="w-12 h-12 animate-spin text-[#1D2B26]" />
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-xl font-bold text-[#222926] font-heading">
              Creating Personalized Itinerary for {formData.destination}
            </span>
            <span className="text-xs text-[#666C68]">
              Personalizing activities for a {formData.budgetType.toLowerCase()} {formData.tripType.toLowerCase()} traveler interested in {formData.selectedPreferences.join(', ')}...
            </span>
          </div>
        </div>
      )}


      {/* COMPLETE PROFESSIONAL ITINERARY OUTPUT */}
      {!isGenerating && fullItinerary && (
        <div className="flex flex-col gap-14 animate-in fade-in duration-400">
          
          {/* Personalization Rationale Banner */}
          {fullItinerary.personalizationRationale && (
            <div className="editorial-white-card p-6 border border-emerald-300 bg-emerald-50/70 text-emerald-950 flex items-center gap-3 font-semibold text-xs sm:text-sm font-heading shadow-sm">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>"{fullItinerary.personalizationRationale}"</span>
            </div>
          )}

          {/* SECTION 1: Trip Overview Hero Card */}
          <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/90">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Personalized Itinerary Report</span>
              </div>
              <span className="px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md self-start sm:self-auto">
                Theme: {fullItinerary.tripOverview?.tripTheme}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Destination
                </span>
                <span className="text-2xl font-bold font-heading">{fullItinerary.tripOverview?.destination}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Trip Duration
                </span>
                <span className="text-xl font-bold font-heading">{fullItinerary.tripOverview?.duration}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Estimated Total Budget
                </span>
                <span className="text-2xl font-extrabold font-heading text-emerald-300">
                  {fullItinerary.tripOverview?.totalBudget}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-3">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Personalized Overview
                </span>
                <p className="text-sm font-light leading-relaxed text-white/90">
                  "{fullItinerary.tripOverview?.overviewText}"
                </p>
              </div>
            </div>
          </section>


          {/* SECTION 2: DAY-BY-DAY ITINERARY (PRIMARY & LARGEST SECTION!) */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Route className="w-4 h-4 text-[#1D2B26]" />
                <span>Primary Travel Schedule</span>
              </div>
              <h2 className="text-3xl font-normal text-[#222926] font-heading tracking-tight">
                Day-by-Day Vacation Itinerary
              </h2>
            </div>

            {/* Day Selection Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(fullItinerary.dayByDayItinerary || []).map((dayObj) => (
                <button
                  key={dayObj.dayNumber}
                  type="button"
                  onClick={() => setActiveDayTab(dayObj.dayNumber)}
                  className={`py-3 px-5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 border ${
                    activeDayTab === dayObj.dayNumber
                      ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-md'
                      : 'bg-white text-[#666C68] border-black/10 hover:border-black/30'
                  }`}
                >
                  Day {dayObj.dayNumber}
                </button>
              ))}
            </div>

            {/* Active Day Detail Display */}
            {(() => {
              const currentDay = (fullItinerary.dayByDayItinerary || []).find(d => d.dayNumber === activeDayTab) || fullItinerary.dayByDayItinerary?.[0];
              if (!currentDay) return null;

              return (
                <div className="editorial-white-card p-8 sm:p-12 border border-black/5 shadow-md flex flex-col gap-8">
                  
                  <div className="flex items-center justify-between border-b border-black/5 pb-4">
                    <h3 className="text-2xl font-bold text-[#222926] font-heading">
                      {currentDay.dayTitle}
                    </h3>
                    <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-slate-100 text-[#1D2B26] border border-black/5">
                      Day {currentDay.dayNumber} of {fullItinerary.dayByDayItinerary?.length}
                    </span>
                  </div>

                  {/* 4 Time Periods Grid (Morning, Afternoon, Evening, Night) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Morning */}
                    {currentDay.morning && (
                      <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
                            <Sunrise className="w-4 h-4 text-amber-700" />
                            <span>Morning</span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                            {currentDay.morning.time}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#222926] font-heading">
                          {currentDay.morning.activity}
                        </h4>
                        <p className="text-xs text-[#666C68] leading-relaxed">
                          {currentDay.morning.description}
                        </p>
                        <div className="pt-2 border-t border-amber-200/60 text-xs font-extrabold text-amber-900">
                          Est. Cost: {currentDay.morning.cost}
                        </div>
                      </div>
                    )}

                    {/* Afternoon */}
                    {currentDay.afternoon && (
                      <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200/70 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-orange-900 text-xs font-extrabold uppercase tracking-wider">
                            <Sun className="w-4 h-4 text-orange-700" />
                            <span>Afternoon</span>
                          </div>
                          <span className="text-[11px] font-bold text-orange-900 bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-300">
                            {currentDay.afternoon.time}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#222926] font-heading">
                          {currentDay.afternoon.activity}
                        </h4>
                        <p className="text-xs text-[#666C68] leading-relaxed">
                          {currentDay.afternoon.description}
                        </p>
                        <div className="pt-2 border-t border-orange-200/60 text-xs font-extrabold text-orange-900">
                          Est. Cost: {currentDay.afternoon.cost}
                        </div>
                      </div>
                    )}

                    {/* Evening */}
                    {currentDay.evening && (
                      <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-900 text-xs font-extrabold uppercase tracking-wider">
                            <Sunset className="w-4 h-4 text-indigo-700" />
                            <span>Evening</span>
                          </div>
                          <span className="text-[11px] font-bold text-indigo-900 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-300">
                            {currentDay.evening.time}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#222926] font-heading">
                          {currentDay.evening.activity}
                        </h4>
                        <p className="text-xs text-[#666C68] leading-relaxed">
                          {currentDay.evening.description}
                        </p>
                        <div className="pt-2 border-t border-indigo-200/60 text-xs font-extrabold text-indigo-900">
                          Est. Cost: {currentDay.evening.cost}
                        </div>
                      </div>
                    )}

                    {/* Night */}
                    {currentDay.night && (
                      <div className="p-6 rounded-2xl bg-slate-100/70 border border-slate-300/70 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-900 text-xs font-extrabold uppercase tracking-wider">
                            <Moon className="w-4 h-4 text-slate-700" />
                            <span>Night</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-900 bg-slate-200/80 px-2.5 py-0.5 rounded-full border border-slate-300">
                            {currentDay.night.time}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#222926] font-heading">
                          {currentDay.night.activity}
                        </h4>
                        <p className="text-xs text-[#666C68] leading-relaxed">
                          {currentDay.night.description}
                        </p>
                        <div className="pt-2 border-t border-slate-300/60 text-xs font-extrabold text-slate-900">
                          Est. Cost: {currentDay.night.cost}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              );
            })()}
          </section>


          {/* SECTION 3 & 4: Accommodation & Transportation Strategy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Accommodation Recommendations (Section 3) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Home className="w-4 h-4 text-[#1D2B26]" />
                  <span>Recommended Places to Stay</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Accommodation Options ({formData.accommodation})
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {(fullItinerary.accommodations || []).map((acc, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#222926] font-heading">
                        {acc.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 shrink-0">
                        {acc.price}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#1D2B26]">
                      Area: {acc.area}
                    </span>
                    <p className="text-xs text-[#666C68] leading-relaxed">
                      "{acc.reason}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Transportation Strategy (Section 4) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Bus className="w-4 h-4 text-[#1D2B26]" />
                  <span>Transit Strategy ({formData.transport})</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Transportation Plan
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    To Destination
                  </span>
                  <span className="text-xs text-[#666C68] font-medium leading-relaxed">
                    {fullItinerary.transportation?.toDestination}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    Internal Attractions Transit
                  </span>
                  <span className="text-xs text-[#666C68] font-medium leading-relaxed">
                    {fullItinerary.transportation?.internalTransit}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    Return Journey
                  </span>
                  <span className="text-xs text-[#666C68] font-medium leading-relaxed">
                    {fullItinerary.transportation?.returnHome}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-extrabold text-emerald-950">
                  <span>Total Estimated Transit Budget:</span>
                  <span className="text-sm font-heading">{fullItinerary.transportation?.totalTransportCost}</span>
                </div>
              </div>
            </section>

          </div>


          {/* SECTION 5 & 6: Daily Restaurants & Itemized Budget Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Daily Restaurants Guide (Section 5) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Utensils className="w-4 h-4 text-[#1D2B26]" />
                  <span>Curated Culinary Guide ({formData.foodPreferences.join(', ')})</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Daily Restaurant Guide
                </h2>
              </div>

              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {(fullItinerary.restaurants || []).map((r, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex flex-col gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                      Day {r.day} Dining
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-[#666C68] font-medium">
                      <div><strong className="text-[#222926]">Breakfast:</strong> {r.breakfast}</div>
                      <div><strong className="text-[#222926]">Lunch:</strong> {r.lunch}</div>
                      <div><strong className="text-[#222926]">Dinner:</strong> {r.dinner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Itemized Budget Breakdown (Section 6) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Wallet className="w-4 h-4 text-[#1D2B26]" />
                  <span>Itemized Expense Allocation ({formData.budgetType})</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Budget Breakdown
                </h2>
              </div>

              {fullItinerary.budgetBreakdown && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Accommodation</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.accommodation}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Transportation</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.transport}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Food & Dining</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.food}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Activities & Sightseeing</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.activities}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Shopping & Souvenirs</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.shopping}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs text-[#222926]">
                    <span className="font-semibold">Emergency Buffer</span>
                    <span className="font-bold">{fullItinerary.budgetBreakdown.emergencyBuffer}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1D2B26] text-white text-sm font-extrabold mt-2 shadow-md">
                    <span>Total Estimated Budget:</span>
                    <span className="font-heading text-lg text-emerald-400">{fullItinerary.budgetBreakdown.totalEstimated}</span>
                  </div>
                </div>
              )}
            </section>

          </div>


          {/* SECTION 7 & 8: Packing Checklist & Destination Safety Advice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Packing Checklist (Section 7) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Luggage className="w-4 h-4 text-[#1D2B26]" />
                  <span>Tailored Checklist</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Packing Checklist
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {(fullItinerary.packingChecklist || []).map((item, idx) => {
                  const isChecked = !!checkedPacking[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleTogglePacking(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                          : 'bg-slate-50 border-black/5 text-[#222926] hover:bg-slate-100'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isChecked ? 'line-through opacity-70' : ''}`}>
                        {item}
                      </span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-black/30'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Destination Safety Advice (Section 8) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-[#1D2B26]" />
                  <span>Destination Safety Guidance</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Safety Recommendations
                </h2>
              </div>

              <div className="flex flex-col gap-3.5">
                {(fullItinerary.safetyAdvice || []).map((tipText, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3 text-xs font-medium text-[#222926]">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="leading-relaxed pt-0.5">{tipText}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>


          {/* SECTION 9: Trip Summary Report */}
          <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col gap-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/90">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Vacation Summary Report</span>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
                HALO Verified
              </span>
            </div>

            <div className="flex flex-col gap-3 text-left">
              <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                Final Agency Summary
              </span>
              <p className="text-base font-light leading-relaxed text-white/90">
                "{fullItinerary.tripSummary}"
              </p>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
