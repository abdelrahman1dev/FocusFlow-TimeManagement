import { useEffect } from "react";
import { useCountdownStore } from "../stores/Timer";

export function useCountdown() {
  const { tick, isRunning } = useCountdownStore();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);
}

