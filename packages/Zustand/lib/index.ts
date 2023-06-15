/* eslint-disable react-hooks/rules-of-hooks */
import { useStore as useStoreReact } from "./react";
import { StateCreator, StoreApi, createStore } from "./vanilla";

import { useStore as useStoreVue } from "./vue";

type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

type ReadonlyStoreApi<T> = Pick<StoreApi<T>, "getState" | "subscribe">;

type WithReact<S extends ReadonlyStoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

export type UseBoundStore<S extends WithReact<ReadonlyStoreApi<unknown>>> = {
  (): ExtractState<S>;
  <U>(
    selector: (state: ExtractState<S>) => U,
    equals?: (a: U, b: U) => boolean
  ): U;
} & S;

type Create = {
  <T>(createState: StateCreator<T>): UseBoundStore<StoreApi<T>>;
  <T>(): (createState: StateCreator<T>) => UseBoundStore<StoreApi<T>>;
};

export const create = function <T>(
  createState: StateCreator<T>,
  isVue?: boolean
) {
  return createState ? createImpl(createState, isVue) : createImpl;
} as Create;

function createImpl(createState: StateCreator<T>, isVue?: boolean) {
  const api =
    typeof createState === "function" ? createStore(createState) : createState;

  const useBoundStore = (selector?: any, equalityFn?: any) =>
    isVue
      ? useStoreVue(api, selector, equalityFn)
      : useStoreReact(api, selector, equalityFn);

  Object.assign(useBoundStore, api);
  return useBoundStore;
}
