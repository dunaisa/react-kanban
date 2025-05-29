// Сайдбар

export type Board = {
  id: string;
  category: string;
};

// Колонки в канбан

export type Column = {
  id: number;
  title: string;
};

export type ColumnsState = {
  columns: Column[];
};