"use client";
import { useState } from "react";

import { useCountdownStore } from "../stores/Timer";
import { useTicker } from "../hooks/useTicker";
import { Pause, Play, RotateCw } from "lucide-react";


export default function Countdown() {
  const { time, start, pause, reset, isRunning } = useCountdownStore();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isRotating, setIsRotating] = useState(false);
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
      <div className="flex gap-2 ">


        {
          /* single button that animates between Play and Pause */
        }
        <button
          className="relative px-4 py-2 rounded-3xl transition-colors duration-300 bg-blue-900 text-white flex items-center justify-center overflow-hidden w-36"
          onClick={() => (isRunning ? pause() : start(minutes * 60 + seconds))}
          aria-pressed={isRunning}
        >
          {/* Pause layer (visible when running) */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${isRunning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <Pause className="border-none fill-white text-white" />
            <span className="select-none">Pause</span>
          </span>

          {/* Play layer (visible when not running) */}
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${isRunning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <Play className="border-none fill-white text-white" />
            <span className="select-none">Start</span>
          </span>
        </button>
      <button
          className="px-2 py-2 bg-red-900 text-white rounded-full"
          onClick={() => {
            setIsRotating(true);
            reset();
            // stop the spin after animation ends
            setTimeout(() => setIsRotating(false), 600);
          }}
          aria-label="reset countdown"
        >
          <RotateCw className={isRotating ? 'spin-once' : ''} />
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>

  );
}
