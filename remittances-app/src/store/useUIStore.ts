import { create } from "zustand";

interface UIState {
  selectedIndex: number;
  expanded: boolean;
  drawerOpen: boolean;
  setSelectedIndex: (index: number) => void;
  toggleExpanded: () => void;
  toggleDrawer: () => void;
  navClick: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedIndex: 0,
  expanded: false,
  drawerOpen: false,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  toggleExpanded: () => set((s) => ({ expanded: !s.expanded })),
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  navClick: (index) =>
    set((s) => ({
      selectedIndex: index,
      expanded: index === 1 ? !s.expanded : false,
      drawerOpen: false,
    })),
}));
