import React, { useState } from 'react';

const DEFAULT_LOCATION = {
  name: 'Nairobi CBD',
  coords: { lat: -1.2864, lng: 36.8172 },
};

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
    </div>
  );
}
