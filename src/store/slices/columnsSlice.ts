import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardsState, Column, ColumnsState } from '../../types/types';

// const initialState: ColumnsState = {
//   columns: [],
//   newTasks: {},
//   drag: {
//     taskId: null,
//     sourceColumnId: null,
//     sourceTaskIndex: null,
//   },
// }

const initialState: BoardsState = {
  boards: {},
  activeBoardId: null,
  newTasks: {},
  drag: {
    taskId: null,
    sourceColumnId: null,
    sourceTaskIndex: null,
  },
}

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    // установить дефолтно при открытии
    initializeDefaultBoard: (state) => {
      const defaultBoardId = 'electrotovary';
  
      // Если доска не существует — создаём её
      if (!state.boards[defaultBoardId]) {
        state.boards[defaultBoardId] = {
          columns: [],
        };
      }  
      // Делаем её активной
      state.activeBoardId = defaultBoardId;
      // if (!state.activeBoardId) {
      //   state.activeBoardId = defaultBoardId;
      // }
    },
    // выбрать категорию
    setActiveBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      state.activeBoardId = action.payload.boardId;
    },
    // проверка на существование доски в сторе
    checkAndCreateBoardIfNotExists: (state, action: PayloadAction<string>) => {
      const boardId = action.payload;
      if (!state.boards[boardId]) {
        state.boards[boardId] = {
          columns: [],
        };
      }
    },
    // добавить колонку
    addColumn: (state) => {
      const activeBoardId = state.activeBoardId;
      console.log(activeBoardId)
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];

      console.log(board)
      if (!board) return;

      const newColumn: Column ={
        id: Date.now(),
        title: '',
        tasks: [],
      };

      board.columns.push(newColumn);
    },
     // обновить название колонки
    updateColumnTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;
      
        const column = board?.columns.find(col => col.id === action.payload.id);
        if (column) {
          column.title = action.payload.title;
        }
      },
    // удалить колонку
    removeColumn: (state, action: PayloadAction<{id : number}>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;
      
      board.columns= board.columns.filter(col => col.id !== action.payload.id)
    },
    // сохранение колонок через localStorage
    reloadColumns: (state, action: PayloadAction<{columns: Column[]}>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;
      board.columns = action.payload.columns;
    },
    
    // добавить задачу
    addTask: (state, action: PayloadAction<{columnId: number}>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;

      const column = board.columns.find(col => col.id === action.payload.columnId);

      if (column) {
        column.tasks.push({
          id: Date.now(),
          title: '',
          completed: false,
        });
      }
    },
    // обновить название задачи
    updateNewTaskTitle: (state, action: PayloadAction<{ columnId: number; taskId: number; taskTitle: string }>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;

      const column = board.columns.find(col => col.id === action.payload.columnId);
      if (column) {
        const task = column.tasks.find(task => task.id === action.payload.taskId);
        if (task) {
          task.title = action.payload.taskTitle;
        }
      }
    },
    // завершить/возобновить задачу
    toggleTaskCompletion: (state, action: PayloadAction<{ columnId: number; taskId: number}>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;

      const column = board.columns.find(col => col.id === action.payload.columnId);
      if (column) {
        const task = column.tasks.find(task => task.id === action.payload.taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    // "взять" задачу для перетаскивания
    startTaskDrag: (state, action: PayloadAction<{ taskId: number; sourceColumnId: number; sourceTaskIndex: number}>) => {
      state.drag.taskId = action.payload.taskId;
      state.drag.sourceColumnId = action.payload.sourceColumnId;
      state.drag.sourceTaskIndex = action.payload.sourceTaskIndex;
    },
    // "бросить" задачу при перетаскивании
    stopTaskDrag: (state) => {
      state.drag.taskId = null;
      state.drag.sourceColumnId = null;
      state.drag.sourceTaskIndex = null;
    },
    // перемещение задачи в целевую колонку
    moveTaskBetweenColumns: (state, action: PayloadAction<{sourceColumnId: number; taskId: number; destinationColumnId: number; destinationIndex: number}>) => {
      const activeBoardId = state.activeBoardId;
      if (!activeBoardId) return;

      const board = state.boards[activeBoardId];
      if (!board) return;

      const { sourceColumnId, taskId, destinationColumnId, destinationIndex} = action.payload;

      const sourceColumn = board.columns.find((col) => col.id === sourceColumnId);
      const destColumn = board.columns.find((col) => col.id === destinationColumnId);

      if (!sourceColumn || !destColumn) return;

      const sourceIndex = sourceColumn.tasks.findIndex(t => t.id === taskId);
      if (sourceIndex === -1) return;

      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      destColumn.tasks.splice(destinationIndex, 0, movedTask);
    }
  }
})

export const { 
  addColumn,
  updateColumnTitle,
  removeColumn,
  reloadColumns,
  addTask,
  updateNewTaskTitle,
  toggleTaskCompletion,
  startTaskDrag,
  stopTaskDrag,
  moveTaskBetweenColumns,
  setActiveBoard,
  initializeDefaultBoard,
  checkAndCreateBoardIfNotExists

} = columnsSlice.actions;

export default columnsSlice.reducer;
