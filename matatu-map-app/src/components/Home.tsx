import React, { useState } from 'react';

const DEFAULT_LOCATION = {
  name: 'Nairobi CBD',
  coords: { lat: -1.2864, lng: 36.8172 },
};

const QUICK_DESTINATIONS = [
  { name: 'Karen', matatu: '33' },
  { name: 'Kasarani', matatu: '44' },
  { name: 'Thika', matatu: '100' },
  { name: 'Donholm', matatu: '14' },
  { name: 'Rongai', matatu: '125/126' },
  { name: 'Westlands', matatu: '107' },
  { name: 'Kangemi', matatu: '32' },
  { name: 'Kawangware', matatu: '70' },
  { name: 'Kayole', matatu: '102' },
  { name: 'Githurai', matatu: '45' },
  { name: 'Umoja', matatu: '10' },
  { name: 'Ruaka', matatu: '111' },
  { name: 'Limuru', matatu: '46' },
  { name: 'Ngong', matatu: '111' },
  { name: 'Mombasa', matatu: '1' },
  { name: 'Kisumu', matatu: '2' },
  { name: 'Eldoret', matatu: '3' },
  { name: 'Nakuru', matatu: '4' },
  { name: 'Meru', matatu: '5' },
  { name: 'Embu', matatu: '6' },
  { name: 'Nyeri', matatu: '7' },
  { name: 'Kirinyaga', matatu: '8' },
  { name: 'Murang\'a', matatu: '9' },
];

export default function Home() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [destination, setDestination] = useState('');
  const [tracking, setTracking] = useState(false);

  // Placeholder for location detection logic
  const handleEnableTracking = () => {
    setTracking(true);
    // TODO: Implement geolocation
  };

  const handleFindRoutes = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Route search logic
    alert(`Searching routes to ${destination}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Main Title & Subtitle */}
      <header className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">Matatu Navigator</h1>
        <p className="text-lg text-gray-600 font-medium mt-1">Real-time Nairobi Route Finder</p>
      </header>

      {/* Location Section */}
      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-2 text-gray-700 font-semibold">Your Current Location</div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block text-green-600 font-bold">{location.name}</span>
          <span className="text-xs text-gray-400">({location.coords.lat}, {location.coords.lng})</span>
        </div>
        <div className="text-xs text-gray-500 mb-2">{tracking ? 'Location tracking enabled' : 'Using default location'}</div>
        <button
          className={`px-4 py-2 rounded font-semibold text-white ${tracking ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={handleEnableTracking}
          disabled={tracking}
        >
          {tracking ? 'Tracking Enabled' : 'Enable for real-time updates'}
        </button>
      </section>

      {/* Destination Input */}
      <form className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4" onSubmit={handleFindRoutes}>
        <label htmlFor="destination" className="font-semibold text-gray-700">Where do you want to go?</label>
        <input
          id="destination"
          type="text"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="e.g., Westlands"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow"
        >
          Find Routes
        </button>
      </form>

      {/* Quick Destinations */}
      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4 text-gray-700 font-semibold">Quick Destinations</div>
        <ul className="text-gray-600 text-sm">
          {QUICK_DESTINATIONS.map((dest, index) => (
            <li key={index} className="flex justify-between py-1">
              <span>{dest.name}</span>
              <span className="font-medium text-green-600">{dest.matatu}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to Use Section */}
      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4 text-gray-700 font-semibold">How to Use</div>
        <ol className="list-decimal list-inside text-gray-600 text-sm">
          <li className="mb-2">
            <span className="font-medium text-gray-800">Enable Location:</span> Turn on location tracking to find your current location.
          </li>
          <li className="mb-2">
            <span className="font-medium text-gray-800">Search for Routes:</span> Enter your destination and click on "Find Routes".
          </li>
          <li className="mb-2">
            <span className="font-medium text-gray-800">View Available Routes:</span> See the list of available matatus and stages.
          </li>
          <li className="mb-2">
            <span className="font-medium text-gray-800">Select a Route:</span> Choose your preferred route and note the matatu number.
          </li>
          <li>
            <span className="font-medium text-gray-800">Follow the Map:</span> Use the map to navigate to the nearest stage and board the matatu.
          </li>
        </ol>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4 text-gray-700 font-semibold">Map</div>
        <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
          Map Placeholder - Integrate with a mapping service
        </div>
      </section>

      {/* Nearest Stages Section */}
      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4 text-gray-700 font-semibold">Nearest Stages</div>
        <ul className="text-gray-600 text-sm">
          {/* Placeholder for nearest stages - to be populated by location-based service */}
          <li className="py-2 border-b border-gray-200">Stage 1: Kenyatta Avenue - Matatus: 34, 45, 67</li>
          <li className="py-2 border-b border-gray-200">Stage 2: Uhuru Highway - Matatus: 56, 78, 89</li>
          <li className="py-2 border-b border-gray-200">Stage 3: Moi Avenue - Matatus: 12, 23, 34</li>
          <li className="py-2 border-b border-gray-200">Stage 4: Haile Selassie - Matatus: 90, 91, 92</li>
          <li className="py-2">Stage 5: Ngong Road - Matatus: 11, 22, 33</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-2xl text-center text-gray-500 text-sm mt-auto py-4 border-t border-gray-200">
        &copy; 2023 Matatu Navigator. All rights reserved.
      </footer>
    </div>
  );
}
