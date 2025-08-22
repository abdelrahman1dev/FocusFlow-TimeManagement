"use client";
import { useState } from "react";

import { useCountdownStore } from "../stores/Timer";
import { useTicker } from "../hooks/useTicker";


export default function Countdown() {
  const { time, start, pause, reset, isRunning } = useCountdownStore();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  useTicker();

  // Format time as mm:ss
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
      <div className="max-w-2xl mx-auto p-4">
  <div className="text-white">
    <h1 className="text-2xl font-bold capitalize  flex flex-col  justify-between items-start mb-6">Count Down</h1>
    <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col items-center gap-4 p-4 text-white">
      <h1 className="text-3xl font-bold">{formatTime(time)}</h1>

      {/* Input fields for minutes + seconds */}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          className="border rounded px-2 py-1 w-20 text-center"
          value={minutes}
          min={0}
          onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
        />
        <span>min</span>
        <input
          type="number"
          className="border rounded px-2 py-1 w-20 text-center"
          value={seconds}
          min={0}
          max={59}
          onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
        />
        <span>sec</span>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={() => start(minutes * 60 + seconds)}
        >
          Start
        </button>
        <button
          className="px-4 py-2 rounded bg-yellow-500 text-white"
          onClick={pause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>

  );
}
