import { produce } from "immer";

export const immer = (createState) => (set, get, store) => {
  store.setState = (updater, replace, ...a) => {
    const nextState =
      typeof updater === "function" ? produce(updater) : updater;
    return set(nextState, replace, ...a);
  };

  return createState(store.setState, get, store);
};
