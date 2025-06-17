// Type declarations for geoUtils and matatuData

declare module 'geoUtils' {
  export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number;
}

type Matatu = {
  number: string;
  destination: string;
  type: string;
  fare: string;
};

type Stage = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  matatus: Matatu[];
};

type Route = {
  id: string;
  name: string;
  startStageId: string;
  endDestination: string;
  steps: string[];
};

type MatatuData = {
  stages: Stage[];
  routes: Route[];
};
