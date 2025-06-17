import React from 'react';
import { Bus } from 'lucide-react';

interface DirectoryStage {
  id: string;
  name: string;
  isHub?: boolean;
  matatus: { number: string; destination: string }[];
  moreRoutes?: number;
}

interface QuickDestination {
  name: string;
  matatuNumber: string;
}

interface DirectoryProps {
  stage: DirectoryStage;
  quickDestinations: QuickDestination[];
}

const Directory: React.FC<DirectoryProps> = ({ stage, quickDestinations }) => (
  <div className="w-full max-w-2xl mx-auto mt-8">
    {/* Stage-Specific View */}
    <div className="bg-white rounded-lg shadow p-6 mb-6 border">
      <div className="flex items-center mb-2">
        <span className="font-bold text-gray-800 mr-2 text-lg">{stage.name}</span>
        {stage.isHub && (
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Main transport hub</span>
        )}
      </div>
      <ul className="mb-2">
        {stage.matatus.map((m, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            <Bus className="w-4 h-4 mr-1 text-green-600" />
            <span className="font-bold text-green-700 mr-1">{m.number}</span>
            <span>→ {m.destination}</span>
          </li>
        ))}
      </ul>
      {stage.moreRoutes && (
        <div className="text-xs text-blue-500 font-medium">+{stage.moreRoutes} more routes available</div>
      )}
    </div>

    {/* Quick Destination Grid */}
    <div className="bg-white rounded-lg shadow p-6 border">
      <h4 className="font-semibold text-lg mb-4">Quick Destinations</h4>
      <div className="grid grid-cols-2 gap-4">
        {quickDestinations.map((dest, idx) => (
          <div key={idx} className="flex flex-col items-center p-3 border rounded-lg bg-gray-50">
            <span className="font-bold text-gray-800">{dest.name}</span>
            <span className="text-green-700 font-semibold">Matatu {dest.matatuNumber}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Directory;
