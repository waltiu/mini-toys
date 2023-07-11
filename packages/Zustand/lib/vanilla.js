const createStore = (fn) => {
  let state = {};

  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    console.log(nextState,'nextstate',state,partial)
    const previousState=state
    state =
      replace ?? typeof nextState !== "object"
        ? nextState
        : Object.assign({}, state, nextState);
        console.log(previousState,'compare',state)
    listeners.forEach((listener) => {
      listener(state,previousState);
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
