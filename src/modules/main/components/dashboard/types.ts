export type Provider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  years: number;
  fee: string;
  tags: string[];
  available: string;
  initials: string;
};

export interface PrescriptionItem {
  frequency?: string;
  name?: string;
  id: string;
  medication: string;
  dosage: string;
  schedule: string;
  instructions: string;
  provider: string;
  prescribedDate: string;
  nextRefillDate: string;
  refillsLeft: number;
  status: "active" | "history";

  // history-specific fields
  startDate?: string;
  endDate?: string;
}
