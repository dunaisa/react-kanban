import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, ColumnsState, Task } from '../../types/types';

const initialState: ColumnsState = {
  columns: [],
  newTasks: {},
}

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    // добавить колонку
    addColumn: (state, action: PayloadAction<{title: string}>) => {
      const newColumn: Column ={
        id: Date.now(),
        title: '',
        tasks: [],
      };
      state.columns.push(newColumn)
    },
     // обновить название колонки
    updateColumnTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
        const column = state.columns.find(col => col.id === action.payload.id);
        if (column) {
          column.title = action.payload.title;
        }
      },
    // удалить колонку
    removeColumn: (state, action: PayloadAction<{id : number}>) => {
      state.columns = state.columns.filter(col => col.id !== action.payload.id)
    },
    // сохранение колонок через localStorage
    reloadColumns: (state, action: PayloadAction<{columns: Column[]}>) => {
      state.columns = action.payload.columns;
    },
    
    // обновить название задачи
    updateNewTaskTitle: (state,action: PayloadAction<{ columnId: number; taskTitle: string }>) => {
      state.newTasks[action.payload.columnId] = action.payload.taskTitle;
    },
    // добавить задачу
    addTask: (state, action: PayloadAction<{columnId: number}>) => {
      const column = state.columns.find(col => col.id === action.payload.columnId);
      const title = state.newTasks[action.payload.columnId];

      if (column && title) {
        column.tasks.push({
          id: Date.now(),
          title,
        });
        // очистка поля ввода
        delete state.newTasks[action.payload.columnId];
      }
    },
  }
})

export const { addColumn, updateColumnTitle, removeColumn, reloadColumns, addTask } = columnsSlice.actions;

export default columnsSlice.reducer;
