import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  badge,
  path
}) {
  return (
    <div className="editorial-white-card p-8 flex flex-col justify-between group h-full relative">
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-5 h-5" />
          </div>
          {badge && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-[#1D2B26] border border-black/5">
              {badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-[#222926] mb-3 font-heading group-hover:text-[#1D2B26] transition-colors">
          {title}
        </h3>
        <p className="text-[#666C68] text-sm leading-relaxed mb-8 font-normal">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      {path && (
        <NavLink
          to={path}
          className="inline-flex items-center justify-between w-full pt-5 border-t border-black/5 text-xs font-bold uppercase tracking-wider text-[#1D2B26] hover:text-black transition-colors"
        >
          <span>Learn More</span>
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[#1D2B26] group-hover:bg-[#1D2B26] group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NavLink>
      )}
    </div>
  );
}
