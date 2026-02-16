
export interface ScanningEngine {
  name: string;
  result: string;
  details: string;
  icon?: string;
}

export interface AnalysisData {
  url: string;
  ip: string;
  reverseDns: string;
  asn: string;
  domainAge: string;
  registrationDate: string;
  lastAnalysis: string;
  location: {
    city: string;
    country: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  security: {
    score: number; // 0-100, where 100 is perfectly safe
    status: 'Safe' | 'Warning' | 'Malicious';
    vendorsFlagged: number;
    totalVendors: number;
    summary: string;
    engines: ScanningEngine[];
  };
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
