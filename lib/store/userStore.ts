import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultUsers } from '../data/defaultUsers';

interface User {
  email: string;
  isLoggedIn: boolean;
  progress?: {
    currentDay: number;
    completedDays: number[];
    lastSessionDate: string | null;
    streakCount: number;
  };
}

interface UserStore {
  currentUser: User | null;
  users: { 
    [email: string]: { 
      password: string;
      progress?: {
        currentDay: number;
        completedDays: number[];
        lastSessionDate: string | null;
        streakCount: number;
      };
    } 
  };
  registerUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  isAuthenticated: () => boolean;
  updateProgress: (progress: User['progress']) => Promise<void>;
  hydrate: () => void;
}

const updateUsersViaAPI = async (users: UserStore['users']) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update users');
    }
  } catch (error) {
    console.error('Error updating users:', error);
  }
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: defaultUsers,
      hydrate: () => {
        try {
          const storedData = localStorage.getItem('user-storage');
          if (storedData) {
            const { state } = JSON.parse(storedData);
            if (state?.currentUser?.email && state?.users?.[state.currentUser.email]) {
              set({ 
                currentUser: state.currentUser,
                users: state.users
              });
            }
          }
        } catch (error) {
          console.error('Error hydrating state:', error);
        }
      },
      registerUser: async (email: string, password: string) => {
        const state = get();
        if (state.users[email]) {
          return { success: false, error: 'Email already exists' };
        }
        
        const newUsers = {
          ...state.users,
          [email]: { 
            password,
            progress: {
              currentDay: 1,
              completedDays: [],
              lastSessionDate: null,
              streakCount: 0
            }
          }
        };
        
        await updateUsersViaAPI(newUsers);
        
        set({
          users: newUsers,
          currentUser: { 
            email, 
            isLoggedIn: true,
            progress: {
              currentDay: 1,
              completedDays: [],
              lastSessionDate: null,
              streakCount: 0
            }
          }
        });
        
        return { success: true };
      },
      loginUser: async (email: string, password: string) => {
        const state = get();
        const user = state.users[email];
        
        if (!user || user.password !== password) {
          return { success: false, error: 'Invalid credentials' };
        }
        
        set({ 
          currentUser: { 
            email, 
            isLoggedIn: true,
            progress: user.progress
          } 
        });
        return { success: true };
      },
      logoutUser: () => {
        set({ currentUser: null });
      },
      isAuthenticated: () => {
        const state = get();
        return state.currentUser !== null && state.currentUser.isLoggedIn;
      },
      updateProgress: async (progress) => {
        const state = get();
        if (!state.currentUser) return;

        const email = state.currentUser.email;
        const newUsers = {
          ...state.users,
          [email]: {
            ...state.users[email],
            progress
          }
        };
        
        await updateUsersViaAPI(newUsers);
        
        set({
          users: newUsers,
          currentUser: {
            ...state.currentUser,
            progress
          }
        });
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);

// Hydrate state when the store is created
if (typeof window !== 'undefined') {
  useUserStore.getState().hydrate();
}

export default useUserStore;
