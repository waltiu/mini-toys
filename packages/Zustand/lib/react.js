import { useRef, useMemo, useEffect, useReducer } from "react";
import createStore from "./vanilla";

export const useStore = (api, selector, equalityFn) => {
  const { subscribe, getState } = api;
  const state = getState();
  console.log(state,'state')
  console.log(selector,'selector')

  const value = useRef(useMemo(() => selector(state), []));
  const [, forceUpdate] = useReducer((s) => s + 1, 0);
  const listener = (newState) => {
    const newValue = selector(newState);
    if (equalityFn !== undefined) {
      if (!equalityFn(value.current, newValue)) value.current = newValue;
    } else if (value.current !== newValue) {
      value.current = newValue;
      forceUpdate();
    }
  };
  useEffect(() => {
    return subscribe(listener);
  }, []);
  console.log(value.current,'current')
  return value.current;
};

const create = (fn) => {
  const api = createStore(fn);
  const useBoundStore = (selector, equalityFn) =>
    useStore(api, selector||api.getState, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export default create;
