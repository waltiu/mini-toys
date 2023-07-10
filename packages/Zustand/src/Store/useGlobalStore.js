import create from "../../lib";


const useGlobalStore = create((set) => ({
  bears: 0,
  count: 100,
  increase: (by = 1) => set((state) => ({ bears: state.bears + by })),
  decrease: (by = 1) =>
    set((state) => {
      state.bears -= by;
    }),
  reset: () => set({ bears: 0 }),

  increaseCount: () => set((state) => ({ count: state.count + 1 })),
}));

export default useGlobalStore;
