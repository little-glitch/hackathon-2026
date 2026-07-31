import React from 'react';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';

export default function RecommendationFeed({ recommendations = [] }) {
  return (
    <div className="editorial-white-card p-8 sm:p-10 border border-black/5 shadow-md">
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
          <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-[#1D2B26]" />
            <span>Predictive Guidance Stream</span>
          </div>
          <h2 className="text-2xl font-bold text-[#222926] font-heading">
            AI Recommendation Feed
          </h2>
          <p className="text-xs text-[#666C68] font-normal">
            Proactive suggestions generated dynamically by Gemini AI during your journey.
          </p>
        </div>

        {/* Feed List (Newest first) */}
        {recommendations.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 text-center text-xs text-[#666C68] font-medium border border-black/5">
            Predictive AI recommendations will appear here as your journey progresses.
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-1">
            {recommendations.map((rec) => (
              <div 
                key={rec.id}
                className="p-5 rounded-2xl bg-slate-50 border border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm font-bold text-[#222926] font-heading leading-snug">
                      {rec.text}
                    </p>
                    <span className="text-[11px] text-[#666C68]">
                      Timestamp: {rec.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                    rec.priority === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : rec.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rec.priority || 'Low'} Priority
                  </span>

                  {/* Confidence Indicator (Feature 5) */}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-white text-[#1D2B26] border border-black/10 shadow-2xs">
                    {rec.confidence || 92}% Confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
