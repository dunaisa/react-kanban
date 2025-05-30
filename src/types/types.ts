// Сайдбар

export type Board = {
  id: string;
  category: string;
};

// Задачи в канбан

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// Колонки в канбан

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

export type ColumnsState = {
  columns: Column[];
  newTasks: Record<number, string>;
};