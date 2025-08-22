import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Mode = "focus" | "shortBreak" | "longBreak";

import { PomodoroSession , PomodoroState } from "./types";
import { stat } from "fs";

const DURATIONS = {
  focus: 5,
  shortBreak: 3,
  longBreak: 2,
};






export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      mode: "focus",
      timeLeft: DURATIONS.focus,
      selectedTask: "",
      isRunning: false,
      completedPomodoros: 0,
      pomodoroHistory: [],
      
     
      startTimer: () => set({ isRunning: true ,}),
      pauseTimer: () => set({ isRunning: false }),

      resetTimer: () =>
        set((state) => ({ timeLeft: DURATIONS[state.mode], isRunning: false })),

      setSelectedTask: (task: string) => set({ selectedTask: task }),
       newTimer: () => set({    mode: "focus",
      timeLeft: DURATIONS.focus,
      selectedTask: "",
      isRunning: false,
      completedPomodoros: 0,}),
      tick: () => {
        const { timeLeft, isRunning } = get();
        if (!isRunning) return;
        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
        } else {
          get().completeSession();
        }
      },

      switchMode: (mode: Mode) => {
        set({ mode, timeLeft: DURATIONS[mode], isRunning: false });
      },

      completeSession: () => {
        const { mode, completedPomodoros } = get();

        // Save history
        const session: PomodoroSession = {
          id: crypto.randomUUID(),
          mode,
          duration: DURATIONS[mode] / 60,
          completedAt: new Date(),
        };

        set((state) => ({
          pomodoroHistory: [...state.pomodoroHistory, session],
          isRunning: false,
        }));

        if (mode === "focus") {
          const newCount = completedPomodoros + 1;
          set({ completedPomodoros: newCount });

          if (newCount % 4 === 0) {
            get().switchMode("longBreak");
          } else {
            get().switchMode("shortBreak");
          }
        } else {
          get().switchMode("focus");
        }
      },
    }),
    {
      name: "pomodoro-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
