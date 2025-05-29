import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reloadColumns } from '../store/slices/columnsSlice';
import { RootState } from '../store/store';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns.columns);

  // При монтировании компонента — загружаем данные из localStorage

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);
  
  useEffect(() => {
    const savedColumns = localStorage.getItem('kanban-columns');
    if (savedColumns) {
      try {
        const parsed = JSON.parse(savedColumns);
        dispatch(reloadColumns({ columns: parsed }));
      } catch (e) {
        console.error('Ошибка парсинга данных из localStorage', e);
      }
    }
  },[dispatch])

  // При любом изменении колонок — сохраняем в localStorage

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);
}