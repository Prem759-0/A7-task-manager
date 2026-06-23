import { User } from "../types/user";
import { showToast } from "./showToast";

export const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const awardGamification = (
  user: User,
  taskWasCompleted: boolean,
  count: number = 1,
  updatedTasks?: typeof user.tasks,
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

  // Check for achievements
  const tempUser = { ...user, xp: newXp, streak: newStreak, tasks: updatedTasks || user.tasks };
  const newlyUnlocked = checkAchievements(tempUser);
  const updatedUnlockedAchievements = [...(user.unlockedAchievements || []), ...newlyUnlocked];

  return {
    xp: newXp,
    streak: newStreak,
    lastActiveDate: now,
    unlockedAchievements: updatedUnlockedAchievements,
  };
};

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  checkUnlocked: (user: User) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_blood",
    name: "First Blood",
    description: "Complete your very first task.",
    emoji: "🔥",
    color: "#ff2f2f", // Red
    checkUnlocked: (user) => user.tasks.filter((t) => t.done).length >= 1,
  },
  {
    id: "task_destroyer",
    name: "Task Destroyer",
    description: "Complete 10 tasks.",
    emoji: "💣",
    color: "#ff9518", // Orange
    checkUnlocked: (user) => user.tasks.filter((t) => t.done).length >= 10,
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    description: "Maintain a 3-day streak.",
    emoji: "⚡",
    color: "#ffea28", // Yellow
    checkUnlocked: (user) => (user.streak || 0) >= 3,
  },
  {
    id: "level_boss",
    name: "Level Boss",
    description: "Reach Level 5.",
    emoji: "👑",
    color: "#a445ff", // Purple
    checkUnlocked: (user) => calculateLevel(user.xp || 0) >= 5,
  },
  {
    id: "organization_freak",
    name: "Organization Freak",
    description: "Create 3 custom categories.",
    emoji: "📂",
    color: "#3ae836", // Green
    checkUnlocked: (user) => user.categories.length >= 3,
  },
];

export const checkAchievements = (user: User): string[] => {
  const newlyUnlocked: string[] = [];
  const currentlyUnlocked = user.unlockedAchievements || [];

  for (const achievement of ACHIEVEMENTS) {
    if (!currentlyUnlocked.includes(achievement.id) && achievement.checkUnlocked(user)) {
      newlyUnlocked.push(achievement.id);
      showToast(`POW! Achievement Unlocked: ${achievement.name} ${achievement.emoji}`, {
        type: "success",
      });
    }
  }

  return newlyUnlocked;
};
