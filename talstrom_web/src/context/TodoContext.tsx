import { ToDo, ToDoContextType } from '@/types/todo';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [activeTodos, setActiveTodos] = useState<ToDo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  const addTodo = (task: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      task,
      completed: false,
      date: new Date().toISOString(),
    };
    setActiveTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setActiveTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter(todo => {
        if (todo.id === id) {
          setCompletedTodos((completed) => [...completed, { ...todo, completed: true }]);
          return false;
        }
        return true;
      });
      return updatedTodos;
    });
  };

  const clearCompleted = () => {
    setCompletedTodos([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        clearCompleted();
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <ToDoContext.Provider value={{ activeTodos, completedTodos, addTodo, toggleTodo, clearCompleted }}>
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