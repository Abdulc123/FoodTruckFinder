import { useEffect, useRef, useState } from 'react';
import type { UserProfile } from './types.user';
import { addPoints, awardBadges } from './utils.profile';

const KEY = 'ftf:user';

const defUser: UserProfile = {
  id: 'demo-user',
  displayName: 'Eva',
  university: 'Temple',
  points: 0,
  currentStreakDays: 0,
  badges: [],
  visitedTruckIds: [],
  preferences: {
    halalOnly: false,
    spiceLevel: 1,
    likedCuisines: [],
    notifications: { deals: true, newTrucks: true, orderReady: true },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const load = (): UserProfile => {
  try {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(KEY);
    const parsed: UserProfile = raw ? JSON.parse(raw) : defUser;
    // ✅ Ensure badges are granted based on current data at startup
    return awardBadges(parsed);
  } catch {
    return defUser;
  }
};

const save = (u: UserProfile) => {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(u));
  } catch {}
};

export function useProfile() {
  const [user, setUser] = useState<UserProfile>(load());
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    save(user);
  }, [user]);

  const updateName = (name: string) =>
    setUser(u => ({ ...u, displayName: name, updatedAt: new Date().toISOString() }));

  const toggleHalal = () =>
    setUser(u => 
      // ✅ Toggling halal can unlock halal-helper
      awardBadges({
        ...u,
        preferences: { ...u.preferences, halalOnly: !u.preferences.halalOnly },
        updatedAt: new Date().toISOString(),
      })
    );

  const setSpice = (lvl: 0|1|2|3) =>
    setUser(u => ({
      ...u,
      preferences: { ...u.preferences, spiceLevel: lvl },
      updatedAt: new Date().toISOString(),
    }));

  const likeCuisine = (c: string) =>
    setUser(u =>
      u.preferences.likedCuisines.includes(c)
        ? u
        : ({
            ...u,
            preferences: { ...u.preferences, likedCuisines: [...u.preferences.likedCuisines, c] },
            updatedAt: new Date().toISOString(),
          })
    );

  const visitTruck = (id: string) =>
    setUser(u =>
      // isitTruck still adds points + may grant irst-bite
      awardBadges(
        addPoints(
          { ...u, visitedTruckIds: [id, ...u.visitedTruckIds].slice(0, 25) },
          5
        )
      )
    );

  return { user, updateName, toggleHalal, setSpice, likeCuisine, visitTruck };
}
