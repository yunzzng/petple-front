import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  userEmail: string | null;
  setUserEmail: (userEmail: string) => void;
};

const userAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: null, userEmail: null }),
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      userEmail: null,
      setUserEmail: (userEmail: string) => set({ userEmail: userEmail }),
    }),
    {
      name: "userInfoStorage",
    }
  )
);

export default userAuthStore;
