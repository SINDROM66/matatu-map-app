import React from 'react';

const swahiliPhrases = [
  { label: 'To [Destination]?', phrase: 'Kwa [Mahali]?', example: 'e.g., Kwa Rongai?' },
  { label: 'How much?', phrase: 'Ngapi?' },
  { label: 'Stop here (when you want to alight)', phrase: 'Shuka hapa' },
  { label: 'Thank you', phrase: 'Asante' },
];

const matatuKeywords = [
  { number: '102', destination: 'Kayole' },
  { number: '107', destination: 'Westlands/Ruaka' },
  { number: '33', destination: 'Karen' },
  { number: '44', destination: 'Kasarani' },
  { number: '14', destination: 'Donholm' },
  { number: '100', destination: 'Thika' },
  { number: '70', destination: 'Kawangware' },
  { number: '19C', destination: 'Pangani' },
];

const usageNotes = [
  'Enable location for accurate stages',
  'Fares are estimates and may vary based on time/distance',
];

const ReferenceTools: React.FC = () => (
  <div className="w-full max-w-2xl mx-auto mt-8 space-y-6">
    {/* Language Assistance Card */}
    <div className="bg-white rounded-lg shadow p-6 border">
      <h3 className="font-bold text-lg mb-2">Language Assistance</h3>
      <div className="text-gray-700 mb-2">Helpful Swahili phrases for Matatu travel:</div>
      <ul className="list-disc pl-5 space-y-1">
        {swahiliPhrases.map((item, idx) => (
          <li key={idx}>
            <span className="font-semibold">{item.label}</span> - {item.phrase}
            {item.example && <span className="text-gray-500"> ({item.example})</span>}
          </li>
        ))}
      </ul>
    </div>

    {/* Matatu-Destination Keywords */}
    <div className="bg-white rounded-lg shadow p-6 border">
      <h3 className="font-bold text-lg mb-2">Matatu-Destination Keywords</h3>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
        {matatuKeywords.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <span className="font-bold text-green-700 mr-2">Matatu {item.number}</span>
            <span className="text-gray-700">→ {item.destination}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Usage Notes */}
    <div className="bg-white rounded-lg shadow p-6 border">
      <h3 className="font-bold text-lg mb-2">How to Use</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {usageNotes.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ReferenceTools;
