import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Luggage, 
  Route, 
  Lightbulb, 
  History, 
  UserCheck, 
  UserX,
  Navigation
} from 'lucide-react';
import { generateTravelPlanWithAI } from '../services/aiService';

export default function TravelPlanner() {
  // Form State (Feature 1)
  const [formData, setFormData] = useState({
    origin: 'Piazza Navona, Rome',
    destination: 'Colosseum, Rome',
    travelDate: '2026-08-01',
    departureTime: '19:30',
    travelMode: 'Walking',
    travelingAlone: true,
    additionalNotes: 'Solo evening walk, carrying camera equipment.'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);
  const [checkedPacking, setCheckedPacking] = useState({});
  const [history, setHistory] = useState([]);

  // Initial Mount Plan Generation
  useEffect(() => {
    const runInitialPlan = async () => {
      setIsGenerating(true);
      const res = await generateTravelPlanWithAI(formData);
      setIsGenerating(false);
      setPlan(res);
      setHistory([
        {
          id: `plan-hist-${Date.now()}`,
          origin: formData.origin,
          destination: formData.destination,
          date: formData.travelDate,
          score: res.readinessScore,
          level: res.readinessLevel,
          planData: res
        }
      ]);
    };

    runInitialPlan();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTogglePacking = (idx) => {
    setCheckedPacking(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Submit Handler (Feature 1)
  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination) return;

    setPlan(null);
    setIsGenerating(true);

    const res = await generateTravelPlanWithAI({
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      travelDate: formData.travelDate,
      departureTime: formData.departureTime,
      travelMode: formData.travelMode,
      travelingAlone: formData.travelingAlone,
      additionalNotes: formData.additionalNotes
    });

    setIsGenerating(false);
    setPlan(res);

    // Feature 8: Log to session planning history (max 5)
    const historyEntry = {
      id: `plan-hist-${Date.now()}-${Math.random()}`,
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      date: formData.travelDate || 'Today',
      score: res.readinessScore,
      level: res.readinessLevel,
      planData: res
    };

    setHistory(prev => [historyEntry, ...prev].slice(0, 5));
  };

  const handleSelectHistoryItem = (item) => {
    if (item.planData) {
      setPlan(item.planData);
    }
  };

  // Score Color Helper
  const getScoreColorClasses = (score) => {
    if (score >= 80) {
      return {
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        text: 'text-emerald-700',
        barBg: 'bg-emerald-600'
      };
    } else if (score >= 60) {
      return {
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        text: 'text-amber-700',
        barBg: 'bg-amber-600'
      };
    } else {
      return {
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
        text: 'text-rose-700',
        barBg: 'bg-rose-600'
      };
    }
  };

  const scoreConfig = plan ? getScoreColorClasses(plan.readinessScore) : getScoreColorClasses(90);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>AI Journey Planning Assistant</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Smart Travel Planner
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Create personalized, safe, and intelligent travel itineraries tailored to your schedule, mode of transport, and solo travel preferences.
          </p>

          <a
            href="#planner-form"
            className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-xl"
          >
            <span>Create Travel Plan</span>
            <ArrowRight className="w-4 h-4" />
          </a>

        </div>
      </section>


      {/* SECTION 2: Form & Session History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Container (Feature 1) */}
        <section id="planner-form" className="lg:col-span-2 editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md">
          <form onSubmit={handleSubmitPlan} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Compass className="w-4 h-4 text-[#1D2B26]" />
                <span>Journey Planning Parameters</span>
              </div>
              <h2 className="text-2xl font-bold text-[#222926] font-heading">
                Smart Journey Setup
              </h2>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Starting Location *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="e.g. Hotel / Home Address"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Destination *
                </label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g. Colosseum, Rome"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Date of Travel
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Departure Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Primary Mode of Transport
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Walking', 'Transit', 'Rideshare', 'Cycling'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, travelMode: mode }))}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        formData.travelMode === mode
                          ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-sm'
                          : 'bg-slate-50 text-[#666C68] border-black/10 hover:border-black/30'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traveling Alone Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-black/10 sm:col-span-2">
                <div className="flex items-center gap-3">
                  {formData.travelingAlone ? (
                    <UserCheck className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <UserX className="w-5 h-5 text-slate-500" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#222926]">
                      Traveling Alone (Solo Traveler)
                    </span>
                    <span className="text-[11px] text-[#666C68]">
                      Enable to receive solo safety precautions and corridor monitoring.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, travelingAlone: !prev.travelingAlone }))}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                    formData.travelingAlone ? 'bg-emerald-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.travelingAlone ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Additional Notes or Preferences
                </label>
                <textarea
                  name="additionalNotes"
                  rows="2"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="e.g. Carrying luggage, prefer well-lit main avenues..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="btn-dark-green w-full py-4 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 mt-2 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Generating AI Smart Travel Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Smart Plan</span>
                </>
              )}
            </button>

          </form>
        </section>

        {/* Planning Session History Sidebar (Feature 8) */}
        <section className="editorial-white-card p-8 flex flex-col gap-6 border border-black/5 shadow-md">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <History className="w-4 h-4 text-[#1D2B26]" />
              <span>Session Memory</span>
            </div>
            <h2 className="text-xl font-bold text-[#222926] font-heading">
              Planning History
            </h2>
            <p className="text-[11px] text-[#666C68]">
              Previous journey plans generated during this session.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {history.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-[#666C68]">
                No previous plans logged yet.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectHistoryItem(item)}
                  className="p-4 rounded-xl bg-slate-50 border border-black/5 hover:border-black/20 hover:bg-slate-100/80 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#222926] font-heading truncate max-w-[150px]">
                      {item.origin} → {item.destination}
                    </span>
                    <span className="text-[10px] text-[#666C68]">
                      Date: {item.date}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                    item.level === 'High' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : item.level === 'Moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.score}/100
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

      </div>


      {/* Loading Feedback Indicator */}
      {isGenerating && (
        <div className="editorial-white-card p-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in duration-200">
          <Loader2 className="w-10 h-10 animate-spin text-[#1D2B26]" />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-[#222926] font-heading">
              Creating Tailored Travel Plan from "{formData.origin}" to "{formData.destination}"
            </span>
            <span className="text-xs text-[#666C68]">
              Analyzing route strategies, departure windows, packing requirements, and safety tips...
            </span>
          </div>
        </div>
      )}


      {/* AI Generated Plan Output */}
      {!isGenerating && plan && (
        <div className="flex flex-col gap-14 animate-in fade-in duration-300">
          
          {/* SECTION 3: HALO Journey Score & Strategy (Feature 2 & 3) */}
          <section className="editorial-white-card p-8 sm:p-12 border border-black/5 shadow-md flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#1D2B26]" />
                <span>AI Smart Plan Output</span>
              </div>

              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border ${scoreConfig.badgeBg}`}>
                {plan.readinessLevel} Readiness
              </span>
            </div>

            {/* Score Callout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              <div className="p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col items-center justify-center text-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
                  HALO Journey Readiness Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-6xl font-extrabold font-heading ${scoreConfig.text}`}>
                    {plan.readinessScore}
                  </span>
                  <span className="text-xl font-bold text-[#666C68]">/100</span>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full ${scoreConfig.barBg} transition-all duration-500`}
                    style={{ width: `${plan.readinessScore}%` }}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Journey Strategy & Overview
                </span>
                <p className="text-sm sm:text-base text-[#222926] leading-relaxed font-normal">
                  "{plan.journeyOverview}"
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-[#666C68] mt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#1D2B26]" />
                    <span>Best Departure: {plan.bestDepartureTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Route className="w-4 h-4 text-[#1D2B26]" />
                    <span>Distance: {plan.journeyDistance}</span>
                  </div>
                </div>
              </div>

            </div>

          </section>


          {/* SECTION 4: Step-by-Step Journey Timeline (Feature 5) */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Route className="w-4 h-4 text-[#1D2B26]" />
                <span>Step-by-Step Travel Plan</span>
              </div>
              <h2 className="text-3xl font-normal text-[#222926] font-heading tracking-tight">
                Journey Timeline
              </h2>
            </div>

            <div className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              {(plan.journeyTimeline || []).map((stepItem, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 sm:gap-6 pb-6 border-b border-black/5 last:border-b-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center text-sm font-extrabold font-heading shrink-0 shadow-sm">
                    {stepItem.step}
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-[#222926] font-heading">
                        {stepItem.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-[#1D2B26] self-start sm:self-auto border border-black/5">
                        {stepItem.time}
                      </span>
                    </div>

                    <p className="text-xs text-[#222926] font-medium leading-relaxed">
                      {stepItem.action}
                    </p>

                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/60 mt-1">
                      Recommendation: {stepItem.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* SECTION 5 & 6: AI Travel Tips & Dynamic Packing Checklist (Feature 4 & 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* AI Travel Tips (Feature 6) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Lightbulb className="w-4 h-4 text-[#1D2B26]" />
                  <span>AI Personalized Recommendations</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  AI Travel Tips
                </h2>
              </div>

              <div className="flex flex-col gap-3.5">
                {(plan.aiTravelTips || []).map((tipText, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3 text-xs font-medium text-[#222926]">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="leading-relaxed pt-0.5">{tipText}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic Packing Checklist (Feature 4) */}
            <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
                <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                  <Luggage className="w-4 h-4 text-[#1D2B26]" />
                  <span>Contextual Checklist</span>
                </div>
                <h2 className="text-2xl font-bold text-[#222926] font-heading">
                  Packing Checklist
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {(plan.packingChecklist || []).map((item, idx) => {
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
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>


          {/* SECTION 7: Journey Summary Report Card (Feature 7) */}
          <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col gap-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/90">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Journey Summary Report</span>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
                Readiness: {plan.readinessScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Distance & Duration
                </span>
                <span className="text-xl font-bold font-heading">{plan.journeyDistance} ({plan.estimatedDuration})</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Best Departure Time
                </span>
                <span className="text-xl font-bold font-heading">{plan.bestDepartureTime}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Overall Readiness
                </span>
                <span className="text-xl font-bold font-heading">{plan.readinessLevel} Readiness</span>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-3">
                <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Final AI Advisor Summary
                </span>
                <p className="text-sm font-light leading-relaxed text-white/90">
                  {plan.finalSummary}
                </p>
              </div>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
