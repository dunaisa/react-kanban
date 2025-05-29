import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, ColumnsState } from '../../types/types';

const initialState: ColumnsState = {
  columns: [],
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
      };
      state.columns.push(newColumn)
    },
     // добавить название
    updateColumnTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>) => {
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
    }
  }
})

export const { addColumn, updateColumnTitle, removeColumn, reloadColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
