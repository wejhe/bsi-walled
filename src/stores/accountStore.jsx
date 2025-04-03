import { create } from "zustand";

const useAccountStore = create((set) => ({
  emailInputValue: "",
  setEmailInputValue: (value) => set({ emailInputValue: value }),
}));

export default useAccountStore;
