import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issues in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom Icon for User Current Location (Emerald Halo Dot)
const userLocationIcon = new L.DivIcon({
  className: 'custom-user-marker',
  html: `
    <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background-color: #10B981; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background-color: #1D2B26; border: 2.5px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Custom Icon for Destination (Dark Pin)
const destinationIcon = new L.DivIcon({
  className: 'custom-destination-marker',
  html: `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #1D2B26; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; border: 2px solid #FFFFFF; box-shadow: 0 6px 16px rgba(0,0,0,0.35);">
        📍
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 28],
});

// Helper component to center map smoothly on location update
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, map.getZoom(), { animate: true, duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

// Helper component to capture map clicks for destination selection
function MapClickHandler({ onSelectDestination }) {
  useMapEvents({
    click(e) {
      if (onSelectDestination) {
        onSelectDestination({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          name: `Selected Pin (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`
        });
      }
    },
  });
  return null;
}

export default function LiveMap({ 
  currentLocation, 
  destination, 
  routeCoordinates = [], 
  onSelectDestination 
}) {
  // Default fallback center: Rome (or User location)
  const defaultCenter = currentLocation 
    ? [currentLocation.lat, currentLocation.lng] 
    : [41.9028, 12.4964];

  // Polyline points connecting current location & destination if no full route array
  const polylinePositions = routeCoordinates.length > 0 
    ? routeCoordinates 
    : (currentLocation && destination ? [
        [currentLocation.lat, currentLocation.lng],
        [destination.lat, destination.lng]
      ] : []);

  return (
    <div className="w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden shadow-md border border-black/10 relative bg-[#E5ECE7]">
      
      <MapContainer 
        center={defaultCenter} 
        zoom={14} 
        scrollWheelZoom={true} 
        style={{ width: '100%', height: '100%' }}
      >
        <ChangeView center={defaultCenter} />
        <MapClickHandler onSelectDestination={onSelectDestination} />

        {/* Clean Light Map Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Current Location Marker */}
        {currentLocation && (
          <Marker 
            position={[currentLocation.lat, currentLocation.lng]} 
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-xs font-bold text-[#1D2B26]">
                Your Current Location
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && destination.lat && destination.lng && (
          <Marker 
            position={[destination.lat, destination.lng]} 
            icon={destinationIcon}
          >
            <Popup>
              <div className="text-xs font-bold text-[#1D2B26]">
                Destination: {destination.name || 'Selected Point'}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Polyline */}
        {polylinePositions.length >= 2 && (
          <Polyline 
            positions={polylinePositions} 
            color="#1D2B26" 
            weight={4} 
            opacity={0.85} 
            dashArray="8, 6"
          />
        )}

      </MapContainer>

      {/* Floating Map Hint Banner */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md text-[11px] font-bold text-[#1D2B26] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Click anywhere on map to set Destination</span>
      </div>

    </div>
  );
}
