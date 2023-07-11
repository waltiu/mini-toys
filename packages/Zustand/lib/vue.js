import { getCurrentInstance, onScopeDispose, readonly, ref, toRefs } from "vue";
import { toReactive } from "@vueuse/core";
import createStore from "./vanilla";

export const isPrimitive = (val) => {
  if (typeof val === "object") return val === null;

  return typeof val !== "function";
};

export const useStore = (api, selector, equalityFn) => {
  const initialValue = selector(api.getState());
  const state = ref(initialValue);

  const listener = (nextState, previousState) => {
    const prevStateSlice = selector(previousState);
    const nextStateSlice = selector(nextState);
    if (equalityFn !== undefined) {
      if (!equalityFn(prevStateSlice, nextStateSlice))
        state.value = nextStateSlice;
    } else {
      state.value = nextStateSlice;
    }
  };
  const unsubscribe = api.subscribe(listener);

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      unsubscribe();
    });
  }

  return isPrimitive(state.value) ? readonly(state) : toRefs(toReactive(state));
};

const create = (fn) => {
  const api = createStore(fn);
  const useBoundStore = (selector, equalityFn) =>
    useStore(api, selector || api.getState, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export default create;
