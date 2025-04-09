import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: "",
  setAccessToken: (value) => set({ accessToken: value }),
}));

export default useAuthStore;