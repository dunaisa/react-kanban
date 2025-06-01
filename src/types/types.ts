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

// DnD задач

export type TaskDragState = {
  taskId: number | null;
  // из какой колонки
  sourceColumnId: number | null;
  // индекс задачи в колонке
  sourceTaskIndex: number | null;
}

// Колонки в канбан

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

export type ColumnsState = {
  columns: Column[];
  newTasks: Record<number, string>;
  drag: TaskDragState;
};