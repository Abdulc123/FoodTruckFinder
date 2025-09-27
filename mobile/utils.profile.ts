import type { UserProfile, BadgeId } from './types.user';

export const addPoints = (p: UserProfile, d: number): UserProfile => ({
  ...p, points: Math.max(0, p.points + d), updatedAt: new Date().toISOString(),
});

export const calcStreak = (lastISO?: string): number => {
  if (!lastISO) return 0;
  const today = new Date(); today.setHours(0,0,0,0);
  const last = new Date(lastISO); last.setHours(0,0,0,0);
  const diff = (today.getTime() - last.getTime()) / 86400000;
  return diff === 0 ? 1 : diff === 1 ? 2 : 0;
};

export const awardBadges = (p: UserProfile): UserProfile => {
  const earned: BadgeId[] = [];
  if (p.visitedTruckIds.length >= 1 && !p.badges.includes('first-bite')) earned.push('first-bite');
  if (p.preferences.halalOnly && !p.badges.includes('halal-helper')) earned.push('halal-helper');
  return earned.length ? { ...p, badges: [...p.badges, ...earned], updatedAt: new Date().toISOString() } : p;
};
