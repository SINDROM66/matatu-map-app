import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom hook to handle view changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Custom bus stop icon
const createBusStopIcon = (color = 'red') => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const Map = ({ currentLocation, stages, selectedStage }) => {
  const nairobiPosition = [-1.286389, 36.817223];
  const center = currentLocation.lat ? [currentLocation.lat, currentLocation.lng] : nairobiPosition;
  
  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
    >
      <ChangeView center={center} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Current Location Marker */}
      {currentLocation.lat && (
        <Marker 
          position={[currentLocation.lat, currentLocation.lng]} 
          icon={createBusStopIcon('blue')}
        >
          <Popup>
            <div className="font-bold text-blue-600">
              <Bus className="inline mr-1" size={16} />
              {currentLocation.name}
            </div>
            {currentLocation.name === 'Your Current Location' && (
              <p className="text-xs text-gray-600">Detected via browser</p>
            )}
          </Popup>
        </Marker>
      )}
      
      {/* Matatu Stage Markers */}
      {stages.map(stage => (
        <Marker 
          key={stage.id} 
          position={[stage.lat, stage.lng]} 
          icon={createBusStopIcon(selectedStage?.id === stage.id ? 'green' : 'red')}
        >
          <Popup>
            <div className="font-bold text-red-600">
              <MapPin className="inline mr-1" size={16} />
              {stage.name}
            </div>
            <div className="mt-2">
              <p className="font-semibold text-sm">Matatus:</p>
              <ul className="list-disc pl-5 text-xs">
                {stage.matatus.slice(0, 3).map((matatu, idx) => (
                  <li key={idx}>
                    <span className="font-medium">No. {matatu.number}</span> to {matatu.destination}
                  </li>
                ))}
                {stage.matatus.length > 3 && (
                  <li className="text-gray-600">+{stage.matatus.length - 3} more...</li>
                )}
              </ul>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;