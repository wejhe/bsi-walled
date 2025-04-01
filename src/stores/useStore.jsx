import { create } from "zustand";

const useStore = create((set) => ({
  emailInputValue: "",
  setEmailInputValue: (value) => set({ emailInputValue: value }),
}));

export default useStore;
