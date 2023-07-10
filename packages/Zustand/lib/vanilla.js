const createStore = (fn) => {
  let state = {};

  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    state =
      replace ?? typeof nextState !== "object"
        ? nextState
        : Object.assign({}, state, nextState);
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const subscribe = (fn) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };
  const destroy = () => {
    listeners.clear();
  };

  const getState = () => {
    return state;
  };

  const api = { setState, getState, subscribe, destroy };

  state = fn(setState, getState, api);

  return api;
};

export default createStore;
