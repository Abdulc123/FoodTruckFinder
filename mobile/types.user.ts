export type BadgeId =
  | 'first-bite'
  | 'night-owl'
  | 'spice-master'
  | 'halal-helper'
  | 'loyal-local';

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  university?: 'Temple' | 'Drexel' | 'Other';
  avatarUrl?: string;
  points: number;
  currentStreakDays: number;
  badges: BadgeId[];
  visitedTruckIds: string[];
  preferences: {
    halalOnly: boolean;
    spiceLevel: 0 | 1 | 2 | 3;
    likedCuisines: string[];
    notifications: { deals: boolean; newTrucks: boolean; orderReady: boolean };
  };
  createdAt: string;
  updatedAt: string;
}
