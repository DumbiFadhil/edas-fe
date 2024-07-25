export interface Criterion {
  name: string;
  weight: number;
  type: 'benefit' | 'cost';
}

export interface Alternative {
  name: string;
  scores: Record<string, number>;
}

export interface Ranking {
  rank: number;  // Adjusted to match the Go model
  name: string;
  score: number;
}

// src/types.ts
export interface HistoryItem {
  uuid: string; // UUID is represented as a string in TypeScript
  edas_requests: EDASRequest[];
  edas_responses: EDASResponse[];
  rankings: Ranking[];
}

// Interface for an EDAS request
export interface EDASRequest {
  alternatives: Alternative[];
  criteria: Criterion[];
}

// Interface for the EDAS response
export interface EDASResponse {
  ranking: Ranking[];
}