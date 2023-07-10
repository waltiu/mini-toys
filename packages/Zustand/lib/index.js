import createStore from "./vanilla";
import { useStore as useStoreVue } from "./vue";
import { useStore as useStoreReact } from "./react";

let useStoreMethod = useStoreReact;
export const init = (type) => {
  if (type === "vue") {
    useStoreMethod = useStoreVue;
  }
};

export const create = (fn) => {
  const api = createStore(fn);
  const useBoundStore = (selector, equalityFn) =>
    useStoreMethod(api, selector || api.getState, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export default create;
