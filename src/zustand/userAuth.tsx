import { create } from "zustand";
import { Pet, AuthStore, AddressType } from "@/types/user.type";

const userAuthStore = create<AuthStore>((set) => ({
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
  userAddress: null,
  setUserAddress: (address: AddressType) => set({ userAddress: address }),
}));

export default userAuthStore;
