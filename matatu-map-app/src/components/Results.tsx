import React from 'react';
import { MapPin, Bus, Clock } from 'lucide-react';

interface RouteStep {
  type: 'walk' | 'ride' | 'alight';
  text: string;
  matatuNumber?: string;
  timeEstimate?: string;
}

interface Stage {
  id: string;
  name: string;
  matatus: { number: string; destination: string; fare: string }[];
  isHub?: boolean;
  moreRoutes?: number;
}

interface ResultsProps {
  destination: string;
  routeSteps: RouteStep[];
  timeEstimate: string;
  stages: Stage[];
}

const iconForStep = (type: string) => {
  switch (type) {
    case 'walk':
      return <MapPin className="inline w-5 h-5 text-blue-500 mr-1" />;
    case 'ride':
      return <Bus className="inline w-5 h-5 text-green-600 mr-1" />;
    case 'alight':
      return <MapPin className="inline w-5 h-5 text-red-500 mr-1" />;
    default:
      return null;
  }
};

const Results: React.FC<ResultsProps> = ({ destination, routeSteps, timeEstimate, stages }) => (
  <div className="w-full max-w-2xl mx-auto mt-8">
    {/* Header */}
    <h2 className="text-2xl font-bold mb-4">Found 1 route(s) to {destination}</h2>

    {/* Route Details Card */}
    <div className="bg-white rounded-lg shadow p-6 mb-6 border">
      <h3 className="font-semibold text-lg mb-2">CBD to {destination}</h3>
      <ul className="space-y-2">
        {routeSteps.map((step, i) => (
          <li key={i} className="flex items-center text-gray-700">
            {iconForStep(step.type)}
            <span>
              {step.type === 'ride' && step.matatuNumber ? (
                <span>
                  Take Matatu No. <span className="font-bold text-green-700">{step.matatuNumber}</span>
                </span>
              ) : (
                step.text
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-4 text-gray-600">
        <Clock className="w-5 h-5 mr-1 text-gray-500" />
        <span className="font-medium">{timeEstimate}</span>
      </div>
    </div>

    {/* Nearby Stages Section */}
    <div className="mb-4">
      <h4 className="font-semibold text-lg mb-2">Nearest Matatu Stages</h4>
      <div className="grid gap-4 md:grid-cols-2">
        {stages.map(stage => (
          <div key={stage.id} className="bg-white border rounded-lg shadow p-4">
            <div className="flex items-center mb-1">
              <span className="font-bold text-gray-800 mr-2">{stage.name}</span>
              {stage.isHub && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Main transport hub</span>
              )}
            </div>
            <ul className="mb-1">
              {stage.matatus.map((m, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <Bus className="w-4 h-4 mr-1 text-green-600" />
                  <span className="font-bold text-green-700 mr-1">{m.number}</span>
                  <span className="mr-1">→ {m.destination}</span>
                  <span className="text-xs text-gray-500">{m.fare}</span>
                </li>
              ))}
            </ul>
            {stage.moreRoutes && (
              <div className="text-xs text-blue-500 font-medium">+{stage.moreRoutes} more routes available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Results;
