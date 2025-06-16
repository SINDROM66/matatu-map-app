import React, { useState, useEffect } from 'react';
import './App.css';
import { MapPin, Bus, Search, BookText, LocateFixed } from 'lucide-react';
import Map from './components/Map'; // Import the Map component

function App() {
  // Matatu data extracted and approximated from Matatus-2014.pdf
  const matatuData = {
    stages: [
      { id: 'stage1', name: 'Ambassador/Kencom Stage', lat: -1.2868, lng: 36.8197,
        matatus: [
          { number: '19C', destination: 'Pangani', type: 'Nissan Matatu', fare: 'Ksh 30-50' },
          { number: '33', destination: 'Karen', type: 'Toyota Hiace', fare: 'Ksh 70-120' },
          { number: '20/30', destination: 'Upperhill', type: 'Nissan Matatu', fare: 'Ksh 40-70' },
          { number: '24', destination: 'Kilimani', type: 'Nissan Matatu', fare: 'Ksh 50-80' },
          { number: '8', destination: 'Ngong Road', type: 'Toyota Hiace', fare: 'Ksh 50-90' },
        ]
      },
      { id: 'stage2', name: 'Odeon Cinema Stage', lat: -1.2847, lng: 36.8143,
        matatus: [
          { number: '70', destination: 'Kawangware', type: 'Nissan Matatu', fare: 'Ksh 50-90' },
          { number: '32', destination: 'Kangemi', type: 'Toyota Hiace', fare: 'Ksh 60-100' },
          { number: '24C', destination: 'Lavington', type: 'Nissan Matatu', fare: 'Ksh 40-70' },
        ]
      },
      { id: 'stage3', name: 'Kasarani Police Stage', lat: -1.2291, lng: 36.8927,
        matatus: [
          { number: '145', destination: 'Mwiki', type: 'Nissan Matatu', fare: 'Ksh 40-70' },
          { number: '100', destination: 'Thika Town', type: 'Isusu Coaster', fare: 'Ksh 80-150' },
        ]
      },
      { id: 'stage4', name: 'Karen Stage', lat: -1.3323, lng: 36.7027,
        matatus: [
          { number: '33', destination: 'City Centre (Kencom/Ambassador)', type: 'Toyota Hiace', fare: 'Ksh 70-120' },
          { number: '125/126', destination: 'Kiserian', type: 'Nissan Matatu', fare: 'Ksh 50-80' },
        ]
      },
      { id: 'stage5', name: 'Thika Town Stage', lat: -1.0454, lng: 37.0706,
        matatus: [
          { number: '100', destination: 'City Centre (Odeon/Kencom)', type: 'Isusu Coaster', fare: 'Ksh 80-150' },
          { number: '120', destination: 'Ruiru Town', type: 'Nissan Matatu', fare: 'Ksh 50-70' },
        ]
      },
      { id: 'stage6', name: 'Dandora Stage', lat: -1.2598, lng: 36.9208,
        matatus: [
          { number: '23', destination: 'City Centre', type: 'Nissan Matatu', fare: 'Ksh 40-60' },
          { number: '14', destination: 'Donholm', type: 'Nissan Matatu', fare: 'Ksh 30-50' },
        ]
      },
      { id: 'stage7', name: 'Donholm Stage', lat: -1.2917, lng: 36.9038,
        matatus: [
          { number: '14', destination: 'City Centre', type: 'Nissan Matatu', fare: 'Ksh 30-50' },
          { number: '10', destination: 'Umoja', type: 'Nissan Matatu', fare: 'Ksh 20-40' },
        ]
      }
    ],
    routes: [
      { id: 'routeCBDToRongai', name: 'CBD to Rongai', startStageId: 'stage1', endDestination: 'Rongai',
        steps: [
          'Walk to Ambassador/Kencom Stage.',
          'Take Matatu No. 111 (or similar route like 125/126 if available) heading towards Ongata Rongai.',
          'Alight at Rongai town center.'
        ]
      },
      { id: 'routeCBDToKasarani', name: 'CBD to Kasarani', startStageId: 'stage1', endDestination: 'Kasarani',
        steps: [
          'Walk to Ambassador/Kencom Stage.',
          'Take Matatu No. 44 (or similar route like 100) heading towards Kasarani.',
          'Alight at Kasarani Police Stage or further into Kasarani.'
        ]
      },
      { id: 'routeCBDToKilimani', name: 'CBD to Kilimani', startStageId: 'stage1', endDestination: 'Kilimani',
        steps: [
          'Walk to Ambassador/Kencom Stage.',
          'Take Matatu No. 24 heading to Kilimani.',
          'Alight at your specific stop in Kilimani.'
        ]
      },
      { id: 'routeCBDToKaren', name: 'CBD to Karen', startStageId: 'stage1', endDestination: 'Karen',
        steps: [
          'Walk to Ambassador/Kencom Stage.',
          'Take Matatu No. 33 heading to Karen.',
          'Alight at your specific stop in Karen.'
        ]
      },
      { id: 'routeCBDToDonholm', name: 'CBD to Donholm', startStageId: 'stage1', endDestination: 'Donholm',
        steps: [
          'Walk to Koja Roundabout Stage (or a nearby CBD stage like Ambassador/Kencom).',
          'Take Matatu No. 14 (or similar route like 23) heading towards Donholm.',
          'Alight at Donholm CBD.'
        ]
      },
      { id: 'routeThikaToCBD', name: 'Thika Town to CBD', startStageId: 'stage5', endDestination: 'City Centre',
        steps: [
          'From Thika Town Stage, take Matatu No. 100 towards Nairobi City Centre.',
          'Alight at Odeon or Kencom stage in CBD.'
        ]
      }
    ]
  };

  // State variables
  const [currentLocation, setCurrentLocation] = useState({ lat: -1.286389, lng: 36.817223, name: 'Nairobi CBD (Default)' });
  const [destination, setDestination] = useState('');
  const [nearestStages, setNearestStages] = useState([]);
  const [possibleRoutes, setPossibleRoutes] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [message, setMessage] = useState('');

  // Geolocation hook
  useEffect(() => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser. Using default location.");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: 'Your Current Location'
        });
      },
      (error) => {
        setMessage(`Geolocation error: ${error.message}. Using default location.`);
      }
    );
  }, []);

  // Distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Find nearest stages
  useEffect(() => {
    setMessage('');
    if (currentLocation.lat && currentLocation.lng) {
      const sortedStages = [...matatuData.stages]
        .map(stage => ({
          ...stage,
          distance: calculateDistance(currentLocation.lat, currentLocation.lng, stage.lat, stage.lng)
        }))
        .sort((a, b) => a.distance - b.distance);

      setNearestStages(sortedStages.slice(0, 3));
    }
  }, [currentLocation, matatuData.stages]);

  // Handle route search
  const handleSearchRoutes = () => {
    setMessage('');
    if (!destination) {
      setMessage('Please enter a destination.');
      return;
    }

    const foundRoutes = matatuData.routes.filter(route =>
      route.endDestination.toLowerCase().includes(destination.toLowerCase())
    );

    if (foundRoutes.length > 0) {
      setPossibleRoutes(foundRoutes);
      setMessage(`Found ${foundRoutes.length} route(s) to ${destination}.`);
    } else {
      setPossibleRoutes([]);
      setMessage(`No direct Matatu routes found to "${destination}". Try a common landmark or another destination.`);
    }
  };

  const handleClear = () => {
    setDestination('');
    setPossibleRoutes([]);
    setSelectedStage(null);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg mb-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2 flex items-center justify-center">
          <Bus className="mr-3 h-10 w-10" /> Matatu Navigator
        </h1>
        <p className="text-xl font-light">Your guide to Nairobi's Matatu routes on a budget!</p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Map - REPLACED WITH MAP COMPONENT */}
          <div className="bg-gray-200 h-64 md:h-80 rounded-xl shadow-md overflow-hidden">
            <Map />
          </div>

          {/* Inputs */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Find Your Route</h2>

            <div className="mb-4">
              <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-600 mb-2">
                <LocateFixed className="inline-block mr-1 h-4 w-4" /> Your Current Location:
              </label>
              <input
                type="text"
                id="currentLocation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                value={currentLocation.name === 'Your Current Location' 
                  ? 'Your Current Location (Detected)' 
                  : `${currentLocation.name} (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`}
                readOnly
                placeholder="Nairobi CBD (Default Location)"
              />
              <p className="text-xs text-gray-500 mt-1">
                {currentLocation.name === 'Your Current Location' 
                  ? 'Using your detected location for stage calculations'
                  : 'Using default location. Enable location services for accurate results'}
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-600 mb-2">
                <MapPin className="inline-block mr-1 h-4 w-4" /> Your Destination:
              </label>
              <input
                type="text"
                id="destination"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="E.g., Rongai, Kilimani, JKIA"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSearchRoutes}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" /> Find Routes
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                Clear
              </button>
            </div>
            {message && (
              <p className={`mt-4 text-sm text-center font-medium ${message.includes('Found') ? 'text-green-600' : 'text-blue-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Nearest Stages */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-red-500" /> Nearest Matatu Stages
            </h2>
            {nearestStages.length > 0 ? (
              <ul className="space-y-3">
                {nearestStages.map(stage => (
                  <li key={stage.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition duration-200 cursor-pointer"
                      onClick={() => setSelectedStage(stage)}>
                    <div>
                      <h3 className="font-medium text-lg text-blue-700">{stage.name}</h3>
                      <p className="text-sm text-gray-600">Approx. {(stage.distance / 1000).toFixed(2)} km away</p>
                    </div>
                    <Bus className="h-6 w-6 text-gray-500" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Finding nearest stages...</p>
            )}
          </div>

          {/* Stage Details */}
          {selectedStage && (
            <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                <Bus className="mr-2 h-6 w-6 text-blue-600" /> {selectedStage.name} Details
              </h2>
              <p className="text-gray-700 mb-3">Matatus departing from here:</p>
              <ul className="space-y-2">
                {selectedStage.matatus.map((matatu, index) => (
                  <li key={index} className="flex items-start bg-blue-100 p-3 rounded-lg shadow-sm">
                    <MapPin className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-700">
                        <span className="font-bold">No. {matatu.number}</span> to <span className="underline">{matatu.destination}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Type: {matatu.type} | Fare: {matatu.fare}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Routes */}
          {possibleRoutes.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                <Search className="mr-2 h-6 w-6 text-purple-500" /> Possible Routes
              </h2>
              <ul className="space-y-4">
                {possibleRoutes.map(route => (
                  <li key={route.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-purple-700">{route.name}</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-1">
                      {route.steps.map((step, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="mr-2 font-semibold text-purple-600">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Language Help */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <BookText className="mr-2 h-6 w-6 text-orange-500" /> Language Assistance
            </h2>
            <p className="text-gray-700 mb-3">Helpful Swahili phrases for Matatu travel:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">To [Destination]?</span> - Kwa [Mahali]? (e.g., Kwa Rongai?)
              </li>
              <li>
                <span className="font-semibold">How much?</span> - Ngapi?
              </li>
              <li>
                <span className="font-semibold">Stop here</span> - Shuka hapa
              </li>
              <li>
                <span className="font-semibold">Thank you</span> - Asante
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;