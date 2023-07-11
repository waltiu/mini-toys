import { immer } from "zustand/middleware/immer";
import create from "toy-zustand";

const useGlobalStore = create(
  immer(
    (set, get) => ({
      bears: 0,
      count: 100,
      increase: (by = 1) =>
        set((state) => ({ bears: (state.bears || 0) + by })),
      reduce: (by) =>
        set((state) => {
          state.bears--;
        }),
      reset: () =>
        set({
          count: 0,
          bears: 0,
        }),
      destroy: () => set({}, true),
      radomCount: () => set(() => ({ count: Math.random() })),
    })
   
  )
);

export default useGlobalStore;
