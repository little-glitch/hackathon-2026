import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TravelPlanner from './pages/TravelPlanner';
import LiveJourney from './pages/LiveJourney';
import IsItSafe from './pages/IsItSafe';
import EmergencyEscape from './pages/EmergencyEscape';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative selection:bg-[#3E7C59]/20 selection:text-[#3E7C59]">
        
        {/* Floating Top Glass Pill Navigation */}
        <Navbar />

        {/* Main Content Viewport */}
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<TravelPlanner />} />
            <Route path="/live-journey" element={<LiveJourney />} />
            <Route path="/is-it-safe" element={<IsItSafe />} />
            <Route path="/emergency" element={<EmergencyEscape />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />

      </div>
    </Router>
  );
}
