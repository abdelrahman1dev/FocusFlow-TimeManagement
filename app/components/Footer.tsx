import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">An online Pomodoro Timer to boost your productivity</h3>

        <p className="mb-4">What is FocusFlow?<br />
        FocusFlow is a customizable Pomodoro timer that works seamlessly on both desktop and mobile browsers. The goal of this app is to help you stay focused on any task — whether it’s studying, writing, coding, or deep work. FocusFlow is inspired by the Pomodoro Technique, a proven time management method developed by Francesco Cirillo.</p>

        <h4 className="font-medium mt-4">What is the Pomodoro Technique?</h4>
        <p className="mb-4">The Pomodoro Technique is a productivity method created by Francesco Cirillo to improve focus and efficiency. It uses a timer to break work into intervals, usually 25 minutes of focus followed by a short break. Each work interval is called a “pomodoro.”</p>

        <h4 className="font-medium mt-4">How to use the Pomodoro Timer</h4>
        <ol className="list-decimal list-inside mb-4 space-y-1">
          <li>Add your tasks for the day</li>
          <li>Set an estimate of pomodoros (1 = 25 min of work) for each task</li>
          <li>Select a task to work on</li>
          <li>Start the timer and focus until it rings</li>
          <li>Take a 5-minute break after each pomodoro</li>
          <li>Repeat 3–5 cycles, then take a longer break</li>
        </ol>

        <h4 className="font-medium mt-4">Basic Features</h4>
        <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-1">
          <li>Estimate Finish Time</li>
          <li>Task Templates</li>
          <li>Visual Reports</li>
          <li>Custom Settings</li>
        </ul>

        <h4 className="font-medium mt-4">Premium Features</h4>
        <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-1">
          <li>Project Tracking</li>
          <li>Yearly Reports</li>
          <li>Export Reports (CSV)</li>
          <li>Integrations (Todoist, Zapier, IFTTT)</li>
        </ul>

        <p className="text-sm text-gray-500 mt-6">© {new Date().getFullYear()} FocusFlow — distraction-free Pomodoro timer.</p>
        

        <div className="flex  items-center justify-between  mt-6 ">
            <p className="text-sm text-gray-500 ">developed by abdelrahman mohamed </p>
            <div className="flex items-center gap-3">
            <a href="https://github.com/abdelrahman1dev" target="_blank" rel="noopener noreferrer" className=""><Github /></a>
            <a href="https://www.instagram.com/abdelrahm1an_mohamed/" target="_blank" rel="noopener noreferrer" className=""><Instagram /></a>
            <a href="https://www.facebook.com/profile.php?id=100074812095203" target="_blank" rel="noopener noreferrer" className=""><Facebook /></a>
            <a href="https://www.linkedin.com/in/abdelrahman-mohamed-949978372/" target="_blank" rel="noopener noreferrer" className=""><Linkedin /></a>
            </div>
        </div>
      </div>
    </footer>
  );
}
