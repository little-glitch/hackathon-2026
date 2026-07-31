import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Heart, Lock, Activity, ArrowUpRight, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-[#E5ECE7] text-[#222926] border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1D2B26] text-white shadow-md">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-heading text-2xl font-bold text-[#1D2B26] tracking-tight">HALO</span>
            </div>
            <p className="text-[#1D2B26] text-sm font-semibold tracking-wide">
              "Travel Smarter. Stay Safer."
            </p>
            <p className="text-[#666C68] text-xs leading-relaxed max-w-sm font-normal">
              HALO is a proactive AI travel safety companion that helps solo travelers stay safe before and during every journey through intelligent planning, live monitoring, contextual risk analysis and emergency assistance.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-[#1D2B26] uppercase tracking-widest font-heading">
              Safety Core
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#666C68] font-medium">
              <li>
                <NavLink to="/planner" className="hover:text-[#1D2B26] transition-colors inline-flex items-center gap-1.5">
                  AI Travel Planner <ArrowUpRight className="w-3 h-3 opacity-60" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/live-journey" className="hover:text-[#1D2B26] transition-colors inline-flex items-center gap-1.5">
                  Live Journey Monitoring <ArrowUpRight className="w-3 h-3 opacity-60" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/is-it-safe" className="hover:text-[#1D2B26] transition-colors inline-flex items-center gap-1.5">
                  AI Risk Assessment <ArrowUpRight className="w-3 h-3 opacity-60" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/emergency" className="hover:text-rose-600 transition-colors inline-flex items-center gap-1.5">
                  Emergency Escape Planner <ArrowUpRight className="w-3 h-3 opacity-60 text-rose-600" />
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Information & Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-extrabold text-[#1D2B26] uppercase tracking-widest font-heading">
              Information & Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#666C68] font-medium">
              <li>
                <a 
                  href="#privacy" 
                  onClick={(e) => { e.preventDefault(); alert("Privacy Policy: HALO values user privacy. All location data is processed securely and never shared."); }} 
                  className="hover:text-[#1D2B26] transition-colors inline-flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#1D2B26]" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@halo-safety.ai" className="hover:text-[#1D2B26] transition-colors inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#1D2B26]" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>

            <div className="bg-white p-3.5 rounded-xl flex items-center gap-3 border border-black/5 shadow-sm">
              <div className="relative flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#1D2B26]" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1D2B26]">System Active</span>
                <span className="text-[10px] text-[#666C68]">Proactive Guard Online</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666C68] font-medium">
          <p>© {new Date().getFullYear()} HALO Safety Companion. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built for Solo Travelers with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
