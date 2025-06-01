import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reloadColumns } from '../store/slices/columnsSlice';
import { RootState } from '../store/store';
import { Column, RootKanbanState } from '@/types/types';
import { useCurrentBoardData } from './useCurrentBoardData';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const { columns, activeBoardId } = useCurrentBoardData();

  const isInitialLoad = useRef(true);

  // Загружаем состояние для активной доски из localStorage при монтировании
  useEffect(() => {
    if (!activeBoardId) return;

    const savedData = localStorage.getItem('kanban-boards');
    if (!savedData) return;

    try {
      const boardsFromStorage: Record<string, { columns: Column[] }> = JSON.parse(savedData);

      if (boardsFromStorage[activeBoardId]) {
        dispatch(reloadColumns({ columns: boardsFromStorage[activeBoardId].columns }));
      }
    } catch (e) {
      console.error('Ошибка парсинга данных из localStorage', e);
    }
  }, [dispatch, activeBoardId]);

  // Сохраняем колонки текущей доски в localStorage при их изменении
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (!activeBoardId) return;

    try {
      const existingDataRaw = localStorage.getItem('kanban-boards') || '{}';
      const existingData: Record<string, { columns: Column[] }> = JSON.parse(existingDataRaw);

      const updatedData = {
        ...existingData,
        [activeBoardId]: { columns },
      };

      localStorage.setItem('kanban-boards', JSON.stringify(updatedData));
    } catch (e) {
      console.error('Ошибка сохранения данных в localStorage', e);
    }
  }, [columns, activeBoardId]);
};