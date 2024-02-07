import React from "react";
import { ToDo } from "@/types/todo";
import { useToDo } from "@/context/TodoContext";

interface ToDoItemProps {
  todo: ToDo;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const { toggleTodo } = useToDo();

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="form-checkbox h-5 w-5 text-teal-600"
        />
        <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
          {todo.task}
        </span>
      </div>
    </div>
  );
};

export default ToDoItem;
