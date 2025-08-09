// Type definitions for Zustand stores

// Counter store types


// Task types
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Task store types
export interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearCompleted: () => void;
  getCompletedTasks: () => Task[];
  getPendingTasks: () => Task[];
}

// User types

// User store types


// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Combined app store type
export interface AppStore extends  TaskState, ThemeState {
  // Additional global methods can be added here
}
