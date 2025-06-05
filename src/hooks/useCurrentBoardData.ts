import { useSelector } from 'react-redux';
import { RootKanbanState } from '../types/types';

export const useCurrentBoardData = () => {
  const activeBoardId = useSelector((state: RootKanbanState) => state.columns.activeBoardId);
  const boards = useSelector((state: RootKanbanState) => state.columns.boards);
  const drag = useSelector((state: RootKanbanState) => state.columns.drag);
  const openedTaskId = useSelector((state: RootKanbanState) => state.columns.openedTaskId);

  const board = activeBoardId ? boards[activeBoardId] : null;
  const columns = activeBoardId ? boards[activeBoardId]?.columns || [] : [];

  let task = null;
  let columnId = null;

  if (board && openedTaskId) {
    for (const column of board.columns) {
      const foundTask = column.tasks.find(task => task.id === openedTaskId);
      if (foundTask) {
        task = foundTask;
        columnId = column.id;
        break;
      }
    }
  }

  return {
    columns,
    drag,
    activeBoardId,
    openedTaskId,
    task,
    columnId
  };
};