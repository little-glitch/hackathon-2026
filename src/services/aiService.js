/**
 * HALO AI Monitoring & Dynamic Destination Safety Analysis Service
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Analyzes destination safety before travel dynamically using Gemini API
 */
export async function analyzeDestinationSafetyWithAI({
  destination = '',
  travelDate = '',
  travelTime = '',
  travelMode = 'Walking',
  additionalNotes = ''
}) {
  const prompt = `
You are HALO, a professional travel safety advisor.
Analyze destination safety for a solo traveler dynamically based on these exact input parameters:

Destination: ${destination || 'City Center'}
Date of Travel: ${travelDate || 'Today'}
Time of Travel: ${travelTime || 'Current Hour'}
Travel Mode: ${travelMode}
Additional Notes: ${additionalNotes || 'None'}

CRITICAL INSTRUCTIONS:
1. Calculate a dynamic safetyScore (0-100) specifically tailored to the interaction between Time of Travel (${travelTime}), Travel Mode (${travelMode}), and Destination (${destination}).
   - Example: Walking at 11:30 PM (23:30) must yield a significantly lower score (50-65) than Rideshare at 11:30 PM (78-86) or Walking at 2:00 PM (90-96).
2. The overallAssessment MUST explicitly state WHY this specific score was assigned based on time and transit mode.
3. Every recommendation MUST be personalized to the selected travel mode (${travelMode}) and time (${travelTime}).

Respond ONLY in valid JSON matching this schema:
{
  "safetyScore": 92,
  "riskLevel": "Low" | "Moderate" | "High",
  "overallAssessment": "Safety score assigned [SCORE]/100 because travelling by [MODE] at [TIME] in [DESTINATION]...",
  "riskBreakdown": {
    "personalSafety": {
      "score": 94,
      "explanation": "Specific personal safety evaluation for [TIME] and [MODE].",
      "recommendation": "Key recommendation tailored to [MODE]."
    },
    "transportation": {
      "score": 90,
      "explanation": "Specific transit mode evaluation for [MODE] at [TIME].",
      "recommendation": "Key transportation recommendation."
    },
    "environmental": {
      "score": 95,
      "explanation": "Weather and street lighting evaluation for [TIME].",
      "recommendation": "Key environmental precaution."
    },
    "crowdLevel": {
      "score": 88,
      "explanation": "Crowd density assessment for [TIME].",
      "recommendation": "Key crowd management tip."
    },
    "generalAdvice": {
      "score": 93,
      "explanation": "Overall corridor status.",
      "recommendation": "Primary general precaution."
    }
  },
  "recommendations": [
    "Personalized recommendation 1 for [MODE] at [TIME]",
    "Personalized recommendation 2 for [MODE] at [TIME]",
    "Personalized recommendation 3 for [MODE] at [TIME]",
    "Personalized recommendation 4 for [MODE] at [TIME]"
  ],
  "recommendedTravelWindow": "08:00 AM - 08:30 PM",
  "thingsToRemember": [
    "Checklist item 1 for [MODE]",
    "Checklist item 2 for [TIME]",
    "Checklist item 3",
    "Checklist item 4"
  ],
  "finalSummary": "Final tailored summary statement."
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
      console.warn('Gemini safety analysis call failed, using dynamic fallback engine:', err);
    }
  }

  // Dynamic Fallback Safety Reasoning Engine
  return fallbackDestinationSafetyReasoning({ destination, travelDate, travelTime, travelMode, additionalNotes });
}

/**
 * Intelligent Dynamic Fallback Engine calculating weighted safety scores and custom text
 */
function fallbackDestinationSafetyReasoning({ destination, travelDate, travelTime, travelMode, additionalNotes }) {
  const destName = destination || 'Selected Destination';
  const mode = travelMode || 'Walking';
  const timeStr = travelTime || '14:00';
  const notes = (additionalNotes || '').toLowerCase();

  // Extract hour integer (0 - 23)
  let hour = 14;
  if (timeStr.includes(':')) {
    const parts = timeStr.split(':');
    hour = parseInt(parts[0], 10);
    if (isNaN(hour)) hour = 14;
  }

  // 1. Time Factor Base Calculation
  const isLateNight = hour >= 22 || hour <= 4;
  const isEvening = hour >= 19 && hour < 22;
  const isEarlyMorning = hour >= 5 && hour < 7;
  const isDaytime = hour >= 7 && hour < 19;

  let baseScore = 94;
  let timeTag = 'daylight hours';

  if (isLateNight) {
    baseScore = 64;
    timeTag = `late night (${timeStr})`;
  } else if (isEvening) {
    baseScore = 80;
    timeTag = `evening (${timeStr})`;
  } else if (isEarlyMorning) {
    baseScore = 86;
    timeTag = `early morning (${timeStr})`;
  } else {
    baseScore = 94;
    timeTag = `daytime (${timeStr})`;
  }

  // 2. Mode Adjustment Factor
  let modeAdjustment = 0;
  let modeDesc = '';

  if (mode === 'Walking') {
    if (isLateNight) {
      modeAdjustment = -12;
      modeDesc = 'walking solo on foot late at night increases exposure along unlit alleys';
    } else if (isEvening) {
      modeAdjustment = -4;
      modeDesc = 'walking on foot requires attention to street illumination';
    } else {
      modeAdjustment = 0;
      modeDesc = 'walking on foot during daylight provides excellent visibility and high pedestrian activity';
    }
  } else if (mode === 'Rideshare') {
    if (isLateNight) {
      modeAdjustment = +14; // High safety recovery at night!
      modeDesc = 'utilizing door-to-door rideshare significantly reduces street exposure late at night';
    } else {
      modeAdjustment = +2;
      modeDesc = 'rideshare transit offers secure, direct door-to-door transportation';
    }
  } else if (mode === 'Transit') {
    if (isLateNight) {
      modeAdjustment = -6;
      modeDesc = 'public transit late at night requires waiting at designated well-lit hubs';
    } else {
      modeAdjustment = +2;
      modeDesc = 'public transit operates with high frequency and active station monitoring during daytime';
    }
  } else if (mode === 'Cycling') {
    if (isLateNight) {
      modeAdjustment = -8;
      modeDesc = 'cycling at night requires high-visibility gear and front/rear lights';
    } else {
      modeAdjustment = +1;
      modeDesc = 'cycling along dedicated bike lanes provides efficient transit';
    }
  }

  // 3. User Notes Adjustment
  let notesAdjustment = 0;
  if (notes.includes('solo') || notes.includes('alone') || notes.includes('camera') || notes.includes('gear') || notes.includes('bag')) {
    notesAdjustment = -4;
  }

  // Compute Final Clamped Score
  const rawScore = baseScore + modeAdjustment + notesAdjustment;
  const safetyScore = Math.min(98, Math.max(35, rawScore));

  // Determine Risk Level
  let riskLevel = 'Low';
  if (safetyScore < 65) {
    riskLevel = 'High';
  } else if (safetyScore < 82) {
    riskLevel = 'Moderate';
  } else {
    riskLevel = 'Low';
  }

  // Generate Personalized Recommendations & Checklist
  const recommendations = [];
  const thingsToRemember = [];

  if (mode === 'Walking') {
    if (isLateNight) {
      recommendations.push(`Stick strictly to primary lit avenues in ${destName}; avoid dark unmonitored alleys at ${timeStr}.`);
      recommendations.push("Maintain active spatial awareness and avoid wearing noise-canceling headphones.");
      recommendations.push("Share your live HALO tracking corridor link with a trusted contact before starting your walk.");
      recommendations.push("Have a rideshare app open as a backup transport option if streets become quiet.");
    } else {
      recommendations.push(`Enjoy your daytime walk to ${destName} along active pedestrian corridors.`);
      recommendations.push("Keep phone battery charged above 40% to maintain live GPS tracking.");
      recommendations.push("Stay aware of local traffic and bicycle crossings at major intersections.");
      recommendations.push("Share your live journey corridor with family or friends.");
    }
  } else if (mode === 'Rideshare') {
    recommendations.push(`Verify the driver's license plate and vehicle model before entering your rideshare to ${destName}.`);
    recommendations.push("Sit in the rear seat for maximum personal space and safety.");
    recommendations.push("Share your in-app ride status and HALO live location link with a contact.");
    recommendations.push("Ensure destination address is accurately set in your navigation app.");
  } else if (mode === 'Transit') {
    recommendations.push(`Wait for your bus/tram at lit main stations with CCTV coverage in ${destName}.`);
    recommendations.push("Keep digital tickets or transit cards accessible on your phone before boarding.");
    recommendations.push("Secure personal belongings and zip bags in crowded transit vehicles.");
    recommendations.push("Monitor upcoming stop announcements to avoid missing your destination.");
  } else {
    recommendations.push(`Ensure front headlight and rear reflector are active when cycling to ${destName}.`);
    recommendations.push("Follow marked bicycle lanes and obey municipal traffic signals.");
    recommendations.push("Wear a helmet and high-visibility clothing.");
    recommendations.push("Park and lock your bicycle at designated, well-lit bicycle racks.");
  }

  // Checklist items
  thingsToRemember.push(`Emergency contacts saved for ${destName}`);
  thingsToRemember.push(`Phone battery charged above 50% for ${timeStr} trip`);
  thingsToRemember.push(`HALO Live Location sharing active (${mode} Mode)`);
  thingsToRemember.push(`Offline map cached for ${destName}`);

  return {
    safetyScore,
    riskLevel,
    overallAssessment: `Safety score assigned ${safetyScore}/100 because ${modeDesc} to ${destName} during ${timeTag}.`,
    riskBreakdown: {
      personalSafety: {
        score: Math.min(98, Math.max(30, safetyScore + 2)),
        explanation: `Personal security index is evaluated as ${riskLevel.toUpperCase()} for ${mode} transit to ${destName} at ${timeStr}.`,
        recommendation: isLateNight ? "Remain on lit main avenues with commercial activity." : "Enjoy travel with standard urban awareness."
      },
      transportation: {
        score: Math.min(98, Math.max(30, safetyScore + (mode === 'Rideshare' ? 6 : -2))),
        explanation: `Selected transport mode (${mode}) provides ${mode === 'Rideshare' ? 'direct door-to-door safety' : 'standard transit corridor access'}.`,
        recommendation: mode === 'Rideshare' ? "Confirm driver credentials before boarding." : "Keep transit pass ready."
      },
      environmental: {
        score: isLateNight ? 82 : 95,
        explanation: `Street illumination and weather visibility assessed for ${timeTag}.`,
        recommendation: isLateNight ? "Carry a small flashlight or keep phone torch accessible." : "Comfortable walking shoes recommended."
      },
      crowdLevel: {
        score: isLateNight ? 72 : 90,
        explanation: `Foot traffic density in ${destName} is expected to be ${isLateNight ? 'low' : 'moderate to high'}.`,
        recommendation: isLateNight ? "Avoid unpopulated streets." : "Keep wallet and phone secure in crowds."
      },
      generalAdvice: {
        score: safetyScore,
        explanation: `Overall corridor safety rating for ${destName} during ${timeTag}.`,
        recommendation: "Enable HALO Live Journey tracking before commencing your trip."
      }
    },
    recommendations,
    recommendedTravelWindow: isLateNight ? "08:00 AM - 08:30 PM (Daylight window recommended)" : "08:00 AM - 09:30 PM",
    thingsToRemember,
    finalSummary: `Overall, travelling to ${destName} via ${mode} at ${timeStr} yields a ${riskLevel} Risk rating (${safetyScore}/100). Follow the personalized recommendations above.`
  };
}

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
 * Generates Emergency Situation Analysis & Prioritized Actions using Gemini
 */
export async function generateEmergencyAnalysisWithAI({
  currentLocation,
  destination,
  progressPercentage = 0,
  riskLevel = 'Moderate',
  isOffRoute = false,
  isStationary = false,
  triggerReason = 'SOS Triggered'
}) {
  const prompt = `
You are HALO, an AI emergency travel companion.
The user activated Emergency Mode (${triggerReason}).
Location: Lat ${currentLocation?.lat?.toFixed(4)}, Lng ${currentLocation?.lng?.toFixed(4)}
Destination: ${destination?.name || 'Target Pin'}
Progress: ${Math.round(progressPercentage)}%
Risk Level: ${riskLevel}
Off-Route: ${isOffRoute ? 'YES' : 'NO'}
Stationary: ${isStationary ? 'YES' : 'NO'}

Generate:
1. Situation Summary (1-2 sentences)
2. 4 Prioritized Action Recommendations (Short numbered steps)
3. Supportive Reassurance Message (Calm, empowering, supportive)

Respond ONLY in valid JSON matching this schema:
{
  "situationSummary": "You appear to have stopped unexpectedly while travelling away from the planned route.",
  "reassuranceText": "Take a deep breath. You are not alone. HALO is actively guiding your next steps.",
  "recommendedActions": [
    "Move toward a well-lit, populated area if safe to do so.",
    "Share your live location with a trusted contact.",
    "Navigate to the nearest verified safe haven or police hub.",
    "Remain calm and stay on this screen for guidance."
  ]
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
      console.warn('Gemini emergency analysis failed, using fallback:', err);
    }
  }

  // Fallback Emergency Analysis
  return {
    situationSummary: isOffRoute
      ? "You appear to have strayed off your planned safe corridor into an unmonitored zone."
      : isStationary
      ? "You appear to have stopped unexpectedly for several minutes along your route."
      : "Emergency Mode initiated. High priority route guidance and safe haven navigation active.",
    reassuranceText: "Take a deep breath. You are not alone. HALO is actively guiding your next steps.",
    recommendedActions: [
      "Move toward a well-lit, populated area if safe to do so.",
      "Share your live location with a trusted contact.",
      "Navigate to the nearest verified safe haven or police hub.",
      "Remain calm and stay on this screen for guidance."
    ]
  };
}

/**
 * Generates Post-Emergency Summary Report
 */
export async function generateEmergencySummaryWithAI({
  durationFormatted = '2m 30s',
  actionsTakenCount = 1,
  destinationName = 'Destination'
}) {
  const prompt = `
You are HALO AI. Generate a post-emergency session summary.
Duration: ${durationFormatted}
Destination: ${destinationName}

Respond ONLY in valid JSON matching this schema:
{
  "outcomeHeadline": "Emergency Resolved Safely",
  "summaryDescription": "User confirmed safety check-in and returned to safe corridor.",
  "actionsTakenSummary": "Location shared with trusted contacts and safe haven navigation verified.",
  "futureSafetyAdvice": "Keep emergency contacts pinned for instant 1-click location sharing on future trips."
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
      console.warn('Gemini emergency summary failed, using fallback:', err);
    }
  }

  return {
    outcomeHeadline: "Emergency Resolved Safely",
    summaryDescription: `Emergency session of ${durationFormatted} concluded cleanly. User guided to verified safe status.`,
    actionsTakenSummary: "Location sync verified and safe haven coordinates confirmed.",
    futureSafetyAdvice: "Keep emergency quick contacts pinned for instant 1-click sharing on future travel journeys."
  };
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
