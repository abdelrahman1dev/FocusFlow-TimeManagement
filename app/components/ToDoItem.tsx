import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../stores/types';

function ToDoItem({ id, text, completed, priority, describtion }: Task) {
 const toggleTask = useTaskStore((state) => state.toggleTask);
const removeTask = useTaskStore((state) => state.removeTask);

  return (
    <li className="flex justify-between items-center gap-5 w-full p-2 border-b border-gray-600">
      <input 
        type="checkbox" 
        checked={completed}  
        onChange={() => toggleTask(id)}
        className="w-4 h-4"
      />
        <div>
        <span className={`flex-1 ${completed ? 'line-through text-gray-400' : 'text-white'}`}>
          {text}
        </span>

        <p>
          {describtion}
        </p>
        </div>
      {priority === 'urgent' && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
          Urgent
        </span>
      )}
      <button 
        onClick={() => removeTask(id)} 
        className="text-red-500 hover:text-red-400 ml-2 px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
}

export default ToDoItem