"use client"
import React, { useMemo } from 'react'
import { useTaskStore } from '@/app/stores/taskStore'
import { usePomodoroStore } from '@/app/stores/pomodoroStore'
import { useCountdownStore } from '@/app/stores/Timer'

export default function DashboardPage(){
  const getCompletedTasks = useTaskStore((s) => s.getCompletedTasks);
  const completedTasks = getCompletedTasks();


  const pomHistory = usePomodoroStore((s)=> s.pomodoroHistory);
  // call the selector to retrieve the numeric accumulated seconds
  const countdownSeconds = useCountdownStore((s) => s.getAccumulatedSeconds());

  const pomodoroMinutes = useMemo(
    () => pomHistory.reduce((sum, s) => sum + (s.duration || 0) / 60, 0),
    [pomHistory]
  );
  const countdownMinutes = Math.floor(countdownSeconds / 60);
  const totalMinutes = useMemo(
    () => pomodoroMinutes + countdownMinutes,
    [pomodoroMinutes, countdownMinutes]
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">FocusFlow Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-4 bg-white rounded shadow overflow-x-scroll">
          <h2 className="font-semibold">Completed Tasks ({completedTasks.length})</h2>
          <ul className="mt-2 text-sm space-y-1">
            {completedTasks.map(t => (
              <li key={t.id} className="text-gray-700">{t.text} {t.describtion ? "- " + t.describtion : null} </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Time Summary</h2>
          <p className="mt-2">Pomodoro minutes: <strong>{pomodoroMinutes }</strong></p>
          <p>Countdown minutes: <strong>{countdownMinutes }</strong></p>
          <p className="mt-2">Total minutes: <strong>{totalMinutes }</strong></p>
          
          <h3 className="mt-4 font-medium">Pomodoro History</h3>
          <ul className="mt-2 text-sm space-y-1">
            {pomHistory.map(p => (
              <li key={p.id} className="text-gray-700">
                {p.task} — {p.duration / 60} min — {new Date(p.completedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}