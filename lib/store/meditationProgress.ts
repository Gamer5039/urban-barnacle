import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserStore from './userStore';

interface MeditationProgress {
  completedDays: number[];
  unlockedDays: number[];
  lastSessionDate?: string;
}

interface UserProgress {
  [email: string]: MeditationProgress;
}

interface MeditationProgressStore {
  userProgress: UserProgress;
  getCurrentProgress: () => MeditationProgress | null;
  isDayUnlocked: (day: number) => boolean;
  isDayCompleted: (day: number) => boolean;
  markDayCompleted: (day: number) => void;
  unlockNextDay: (currentDay: number) => void;
  resetProgress: (email?: string) => void;
}

const initialProgress: MeditationProgress = {
  completedDays: [],
  unlockedDays: [1], // Day 1 is unlocked by default
  lastSessionDate: undefined,
};

export const useMeditationProgress = create<MeditationProgressStore>()(
  persist(
    (set, get) => ({
      userProgress: {},

      getCurrentProgress: () => {
        const currentUser = useUserStore.getState().currentUser;
        if (!currentUser?.email) return null;
        
        const progress = get().userProgress[currentUser.email];
        if (!progress) {
          // Initialize progress for new user
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              [currentUser.email]: initialProgress,
            },
          }));
          return initialProgress;
        }
        return progress;
      },

      isDayUnlocked: (day: number) => {
        const progress = get().getCurrentProgress();
        if (!progress) return day === 1; // Only first day is unlocked for guests
        return progress.unlockedDays.includes(day);
      },

      isDayCompleted: (day: number) => {
        const progress = get().getCurrentProgress();
        if (!progress) return false;
        return progress.completedDays.includes(day);
      },

      markDayCompleted: (day: number) => {
        const currentUser = useUserStore.getState().currentUser;
        if (!currentUser?.email) return;

        set((state) => {
          const userProgress = state.userProgress[currentUser.email] || initialProgress;
          const completedDays = userProgress.completedDays.includes(day)
            ? userProgress.completedDays
            : [...userProgress.completedDays, day];

          return {
            userProgress: {
              ...state.userProgress,
              [currentUser.email]: {
                ...userProgress,
                completedDays,
                lastSessionDate: new Date().toISOString(),
              },
            },
          };
        });
        // Automatically unlock next day when current day is completed
        get().unlockNextDay(day);
      },

      unlockNextDay: (currentDay: number) => {
        const currentUser = useUserStore.getState().currentUser;
        if (!currentUser?.email) return;

        set((state) => {
          const userProgress = state.userProgress[currentUser.email] || initialProgress;
          const nextDay = currentDay + 1;
          const unlockedDays = userProgress.unlockedDays.includes(nextDay)
            ? userProgress.unlockedDays
            : [...userProgress.unlockedDays, nextDay];

          return {
            userProgress: {
              ...state.userProgress,
              [currentUser.email]: {
                ...userProgress,
                unlockedDays,
              },
            },
          };
        });
      },

      resetProgress: (email?: string) => {
        const currentUser = useUserStore.getState().currentUser;
        const targetEmail = email || currentUser?.email;
        
        if (!targetEmail) return;

        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [targetEmail]: initialProgress,
          },
        }));
      },
    }),
    {
      name: 'meditation-progress',
    }
  )
);
