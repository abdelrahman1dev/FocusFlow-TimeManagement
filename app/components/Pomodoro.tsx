"use client"
import {  useEffect , useState } from 'react'
import { useTicker } from '../hooks/useTicker'
import React from 'react'
import { CheckIcon, ChevronsUpDownIcon, Pause, Play, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTaskStore } from '../stores/taskStore';
import { usePomodoroStore } from '../stores/pomodoroStore'



function Pomodoro() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    timeLeft , 
    isRunning ,
    startTimer ,
    resetTimer ,
    pauseTimer,
    mode,
    completedPomodoros,
    selectedTask,
    newTimer,
    pomodoroHistory
    
    
  } = usePomodoroStore();

  // default durations (seconds) for modes, used to compute circular progress
  const DEFAULT_DURATIONS: Record<string, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [initialDuration, setInitialDuration] = useState<number>(DEFAULT_DURATIONS[mode] ?? 0);

  // keep initialDuration in sync when mode switches (so the ring represents the right full length)
  useEffect(() => {
    setInitialDuration(DEFAULT_DURATIONS[mode] ?? 0);
  }, [mode]);

  // compute progress (0..1) safely
  const circumference = 2 * Math.PI * 54;
  const rawProgress = initialDuration > 0 ? (initialDuration - Math.max(0, timeLeft)) / initialDuration : 0;
  const progress = Math.max(0, Math.min(1, rawProgress));

  // Sync combobox value with persisted selectedTask
  useEffect(() => {
    setValue(selectedTask || "");
  }, [selectedTask]);

    

  

  

  const tasks = useTaskStore((state) => state.tasks);
  const selectedTaskObj = tasks.find((task) => task.text === selectedTask);
  const description = selectedTaskObj?.describtion || "";

  // If the selectedTask was deleted from the tasks list, clear it from the pomodoro store.
  useEffect(() => {
    if (selectedTask && !tasks.find((t) => t.text === selectedTask)) {
      usePomodoroStore.getState().setSelectedTask("");
      setValue("");
    }
  }, [tasks, selectedTask]);



 useTicker();

  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    console.log(pomodoroHistory)
  },[pomodoroHistory])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
  <div className="w-lg mx-auto p-4 my-6">
  <div className="text-white">
    <h1 className="text-2xl font-bold capitalize  flex flex-col  justify-between items-start mb-6">pomodoro timer</h1>
    <div className="bg-gray-800 rounded-lg p-4">

      <div className='text-center'>
        {selectedTask.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold">Current Task</h1>
            <div className=' w-30 mx-auto overflow-x-hidden '>
              <span className="text-gray-400 ">{selectedTask + ' '} 
              {description && <span  className=' '>- {description}</span>}
              </span>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold">no selected tasks!</h2>
        )}
        <h2 className="text-2xl font-bold">{mode.toUpperCase()}</h2>

  <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-3">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" aria-hidden>
            <g transform="translate(60,60)">
              <circle r="54" fill="transparent" stroke="#2d3748" strokeWidth="12" />
              <circle
                r="54"
                fill="transparent"
                stroke="#fb923c"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={String(circumference)}
                strokeDashoffset={String((1 - progress) * circumference)}
                transform="rotate(-90)"
              />
            </g>
          </svg>

          <h1 className="text-2xl font-bold z-10">{minutes}:{seconds.toString().padStart(2, "0")}</h1>
        </div>
        <p className="text-gray-400">Time Left: {Math.floor(timeLeft / 60)} mins</p>
        <div>
          <div className='flex flex-col space-x-3 justify-center mt-4 items-center'>
   <div className='flex flex-row gap-3'>
             <button
              className="relative px-4 py-2 rounded-3xl transition-colors duration-300 bg-blue-900 text-white flex items-center justify-center overflow-hidden w-36"
              onClick={() => (isRunning ? pauseTimer() : startTimer())}
              aria-pressed={isRunning}
            >
              <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${isRunning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <Pause className="border-none fill-white text-white" />
                <span className="select-none">Pause</span>
              </span>

              <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${isRunning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <Play className="border-none fill-white text-white" />
                <span className="select-none">Start</span>
              </span>
            </button>

            <button
              className="px-2 py-2 bg-red-900 text-white rounded-full"
              onClick={() => {
                setIsRotating(true);
                resetTimer();
                setTimeout(() => setIsRotating(false), 600);
              }}
              aria-label="reset pomodoro"
            >
              <RotateCw className={isRotating ? "spin-once" : ""} />
            </button>
   </div>

            <button disabled={mode === 'focus' && completedPomodoros === 0 ? true : false} className="bg-[#FFA500] disabled:opacity-50 disabled:bg-gray-500 transition-all text-white rounded-lg px-4 py-2 mt-2" onClick={newTimer}>Start new</button>
          </div>
        </div>
         <p className='my-3 font-thin '>finished pomodoros : {completedPomodoros}</p>
            <div className="my-4">
        
           {
            tasks.length > 0 && tasks.filter(t => !t.completed).length > 0 ? 
             <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-grey-300"
        >
          {value 
            ? tasks.find((task) => task.text === value)?.text
            : "Select task..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
       
          <CommandList>
            
            <CommandGroup>





              
                {tasks.filter(t => !t.completed).map((task) => (
                <CommandItem
                  key={task.id}
                  value={task.text}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    // Persist selected task to pomodoro store
                    usePomodoroStore.getState().setSelectedTask(currentValue);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTask === task.text ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {task.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover> : null
           }
    </div>

      </div>

    </div>
  </div>
  </div>
  )
}

export default Pomodoro
