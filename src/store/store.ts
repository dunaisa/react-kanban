import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './slices/columnsSlice';

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
  },
});

// Типизация для всего состояния
export type RootState = ReturnType<typeof store.getState>;
// Типизация для dispatch
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();