import create from "../../lib";
const useGlobalStore = create((set) => ({
  bears: 0,
  count: 100,
  increase: (by = 1) => set((state) => ({ bears: (state.bears || 0) + by })),
  addBees: (by) =>
    set((state) => {
      state.bees += by;
    }),
  reset: () =>
    set({
      count: 0,
      bears: 0,
    }),
  destroy: () => set({}, true),
  radomCount: () => set(() => ({ count: Math.random() })),
}));

export default useGlobalStore;
