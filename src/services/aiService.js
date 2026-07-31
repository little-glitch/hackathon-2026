/**
 * HALO AI Monitoring Engine Service (Gemini API Integration & Safety Reasoning)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Sends journey telemetry context to Gemini AI and gets structured safety guidance.
 */
export async function analyzeJourneyWithAI({
  currentLocation,
  destination,
  speed = 0,
  distanceRemaining = 0,
  progressPercentage = 0,
  isOffRoute = false,
  offRouteDistance = 0,
  isStationary = false,
  stationaryDurationMins = 0
}) {
  const prompt = `
You are HALO, a proactive solo travel safety AI companion.
Analyze the following live journey telemetry and provide a calm, concise, professional safety update.

Telemetry Data:
- Current Location: Lat ${currentLocation?.lat?.toFixed(4)}, Lng ${currentLocation?.lng?.toFixed(4)}
- Destination: ${destination?.name || 'Target Pin'} (Lat ${destination?.lat?.toFixed(4)}, Lng ${destination?.lng?.toFixed(4)})
- Speed: ${speed.toFixed(1)} km/h
- Distance Remaining: ${distanceRemaining.toFixed(2)} km
- Completion Progress: ${Math.round(progressPercentage)}%
- Off-Route Detected: ${isOffRoute ? `YES (${Math.round(offRouteDistance)} meters off route)` : 'NO'}
- Stationary Stop Detected: ${isStationary ? `YES (Stationary for ${stationaryDurationMins} minutes)` : 'NO'}

Instructions:
1. Keep your main companion message under 20 words. Friendly, calm, and reassuring.
2. Choose alert level: "Information", "Warning", or "Critical".
3. Provide a short 1-sentence alert explanation if there is an off-route or stationary event.

Respond ONLY in valid JSON with this exact format:
{
  "companionMessage": "Short concise friendly text for live companion card",
  "alertLevel": "Information" | "Warning" | "Critical",
  "alertTitle": "Title of alert if applicable",
  "alertExplanation": "Short 1-sentence explanation"
}
`;

  // If Gemini API Key exists, try live fetch
  if (GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        // Parse JSON from codeblock or raw response
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
      }
    } catch (err) {
      console.warn('Gemini API call failed, using HALO local AI reasoning fallback:', err);
    }
  }

  // Local Safety Reasoning Fallback Engine (Demo Mode)
  return fallbackAIReasoning({
    progressPercentage,
    distanceRemaining,
    isOffRoute,
    offRouteDistance,
    isStationary,
    stationaryDurationMins,
    speed
  });
}

/**
 * Intelligent Local AI Fallback Engine
 */
function fallbackAIReasoning({
  progressPercentage,
  distanceRemaining,
  isOffRoute,
  offRouteDistance,
  isStationary,
  stationaryDurationMins,
  speed
}) {
  if (isStationary && stationaryDurationMins >= 3) {
    return {
      companionMessage: "Stationary stop detected. Checking in on your status.",
      alertLevel: "Warning",
      alertTitle: "Unexpected Stationary Stop",
      alertExplanation: `You've been stationary for ${stationaryDurationMins} minutes. Please confirm if you are okay.`
    };
  }

  if (isOffRoute) {
    return {
      companionMessage: "Course deviation detected. Monitoring alternative safe corridor.",
      alertLevel: "Warning",
      alertTitle: "Route Deviation Detected",
      alertExplanation: `You've moved approximately ${Math.round(offRouteDistance)}m away from your planned route. Consider returning to recommended path.`
    };
  }

  if (progressPercentage >= 90) {
    return {
      companionMessage: "You're approaching your destination. Preparing arrival check-in.",
      alertLevel: "Information",
      alertTitle: "Approaching Destination",
      alertExplanation: "Less than 10% of your route remains. Continue on current path."
    };
  }

  if (progressPercentage >= 50) {
    return {
      companionMessage: "You're halfway through your journey. Route conditions remain clear.",
      alertLevel: "Information",
      alertTitle: "Halfway Checkpoint",
      alertExplanation: "50% completion reached. Journey progressing normally."
    };
  }

  if (speed > 0) {
    return {
      companionMessage: "Journey progressing normally. Continuing active route monitoring.",
      alertLevel: "Information",
      alertTitle: "Route Clear",
      alertExplanation: "Current speed and corridor alignment optimal."
    };
  }

  return {
    companionMessage: "HALO AI Companion active and monitoring your safe corridor.",
    alertLevel: "Information",
    alertTitle: "Monitoring Active",
    alertExplanation: "Live GPS sync established."
  };
}
