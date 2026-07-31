/**
 * HALO Event-Driven Demo Simulation Engine
 * Scripted sequence of 7 AI events triggered deterministically.
 */

export const DEMO_DESTINATION = {
  lat: 41.8902,
  lng: 12.4922,
  name: 'Colosseum Safe Hub, Rome'
};

export const DEMO_ROUTE_POINTS = [
  [41.9009, 12.5020], // 0: Termini Station Origin (0%)
  [41.8985, 12.4998], // 1: Via Cavour (25%)
  [41.8935, 12.4920], // 2: Off-route deviation point (45%)
  [41.8930, 12.4945], // 3: Returned to route (55%)
  [41.8918, 12.4935], // 4: Unexpected stop (75%)
  [41.8906, 12.4925], // 5: Approaching destination (92%)
  [41.8902, 12.4922]  // 6: Destination (100%)
];

export const DEMO_EVENT_STEPS = [
  // Event 1: Journey Started (0%)
  {
    stepIndex: 0,
    progress: 0,
    distanceRemaining: 1.8,
    location: { lat: 41.9009, lng: 12.5020, speed: 4.5 },
    riskLevel: 'Low',
    confidence: 96,
    companionMessage: "Your journey has started. I'll monitor your trip.",
    riskExplanation: "Current journey risk is LOW because you are following the planned route.",
    eventLog: {
      type: 'Journey Started',
      description: "Your journey has started. I'll monitor your trip.",
      level: 'Information'
    }
  },

  // Event 2: 25% Progress
  {
    stepIndex: 1,
    progress: 25,
    distanceRemaining: 1.35,
    location: { lat: 41.8985, lng: 12.4998, speed: 4.8 },
    riskLevel: 'Low',
    confidence: 95,
    companionMessage: "Everything looks normal so far.",
    riskExplanation: "Current journey risk is LOW. Route conditions remain clear.",
    eventLog: {
      type: 'AI Check Completed',
      description: "Everything looks normal so far.",
      level: 'Information'
    }
  },

  // Event 3: 45% Forced Route Deviation
  {
    stepIndex: 2,
    progress: 45,
    distanceRemaining: 0.9,
    location: { lat: 41.8935, lng: 12.4920, speed: 3.2 },
    riskLevel: 'Moderate',
    confidence: 91,
    companionMessage: "You have deviated from your planned route.",
    riskExplanation: "Current journey risk is MODERATE because you moved 220m off recommended route.",
    isOffRoute: true,
    offRouteDistance: 220,
    alert: {
      id: 'alt-dev-45',
      level: 'Warning',
      title: 'Route Deviation Alert',
      explanation: "You have deviated from your planned route. Consider returning to recommended path."
    },
    recommendation: {
      text: "Consider returning to your planned route.",
      priority: "High",
      confidence: 94
    },
    eventLog: {
      type: 'Deviation Detected',
      description: "You have deviated from your planned route.",
      level: 'Warning'
    }
  },

  // Event 4: 10 Seconds Later - Returned to Route
  {
    stepIndex: 3,
    progress: 55,
    distanceRemaining: 0.7,
    location: { lat: 41.8930, lng: 12.4945, speed: 4.6 },
    riskLevel: 'Low',
    confidence: 95,
    companionMessage: "Returned to planned route.",
    riskExplanation: "Current journey risk is LOW because you returned to the recommended route.",
    alert: {
      id: 'alt-[#1D2B26]',
      level: 'Information',
      title: 'Safety Restored',
      explanation: "Returned to planned route."
    },
    eventLog: {
      type: 'Route Updated',
      description: "Returned to planned route.",
      level: 'Information'
    }
  },

  // Event 5: 75% Unexpected Stop
  {
    stepIndex: 4,
    progress: 75,
    distanceRemaining: 0.35,
    location: { lat: 41.8918, lng: 12.4935, speed: 0.0 },
    riskLevel: 'Moderate',
    confidence: 93,
    companionMessage: "Stationary stop detected. Checking in on your status.",
    riskExplanation: "Current journey risk is MODERATE due to unexpected stationary stop.",
    isStationaryCheck: true,
    alert: {
      id: 'alt-stat-75',
      level: 'Warning',
      title: 'Unexpected Stop Detection',
      explanation: "You've been stationary. Are you okay?",
      isStationaryCheck: true
    },
    eventLog: {
      type: 'Stationary Check',
      description: "You've been stationary. Are you okay?",
      level: 'Warning'
    }
  },

  // Event 6: 92% Approaching Destination
  {
    stepIndex: 5,
    progress: 92,
    distanceRemaining: 0.08,
    location: { lat: 41.8906, lng: 12.4925, speed: 4.2 },
    riskLevel: 'Low',
    confidence: 97,
    companionMessage: "You are approaching your destination.",
    riskExplanation: "Current journey risk is LOW. Approaching destination safely.",
    eventLog: {
      type: 'AI Check Completed',
      description: "You are approaching your destination.",
      level: 'Information'
    }
  },

  // Event 7: 100% Destination Reached
  {
    stepIndex: 6,
    progress: 100,
    distanceRemaining: 0.0,
    location: { lat: 41.8902, lng: 12.4922, speed: 0.0 },
    riskLevel: 'Low',
    confidence: 98,
    companionMessage: "Destination reached! Final AI Summary Report generated.",
    riskExplanation: "Current journey risk is LOW. Destination reached safely.",
    isComplete: true,
    eventLog: {
      type: 'Journey Completed',
      description: "Destination reached successfully.",
      level: 'Information'
    }
  }
];
