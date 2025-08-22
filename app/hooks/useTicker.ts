// useTicker.ts
import { useEffect } from "react";
import { usePomodoroStore } from "../stores/pomodoroStore";
import { useCountdownStore } from "../stores/Timer";

export function useTicker() {
  const { tick: tickCountdown, isRunning: isCountdownRunning } = useCountdownStore();
  const { tick: tickPomodoro, isRunning: isPomodoroRunning } = usePomodoroStore();

  useEffect(() => {
    if (!isCountdownRunning && !isPomodoroRunning) return;

    const interval = setInterval(() => {
      if (isCountdownRunning) tickCountdown();
      if (isPomodoroRunning) tickPomodoro();
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountdownRunning, isPomodoroRunning, tickCountdown, tickPomodoro]);
}
