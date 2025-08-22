// Type definitions for Zustand stores

// Counter store types


export interface Task {
  id: string;
  text: string;
  describtion?: string;
  completed: boolean;
  priority: 'urgent' | 'normal';
  createdAt: Date;
}


type Mode = "focus" | "shortBreak" | "longBreak";


export interface PomodoroSession {
  id: string;
  mode: Mode;
  duration: number; // in minutes
  completedAt: Date;
}

export interface PomodoroState {
  selectedTask: string;
  mode: Mode;
  timeLeft: number; 
  isRunning: boolean;
  completedPomodoros: number;
  pomodoroHistory: PomodoroSession[];


  setSelectedTask: (task: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  newTimer: () => void;
  tick: () => void;
  switchMode: (mode: Mode) => void;
  completeSession: () => void;
}


export interface TaskState {
  tasks: Task[];
  addTask: (text: string, describtion: string, priority: 'urgent' | 'normal') => void;
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
