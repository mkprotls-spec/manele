
export interface Activity {
  time: string;
  title: string;
  description: string;
  estimatedCost: string;
  location: string;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  duration: number;
  startDate: string;
  totalBudgetEstimate: string;
  currency: string;
  itinerary: DayPlan[];
  hotelRecommendations: {
    name: string;
    description: string;
    pricePerNight: string;
    rating: string;
    link: string;
  }[];
  flightEstimates: {
    airline: string;
    route: string;
    priceRange: string;
  }[];
}

export interface SearchParams {
  destination: string;
  dates: string;
  travelers: number;
  budget: 'budget' | 'standard' | 'luxury';
}

export interface GroundingSource {
  title: string;
  uri: string;
}
