import React from "react";
import { useToDo } from "@/context/TodoContext";
import ToDoItem from "@/ui/customer/dashboard/todos/todo-item";
import AddToDo from "./add-todo";

const ToDoList: React.FC = () => {
  const { activeTodos, completedTodos, clearCompleted } = useToDo();

  return (
    <div className="max-w-lg w-full mx-auto my-8 bg-gray-100 rounded-lg shadow p-4">
    <h2 className="text-2xl font-bold text-gray-600 mb-1">My to-dos</h2>
      <div className="w-full flex flex-col justify-start ">
        {activeTodos.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </div>
        <div className="w-full flex justify-center items-center">
          <AddToDo />
        </div>
    </div>
  );
};

export default ToDoList;
