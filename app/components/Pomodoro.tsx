"use client"
import {  useEffect , useState } from 'react'
import { useTicker } from '../hooks/useTicker'
import React from 'react'
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
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

  useEffect(() => {
    console.log(pomodoroHistory)
  },[pomodoroHistory])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
  <div className="max-w-2xl mx-auto p-4">
  <div className="text-white">
    <h1 className="text-2xl font-bold capitalize  flex flex-col  justify-between items-start mb-6">pomodoro timer</h1>
    <div className="bg-gray-800 rounded-lg p-4">

      <div className='text-center'>
        {selectedTask.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold">Current Task</h1>
            <div className='w-full '>
              <span className="text-gray-400">{selectedTask + ' '} 
              {description && <span>- {description}</span>}
              </span>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold">no selected tasks!</h2>
        )}
        <h2 className="text-2xl font-bold">{mode.toUpperCase()}</h2>

        <h1 className="text-2xl font-bold">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </h1>
        <p className="text-gray-400">Time Left: {Math.floor(timeLeft / 60)} mins</p>
        <div>
          <div className='flex space-x-2 justify-center mt-4'>
          {
          !isRunning ? <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2" onClick={startTimer}>Start</button> 
          : <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2" onClick={pauseTimer}>pause</button>
          }
          <button className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2" onClick={resetTimer}>Reset</button>
       
         </div>
          <button disabled={mode === 'focus' && completedPomodoros === 0 ? true : false} className="bg-[#FFA500] disabled:opacity-50 disabled:bg-gray-500 transition-all text-white rounded-lg px-4 py-2 mt-2" onClick={newTimer}>Start new</button>
         
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
