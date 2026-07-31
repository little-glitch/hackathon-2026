import React, { useState, useEffect, useRef } from 'react';
import { analyzeJourneyWithAI } from '../../services/aiService';
import { journeyMemory } from '../../services/JourneyMemory';
import { DEMO_EVENT_STEPS } from '../../services/DemoSimulator';
import CompanionCard from './CompanionCard';
import RiskAssessment from './RiskAssessment';
import RecommendationFeed from './RecommendationFeed';
import AlertManager from './AlertManager';
import JourneyTimeline from './JourneyTimeline';
import { calculateHaversineDistance } from './JourneyTracker';

export default function AIJourneyMonitor({ 
  journeyState, 
  currentLocation, 
  destination, 
  routeCoordinates = [], 
  distanceRemaining = 0, 
  progressPercentage = 0,
  isDemoMode = false,
  demoStepIndex = 0
}) {
  const [companionMessage, setCompanionMessage] = useState('HALO AI Companion active and monitoring your safe corridor.');
  const [riskLevel, setRiskLevel] = useState('Low');
  const [confidence, setConfidence] = useState(94);
  const [riskExplanation, setRiskExplanation] = useState('Current journey risk is LOW because you are following the planned route through monitored areas.');
  const [recommendations, setRecommendations] = useState([]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);

  // Ref to track stationary duration
  const stationaryStartTimeRef = useRef(null);
  const journeyDurationStartRef = useRef(null);

  // Helper to add event to timeline & memory (newest at top)
  const logEvent = (type, description, level = 'Information') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Save to journey memory service
    journeyMemory.recordEvent(type, description, level);

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
    
    coords.forEach(pt => {
      const d = calculateHaversineDistance(userLoc.lat, userLoc.lng, pt[0], pt[1]);
      if (d < minDistanceKm) minDistanceKm = d;
    });

    return minDistanceKm * 1000;
  };

  // Handle session initialization
  useEffect(() => {
    if (journeyState === 'Active') {
      journeyMemory.startSession();
      journeyDurationStartRef.current = Date.now();
      if (!isDemoMode) {
        logEvent('Journey Started', `Live monitoring initialized towards ${destination?.name || 'Target Pin'}.`, 'Information');
      }
    } else if (journeyState === 'Paused') {
      logEvent('Journey Paused', 'Route monitoring paused by user.', 'Information');
    }
  }, [journeyState, isDemoMode]);

  // DEMO MODE EVENT SCHEDULER: Execute exact event payload when demoStepIndex updates
  useEffect(() => {
    if (!isDemoMode || journeyState !== 'Active') return;

    const stepData = DEMO_EVENT_STEPS[demoStepIndex];
    if (!stepData) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastUpdated(timestamp);

    // 1. Update Companion Message
    if (stepData.companionMessage) {
      setCompanionMessage(stepData.companionMessage);
    }

    // 2. Update Risk Level & Explanation
    if (stepData.riskLevel) {
      setRiskLevel(stepData.riskLevel);
    }
    if (stepData.confidence) {
      setConfidence(stepData.confidence);
    }
    if (stepData.riskExplanation) {
      setRiskExplanation(stepData.riskExplanation);
    }

    // 3. Log Event to Timeline
    if (stepData.eventLog) {
      logEvent(stepData.eventLog.type, stepData.eventLog.description, stepData.eventLog.level);
    }

    // 4. Trigger Alert if present
    if (stepData.alert) {
      addAlert(stepData.alert);
    }

    // 5. Add Recommendation if present
    if (stepData.recommendation) {
      setRecommendations(prev => [
        {
          id: `rec-${Date.now()}-${Math.random()}`,
          timestamp,
          text: stepData.recommendation.text,
          priority: stepData.recommendation.priority,
          confidence: stepData.recommendation.confidence
        },
        ...prev
      ]);
    }
  }, [isDemoMode, journeyState, demoStepIndex]);

  // NORMAL MODE: 20-second AI Monitoring Loop
  useEffect(() => {
    if (isDemoMode || journeyState !== 'Active') return;

    const runAICycle = async () => {
      if (!currentLocation) return;
      setIsAnalyzing(true);

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const durationMins = journeyDurationStartRef.current 
        ? Math.floor((Date.now() - journeyDurationStartRef.current) / (1000 * 60))
        : 0;

      // 1. Off-Route Check
      const offRouteDist = calculateOffRouteDistance(currentLocation, routeCoordinates);
      const isOffRoute = offRouteDist > 150;

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

      // 3. Call Gemini AI / Predictive Safety Reasoning Service
      const aiResult = await analyzeJourneyWithAI({
        currentLocation,
        destination,
        speed: currentLocation.speed,
        distanceRemaining,
        progressPercentage,
        timeOfDay: timestamp,
        durationMins,
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

        if (aiResult.riskLevel) {
          setRiskLevel(aiResult.riskLevel);
        }

        if (aiResult.confidence) {
          setConfidence(aiResult.confidence);
        }

        if (aiResult.riskExplanation) {
          setRiskExplanation(aiResult.riskExplanation);
        }

        if (aiResult.recommendations && aiResult.recommendations.length > 0) {
          const newRecs = aiResult.recommendations.map(r => ({
            id: `rec-${Date.now()}-${Math.random()}`,
            timestamp,
            text: r.text,
            priority: r.priority || 'Low',
            confidence: r.confidence || (aiResult.confidence - 2)
          }));

          setRecommendations(prev => [...newRecs, ...prev].slice(0, 10));
        }

        logEvent('AI Check Completed', aiResult.companionMessage, aiResult.alertLevel || 'Information');

        if (isOffRoute) {
          addAlert({
            level: 'Warning',
            title: 'Route Deviation Detected',
            explanation: aiResult.alertExplanation || `You've moved approximately ${Math.round(offRouteDist)}m away from your planned route. Consider returning to recommended route.`
          });
          logEvent('Deviation Detected', `User moved ${Math.round(offRouteDist)}m off planned route corridor.`, 'Warning');
        }

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

    runAICycle();
    const intervalId = setInterval(runAICycle, 20000);

    return () => clearInterval(intervalId);
  }, [isDemoMode, journeyState, currentLocation?.lat, currentLocation?.lng, destination?.name]);

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

      {/* Feature 1 & 5: AI Risk Assessment Card (Low/Moderate/High & Confidence %) */}
      <RiskAssessment
        riskLevel={riskLevel}
        confidence={confidence}
        riskExplanation={riskExplanation}
      />

      {/* Feature 3 & 4: Predictive AI Recommendation Feed */}
      <RecommendationFeed recommendations={recommendations} />

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
