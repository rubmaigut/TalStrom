export interface ToDo {
    id: number;
    task: string;
    completed: boolean;
    date: string;
}
  
export interface ToDoContextType {
    activeTodos: ToDo[]
    completedTodos: ToDo[];
    addTodo: (task: string) => void;
    toggleTodo: (id: number) => void;
    clearCompleted: () => void;
}