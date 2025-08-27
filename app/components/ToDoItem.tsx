import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../stores/types';

function ToDoItem({ id, text, completed, priority, describtion }: Task) {
 const toggleTask = useTaskStore((state) => state.toggleTask);
const removeTask = useTaskStore((state) => state.removeTask);

  return (
    <article className="bg-gray-900 rounded-md p-3 border border-gray-700 flex flex-col h-full">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTask(id)}
            className="w-5 h-5"
          />
          <div className="min-w-0 w-30">
            <h3 className={`font-medium truncate ${completed ? 'line-through text-gray-400' : 'text-white'}`}>{text}</h3>
            <p className="text-xs text-gray-400  overflow-x-hidden truncate">{describtion}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {priority === 'urgent' && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
          )}
          <button
            onClick={() => removeTask(id)}
            className="text-red-500 hover:text-red-400 px-2 py-1 rounded"
            aria-label={`Delete ${text}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ToDoItem