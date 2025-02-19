import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Pet, AuthStore } from "@/types/user.type";

const userAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      userEmail: null,
      setUserEmail: (userEmail: string) => set({ userEmail: userEmail }),
      userNickName: null,
      setUserNickName: (nickName: string) => set({ userNickName: nickName }),
      userImage: null,
      setUserImage: (image: string) => set({ userImage: image }),
      userPet: [],
      setUserPet: (pets: Pet[] | null) => set({ userPet: pets || [] }),
      petId: null,
    }),
    {
      name: "userInfoStorage",
    }
  )
);

export default userAuthStore;
