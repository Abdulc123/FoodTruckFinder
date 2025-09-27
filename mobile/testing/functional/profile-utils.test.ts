import { addPoints, calcStreak, awardBadges } from '../../utils.profile';
import type { UserProfile } from '../../types.user';

const base: UserProfile = {
  id:'u', displayName:'Eva', points:0, currentStreakDays:0, badges:[],
  visitedTruckIds:[], preferences:{ halalOnly:false, spiceLevel:1, likedCuisines:[], notifications:{deals:true,newTrucks:true,orderReady:true}},
  createdAt:'2024-01-01', updatedAt:'2024-01-01'
};

test('addPoints floors at 0', () => {
  expect(addPoints(base, -5).points).toBe(0);
  expect(addPoints(base, 10).points).toBe(10);
});

test('calcStreak basic cases', () => {
  const today = new Date().toISOString();
  const yesterday = new Date(Date.now()-86400000).toISOString();
  expect(calcStreak(undefined)).toBe(0);
  expect(calcStreak(today)).toBe(1);
  expect(calcStreak(yesterday)).toBe(2);
});

test('awardBadges grants first visit + halal', () => {
  const v = { ...base, visitedTruckIds:['t1'] };
  expect(awardBadges(v).badges).toContain('first-bite');
  const h = { ...v, preferences:{...v.preferences, halalOnly:true} };
  const b = awardBadges(h).badges;
  expect(b).toContain('first-bite'); expect(b).toContain('halal-helper');
});
