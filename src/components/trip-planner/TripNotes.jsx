import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function TripNotes({ notes, onChange }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <MessageSquare className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 8 • Additional Notes & Special Requests</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          Tell HALO Anything Important...
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          name="notes"
          rows="4"
          value={notes}
          onChange={onChange}
          placeholder="Tell HALO anything important...
Examples:
• 'I want a peaceful trip.'
• 'I love photography.'
• 'I don't like crowded places.'
• 'I want pet-friendly stays.'"
          className="w-full p-4 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26] leading-relaxed"
        />
      </div>
    </div>
  );
}
