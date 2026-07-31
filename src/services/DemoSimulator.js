/**
 * HALO Demo Simulation Engine for Hackathon Demonstrations
 * Predefined simulated journey sequence running over ~2 minutes.
 */

export const DEMO_DESTINATION = {
  lat: 41.8902,
  lng: 12.4922,
  name: 'Colosseum Safe Hub, Rome'
};

export const DEMO_ROUTE_POINTS = [
  [41.9009, 12.5020], // 0: Termini Station Origin
  [41.8985, 12.4998], // 1: Via Cavour Entry
  [41.8962, 12.4975], // 2: Main Ave Corridor
  [41.8935, 12.4920], // 3: Off-route deviation point (220m stray)
  [41.8945, 12.4950], // 4: Returning towards corridor
  [41.8930, 12.4945], // 5: Back on safe corridor
  [41.8918, 12.4935], // 6: Stationary stop checkpoint
  [41.8912, 12.4930], // 7: Resuming transit
  [41.8906, 12.4925], // 8: Approaching destination
  [41.8902, 12.4922]  // 9: Destination Pin
];

export const DEMO_STEPS = [
  {
    stepIndex: 0,
    title: 'Journey Started',
    location: { lat: 41.9009, lng: 12.5020, speed: 4.5 },
    progress: 0,
    distanceRemaining: 1.8,
    riskLevel: 'Low',
    confidence: 96,
    companionMessage: "Welcome to HALO. Live GPS sync established & safe corridor active.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false
  },
  {
    stepIndex: 1,
    title: 'Via Cavour Transit',
    location: { lat: 41.8985, lng: 12.4998, speed: 4.8 },
    progress: 20,
    distanceRemaining: 1.4,
    riskLevel: 'Low',
    confidence: 95,
    companionMessage: "Journey progressing normally. Route conditions clear and well-lit.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false
  },
  {
    stepIndex: 2,
    title: 'Main Corridor Progress',
    location: { lat: 41.8962, lng: 12.4975, speed: 5.0 },
    progress: 40,
    distanceRemaining: 1.0,
    riskLevel: 'Low',
    confidence: 94,
    companionMessage: "Passing 2 patrol hubs. Continue on current recommended route.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false
  },
  {
    stepIndex: 3,
    title: 'Route Deviation Detected',
    location: { lat: 41.8935, lng: 12.4920, speed: 3.2 },
    progress: 48,
    distanceRemaining: 0.85,
    riskLevel: 'Moderate',
    confidence: 91,
    companionMessage: "Course deviation detected. Monitoring alternative safe corridor.",
    isOffRoute: true,
    offRouteDistance: 220,
    isStationary: false,
    alert: {
      level: 'Warning',
      title: 'Route Deviation Detected',
      explanation: "You've moved approximately 220m away from your planned route into an unmonitored alley. Consider returning to recommended route."
    }
  },
  {
    stepIndex: 4,
    title: 'Returning to Route',
    location: { lat: 41.8945, lng: 12.4950, speed: 4.2 },
    progress: 55,
    distanceRemaining: 0.7,
    riskLevel: 'Moderate',
    confidence: 92,
    companionMessage: "Re-aligning with primary safe corridor...",
    isOffRoute: true,
    offRouteDistance: 90,
    isStationary: false
  },
  {
    stepIndex: 5,
    title: 'Safety Restored',
    location: { lat: 41.8930, lng: 12.4945, speed: 4.8 },
    progress: 65,
    distanceRemaining: 0.5,
    riskLevel: 'Low',
    confidence: 95,
    companionMessage: "Safety restored. Returned to recommended safe corridor.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false,
    alert: {
      level: 'Information',
      title: 'Safety Restored',
      explanation: "You have returned to the primary monitored route corridor."
    }
  },
  {
    stepIndex: 6,
    title: 'Unexpected Stop',
    location: { lat: 41.8918, lng: 12.4935, speed: 0.0 },
    progress: 78,
    distanceRemaining: 0.3,
    riskLevel: 'Moderate',
    confidence: 93,
    companionMessage: "Stationary stop detected. Checking in on your safety status.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: true,
    alert: {
      level: 'Warning',
      title: 'Unexpected Stationary Stop',
      explanation: "You've been stationary for several minutes. Are you okay?",
      isStationaryCheck: true
    }
  },
  {
    stepIndex: 7,
    title: 'Resuming Journey',
    location: { lat: 41.8912, lng: 12.4930, speed: 4.6 },
    progress: 88,
    distanceRemaining: 0.15,
    riskLevel: 'Low',
    confidence: 96,
    companionMessage: "Status confirmed safe. Resuming transit to destination.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false
  },
  {
    stepIndex: 8,
    title: 'Approaching Destination',
    location: { lat: 41.8906, lng: 12.4925, speed: 4.2 },
    progress: 96,
    distanceRemaining: 0.05,
    riskLevel: 'Low',
    confidence: 97,
    companionMessage: "You're approaching your destination. Preparing arrival check-in.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false
  },
  {
    stepIndex: 9,
    title: 'Destination Reached',
    location: { lat: 41.8902, lng: 12.4922, speed: 0.0 },
    progress: 100,
    distanceRemaining: 0.0,
    riskLevel: 'Low',
    confidence: 98,
    companionMessage: "Journey completed successfully! Final AI summary generated.",
    isOffRoute: false,
    offRouteDistance: 0,
    isStationary: false,
    isComplete: true
  }
];
