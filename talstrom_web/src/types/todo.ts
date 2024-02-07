export interface ToDo {
    id: number;
    task: string;
    completed: boolean;
    date: string;
}
  
export interface ToDoContextType {
    todos: ToDo[];
    addTodo: (task: string) => void;
    toggleTodo: (id: number) => void;
    clearCompleted: () => void;
}