

// ToDos.tsx
"use client";
import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ToDoItem from './ToDoItem';
import { useTaskStore } from '../stores/taskStore';
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

function ToDos() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const [text, setText] = useState('');
  const [describtion, setDescribtion] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'normal'>('normal');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTask(text , describtion, priority  );
    setText('');
    setDescribtion('');
    setPriority('normal');
    
    // Close the dialog
    closeButtonRef.current?.click();
  };

  // Sort tasks: urgent first, then by creation date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority === 'urgent' && b.priority === 'normal') return -1;
    if (a.priority === 'normal' && b.priority === 'urgent') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-white flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-white hover:bg-gray-100 cursor-pointer text-black rounded-full p-2 transition-colors">
              <Plus size={20} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add A New Task</DialogTitle>
                <DialogDescription>
                  Create a new task and set its priority level.
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col gap-4 my-4">
                <div>
                  <Label htmlFor="task-input" className="text-sm font-medium">
                    Task Description
                  </Label>
                  <input 
                    id="task-input"
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-1" 
                    placeholder="Enter your task..." 
                    required
                  />
                  <textarea
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-1" 
                  placeholder='enter ur task description' name="" id="describtion-input" value={describtion} onChange={(e) => setDescribtion(e.target.value)} />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Priority Level
                  </Label>
                  <RadioGroup 
                    value={priority} 
                    onValueChange={(value) => setPriority(value as 'urgent' | 'normal')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" /> 
                      <Label htmlFor="urgent">🔥 Urgent - needs immediate attention</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">📅 Normal - during the day</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <DialogFooter className="flex gap-2">
                <DialogClose asChild>
                  <button 
                    ref={closeButtonRef}
                    type="button" 
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2 transition-colors"
                  disabled={!text.trim()}
                >
                  Add Task
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

  <div className="bg-gray-800 rounded-lg p-4">
        {sortedTasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No tasks yet. Add your first task above! 📝
          </p>
        ) : (
          <div className="">
            {sortedTasks.map(task => (
              <div key={task.id} className="w-full">
                <ToDoItem {...task} />
              </div>
            ))}
          </div>
        )}
        
        {tasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p className="text-gray-400 text-sm">
              Total: {tasks.length} tasks • 
              Completed: {tasks.filter(t => t.completed).length} • 
              Pending: {tasks.filter(t => !t.completed).length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDos;