"use client";
import { useState } from "react";
import { useEffect } from "react";

import { useCountdownStore } from "../stores/Timer";
import { useTicker } from "../hooks/useTicker";
import { Pause, Play, RotateCw } from "lucide-react";


export default function Countdown() {
  const { time, start, pause, reset, isRunning } = useCountdownStore();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [initialDuration, setInitialDuration] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  useTicker();

  // Format time as mm:ss
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  // compute progress for circular ring (0..1)
  const progress = initialDuration > 0 ? (initialDuration - Math.max(0, time)) / initialDuration : 0;

  // reflect remaining time into the input controls when timer is not running
  useEffect(() => {
    if (!isRunning && initialDuration === 0) return;
    if (!isRunning && initialDuration > 0) {
      const mins = Math.floor(initialDuration / 60);
      const secs = initialDuration % 60;
      setMinutes(mins);
      setSeconds(secs);
    }
  }, [isRunning, initialDuration]);

  return (
      <div className=" w-fit mx-auto p-4">
  <div className="text-white">
    <h1 className="text-2xl font-bold capitalize  flex flex-col  justify-between items-start mb-6">Count Down</h1>
    <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col items-center gap-4 p-4 text-white">
      <div className="relative flex items-center justify-center w-40 h-40 mb-4">
        {/* Circular progress ring (fixed box so it doesn't overlap the inputs) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" aria-hidden>
          <g transform="translate(60,60)">
            <circle r="54" fill="transparent" stroke="#2d3748" strokeWidth="12" />
            <circle
              r="54"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={String(2 * Math.PI * 54)}
              strokeDashoffset={String((1 - progress) * 2 * Math.PI * 54)}
              transform="rotate(-90)"
            />
          </g>
        </svg>

  <h1 className="text-3xl font-bold z-10">{formatTime(time)}</h1>
      </div>
        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-700 rounded text-white"
                onClick={() => setMinutes((m) => Math.max(0, m - 1))}
                aria-label="decrease minutes"
              >
                -
              </button>
              <input
                type="number"
                className="border rounded px-2 py-1 w-20 text-center bg-gray-900 text-white"
                value={minutes}
                min={0}
                onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
              />
              <button
                className="px-2 py-1 bg-gray-700 rounded text-white"
                onClick={() => setMinutes((m) => m + 1)}
                aria-label="increase minutes"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400">min</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-700 rounded text-white"
                onClick={() => setSeconds((s) => Math.max(0, Math.min(59, s - 5)))}
                aria-label="decrease seconds"
              >
                -5
              </button>
              <input
                type="number"
                className="border rounded px-2 py-1 w-20 text-center bg-gray-900 text-white"
                value={seconds}
                min={0}
                max={59}
                onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
              />
              <button
                className="px-2 py-1 bg-gray-700 rounded text-white"
                onClick={() => setSeconds((s) => Math.min(59, s + 5))}
                aria-label="increase seconds"
              >
                +5
              </button>
            </div>
            <span className="text-xs text-gray-400">sec</span>
          </div>

          <div className="flex flex-col">
            <button
              className="px-3 py-1 bg-green-700 rounded text-white text-sm"
              onClick={() => {
                const dur = Math.max(0, minutes * 60 + seconds);
                if (dur > 0) setInitialDuration(dur);
              }}
            >
              Set
            </button>
            <span className="text-xs text-gray-400 text-center">configure</span>
          </div>
        </div>

      {/* Controls */}
      <div className="flex gap-2 ">


        {
          /* single button that animates between Play and Pause */
        }
        <button
          className="relative px-4 py-2 rounded-3xl transition-colors duration-300 bg-blue-900 text-white flex items-center justify-center overflow-hidden w-36"
          onClick={() => {
            if (isRunning) return pause();
            const requested = Math.max(0, minutes * 60 + seconds);
            const toStart = requested > 0 ? requested : initialDuration;
            if (toStart > 0) {
              setInitialDuration(toStart);
              start(toStart);
            }
          }}
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
            setInitialDuration(0);
            setTimeout(() => setIsRotating(false), 600);
          }}
          aria-label="reset countdown"
        >
          <RotateCw className={isRotating ? "spin-once" : ""} />
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>

  );
}
