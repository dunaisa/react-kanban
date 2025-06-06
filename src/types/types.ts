// Задачи в канбан

export type SubTask = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskComment = {
  id: number;
  userName: string;
  text: string;
  createdAt: string;
};

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  subTasks: SubTask[];
  comments: TaskComment[];
};

// DnD задач

export type TaskDragState = {
  taskId: number | null;
  // из какой колонки
  sourceColumnId: number | null;
  // индекс задачи в текущей колонке
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

// Сайдбар

export type Board = {
  id: string;
  title: string;
};

export type KanbanBoard = {
  columns: Column[];
};

export type BoardsState = {
  [x: string]: any;
  boards: Record<string, KanbanBoard>;
  activeBoardId: string | null;
  newTasks: Record<number, string>;
  drag: TaskDragState;
  openedTaskId: number | null;
};

export type RootKanbanState = {
  columns: BoardsState;
};

export type BoardLocalStorageData = {
  columns: Column[];
};