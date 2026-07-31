import React from 'react';
import { Shield } from 'lucide-react';

export default function PageContainer({
  title,
  subtitle,
  icon: Icon = Shield,
  badge,
  children
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10">
      
      {/* Header Banner */}
      <div className="editorial-white-card p-8 sm:p-12 relative overflow-hidden border border-black/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#1D2B26] flex items-center justify-center text-white shadow-md shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-normal text-[#222926] font-heading tracking-tight">
                  {title}
                </h1>
                {badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-[#1D2B26]">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-[#666C68] text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="w-full">
        {children}
      </main>

    </div>
  );
}
