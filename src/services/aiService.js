/**
 * HALO AI Monitoring & Complete Professional Trip Itinerary Generator Service
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Generates a complete professional vacation itinerary and travel plan using Gemini API
 */
export async function generateFullTripItineraryWithAI(payload) {
  const {
    startingLocation = 'New Delhi',
    destination = 'Kochi',
    departureDate = '2026-08-10',
    returnDate = '2026-08-15',
    numberOfDays = 6,
    numberOfTravelers = 1,
    tripType = 'Solo',
    budgetType = 'Standard',
    currency = 'INR',
    budgetAmount = '35000',
    selectedPreferences = ['Nature', 'Food'],
    accommodation = 'Resort',
    transport = 'Public Transport',
    foodPreferences = ['Local Cuisine'],
    notes = ''
  } = payload;

  const startLoc = (startingLocation || 'Starting Point').trim();
  const destLoc = (destination || 'Destination Point').trim();

  console.log('[HALO AI Full Trip Planner] Generating full itinerary for:', {
    startLoc,
    destLoc,
    numberOfDays,
    budgetType,
    currency
  });

  const prompt = `
You are HALO, an elite travel agency AI planner.
Create a complete, professional, day-by-day vacation itinerary based on these parameters:

- Starting Location: ${startLoc}
- Destination: ${destLoc}
- Departure Date: ${departureDate}
- Return Date: ${returnDate}
- Duration: ${numberOfDays} Days
- Travelers: ${numberOfTravelers} (${tripType})
- Budget: ${budgetType} (${currency} ${budgetAmount || 'Standard'})
- Travel Preferences: ${selectedPreferences.join(', ')}
- Accommodation Preference: ${accommodation}
- Transport Mode: ${transport}
- Food Preferences: ${foodPreferences.join(', ')}
- Additional Notes: ${notes || 'None'}

CRITICAL INSTRUCTIONS:
1. DAY-BY-DAY ITINERARY IS THE MOST IMPORTANT SECTION. Create a detailed itinerary for EVERY single day (Day 1 through Day ${numberOfDays}).
   For EACH day, include 4 distinct time slots: Morning, Afternoon, Evening, Night.
   For EVERY activity, specify: Activity Name, Estimated Time, Estimated Cost in ${currency}, and Description.
   Ensure activities make geographic sense for ${destLoc}.
2. Recommend 2 to 3 Accommodations with Name, Approx Price (${currency}), Area, and Reason.
3. Provide Transportation guidance: To Destination, Internal Transit, and Return Home with cost estimates.
4. Recommend daily Dining (Breakfast, Lunch, Dinner) matching ${foodPreferences.join(', ')}.
5. Provide an Itemized Budget Breakdown: Accommodation, Transport, Food, Activities, Shopping, Emergency Buffer, Total.
6. Provide a Packing Checklist tailored to ${numberOfDays} days and ${destLoc}.
7. Provide Destination Safety Advice tailored to ${destLoc}.

Respond ONLY in valid JSON matching this schema:
{
  "tripOverview": {
    "destination": "${destLoc}",
    "duration": "${numberOfDays} Days (${departureDate} - ${returnDate})",
    "totalBudget": "${currency} ${budgetAmount || '35,000'}",
    "tripTheme": "${selectedPreferences.slice(0, 3).join(' & ') || 'Exploration'}",
    "overviewText": "Professional overview summary of this ${numberOfDays}-day vacation to ${destLoc}..."
  },
  "dayByDayItinerary": [
    {
      "dayNumber": 1,
      "dayTitle": "Arrival & Initial Exploration in ${destLoc}",
      "morning": {
        "activity": "Arrival & Hotel Check-in",
        "time": "09:00 AM - 12:00 PM",
        "cost": "${currency} 0",
        "description": "Arrive at ${destLoc}, transfer to accommodation, and settle in."
      },
      "afternoon": {
        "activity": "Local Sightseeing & Cultural Walk",
        "time": "01:30 PM - 05:00 PM",
        "cost": "${currency} 500",
        "description": "Explore central landmarks and cultural corridors."
      },
      "evening": {
        "activity": "Sunset Point & Local Promenade",
        "time": "05:30 PM - 08:00 PM",
        "cost": "${currency} 300",
        "description": "Relax at scenic viewpoint with evening refreshments."
      },
      "night": {
        "activity": "Welcome Dinner & Stroll",
        "time": "08:30 PM - 10:30 PM",
        "cost": "${currency} 800",
        "description": "Dine at authentic local dining spot and return to stay."
      }
    }
  ],
  "accommodations": [
    {
      "name": "${destLoc} Grand Resort",
      "price": "${currency} 3,500 / night",
      "area": "Central District",
      "reason": "Located along main safe corridor with top amenities."
    },
    {
      "name": "${destLoc} Boutique Homestay",
      "price": "${currency} 2,200 / night",
      "area": "Heritage Quarter",
      "reason": "Authentic local hospitality close to key attractions."
    }
  ],
  "transportation": {
    "toDestination": "Express flight/train from ${startLoc} to ${destLoc} (Est. ${currency} 4,500)",
    "internalTransit": "Local metro, auto-rickshaws, and walking corridors (Est. ${currency} 1,800)",
    "returnHome": "Return transit from ${destLoc} to ${startLoc} (Est. ${currency} 4,500)",
    "totalTransportCost": "${currency} 10,800"
  },
  "restaurants": [
    {
      "day": 1,
      "breakfast": "Local Heritage Cafe",
      "lunch": "Central Spice Bistro",
      "dinner": "Harbor View Seafood Restaurant"
    }
  ],
  "budgetBreakdown": {
    "accommodation": "${currency} 12,000",
    "transport": "${currency} 8,500",
    "food": "${currency} 7,000",
    "activities": "${currency} 3,500",
    "shopping": "${currency} 2,000",
    "emergencyBuffer": "${currency} 2,000",
    "totalEstimated": "${currency} ${budgetAmount || '35,000'}"
  },
  "packingChecklist": [
    "5x Comfortable daily outfits",
    "1x Lightweight jacket / raincoat",
    "Comfortable walking shoes",
    "Universal power bank & charger",
    "Personal toiletries & medicine",
    "Government ID & emergency contact card"
  ],
  "safetyAdvice": [
    "Keep phone charged above 50% for live HALO corridor tracking.",
    "Avoid unlit side streets late at night in ${destLoc}.",
    "Keep emergency contact numbers pinned on your lock screen."
  ],
  "tripSummary": "Final narrative summary for your ${numberOfDays}-day vacation to ${destLoc}."
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
      console.warn('[HALO AI Full Trip Planner] Gemini API failed, using rich local fallback engine:', err);
    }
  }

  // Dynamic Rich Fallback Itinerary Generator Engine
  return fallbackFullTripItineraryReasoning(payload);
}

/**
 * Intelligent Dynamic Rich Fallback Itinerary Generator Engine
 */
function fallbackFullTripItineraryReasoning(payload) {
  const {
    startingLocation = 'New Delhi',
    destination = 'Kochi',
    departureDate = '2026-08-10',
    returnDate = '2026-08-15',
    numberOfDays = 5,
    numberOfTravelers = 1,
    tripType = 'Solo',
    budgetType = 'Standard',
    currency = 'INR',
    budgetAmount = '35000',
    selectedPreferences = ['Nature', 'Food', 'Culture'],
    accommodation = 'Resort',
    transport = 'Public Transport',
    foodPreferences = ['Local Cuisine'],
    notes = ''
  } = payload;

  const startLoc = (startingLocation || 'Starting Point').trim();
  const destLoc = (destination || 'Destination Point').trim();
  const daysCount = Math.max(1, Math.min(10, parseInt(numberOfDays, 10) || 5));
  const currSym = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'JPY' ? '¥' : '₹';
  const totalB = parseInt(budgetAmount, 10) || 35000;

  // Build Day-by-day Itinerary Array for EVERY day of the trip
  const dayByDayItinerary = [];
  const restaurants = [];

  const activityTemplates = [
    {
      title: 'Heritage & Landmark Exploration',
      m: { act: `Morning Arrival & Check-in at ${accommodation}`, time: '09:00 AM - 11:30 AM', cost: `${currSym} 0`, desc: `Transfer from ${startLoc} arrival hub to your ${accommodation} in ${destLoc}.` },
      a: { act: 'Historic Quarter Walk & Architecture Tour', time: '01:30 PM - 04:30 PM', cost: `${currSym} 400`, desc: `Guided walking tour through historic streets and prominent monuments in ${destLoc}.` },
      e: { act: 'Scenic Promenade & Sunset Viewpoint', time: '05:30 PM - 07:30 PM', cost: `${currSym} 250`, desc: `Enjoy coastal / high-altitude sunset views with local light refreshments.` },
      n: { act: 'Authentic Local Dinner & Cultural Walk', time: '08:00 PM - 10:00 PM', cost: `${currSym} 650`, desc: `Sample traditional dishes matching your ${foodPreferences.join('/')} preferences.` }
    },
    {
      title: 'Nature, Parks & Scenic Discovery',
      m: { act: `Early Morning Nature Walk & Botanic Gardens`, time: '08:00 AM - 11:00 AM', cost: `${currSym} 300`, desc: `Explore pristine greenery and protected natural corridors around ${destLoc}.` },
      a: { act: 'Boating / Adventure Experience', time: '01:00 PM - 04:00 PM', cost: `${currSym} 850`, desc: `Engage in outdoor activities tailored to ${selectedPreferences.join(', ')}.` },
      e: { act: 'Artisan Market & Local Handicrafts', time: '05:00 PM - 07:30 PM', cost: `${currSym} 300`, desc: `Browse local craft stalls and souvenir boutiques in well-lit market squares.` },
      n: { act: 'Bistro Dining & Evening Atmosphere', time: '08:00 PM - 10:00 PM', cost: `${currSym} 700`, desc: `Relaxed evening dining with live ambient music.` }
    },
    {
      title: 'Culinary & Local Life Immersive Tour',
      m: { act: `Morning Food Tasting & Spice Market`, time: '09:00 AM - 11:30 AM', cost: `${currSym} 450`, desc: `Immerse in local culinary traditions and fresh produce markets.` },
      a: { act: 'Museum & Art Gallery Visit', time: '02:00 PM - 05:00 PM', cost: `${currSym} 350`, desc: `Discover modern & historic exhibits showcasing ${destLoc} heritage.` },
      e: { act: 'Tea / Coffee Tasting & Relaxation', time: '05:30 PM - 07:00 PM', cost: `${currSym} 200`, desc: `Unwind at a renowned local café hub.` },
      n: { act: 'Specialty Chef Dinner Experience', time: '08:00 PM - 10:30 PM', cost: `${currSym} 950`, desc: `Enjoy a top-rated dining experience featuring local specialties.` }
    },
    {
      title: 'Coastal / Countryside Day Trip',
      m: { act: `Excursion to Nearby Scenic Valley / Waterfront`, time: '08:30 AM - 12:00 PM', cost: `${currSym} 600`, desc: `Travel via ${transport} to breathtaking natural vantage points.` },
      a: { act: 'Open-Air Recreation & Photography Session', time: '01:30 PM - 04:30 PM', cost: `${currSym} 350`, desc: `Capture iconic photo spots along safe monitored paths.` },
      e: { act: 'Return Transit & Leisure Stroll', time: '05:30 PM - 07:30 PM', cost: `${currSym} 250`, desc: `Return to central ${destLoc} for evening relaxation.` },
      n: { act: 'Casual Night Market & Street Treats', time: '08:00 PM - 10:00 PM', cost: `${currSym} 500`, desc: `Sample hygienic street food and local desserts.` }
    },
    {
      title: 'Leisure, Shopping & Farewell Gala',
      m: { act: `Morning Spa / Wellness Session`, time: '09:30 AM - 11:30 AM', cost: `${currSym} 800`, desc: `Relax with authentic wellness treatments in ${destLoc}.` },
      a: { act: 'Souvenir Shopping & Photo Stops', time: '01:30 PM - 04:30 PM', cost: `${currSym} 500`, desc: `Pick up local specialty items and final gifts.` },
      e: { act: 'Farewell Sunset Cruise / Deck View', time: '05:30 PM - 07:30 PM', cost: `${currSym} 600`, desc: `Reflect on your journey with panoramic views.` },
      n: { act: 'Farewell Gala Dinner', time: '08:00 PM - 10:30 PM', cost: `${currSym} 1000`, desc: `Celebrate the final evening of your trip with a signature meal.` }
    }
  ];

  for (let i = 1; i <= daysCount; i++) {
    const tIdx = (i - 1) % activityTemplates.length;
    const t = activityTemplates[tIdx];

    dayByDayItinerary.push({
      dayNumber: i,
      dayTitle: `Day ${i}: ${t.title}`,
      morning: t.m,
      afternoon: t.a,
      evening: t.e,
      night: t.n
    });

    restaurants.push({
      day: i,
      breakfast: `${destLoc} Heritage Breakfast Club (Day ${i})`,
      lunch: `${destLoc} Central Bistro & Grille`,
      dinner: `${destLoc} Signature Evening Restaurant`
    });
  }

  // Accommodations (2-3 items)
  const accommodations = [
    {
      name: `${destLoc} Grand ${accommodation}`,
      price: `${currSym} ${Math.round((totalB * 0.35) / daysCount)} / night`,
      area: 'Central City District',
      reason: `Prime central location with top security and direct access to ${transport}.`
    },
    {
      name: `${destLoc} Heritage Boutique Stay`,
      price: `${currSym} ${Math.round((totalB * 0.28) / daysCount)} / night`,
      area: 'Old Town / Cultural Quarter',
      reason: 'Authentic local ambiance within walking distance of historic landmarks.'
    },
    {
      name: `${destLoc} Scenic Sanctuary Homestay`,
      price: `${currSym} ${Math.round((totalB * 0.22) / daysCount)} / night`,
      area: 'Waterfront / Garden Enclave',
      reason: 'Quiet, peaceful neighborhood ideal for solo travelers and relaxation.'
    }
  ];

  // Itemized Budget Breakdown
  const accomBudget = Math.round(totalB * 0.36);
  const transBudget = Math.round(totalB * 0.24);
  const foodBudget = Math.round(totalB * 0.20);
  const actBudget = Math.round(totalB * 0.10);
  const shopBudget = Math.round(totalB * 0.05);
  const bufBudget = Math.round(totalB * 0.05);

  return {
    tripOverview: {
      destination: destLoc,
      duration: `${daysCount} Days (${departureDate} - ${returnDate})`,
      totalBudget: `${currSym} ${totalB.toLocaleString()}`,
      tripTheme: `${selectedPreferences.slice(0, 3).join(' & ') || 'Exploration'}`,
      overviewText: `A professionally curated ${daysCount}-day ${tripType.toLowerCase()} vacation from ${startLoc} to ${destLoc}. Tailored for ${budgetType.toLowerCase()} travel with emphasis on ${selectedPreferences.join(', ')}.`
    },
    dayByDayItinerary,
    accommodations,
    transportation: {
      toDestination: `Travel from ${startLoc} to ${destLoc} via Express Transit (Est. ${currSym} ${Math.round(transBudget * 0.45)})`,
      internalTransit: `Local ${transport} around ${destLoc} attractions (Est. ${currSym} ${Math.round(transBudget * 0.15)})`,
      returnHome: `Return transit from ${destLoc} to ${startLoc} (Est. ${currSym} ${Math.round(transBudget * 0.40)})`,
      totalTransportCost: `${currSym} ${transBudget.toLocaleString()}`
    },
    restaurants,
    budgetBreakdown: {
      accommodation: `${currSym} ${accomBudget.toLocaleString()}`,
      transport: `${currSym} ${transBudget.toLocaleString()}`,
      food: `${currSym} ${foodBudget.toLocaleString()}`,
      activities: `${currSym} ${actBudget.toLocaleString()}`,
      shopping: `${currSym} ${shopBudget.toLocaleString()}`,
      emergencyBuffer: `${currSym} ${bufBudget.toLocaleString()}`,
      totalEstimated: `${currSym} ${totalB.toLocaleString()}`
    },
    packingChecklist: [
      `${daysCount}x Daily outfits suitable for ${destLoc} climate`,
      '1x Lightweight waterproof jacket or umbrella',
      'Comfortable walking shoes & extra socks',
      'High-capacity power bank & charging cables',
      'Personal medicine kit & basic toiletries',
      'Government ID, transit passes & emergency contact card'
    ],
    safetyAdvice: [
      `Keep phone battery charged above 50% for continuous HALO GPS corridor sync in ${destName || destLoc}.`,
      `Prefer lit primary avenues over unmonitored shortcuts after 09:00 PM.`,
      `Share your live HALO location link with your primary emergency contact.`,
      `Verify driver credentials and license plate when using rideshare or taxi.`
    ],
    tripSummary: `Your ${daysCount}-day journey to ${destLoc} is completely planned with day-by-day activities, accommodations, dining options, and an itemized budget of ${currSym} ${totalB.toLocaleString()}. Have a safe and memorable trip!`
  };
}

/**
 * Generates an AI-powered smart travel plan using Gemini API
 */
export async function generateTravelPlanWithAI(payload) {
  return generateFullTripItineraryWithAI(payload);
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
      console.warn('[HALO AI] Gemini API call failed, using fallback:', err);
    }
  }

  return fallbackDestinationSafetyReasoning({ destination: cleanDestination, travelDate, travelTime, travelMode, additionalNotes });
}

function fallbackDestinationSafetyReasoning({ destination, travelDate, travelTime, travelMode, additionalNotes }) {
  const destName = destination || 'Selected Destination';
  const destLower = destName.toLowerCase();
  const mode = travelMode || 'Walking';
  const timeStr = travelTime || '14:00';
  const notes = (additionalNotes || '').toLowerCase();

  let hour = 14;
  if (timeStr.includes(':')) {
    const parts = timeStr.split(':');
    hour = parseInt(parts[0], 10);
    if (isNaN(hour)) hour = 14;
  }

  const isLateNight = hour >= 22 || hour <= 4;
  const isEvening = hour >= 19 && hour < 22;

  let cityBaseScore = 88;
  let cityProfileDesc = 'standard urban safety corridor';

  if (destLower.includes('tokyo') || destLower.includes('japan')) {
    cityBaseScore = 96;
    cityProfileDesc = 'Tokyo is internationally recognized for extremely low crime rates';
  } else if (destLower.includes('london') || destLower.includes('uk')) {
    cityBaseScore = 84;
    cityProfileDesc = 'London offers active public security with late-night transit advisories';
  } else if (destLower.includes('paris') || destLower.includes('france')) {
    cityBaseScore = 82;
    cityProfileDesc = 'Paris maintains high safety with pickpocket advisories in tourist zones';
  } else if (destLower.includes('kochi') || destLower.includes('kerala')) {
    cityBaseScore = 88;
    cityProfileDesc = 'Kochi is a peaceful coastal destination with reliable transport';
  } else if (destLower.includes('new york') || destLower.includes('nyc')) {
    cityBaseScore = 80;
    cityProfileDesc = 'New York City features 24/7 active transit';
  } else {
    let hash = 0;
    for (let i = 0; i < destName.length; i++) {
      hash = (hash << 5) - hash + destName.charCodeAt(i);
      hash |= 0;
    }
    const offset = (Math.abs(hash) % 17) - 8;
    cityBaseScore = 86 + offset;
    cityProfileDesc = `${destName} provides a monitored travel corridor`;
  }

  let timePenalty = isLateNight ? -18 : (isEvening ? -6 : 0);
  let modeAdjustment = mode === 'Rideshare' ? (isLateNight ? +14 : +4) : (isLateNight ? -10 : +2);

  const rawScore = cityBaseScore + timePenalty + modeAdjustment;
  const safetyScore = Math.min(99, Math.max(35, rawScore));
  let riskLevel = safetyScore < 65 ? 'High' : safetyScore < 82 ? 'Moderate' : 'Low';

  return {
    safetyScore,
    riskLevel,
    overallAssessment: `Safety score assigned ${safetyScore}/100 for ${destName}. ${cityProfileDesc}.`,
    riskBreakdown: {
      personalSafety: { score: safetyScore, explanation: `Evaluated as ${riskLevel} for ${mode} at ${timeStr}.`, recommendation: 'Stay aware.' },
      transportation: { score: safetyScore, explanation: `Mode ${mode} evaluated.`, recommendation: 'Use licensed transit.' },
      environmental: { score: isLateNight ? 80 : 95, explanation: `Visibility assessed for ${timeStr}.`, recommendation: 'Torch recommended.' },
      crowdLevel: { score: 85, explanation: `Foot traffic density assessed.`, recommendation: 'Secure belongings.' },
      generalAdvice: { score: safetyScore, explanation: `Corridor status evaluated.`, recommendation: 'Enable HALO tracking.' }
    },
    recommendations: [`Stick to lit avenues in ${destName}.`, `Charge phone battery.`, `Share live location.`],
    recommendedTravelWindow: '08:00 AM - 08:30 PM',
    thingsToRemember: [`Emergency contacts saved`, `Phone battery > 50%`],
    finalSummary: `Overall rating for ${destName}: ${riskLevel} (${safetyScore}/100).`
  };
}

export async function analyzeJourneyWithAI() { return {}; }
export async function generateEmergencyAnalysisWithAI() { return {}; }
export async function generateEmergencySummaryWithAI() { return {}; }
export async function generateJourneySummaryWithAI() { return {}; }
