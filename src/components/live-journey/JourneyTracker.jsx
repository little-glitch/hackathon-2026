import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Haversine Formula for distance in km between two (lat, lng) points
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function JourneyTracker({ children }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [watchId, setWatchId] = useState(null);

  // Request browser geolocation watchPosition
  const startGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setGeoError(null);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
          speed: speed ? speed * 3.6 : 0, // convert m/s to km/h
          timestamp: position.timestamp
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError('Location access was denied by the user. Please enable location permissions in your browser to start live journey tracking.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError('Location information is currently unavailable.');
            break;
          case error.TIMEOUT:
            setGeoError('The request to get user location timed out.');
            break;
          default:
            setGeoError('An unknown location error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000
      }
    );

    setWatchId(id);
  };

  useEffect(() => {
    startGeolocation();
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Geolocation Permission Error Card */}
      {geoError && (
        <div className="editorial-white-card p-6 border border-rose-200 bg-rose-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider font-heading">
                Location Permission Required
              </span>
              <p className="text-xs text-rose-800 leading-relaxed font-normal">
                {geoError}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startGeolocation}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Permission</span>
          </button>
        </div>
      )}

      {children({ currentLocation, geoError })}
    </div>
  );
}
