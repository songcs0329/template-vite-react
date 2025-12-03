import { create } from 'zustand';

export interface CounterState {
  count: number;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
}

export type CounterStore = CounterState & CounterActions;

const initialState: CounterState = {
  count: 0,
};

const createStore = () =>
  create<CounterStore>((set) => ({
    ...initialState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));

// SSR fallback that returns initial state
const mockUseStore = ((selector?: any) => {
  if (selector) {
    return selector(initialState);
  }
  return initialState;
}) as unknown as ReturnType<typeof createStore>;

const useCounterStore = typeof window !== 'undefined' ? createStore() : mockUseStore;

export default useCounterStore;
