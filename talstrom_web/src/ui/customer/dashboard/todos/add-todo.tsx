import React, { useState } from 'react';
import { useToDo } from '@/context/TodoContext';

const AddToDo: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [task, setTask] = useState<string>('');
  const { addTodo } = useToDo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(task);
    setTask('');
    setShowForm(false);
  };

  return (
    <div className="w-full flex flex-col items-end  ">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-6 rounded-sm bg-teal-500  text-white float-left"
      >
        {showForm ? '-' : '+'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className=" w-full mt-4 flex flex-col gap-2 items-center">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your to-do..."
            className="w-full border-2 p-2 rounded"
          />
          <button type="submit" className="max-w-32 bg-teal-500 text-white font-bold p-2 rounded-md">
            Add Task
          </button>
        </form>
      )}
    </div>
  );
};

export default AddToDo;