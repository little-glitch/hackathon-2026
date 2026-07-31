import React, { useState, useEffect, useRef } from 'react';
import { analyzeJourneyWithAI } from '../../services/aiService';
import CompanionCard from './CompanionCard';
import AlertManager from './AlertManager';
import JourneyTimeline from './JourneyTimeline';
import { calculateHaversineDistance } from './JourneyTracker';

export default function AIJourneyMonitor({ 
  journeyState, 
  currentLocation, 
  destination, 
  routeCoordinates = [], 
  distanceRemaining = 0, 
  progressPercentage = 0 
}) {
  const [companionMessage, setCompanionMessage] = useState('HALO AI Companion active and monitoring your safe corridor.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);

  // Ref to track stationary duration
  const stationaryStartTimeRef = useRef(null);

  // Helper to add event to timeline (newest at top)
  const logEvent = (type, description, level = 'Information') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEvents(prev => [
      {
        id: `evt-${Date.now()}-${Math.random()}`,
        type,
        description,
        level,
        timestamp
      },
      ...prev
    ]);
  };

  // Helper to add alert
  const addAlert = (alertObj) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAlerts(prev => [
      {
        id: `alt-${Date.now()}-${Math.random()}`,
        timestamp,
        ...alertObj
      },
      ...prev
    ]);
  };

  // Calculate shortest distance in meters between user point and route polyline segments
  const calculateOffRouteDistance = (userLoc, coords) => {
    if (!userLoc || !coords || coords.length === 0) return 0;
    let minDistanceKm = Infinity;
    
    // Check distance to all route nodes
    coords.forEach(pt => {
      const d = calculateHaversineDistance(userLoc.lat, userLoc.lng, pt[0], pt[1]);
      if (d < minDistanceKm) minDistanceKm = d;
    });

    return minDistanceKm * 1000; // convert to meters
  };

  // Trigger initial timeline event when Journey starts
  useEffect(() => {
    if (journeyState === 'Active') {
      logEvent('Journey Started', `Live monitoring initialized towards ${destination?.name || 'Target Pin'}.`, 'Information');
    } else if (journeyState === 'Paused') {
      logEvent('Journey Paused', 'Route monitoring paused by user.', 'Information');
    }
  }, [journeyState]);

  // Main 20-second AI Monitoring Loop
  useEffect(() => {
    if (journeyState !== 'Active') return;

    const runAICycle = async () => {
      if (!currentLocation) return;
      setIsAnalyzing(true);

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // 1. Off-Route Check
      const offRouteDist = calculateOffRouteDistance(currentLocation, routeCoordinates);
      const isOffRoute = offRouteDist > 150; // >150m deviation threshold

      // 2. Stationary Check
      const isLowSpeed = currentLocation.speed < 0.5;
      if (isLowSpeed) {
        if (!stationaryStartTimeRef.current) {
          stationaryStartTimeRef.current = Date.now();
        }
      } else {
        stationaryStartTimeRef.current = null;
      }

      const stationaryDurationMins = stationaryStartTimeRef.current
        ? Math.floor((Date.now() - stationaryStartTimeRef.current) / (1000 * 60))
        : 0;
      const isStationary = stationaryDurationMins >= 3;

      // 3. Call Gemini AI / Safety Reasoning Service
      const aiResult = await analyzeJourneyWithAI({
        currentLocation,
        destination,
        speed: currentLocation.speed,
        distanceRemaining,
        progressPercentage,
        isOffRoute,
        offRouteDistance: offRouteDist,
        isStationary,
        stationaryDurationMins
      });

      setIsAnalyzing(false);
      setLastUpdated(timestamp);

      if (aiResult) {
        if (aiResult.companionMessage) {
          setCompanionMessage(aiResult.companionMessage);
        }

        // Log AI Check in Timeline
        logEvent('AI Check Completed', aiResult.companionMessage, aiResult.alertLevel || 'Information');

        // Handle Off-Route Alert
        if (isOffRoute) {
          addAlert({
            level: 'Warning',
            title: 'Route Deviation Detected',
            explanation: aiResult.alertExplanation || `You've moved approximately ${Math.round(offRouteDist)}m away from your planned route. Consider returning to recommended route.`
          });
          logEvent('Deviation Detected', `User moved ${Math.round(offRouteDist)}m off planned route corridor.`, 'Warning');
        }

        // Handle Stationary Alert
        if (isStationary) {
          addAlert({
            level: 'Warning',
            title: 'Unexpected Stationary Stop',
            explanation: `You've been stationary for ${stationaryDurationMins} minutes. Are you okay?`,
            isStationaryCheck: true
          });
          logEvent('Stationary Check', `User stationary for ${stationaryDurationMins} minutes.`, 'Warning');
        }
      }
    };

    // Run first check immediately
    runAICycle();

    // 20-second interval cycle
    const intervalId = setInterval(runAICycle, 20000);

    return () => clearInterval(intervalId);
  }, [journeyState, currentLocation?.lat, currentLocation?.lng, destination?.name]);

  // Handlers for Alert Management
  const handleDismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleConfirmStationaryFine = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    logEvent('User Safety Status', "User confirmed: 'I'm Fine' during stationary check.", 'Information');
    stationaryStartTimeRef.current = null;
  };

  const handleConfirmStationaryHelp = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    logEvent('User Safety Status', "User selected: 'Need Help'. Emergency quick actions highlighted.", 'Critical');
    addAlert({
      level: 'Critical',
      title: 'Emergency Assistance Recommended',
      explanation: 'You indicated that you need help. Access Emergency Quick Actions below to dial SOS or contact trusted supporters.'
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Feature 3: Live AI Companion Card */}
      <CompanionCard 
        companionMessage={companionMessage}
        isAnalyzing={isAnalyzing}
        lastUpdated={lastUpdated}
      />

      {/* Feature 2, 4, 6: Alert Manager (Deviation, Stationary, Priority Alerts) */}
      <AlertManager
        alerts={alerts}
        onDismissAlert={handleDismissAlert}
        onConfirmStationaryFine={handleConfirmStationaryFine}
        onConfirmStationaryHelp={handleConfirmStationaryHelp}
      />

      {/* Feature 5: AI Observations Timeline */}
      <JourneyTimeline events={events} />

    </div>
  );
}
