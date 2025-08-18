import { create } from 'zustand';
import { TaskState, Task } from './types';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (text: string, priority: 'urgent' | 'normal' = 'normal') => {
        const newTask: Task = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          priority,
          createdAt: new Date(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      
      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      
      removeTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },
      
      getCompletedTasks: () => {
        return get().tasks.filter((task) => task.completed);
      },
      
      getPendingTasks: () => {
        return get().tasks.filter((task) => !task.completed);
      },
    }),
    {
      name: 'task-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }), // only persist tasks
    }
  )
);
