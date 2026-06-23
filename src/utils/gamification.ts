import { User } from "../types/user";
import { showToast } from "./showToast";

export const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const awardGamification = (
  user: User,
  taskWasCompleted: boolean,
  count: number = 1,
): Partial<User> => {
  if (!taskWasCompleted) return {}; // If task was unmarked, maybe don't remove XP for now, or keep it simple.

  const newXp = (user.xp || 0) + 50 * count;
  let newStreak = user.streak || 0;
  const newLastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

  const now = new Date();

  // Calculate if the user was active yesterday or today
  if (newLastActive) {
    const lastActive = new Date(newLastActive);
    const msInDay = 24 * 60 * 60 * 1000;

    // Reset dates to midnight to only compare the actual days
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastActiveMidnight = new Date(
      lastActive.getFullYear(),
      lastActive.getMonth(),
      lastActive.getDate(),
    ).getTime();

    const diffDays = Math.round((todayMidnight - lastActiveMidnight) / msInDay);

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1; // Streak broken, reset to 1
    }
  } else {
    newStreak = 1; // First task ever
  }

  const oldLevel = calculateLevel(user.xp || 0);
  const newLevel = calculateLevel(newXp);

  if (newLevel > oldLevel) {
    showToast(`Level Up! You are now Level ${newLevel} 🎉`, { type: "success" });
  }

  return {
    xp: newXp,
    streak: newStreak,
    lastActiveDate: now,
  };
};
