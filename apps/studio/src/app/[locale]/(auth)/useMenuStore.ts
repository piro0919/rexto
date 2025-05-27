import { create } from "zustand";

export type MenuState = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

const useMenuStore = create<MenuState>((set) => ({
  isOpen: true,
  toggleIsOpen: (): void => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;
