import { create } from 'zustand';
import { TaskState, Task } from './types';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  
  addTask: (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
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
}));
