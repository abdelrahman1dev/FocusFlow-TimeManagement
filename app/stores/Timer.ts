import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CountdownState {
  time: number;               // remaining time in seconds
  isRunning: boolean;
  start: (seconds: number) => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  accumulatedSeconds: number; // total seconds elapsed on the countdown timer
  getAccumulatedSeconds: () => number;
}

export const useCountdownStore = create<CountdownState>()(
  persist(
    (set, get) => ({
  time: 0,
  isRunning: false,
  accumulatedSeconds: 0,

      start: (seconds) =>
        set({ time: seconds, isRunning: true }),

      pause: () => set({ isRunning: false }),

      reset: () => set({ time: 0, isRunning: false }),

      tick: () => {
        if (!get().isRunning) return;
        set((state) => {
          if (state.time > 0) {
            return { time: state.time - 1, accumulatedSeconds: state.accumulatedSeconds + 1 };
          } else {
            return { isRunning: false };
          }
        });
      },

      getAccumulatedSeconds: () => get().accumulatedSeconds,
    }),
    {
      name: "countdown-storage", // key in localStorage
    }
  )
);
