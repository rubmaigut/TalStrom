import { ToDo, ToDoContextType } from '@/types/todo';
import React, { ReactNode, createContext, useContext, useState } from 'react';

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (task: string) => {
    const newTodo: ToDo = {
      id: Date.now(), 
      task,
      completed: false,
      date: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <ToDoContext.Provider value={{ todos, addTodo, toggleTodo, clearCompleted }}>
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error('useToDo must be used within a ToDoProvider');
  }
  return context;
};