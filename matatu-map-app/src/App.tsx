import React from 'react';
import { Route, Link, Switch } from 'wouter';
import './App.css';
import Home from './components/Home';
import Results from './components/Results';
import Directory from './components/Directory';
import ReferenceTools from './components/ReferenceTools';

function App() {
  return (
    <div>
      {/* Simple Nav Bar */}
      <nav className="w-full flex justify-center gap-4 py-4 bg-white shadow mb-4">
        <Link href="/" className="font-bold text-green-700 hover:underline">Home</Link>
        <Link href="/results" className="font-bold text-green-700 hover:underline">Results</Link>
        <Link href="/directory" className="font-bold text-green-700 hover:underline">Directory</Link>
        <Link href="/reference" className="font-bold text-green-700 hover:underline">Reference & Tools</Link>
      </nav>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/results">
          <Results
            destination="Westlands"
            routeSteps={[
              { type: 'walk', text: 'Walk to Railways Stage' },
              { type: 'ride', text: '', matatuNumber: '107 or 34' },
              { type: 'alight', text: 'Alight at Westlands Roundabout' },
            ]}
            timeEstimate="20-30 min"
            stages={[
              {
                id: 'stage1',
                name: 'Total/Shell Petrol Station Stage',
                isHub: true,
                matatus: [
                  { number: '17B', destination: 'Komarocks', fare: 'Ksh 40-60' },
                  { number: '4W', destination: 'Jacaranda', fare: 'Ksh 30-50' },
                  { number: '19', destination: 'Pangani', fare: 'Ksh 30-50' },
                ],
                moreRoutes: 2,
              },
            ]}
          />
        </Route>
        <Route path="/directory">
          <Directory
            stage={{
              id: 'stage1',
              name: 'Total/Shell Petrol Station Stage',
              isHub: true,
              matatus: [
                { number: '17B', destination: 'Komarocks' },
                { number: '4W', destination: 'Jacaranda' },
                { number: '19', destination: 'Pangani' },
              ],
              moreRoutes: 2,
            }}
            quickDestinations={[]}
          />
        </Route>
        <Route path="/reference" component={ReferenceTools} />
      </Switch>
    </div>
  );
}

export default App;
