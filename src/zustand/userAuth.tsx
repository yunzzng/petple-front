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
  userNickName?: String | null;
  setUserNickName?: (nickName: string) => void;
  userImage?: String | null;
  setUserImage?: (image: string) => void;
};

const userAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          userEmail: null,
          userNickName: null,
          userImage: null,
        }),
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      userEmail: null,
      setUserEmail: (userEmail: string) => set({ userEmail: userEmail }),
      userNickName: null,
      setUserNickName: (nickName: string) => set({ userNickName: nickName }),
      userImage: null,
      setUserImage: (image: string) => set({ userImage: image }),
    }),
    {
      name: "userInfoStorage",
    }
  )
);

export default userAuthStore;
