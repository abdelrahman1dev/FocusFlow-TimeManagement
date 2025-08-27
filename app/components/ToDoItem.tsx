import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../stores/types';
import { Trash2, Edit2 } from 'lucide-react';

function ToDoItem({ id, text, completed, priority, describtion }: Task) {
 const toggleTask = useTaskStore((state) => state.toggleTask);
const removeTask = useTaskStore((state) => state.removeTask);

  return (
    <article className="bg-gray-900 rounded-md p-3 border border-gray-700 flex flex-col h-full w-full min-h-[84px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTask(id)}
            className="w-5 h-5"
          />
          <div className="min-w-0 w-30">
            <h3
              title={text}
              className={`font-medium text-sm md:text-base truncate ${completed ? 'line-through text-gray-400' : 'text-white'}`}
            >
              {text}
            </h3>
            <p
              title={describtion}
              className="text-xs md:text-sm text-gray-400 overflow-hidden truncate max-w-[28rem]"
            >
              {describtion}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {priority === 'urgent' && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
          )}
          <button
            onClick={() => {
              if (window.confirm(`Delete task: "${text}"?`)) removeTask(id);
            }}
            className="text-red-500 hover:text-red-400 px-2 py-1 rounded flex items-center"
            aria-label={`Delete ${text}`}
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
  
        </div>
      </div>
    </article>
  );
}

export default ToDoItem