import type { StateCreator } from "../vanilla";

type Log = <T>(createState: StateCreator<T>) => StateCreator<T>;

export const log: Log = (createState) => (set, get, store) => {

  store.setState = (updater, replace, ...a) => {
    const nextState = updater;
    console.log("log", updater);
    return set(nextState as any, replace, ...a);
  };

  return createState(store.setState, get, store);
};
