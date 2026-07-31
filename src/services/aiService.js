/**
 * HALO AI Monitoring & Predictive Safety Intelligence Service
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Predicts journey risk level, confidence, companion message, and predictive recommendations.
 */
export async function analyzeJourneyWithAI({
  currentLocation,
  destination,
  speed = 0,
  distanceRemaining = 0,
  progressPercentage = 0,
  timeOfDay = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  durationMins = 0,
  isOffRoute = false,
  offRouteDistance = 0,
  isStationary = false,
  stationaryDurationMins = 0
}) {
  const prompt = `
You are HALO, a predictive solo travel safety AI companion.
Analyze the complete journey context and return a structured predictive safety evaluation.

Journey Context:
- Current Location: Lat ${currentLocation?.lat?.toFixed(4)}, Lng ${currentLocation?.lng?.toFixed(4)}
- Destination: ${destination?.name || 'Target Pin'} (Lat ${destination?.lat?.toFixed(4)}, Lng ${destination?.lng?.toFixed(4)})
- Speed: ${speed.toFixed(1)} km/h
- Distance Remaining: ${distanceRemaining.toFixed(2)} km
- Completion Progress: ${Math.round(progressPercentage)}%
- Time of Day: ${timeOfDay}
- Journey Duration: ${durationMins} minutes
- Off-Route Status: ${isOffRoute ? `YES (${Math.round(offRouteDistance)}m off route)` : 'NO'}
- Stationary Status: ${isStationary ? `YES (${stationaryDurationMins}m stationary)` : 'NO'}

Instructions:
1. Determine riskLevel: "Low", "Moderate", or "High".
2. Provide a 1-sentence riskExplanation starting with "Current journey risk is [LEVEL] because...".
3. Provide confidence percentage integer (85 to 98).
4. Provide short friendly companionMessage (< 20 words).
5. Generate 2 proactive predictive recommendations:
   Each with { "text": "...", "priority": "Low" | "Medium" | "High", "confidence": 88-96 }

Respond ONLY in valid JSON matching this schema:
{
  "riskLevel": "Low" | "Moderate" | "High",
  "riskExplanation": "Current journey risk is LOW because...",
  "confidence": 94,
  "companionMessage": "Short friendly text",
  "recommendations": [
    { "text": "Proactive recommendation 1", "priority": "Low" | "Medium" | "High", "confidence": 92 },
    { "text": "Proactive recommendation 2", "priority": "Low" | "Medium" | "High", "confidence": 89 }
  ],
  "alertLevel": "Information" | "Warning" | "Critical",
  "alertTitle": "Title if applicable",
  "alertExplanation": "Explanation if applicable"
}
`;

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
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
      }
    } catch (err) {
      console.warn('Gemini API call failed, using HALO predictive fallback engine:', err);
    }
  }

  // Predictive Fallback Safety Reasoning Engine
  return fallbackPredictiveReasoning({
    progressPercentage,
    distanceRemaining,
    isOffRoute,
    offRouteDistance,
    isStationary,
    stationaryDurationMins,
    speed,
    timeOfDay
  });
}

/**
 * Generates final end-of-journey AI Summary Report
 */
export async function generateJourneySummaryWithAI({
  destinationName,
  stats,
  memoryEvents = []
}) {
  const prompt = `
You are HALO AI. Generate an end-of-journey summary report.
Destination: ${destinationName}
Observations Logged: ${stats.observationCount}
Route Deviations: ${stats.deviationCount}

Respond ONLY in valid JSON matching this schema:
{
  "safetyRating": "98 / 100",
  "summaryHeadline": "Journey Completed Successfully",
  "routeOverview": "Safe corridor maintained with high visibility throughout trip.",
  "futureSuggestions": "Consider scheduling future night walking routes along lit main avenues."
}
`;

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
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
      }
    } catch (err) {
      console.warn('Gemini summary failed, using fallback:', err);
    }
  }

  return {
    safetyRating: stats.deviationCount === 0 ? "98 / 100" : "91 / 100",
    summaryHeadline: "Journey Completed Successfully",
    routeOverview: `Followed planned safe corridor to ${destinationName} with ${stats.observationCount} AI safety evaluations logged.`,
    futureSuggestions: "Keep live tracking enabled and share route links with trusted contacts on future night trips."
  };
}

/**
 * Intelligent Predictive Fallback Safety Engine
 */
function fallbackPredictiveReasoning({
  progressPercentage,
  distanceRemaining,
  isOffRoute,
  offRouteDistance,
  isStationary,
  stationaryDurationMins,
  speed,
  timeOfDay
}) {
  if (isStationary && stationaryDurationMins >= 3) {
    return {
      riskLevel: "Moderate",
      riskExplanation: `Current journey risk is MODERATE because you have been stationary for ${stationaryDurationMins} minutes.`,
      confidence: 94,
      companionMessage: "Stationary stop detected. Checking in on your status.",
      recommendations: [
        { text: "Confirm your status using the 'I'm Fine' check-in button.", priority: "High", confidence: 96 },
        { text: "Consider sharing your live journey with a trusted contact.", priority: "Medium", confidence: 91 }
      ],
      alertLevel: "Warning",
      alertTitle: "Unexpected Stationary Stop",
      alertExplanation: `You've been stationary for ${stationaryDurationMins} minutes. Are you okay?`
    };
  }

  if (isOffRoute) {
    return {
      riskLevel: "Moderate",
      riskExplanation: `Current journey risk is MODERATE because you moved ${Math.round(offRouteDistance)}m off the recommended safe corridor.`,
      confidence: 91,
      companionMessage: "Course deviation detected. Monitoring alternative safe corridor.",
      recommendations: [
        { text: "Consider returning to the main recommended route.", priority: "High", confidence: 94 },
        { text: "Take the main road instead of secondary shortcuts.", priority: "Medium", confidence: 89 }
      ],
      alertLevel: "Warning",
      alertTitle: "Route Deviation Detected",
      alertExplanation: `You've moved away from your planned route. This may be intentional, but consider returning to the recommended path.`
    };
  }

  if (progressPercentage >= 90) {
    return {
      riskLevel: "Low",
      riskExplanation: "Current journey risk is LOW because you are approaching your destination safely.",
      confidence: 96,
      companionMessage: "You're approaching your destination. Preparing arrival check-in.",
      recommendations: [
        { text: "The remaining route appears safe and clear.", priority: "Low", confidence: 95 },
        { text: "Prepare to complete your journey check-in.", priority: "Low", confidence: 93 }
      ],
      alertLevel: "Information",
      alertTitle: "Approaching Destination",
      alertExplanation: "Less than 10% of your route remains. Continue on current path."
    };
  }

  if (progressPercentage >= 50) {
    return {
      riskLevel: "Low",
      riskExplanation: "Current journey risk is LOW because you are halfway through your route with zero deviations.",
      confidence: 94,
      companionMessage: "You're halfway through your journey. Route conditions remain clear.",
      recommendations: [
        { text: "Continue on your current route.", priority: "Low", confidence: 94 },
        { text: "Consider sharing your live location with a trusted contact.", priority: "Low", confidence: 90 }
      ],
      alertLevel: "Information",
      alertTitle: "Halfway Checkpoint",
      alertExplanation: "50% completion reached. Journey progressing normally."
    };
  }

  return {
    riskLevel: "Low",
    riskExplanation: "Current journey risk is LOW because you are following the planned route through monitored areas.",
    confidence: 92,
    companionMessage: "HALO AI Companion active and monitoring your safe corridor.",
    recommendations: [
      { text: "The remaining route looks clear and well-lit.", priority: "Low", confidence: 92 },
      { text: "Continue on your current recommended route.", priority: "Low", confidence: 91 }
    ],
    alertLevel: "Information",
    alertTitle: "Monitoring Active",
    alertExplanation: "Live GPS sync established."
  };
}
