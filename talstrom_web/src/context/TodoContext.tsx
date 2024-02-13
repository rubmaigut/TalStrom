import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ToDo, ToDoContextType } from '@/types/todo';

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== "undefined";

  const [activeTodos, setActiveTodos] = useState<ToDo[]>(() => {
    if (isBrowser) {
      const localActiveTodos = localStorage.getItem('activeTodos');
      return localActiveTodos ? JSON.parse(localActiveTodos) : [];
    }
    return [];
  });

  const [completedTodos, setCompletedTodos] = useState<ToDo[]>(() => {
    if (isBrowser) {
      const localCompletedTodos = localStorage.getItem('completedTodos');
      return localCompletedTodos ? JSON.parse(localCompletedTodos) : [];
    }
    return [];
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('activeTodos', JSON.stringify(activeTodos));
    }
  }, [activeTodos]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }
  }, [completedTodos]);

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
