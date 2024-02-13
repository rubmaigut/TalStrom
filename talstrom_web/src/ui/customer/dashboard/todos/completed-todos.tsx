import React from 'react';
import { useToDo } from '@/context/TodoContext';

const CompletedToDoList: React.FC = () => {
  const { completedTodos, clearCompleted } = useToDo();

  if (completedTodos.length === 0) {
    return null;
  }
  return (
    <div className="max-w-5xl w-full mx-auto my-8 bg-gray-100 rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold text-gray-600 mb-2">Completed Tasks</h2>
      <div className="bg-white rounded-lg shadow">
        {completedTodos.map((todo) => (
          <div key={todo.id} className="p-4 border-b last:border-b-0">
            <span className="line-through">{todo.task}</span>
          </div>
        ))}
        <button
          onClick={clearCompleted}
          className="bg-pink-500 text-white font-bold p-2 rounded m-4"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default CompletedToDoList;
