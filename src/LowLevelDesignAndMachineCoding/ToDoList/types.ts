export interface todo {
  id: number;
  task: string;
  completed: boolean;
  deleted: boolean;
};

export interface todoItem {
  todo: todo;
  deleteTodoItem: (id: number) => void;
  completeTodoItem: (id: number) => void;
  updateTodoItem: (id: number, task: string) => void;
};