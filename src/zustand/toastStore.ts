import { ToastType } from "@/components/UI/Toast/types";
import { create } from "zustand";

interface ToastStore {
  toast: ToastType | null;
  addToast: (toast: ToastType) => void;
  removeToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  addToast: (toast: ToastType) => {
    set({ toast });
  },

  removeToast: () => {
    set({ toast: null });
  },
}));
