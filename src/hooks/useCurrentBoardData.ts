import { useSelector } from 'react-redux';
import { RootKanbanState } from '../types/types';

export const useCurrentBoardData = () => {
  const activeBoardId = useSelector((state: RootKanbanState) => state.columns.activeBoardId);
  const boards = useSelector((state: RootKanbanState) => state.columns.boards);
  const drag = useSelector((state: RootKanbanState) => state.columns.drag);

  const columns = activeBoardId ? boards[activeBoardId]?.columns || [] : [];

  return {
    columns,
    drag,
    activeBoardId,
  };
};