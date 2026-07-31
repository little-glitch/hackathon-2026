import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Compass, 
  Navigation, 
  ShieldAlert, 
  LifeBuoy, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Shield },
    { name: 'Travel Planner', path: '/planner', icon: Compass },
    { name: 'Live Journey', path: '/live-journey', icon: Navigation, badge: 'Live' },
    { name: 'Is It Safe?', path: '/is-it-safe', icon: ShieldAlert },
    { name: 'Emergency', path: '/emergency', icon: LifeBuoy, highlight: true },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <nav className="bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm rounded-2xl px-6 sm:px-8 py-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Left */}
          <NavLink 
            to="/" 
            onClick={closeMenu}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1D2B26] text-white shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#1D2B26]">
              HALO
            </span>
          </NavLink>

          {/* Navigation Center */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              if (item.highlight) {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'text-rose-600 hover:bg-rose-50/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-rose-600" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#1D2B26] bg-black/5 font-bold'
                      : 'text-[#666C68] hover:text-[#1D2B26] hover:bg-black/[0.03]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1D2B26]' : 'text-[#666C68]'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* CTA Right (Dark Capsule matching image.jpeg "BOOK A DEMO") */}
          <div className="hidden lg:flex items-center shrink-0">
            <NavLink
              to="/planner"
              className="btn-dark-green px-5 py-2.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2"
            >
              <span>Plan Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#1D2B26] hover:bg-black/5 border border-black/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-[#1D2B26]" /> : <Menu className="w-5 h-5 text-[#1D2B26]" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-black/5 flex flex-col gap-2 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#1D2B26]/10 text-[#1D2B26] font-bold'
                      : 'text-[#666C68] hover:text-[#1D2B26] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1D2B26]' : 'text-[#666C68]'}`} />
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              );
            })}

            <NavLink
              to="/planner"
              onClick={closeMenu}
              className="btn-dark-green mt-2 w-full py-3 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <span>Plan Journey</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
