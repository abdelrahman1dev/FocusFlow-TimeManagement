import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TaskState, Task } from './types';
import { usePomodoroStore } from './pomodoroStore';




export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: ( text: string, describtion: string,  priority: 'urgent' | 'normal' = 'normal') => {
        const newTask: Task = {
          id: Date.now().toString(),
          text: text.trim(),
          describtion: describtion.trim(),
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
        set((state) => {
          const removed = state.tasks.find((task) => task.id === id);
          const newTasks = state.tasks.filter((task) => task.id !== id);
          // If the removed task is the currently selected pomodoro task, clear it
          if (removed && usePomodoroStore.getState().selectedTask === removed.text) {
            usePomodoroStore.getState().setSelectedTask("");
          }
          return { tasks: newTasks };
        });
      },
      
      clearCompleted: () => {
        set((state) => {
          const completed = state.tasks.filter((task) => task.completed).map(t => t.text);
          // If the currently selected task is among the completed ones, clear it
          if (usePomodoroStore.getState().selectedTask && completed.includes(usePomodoroStore.getState().selectedTask)) {
            usePomodoroStore.getState().setSelectedTask("");
          }
          return { tasks: state.tasks.filter((task) => !task.completed) };
        });
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
