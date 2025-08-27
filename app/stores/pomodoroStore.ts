import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Mode = "focus" | "shortBreak" | "longBreak";

import { PomodoroSession, PomodoroState } from "./types";

const DURATIONS = {
  focus: 1 * 60,
  shortBreak: 1 * 60,
  longBreak: 1 * 60,
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

      startTimer: () => set({ isRunning: true }),
      pauseTimer: () => set({ isRunning: false }),

      resetTimer: () =>
        set((state) => ({
          timeLeft: DURATIONS[state.mode],
          isRunning: false,
        })),

      setSelectedTask: (task: string) => set({ selectedTask: task }),

      newTimer: () =>
        set({
          mode: "focus",
          timeLeft: DURATIONS.focus,
          isRunning: false,
          completedPomodoros: 0,
        }),

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

        // Play a short beep on completion
        try {
          if (typeof window !== "undefined") {
            const wnd = window as unknown as {
              AudioContext?: typeof AudioContext;
              webkitAudioContext?: typeof AudioContext;
            };
            const AudioCtx = wnd.AudioContext ?? wnd.webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.type = "sine" as OscillatorType;
              o.frequency.value = mode === "focus" ? 1000 : 600;
              o.connect(g);
              g.connect(ctx.destination);
              g.gain.setValueAtTime(0, ctx.currentTime);
              o.start();
              g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
              setTimeout(() => {
                g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
                o.stop();
                try {
                  ctx.close();
                } catch {}
              }, 350);
            }
          }
        } catch {
          // ignore audio errors
        }

        // Send a desktop notification if available/allowed
        try {
          if (typeof window !== "undefined" && "Notification" in window) {
            const send = () => {
              const title =
                mode === "focus" ? "Pomodoro complete" : "Break complete";
              const body =
                mode === "focus"
                  ? "Time for a break — you've earned it."
                  : "Break over — back to work.";
              try {
                new Notification(title, { body });
              } catch {
                // some browsers require service worker or additional options; ignore
              }
            };

            if (Notification.permission === "granted") {
              send();
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then((perm) => {
                if (perm === "granted") send();
              });
            }
          }
        } catch {
          // ignore notification errors
        }

        // Save history
        const session: PomodoroSession = {
          id: crypto.randomUUID(),
          mode,
          duration: DURATIONS[mode], // ✅ minutes
          completedAt: new Date(),
          task: get().selectedTask || "", // ✅ save task
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

      getTaskStats: () => {
        const history = get().pomodoroHistory;
        const stats: Record<string, number> = {};
        history.forEach((session) => {
          if (session.task) {
            stats[session.task] = (stats[session.task] || 0) + 1;
          }
        });
        return stats;
      },
    }),
    {
      name: "pomodoro-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
