import create from "toy-zustand/react";
import { immer } from "toy-zustand/middleware/immer";

const useGlobalStore = create(
  immer((set, get) => ({
    bears: 10086,
    count: 100,
    increase: (by) => set((state) => ({ bears: (state.bears || 0) + by })),
    reSet: (data) => {
      set((state) => {
        state.bears = data;
      });
    },
    reset: () =>
      set({
        count: 0,
        bears: 0,
      }),
    destroy: () => set({}, true),
    radomCount: () => set(() => ({ count: Math.random() })),
  }))
);

export default useGlobalStore;
