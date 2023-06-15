import type { UnwrapRef } from 'vue'
import { getCurrentInstance, onScopeDispose, readonly, ref, toRefs } from 'vue'
import { toReactive } from '@vueuse/core'

import type {
  StoreApi,
} from './vanilla'
import { isPrimitive } from './util'

type ExtractState<S> = S extends { getState: () => infer T } ? T : never

export function useStore<S extends StoreApi<unknown>>(api: S): ExtractState<S>

export function useStore<S extends StoreApi<unknown>, U>(
  api: S,
  selector: (state: ExtractState<S>) => U,
  equalityFn?: (a: U, b: U) => boolean
): U

export function useStore<TState extends object, StateSlice>(
  api: StoreApi<TState>,
  selector: (state: TState) => StateSlice = api.getState as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean,
) {
  const initialValue = selector(api.getState())
  const state = ref(initialValue)

  const listener = (nextState: TState, previousState: TState) => {
    const prevStateSlice = selector(previousState)
    const nextStateSlice = selector(nextState)

    if (equalityFn !== undefined) {
      if (!equalityFn(prevStateSlice, nextStateSlice))
        state.value = nextStateSlice as UnwrapRef<StateSlice>
    }
    else {
      state.value = nextStateSlice as UnwrapRef<StateSlice>
    }
  }

  const unsubscribe = api.subscribe(listener)

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      unsubscribe()
    })
  }

  return isPrimitive(state.value) ? readonly(state) : toRefs(toReactive(state))
}

