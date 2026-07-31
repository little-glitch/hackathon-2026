import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Navigation, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Bus, 
  Sun, 
  Users, 
  Compass, 
  History, 
  Loader2,
  FileText
} from 'lucide-react';
import { analyzeDestinationSafetyWithAI } from '../services/aiService';

export default function IsItSafe() {
  // Form State (Feature 1)
  const [formData, setFormData] = useState({
    destination: 'Trastevere, Rome',
    travelDate: '2026-08-01',
    travelTime: '20:30',
    travelMode: 'Walking',
    additionalNotes: 'Traveling solo in the evening.'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Current Active Report State
  const [report, setReport] = useState({
    safetyScore: 92,
    riskLevel: 'Low',
    overallAssessment: 'Trastevere is generally very safe during evening hours with active foot traffic and well-lit thoroughfares.',
    riskBreakdown: {
      personalSafety: {
        score: 94,
        explanation: 'Low crime rate along main piazzas with active security presence.',
        recommendation: 'Stick to lit pedestrian corridors after dark.'
      },
      transportation: {
        score: 90,
        explanation: 'Frequent Tram 8 service and night bus connections.',
        recommendation: 'Keep digital tickets ready on your phone.'
      },
      environmental: {
        score: 95,
        explanation: 'Clear weather forecast with comfortable 22°C temperature.',
        recommendation: 'Wear comfortable walking shoes for cobblestone streets.'
      },
      crowdLevel: {
        score: 88,
        explanation: 'Moderate evening dining crowds near Piazza di Santa Maria.',
        recommendation: 'Keep personal belongings secure in crowded dining areas.'
      },
      generalAdvice: {
        score: 93,
        explanation: 'Well-monitored safe corridor for solo travelers.',
        recommendation: 'Share your live HALO journey link with trusted contacts.'
      }
    },
    recommendations: [
      'Travel along lit primary thoroughfares rather than dark shortcuts.',
      'Keep mobile phone battery charged above 50%.',
      'Share your live tracking corridor link with emergency contacts.',
      'Use main tram stops instead of isolated bus pick-up points.'
    ],
    recommendedTravelWindow: '08:00 AM - 08:30 PM',
    thingsToRemember: [
      'Emergency contacts saved on mobile',
      'Phone charged above 50%',
      'Live location sharing enabled',
      'Offline map corridor cached'
    ],
    finalSummary: 'Overall, Trastevere offers a highly secure travel corridor when exercising standard urban precautions.'
  });

  // Checklist Completion State (Feature 6)
  const [checkedItems, setCheckedItems] = useState({});

  // Analysis History Log (Feature 8)
  const [history, setHistory] = useState([
    {
      id: 'hist-1',
      destination: 'Trastevere, Rome',
      date: '2026-08-01',
      safetyScore: 92,
      riskLevel: 'Low',
      reportData: null // stores report payload
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChecklist = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Submit Handler for AI Analysis
  const handleSubmitAnalysis = async (e) => {
    e.preventDefault();
    if (!formData.destination) return;

    setIsAnalyzing(true);

    const res = await analyzeDestinationSafetyWithAI({
      destination: formData.destination,
      travelDate: formData.travelDate,
      travelTime: formData.travelTime,
      travelMode: formData.travelMode,
      additionalNotes: formData.additionalNotes
    });

    setIsAnalyzing(false);
    setReport(res);

    // Save to Analysis History (Feature 8 - max 5 items)
    const historyEntry = {
      id: `hist-${Date.now()}`,
      destination: formData.destination,
      date: formData.travelDate || 'Today',
      safetyScore: res.safetyScore,
      riskLevel: res.riskLevel,
      reportData: res
    };

    setHistory(prev => [historyEntry, ...prev].slice(0, 5));
  };

  // Reload previous analysis from history
  const handleSelectHistoryItem = (item) => {
    if (item.reportData) {
      setReport(item.reportData);
    }
  };

  // Score color helper
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

  const scoreConfig = getScoreColorClasses(report.safetyScore);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>AI Safety Intelligence Advisor</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Is It Safe?
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Analyze the safety of any destination before you travel using HALO's Gemini-powered safety intelligence.
          </p>

          <a
            href="#analysis-form"
            className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2"
          >
            <span>Analyze Destination</span>
            <ArrowRight className="w-4 h-4" />
          </a>

        </div>
      </section>


      {/* SECTION 2: Main Analysis Form & History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Container (Feature 1) */}
        <section id="analysis-form" className="lg:col-span-2 editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md">
          <form onSubmit={handleSubmitAnalysis} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <Search className="w-4 h-4 text-[#1D2B26]" />
                <span>Pre-Travel Assessment</span>
              </div>
              <h2 className="text-2xl font-bold text-[#222926] font-heading">
                Destination Safety Form
              </h2>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Destination Address or District
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g. Trastevere, Rome"
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
                  Estimated Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
                  <input
                    type="time"
                    name="travelTime"
                    value={formData.travelTime}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Primary Travel Mode
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

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Additional Notes or Concerns (Optional)
                </label>
                <textarea
                  name="additionalNotes"
                  rows="2"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="e.g. Traveling solo late at night, carrying photography gear..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn-dark-green w-full py-4 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 mt-2 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Evaluating Safety with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Analyze Safety</span>
                </>
              )}
            </button>

          </form>
        </section>

        {/* Session Analysis History Sidebar (Feature 8) */}
        <section className="editorial-white-card p-8 flex flex-col gap-6 border border-black/5 shadow-md">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <History className="w-4 h-4 text-[#1D2B26]" />
              <span>Session Memory</span>
            </div>
            <h2 className="text-xl font-bold text-[#222926] font-heading">
              Analysis History
            </h2>
            <p className="text-[11px] text-[#666C68]">
              Previous safety evaluations during this browser session.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectHistoryItem(item)}
                className="p-4 rounded-xl bg-slate-50 border border-black/5 hover:border-black/20 hover:bg-slate-100/80 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#222926] font-heading truncate max-w-[160px]">
                    {item.destination}
                  </span>
                  <span className="text-[10px] text-[#666C68]">
                    Date: {item.date}
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                  item.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.safetyScore}/100
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>


      {/* SECTION 3: AI Safety Score & Overall Assessment (Feature 3) */}
      <section className="editorial-white-card p-8 sm:p-12 border border-black/5 shadow-md flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#1D2B26]" />
            <span>AI Safety Assessment Output</span>
          </div>

          <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border ${scoreConfig.badgeBg}`}>
            {report.riskLevel} Risk
          </span>
        </div>

        {/* Score Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68]">
              Overall Safety Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-6xl font-extrabold font-heading ${scoreConfig.text}`}>
                {report.safetyScore}
              </span>
              <span className="text-xl font-bold text-[#666C68]">/100</span>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${scoreConfig.barBg} transition-all duration-500`}
                style={{ width: `${report.safetyScore}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
              Advisor Assessment
            </span>
            <p className="text-sm sm:text-base text-[#222926] leading-relaxed font-normal">
              "{report.overallAssessment}"
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#666C68] mt-1">
              <Clock className="w-4 h-4 text-[#1D2B26]" />
              <span>Recommended Travel Window: {report.recommendedTravelWindow}</span>
            </div>
          </div>

        </div>

      </section>


      {/* SECTION 4: Risk Breakdown Grid (Feature 4) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-[#1D2B26]" />
            <span>Category Evaluations</span>
          </div>
          <h2 className="text-3xl font-normal text-[#222926] font-heading tracking-tight">
            Detailed Risk Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Category 1: Personal Safety */}
          <div className="editorial-white-card p-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-extrabold text-[#1D2B26] font-heading">
                  {report.riskBreakdown.personalSafety.score}/100
                </span>
              </div>
              <h3 className="text-base font-bold text-[#222926] font-heading mb-2">
                Personal Safety
              </h3>
              <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                {report.riskBreakdown.personalSafety.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1D2B26]">
              Tip: {report.riskBreakdown.personalSafety.recommendation}
            </div>
          </div>

          {/* Category 2: Transportation */}
          <div className="editorial-white-card p-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm">
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-extrabold text-[#1D2B26] font-heading">
                  {report.riskBreakdown.transportation.score}/100
                </span>
              </div>
              <h3 className="text-base font-bold text-[#222926] font-heading mb-2">
                Transportation
              </h3>
              <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                {report.riskBreakdown.transportation.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1D2B26]">
              Tip: {report.riskBreakdown.transportation.recommendation}
            </div>
          </div>

          {/* Category 3: Environmental Conditions */}
          <div className="editorial-white-card p-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-extrabold text-[#1D2B26] font-heading">
                  {report.riskBreakdown.environmental.score}/100
                </span>
              </div>
              <h3 className="text-base font-bold text-[#222926] font-heading mb-2">
                Environmental Conditions
              </h3>
              <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                {report.riskBreakdown.environmental.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1D2B26]">
              Tip: {report.riskBreakdown.environmental.recommendation}
            </div>
          </div>

          {/* Category 4: Crowd Level */}
          <div className="editorial-white-card p-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-extrabold text-[#1D2B26] font-heading">
                  {report.riskBreakdown.crowdLevel.score}/100
                </span>
              </div>
              <h3 className="text-base font-bold text-[#222926] font-heading mb-2">
                Crowd Density
              </h3>
              <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                {report.riskBreakdown.crowdLevel.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1D2B26]">
              Tip: {report.riskBreakdown.crowdLevel.recommendation}
            </div>
          </div>

          {/* Category 5: General Advice */}
          <div className="editorial-white-card p-7 flex flex-col justify-between gap-4 md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-extrabold text-[#1D2B26] font-heading">
                  {report.riskBreakdown.generalAdvice.score}/100
                </span>
              </div>
              <h3 className="text-base font-bold text-[#222926] font-heading mb-2">
                General Corridor Status
              </h3>
              <p className="text-xs text-[#666C68] leading-relaxed font-normal">
                {report.riskBreakdown.generalAdvice.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[11px] font-semibold text-[#1D2B26]">
              Tip: {report.riskBreakdown.generalAdvice.recommendation}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 5 & 6: Travel Recommendations & Things to Remember Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Travel Recommendations (Feature 5) */}
        <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#1D2B26]" />
              <span>AI Advisor Guidance</span>
            </div>
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              Travel Recommendations
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            {report.recommendations.map((recText, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3 text-xs font-medium text-[#222926]">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="leading-relaxed pt-0.5">{recText}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Things to Remember Interactive Checklist (Feature 6) */}
        <section className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <FileText className="w-4 h-4 text-[#1D2B26]" />
              <span>Pre-Departure Checklist</span>
            </div>
            <h2 className="text-2xl font-bold text-[#222926] font-heading">
              Things to Remember
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {report.thingsToRemember.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleChecklist(idx)}
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


      {/* SECTION 7: Journey Preparation Summary Report Card (Feature 7) */}
      <section className="reference-hero-container p-8 sm:p-12 text-white flex flex-col gap-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/90">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Journey Preparation Summary</span>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            Score: {report.safetyScore}/100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
              Recommended Travel Window
            </span>
            <span className="text-xl font-bold font-heading">{report.recommendedTravelWindow}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
              Estimated Risk
            </span>
            <span className="text-xl font-bold font-heading">{report.riskLevel} Risk</span>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-3">
            <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">
              Final Advisor Summary
            </span>
            <p className="text-sm font-light leading-relaxed text-white/90">
              {report.finalSummary}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
