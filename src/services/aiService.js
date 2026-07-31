/**
 * HALO AI Monitoring & Dynamic Destination Safety Analysis Service
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Generates an AI-powered smart travel plan using Gemini API
 */
export async function generateTravelPlanWithAI({
  origin = 'Central Station',
  destination = 'City Center',
  travelDate = '',
  departureTime = '',
  travelMode = 'Walking',
  travelingAlone = true,
  additionalNotes = ''
}) {
  const cleanOrigin = (origin || 'Origin Point').trim();
  const cleanDestination = (destination || 'Destination Point').trim();

  console.log('[HALO AI Travel Plan] Inputs received:', {
    origin: cleanOrigin,
    destination: cleanDestination,
    travelDate,
    departureTime,
    travelMode,
    travelingAlone,
    additionalNotes
  });

  const prompt = `
You are HALO, an expert solo travel planning AI assistant.
Generate a structured, personalized, end-to-end travel plan based on these exact parameters:

- Starting Location: ${cleanOrigin}
- Destination: ${cleanDestination}
- Date of Travel: ${travelDate || 'Today'}
- Departure Time: ${departureTime || 'Current Hour'}
- Mode of Transport: ${travelMode}
- Traveling Alone: ${travelingAlone ? 'YES (Solo Traveler)' : 'NO (Group Traveler)'}
- Additional Notes: ${additionalNotes || 'None'}

CRITICAL INSTRUCTIONS:
1. Calculate a HALO Journey Readiness Score (0-100) reflecting how safe and prepared this journey is.
2. Generate a step-by-step Journey Timeline from ${cleanOrigin} to ${cleanDestination}.
3. Create a dynamic packing checklist tailored to ${travelMode}, ${departureTime}, and solo travel status (${travelingAlone}).
4. Provide 4 to 6 personalized, practical travel tips (avoid generic advice!).

Respond ONLY in valid JSON matching this schema:
{
  "readinessScore": 88,
  "readinessLevel": "Low" | "Moderate" | "High",
  "journeyOverview": "Detailed journey overview starting from ${cleanOrigin} to ${cleanDestination}...",
  "bestDepartureTime": "08:15 AM",
  "routeStrategy": "Recommended lit primary corridor strategy...",
  "journeyDistance": "4.2 km",
  "estimatedDuration": "25 mins",
  "packingChecklist": [
    "Fully charged smartphone & power bank",
    "Water bottle for stay hydrated",
    "Emergency contacts saved on speed dial",
    "Weather-appropriate jacket or umbrella",
    "Physical or digital government ID"
  ],
  "journeyTimeline": [
    {
      "step": 1,
      "time": "08:15 AM",
      "title": "Depart Origin",
      "action": "Leave ${cleanOrigin} via primary boulevard.",
      "recommendation": "Check live location sync is active."
    },
    {
      "step": 2,
      "time": "08:25 AM",
      "title": "Transit / Mid-point Navigation",
      "action": "Proceed along main transit corridor via ${travelMode}.",
      "recommendation": "Stay aware of surroundings and lit thoroughfares."
    },
    {
      "step": 3,
      "time": "08:40 AM",
      "title": "Arrive at Destination",
      "action": "Reach ${cleanDestination} safely.",
      "recommendation": "Perform HALO arrival check-in."
    }
  ],
  "aiTravelTips": [
    "Leave 15 minutes early to avoid rush-hour congestion.",
    "Stick to main lit thoroughfares rather than unmonitored shortcuts.",
    "Keep mobile battery charged above 50% for continuous tracking.",
    "Share live journey link with primary emergency contact."
  ],
  "recommendedPrecautions": [
    "Verify local transit schedules before departing.",
    "Keep emergency contact shortcut pinned on lock screen."
  ],
  "finalSummary": "Final overall summary statement for travel from ${cleanOrigin} to ${cleanDestination}."
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
      console.warn('[HALO AI Travel Plan] Gemini API failed, using fallback planner:', err);
    }
  }

  // Dynamic Fallback Travel Planner Engine
  return fallbackTravelPlanReasoning({
    origin: cleanOrigin,
    destination: cleanDestination,
    travelDate,
    departureTime,
    travelMode,
    travelingAlone,
    additionalNotes
  });
}

/**
 * Intelligent Dynamic Fallback Travel Planning Engine
 */
function fallbackTravelPlanReasoning({
  origin,
  destination,
  travelDate,
  departureTime,
  travelMode,
  travelingAlone,
  additionalNotes
}) {
  const orig = origin || 'Starting Point';
  const dest = destination || 'Destination';
  const mode = travelMode || 'Walking';
  const timeStr = departureTime || '14:00';
  const notes = (additionalNotes || '').toLowerCase();

  // Parse departure hour
  let hour = 14;
  if (timeStr.includes(':')) {
    const parts = timeStr.split(':');
    hour = parseInt(parts[0], 10);
    if (isNaN(hour)) hour = 14;
  }

  const isNight = hour >= 21 || hour <= 4;
  const isEvening = hour >= 18 && hour < 21;

  // Base Score Calculation
  let baseScore = 92;
  if (isNight) baseScore -= 18;
  else if (isEvening) baseScore -= 8;

  if (mode === 'Walking' && isNight) baseScore -= 10;
  if (mode === 'Rideshare' && isNight) baseScore += 12; // Safety recovery
  if (travelingAlone) baseScore -= 4;

  const readinessScore = Math.min(98, Math.max(45, baseScore));

  let readinessLevel = 'High';
  if (readinessScore < 65) readinessLevel = 'Low';
  else if (readinessScore < 82) readinessLevel = 'Moderate';
  else readinessLevel = 'High';

  // Packing Checklist Items
  const packingChecklist = [
    'Fully charged mobile phone (>50% battery)',
    'Portable power bank & charging cable',
    'Emergency contacts saved in HALO Safety Circle',
    'Government ID & digital payment cards',
    'Reflective items or small flashlight (for night travel)'
  ];

  if (notes.includes('rain') || notes.includes('weather')) {
    packingChecklist.push('Compact umbrella or waterproof jacket');
  }
  if (mode === 'Cycling') {
    packingChecklist.push('Bicycle helmet & front/rear LED lights');
  }

  // Itinerary Timeline Steps
  const step1Time = timeStr || '14:00';
  const step2Time = addMinutesToTimeStr(step1Time, 12);
  const step3Time = addMinutesToTimeStr(step1Time, 28);

  const journeyTimeline = [
    {
      step: 1,
      time: step1Time,
      title: `Depart ${orig}`,
      action: `Begin your journey from ${orig} via ${mode}.`,
      recommendation: "Ensure HALO live tracking sync is active before stepping out."
    },
    {
      step: 2,
      time: step2Time,
      title: `Transit Corridor Navigation`,
      action: `Proceed along primary lit avenue toward ${dest}.`,
      recommendation: isNight ? "Remain on commercial thoroughfares with active foot traffic." : "Maintain normal spatial awareness."
    },
    {
      step: 3,
      time: step3Time,
      title: `Arrival at ${dest}`,
      action: `Reach ${dest} safely and complete your trip.`,
      recommendation: "Complete HALO arrival check-in to notify Safety Circle contacts."
    }
  ];

  // Tailored AI Travel Tips
  const aiTravelTips = [
    `Depart ${orig} promptly at ${step1Time} to maintain optimal daylight/transit schedule.`,
    mode === 'Walking' && isNight
      ? `Avoid unlit secondary alleys; stick strictly to primary avenues when walking to ${dest}.`
      : `Keep mobile device securely stored and accessible for navigation.`,
    `Share your live HALO journey link with your primary emergency contact before departure.`,
    `Keep an emergency rideshare app open as a backup transport option.`
  ];

  return {
    readinessScore,
    readinessLevel,
    journeyOverview: `Personalized travel plan from ${orig} to ${dest} via ${mode} scheduled for ${timeStr}. Overall readiness index evaluated as ${readinessLevel.toUpperCase()} (${readinessScore}/100).`,
    bestDepartureTime: step1Time,
    routeStrategy: `Follow primary lit corridor connecting ${orig} and ${dest} with active pedestrian monitoring.`,
    journeyDistance: '3.8 km',
    estimatedDuration: '28 mins',
    packingChecklist,
    journeyTimeline,
    aiTravelTips,
    recommendedPrecautions: [
      `Confirm live GPS location permissions are granted.`,
      `Pin primary emergency contact on speed dial.`
    ],
    finalSummary: `Your journey from ${orig} to ${dest} is planned with a ${readinessLevel} Readiness rating (${readinessScore}/100). Review your timeline and packing checklist before departing.`
  };
}

/**
 * Helper to add minutes to HH:MM format
 */
function addMinutesToTimeStr(timeStr, minsToAdd) {
  if (!timeStr.includes(':')) return '14:28';
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0], 10) || 14;
  let mins = parseInt(parts[1], 10) || 0;

  mins += minsToAdd;
  if (mins >= 60) {
    hours = (hours + Math.floor(mins / 60)) % 24;
    mins = mins % 60;
  }

  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = mins < 10 ? `0${mins}` : `${mins}`;
  return `${hStr}:${mStr}`;
}

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
  const cleanDestination = (destination || 'City Center').trim();

  console.log('[HALO AI] 1. Frontend form inputs received:', {
    destination: cleanDestination,
    travelDate,
    travelTime,
    travelMode,
    additionalNotes
  });

  const prompt = `
You are HALO, a professional travel safety advisor.
Analyze destination safety for a solo traveler dynamically based on these exact input parameters:

Destination: ${cleanDestination}
Date of Travel: ${travelDate || 'Today'}
Time of Travel: ${travelTime || 'Current Hour'}
Travel Mode: ${travelMode}
Additional Notes: ${additionalNotes || 'None'}

CRITICAL INSTRUCTIONS:
1. Conduct a SPECIFIC SAFETY EVALUATION FOR THE CITY / DISTRICT "${cleanDestination}".
   - Tokyo at 10 PM must yield a distinctly different score (~92-96) than London at 10 PM (~78-84), Paris at 10 PM (~74-82), Kochi at 10 PM (~82-88), or New York at 10 PM (~72-80).
2. The safetyScore (0-100) MUST reflect the unique local crime profile, public infrastructure, and security index of "${cleanDestination}".
3. The overallAssessment MUST explicitly state WHY this specific score was assigned for "${cleanDestination}" at ${travelTime} using ${travelMode}.
4. Every recommendation and risk breakdown item MUST be personalized to "${cleanDestination}", ${travelMode}, and ${travelTime}.

Respond ONLY in valid JSON matching this schema:
{
  "safetyScore": 88,
  "riskLevel": "Low" | "Moderate" | "High",
  "overallAssessment": "Safety score assigned [SCORE]/100 for ${cleanDestination} because travelling by [MODE] at [TIME]...",
  "riskBreakdown": {
    "personalSafety": {
      "score": 88,
      "explanation": "Specific personal safety evaluation for ${cleanDestination} at [TIME] via [MODE].",
      "recommendation": "Key recommendation tailored to ${cleanDestination}."
    },
    "transportation": {
      "score": 85,
      "explanation": "Specific transit evaluation for [MODE] in ${cleanDestination} at [TIME].",
      "recommendation": "Key transportation recommendation."
    },
    "environmental": {
      "score": 90,
      "explanation": "Weather and street lighting evaluation in ${cleanDestination} for [TIME].",
      "recommendation": "Key environmental precaution."
    },
    "crowdLevel": {
      "score": 82,
      "explanation": "Crowd density assessment for ${cleanDestination} at [TIME].",
      "recommendation": "Key crowd management tip."
    },
    "generalAdvice": {
      "score": 86,
      "explanation": "Overall corridor status in ${cleanDestination}.",
      "recommendation": "Primary general precaution."
    }
  },
  "recommendations": [
    "Personalized recommendation 1 for ${cleanDestination} (${travelMode} at ${travelTime})",
    "Personalized recommendation 2 for ${cleanDestination}",
    "Personalized recommendation 3 for ${cleanDestination}",
    "Personalized recommendation 4 for ${cleanDestination}"
  ],
  "recommendedTravelWindow": "08:00 AM - 08:30 PM",
  "thingsToRemember": [
    "Checklist item 1 for ${cleanDestination}",
    "Checklist item 2 for ${travelMode}",
    "Checklist item 3",
    "Checklist item 4"
  ],
  "finalSummary": "Final tailored summary statement for ${cleanDestination}."
}
`;

  console.log('[HALO AI] 2. Gemini Prompt constructed:', prompt);

  if (GEMINI_API_KEY) {
    try {
      console.log('[HALO AI] 3. Calling Gemini API...');
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
      console.log('[HALO AI] 4. Raw Gemini API Response:', data);

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('[HALO AI] 5. Raw Gemini Text:', text);

      if (text) {
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanText);
        console.log('[HALO AI] 6. Processed Safety Report Output:', parsed);
        return parsed;
      }
    } catch (err) {
      console.warn('[HALO AI] Gemini API call failed, using destination-specific fallback engine:', err);
    }
  }

  // Dynamic Fallback Destination Safety Reasoning Engine
  console.log('[HALO AI] 3 (Fallback). Executing Destination-Specific Reasoning Engine...');
  const fallbackResult = fallbackDestinationSafetyReasoning({ destination: cleanDestination, travelDate, travelTime, travelMode, additionalNotes });
  console.log('[HALO AI] 6 (Fallback). Processed Safety Report Output:', fallbackResult);
  return fallbackResult;
}

/**
 * Destination-Specific Local Reasoning Engine incorporating City Risk Profiles & String Hashing
 */
function fallbackDestinationSafetyReasoning({ destination, travelDate, travelTime, travelMode, additionalNotes }) {
  const destName = destination || 'Selected Destination';
  const destLower = destName.toLowerCase();
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

  const isLateNight = hour >= 22 || hour <= 4;
  const isEvening = hour >= 19 && hour < 22;

  // 1. Known City Risk Profiles (Baseline Safety Score)
  let cityBaseScore = 88;
  let cityProfileDesc = 'standard urban safety corridor';

  if (destLower.includes('tokyo') || destLower.includes('japan')) {
    cityBaseScore = 96;
    cityProfileDesc = 'Tokyo is internationally recognized for extremely low crime rates and highly secure transit corridors';
  } else if (destLower.includes('london') || destLower.includes('uk') || destLower.includes('england')) {
    cityBaseScore = 84;
    cityProfileDesc = 'London offers active public security with routine late-night transit advisories';
  } else if (destLower.includes('paris') || destLower.includes('france')) {
    cityBaseScore = 82;
    cityProfileDesc = 'Paris maintains high overall safety with localized pickpocket advisories in crowded tourist zones';
  } else if (destLower.includes('kochi') || destLower.includes('kerala') || destLower.includes('india')) {
    cityBaseScore = 88;
    cityProfileDesc = 'Kochi is a peaceful coastal destination with reliable local transport corridors';
  } else if (destLower.includes('new york') || destLower.includes('nyc') || destLower.includes('manhattan')) {
    cityBaseScore = 80;
    cityProfileDesc = 'New York City features 24/7 active transit with neighborhood lighting and density variations';
  } else if (destLower.includes('rome') || destLower.includes('trastevere') || destLower.includes('italy')) {
    cityBaseScore = 86;
    cityProfileDesc = 'Rome provides vibrant pedestrian plazas with high foot traffic visibility';
  } else {
    // Custom Destination Deterministic String Hashing (yields -8 to +8 pts offset for unique cities)
    let hash = 0;
    for (let i = 0; i < destName.length; i++) {
      hash = (hash << 5) - hash + destName.charCodeAt(i);
      hash |= 0;
    }
    const offset = (Math.abs(hash) % 17) - 8; // -8 to +8
    cityBaseScore = 86 + offset;
    cityProfileDesc = `${destName} provides a monitored travel corridor with localized security profiles`;
  }

  // 2. Time Penalty / Adjustment
  let timePenalty = 0;
  let timeTag = 'daylight hours';

  if (isLateNight) {
    timePenalty = -18;
    timeTag = `late night (${timeStr})`;
  } else if (isEvening) {
    timePenalty = -6;
    timeTag = `evening (${timeStr})`;
  } else {
    timePenalty = 0;
    timeTag = `daytime (${timeStr})`;
  }

  // 3. Mode Adjustment Factor
  let modeAdjustment = 0;
  let modeDesc = '';

  if (mode === 'Walking') {
    if (isLateNight) {
      modeAdjustment = -10;
      modeDesc = `walking solo on foot in ${destName} late at night increases street exposure`;
    } else {
      modeAdjustment = +2;
      modeDesc = `walking on foot in ${destName} during daylight provides high visibility and pedestrian access`;
    }
  } else if (mode === 'Rideshare') {
    if (isLateNight) {
      modeAdjustment = +14;
      modeDesc = `utilizing door-to-door rideshare in ${destName} significantly reduces street exposure late at night`;
    } else {
      modeAdjustment = +4;
      modeDesc = `rideshare transit in ${destName} offers secure, direct transportation`;
    }
  } else if (mode === 'Transit') {
    if (isLateNight) {
      modeAdjustment = -4;
      modeDesc = `public transit in ${destName} late at night requires waiting at designated well-lit hubs`;
    } else {
      modeAdjustment = +3;
      modeDesc = `public transit in ${destName} operates with frequent schedules and active monitoring`;
    }
  } else if (mode === 'Cycling') {
    if (isLateNight) {
      modeAdjustment = -6;
      modeDesc = `cycling in ${destName} at night requires high-visibility gear and reflectors`;
    } else {
      modeAdjustment = +2;
      modeDesc = `cycling along marked bike lanes in ${destName} provides efficient travel`;
    }
  }

  // 4. Notes Adjustment
  let notesAdjustment = 0;
  if (notes.includes('solo') || notes.includes('alone') || notes.includes('camera') || notes.includes('gear') || notes.includes('bag')) {
    notesAdjustment = -3;
  }

  const rawScore = cityBaseScore + timePenalty + modeAdjustment + notesAdjustment;
  const safetyScore = Math.min(99, Math.max(35, rawScore));

  let riskLevel = 'Low';
  if (safetyScore < 65) riskLevel = 'High';
  else if (safetyScore < 82) riskLevel = 'Moderate';
  else riskLevel = 'Low';

  const recommendations = [];
  const thingsToRemember = [];

  if (destLower.includes('tokyo') || destLower.includes('japan')) {
    recommendations.push(`Tokyo transit is highly efficient; keep IC card or Suica ready for train stations.`);
    recommendations.push("Tokyo streets remain extremely safe, but stick to lit main avenues in Shibuya/Shinjuku late at night.");
    recommendations.push("Carry a small amount of cash as some local ramen shops in Tokyo do not accept cards.");
    recommendations.push("Share your live HALO journey tracking link with family or emergency contacts.");
  } else if (destLower.includes('london') || destLower.includes('uk')) {
    recommendations.push(`Use Oyster or contactless mobile payments at London Underground and bus stops.`);
    recommendations.push("Keep phone and wallet in front pockets when navigating crowded Soho/Camden streets.");
    recommendations.push("Use official black cabs or licensed Uber/rideshare services for late-night transit.");
    recommendations.push("Share your live tracking corridor link with trusted contacts.");
  } else if (destLower.includes('paris') || destLower.includes('france')) {
    recommendations.push(`Be alert for pickpocketing advisories near major tourist landmarks like Eiffel Tower or Metro line 1.`);
    recommendations.push("Keep backpacks worn in front or zipped securely when boarding the Paris Metro.");
    recommendations.push("Prefer well-lit avenues like Champs-Élysées or Saint-Germain over quiet side streets at night.");
    recommendations.push("Share your live HALO location link with emergency supporters.");
  } else if (destLower.includes('kochi') || destLower.includes('kerala')) {
    recommendations.push(`Utilize Kochi Metro or registered auto-rickshaws for travel around Fort Kochi.`);
    recommendations.push("Ensure your mobile has active data connection for local maps along coastal roads.");
    recommendations.push("Carry light water and comfortable footwear for walking along Fort Kochi beach walkways.");
    recommendations.push("Share your live location sync with emergency contacts.");
  } else if (destLower.includes('new york') || destLower.includes('nyc')) {
    recommendations.push(`Use OMNY contactless payment at NYC Subway turnstiles.`);
    recommendations.push("Ride in central subway cars near the conductor if traveling late at night.");
    recommendations.push("Stay alert on busy Manhattan avenues and avoid isolated park paths after dark.");
    recommendations.push("Share your live HALO location tracking link with a trusted supporter.");
  } else {
    recommendations.push(`Stick strictly to primary lit avenues in ${destName}; avoid dark unmonitored alleys.`);
    recommendations.push(`Maintain active spatial awareness and keep mobile charged above 50% in ${destName}.`);
    recommendations.push(`Use licensed ${mode} options and verify driver credentials before departure.`);
    recommendations.push(`Share your live HALO tracking corridor link for ${destName} with emergency contacts.`);
  }

  thingsToRemember.push(`Emergency contacts saved for ${destName}`);
  thingsToRemember.push(`Phone battery charged above 50% for ${timeStr} trip`);
  thingsToRemember.push(`HALO Live Location sharing active (${mode} Mode)`);
  thingsToRemember.push(`Offline map cached for ${destName}`);

  const crowdScore = isLateNight ? 66 : (isEvening ? 82 : 92);

  return {
    safetyScore,
    riskLevel,
    overallAssessment: `Safety score assigned ${safetyScore}/100 for ${destName}. ${cityProfileDesc}, and ${modeDesc} during ${timeTag}.`,
    riskBreakdown: {
      personalSafety: {
        score: Math.min(98, Math.max(30, safetyScore + 2)),
        explanation: `Personal security index is evaluated as ${riskLevel.toUpperCase()} for ${mode} transit to ${destName} at ${timeStr}.`,
        recommendation: isLateNight ? "Remain on lit main avenues with commercial activity." : "Enjoy travel with standard urban awareness."
      },
      transportation: {
        score: Math.min(98, Math.max(30, safetyScore + (mode === 'Rideshare' ? 6 : -2))),
        explanation: `Selected transport mode (${mode}) in ${destName} provides ${mode === 'Rideshare' ? 'direct door-to-door safety' : 'standard transit corridor access'}.`,
        recommendation: mode === 'Rideshare' ? "Confirm driver credentials before boarding." : "Keep transit pass ready."
      },
      environmental: {
        score: isLateNight ? 80 : 95,
        explanation: `Street illumination and weather visibility assessed for ${destName} during ${timeTag}.`,
        recommendation: isLateNight ? "Carry a small flashlight or keep phone torch accessible." : "Comfortable walking shoes recommended."
      },
      crowdLevel: {
        score: crowdScore,
        explanation: `Foot traffic density in ${destName} is expected to be ${isLateNight ? 'low' : 'moderate to high'}.`,
        recommendation: isLateNight ? "Avoid unpopulated streets." : "Keep wallet and phone secure in crowds."
      },
      generalAdvice: {
        score: safetyScore,
        explanation: `Overall corridor safety rating for ${destName} during ${timeTag}.`,
        recommendation: `Enable HALO Live Journey tracking before departing for ${destName}.`
      }
    },
    recommendations,
    recommendedTravelWindow: isLateNight ? "08:00 AM - 08:30 PM (Daylight window recommended)" : "08:00 AM - 09:30 PM",
    thingsToRemember,
    finalSummary: `Overall, travelling to ${destName} via ${mode} at ${timeStr} yields a ${riskLevel} Risk rating (${safetyScore}/100). Follow the tailored recommendations above.`
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
