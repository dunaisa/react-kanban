// import { useState } from 'react';
import './App.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'
import MainLayout from '../MainLayout/MainLayout'
import { BOARD_CATEGORIES } from '../../data/boardsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { store, useAppDispatch, RootState } from '../../store/store';
import { 
  addColumn,
  updateColumnTitle,
  removeColumn,
  addTask,
  updateNewTaskTitle,
  toggleTaskCompletion,
  startTaskDrag,
  stopTaskDrag,
  moveTaskBetweenColumns,
  setActiveBoard,
  initializeDefaultBoard,
  checkAndCreateBoardIfNotExists

 } from '../../store/slices/columnsSlice';
// import { useSelector } from 'react-redux';
import { useCurrentBoardData } from '@/hooks/useCurrentBoardData';
import { useEffect } from 'react'

function App() {

  // const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  // const selectedBoard = boardsData.find(board => board.id === selectedBoardId) || null;

  useLocalStorage();

  const dispatch = useAppDispatch();
  // const columns = useSelector((state: RootState) => state.columns.columns);
  // const drag = useSelector((state: RootState) => state.columns.drag);
  // const activeBoardId = useSelector((state: any) => state.columns.activeBoardId);

  useEffect(() => {
    dispatch(initializeDefaultBoard());
  }, [dispatch]);

  const { columns, drag, activeBoardId } = useCurrentBoardData();

  const handleAddColumn = () => {
    dispatch(addColumn());
  };

  const handleChangeColumnTitle = (id: number, title: string) => {
    dispatch(updateColumnTitle({ id, title }));
  };

  const handleRemoveColumn = (id: number) => {
    dispatch(removeColumn({ id }));
  };

  const handleAddTask = (columnId: number) => {
    dispatch(addTask({ columnId }));
  };

  const handleChangeTaskTitle = (columnId: number, taskId: number, taskTitle: string) => {
    dispatch(updateNewTaskTitle({ columnId, taskId, taskTitle }));
  };

  // заверешение задачи на галочку из колонки
  const handleToggleTaskCompletion = (columnId: number, taskId: number) => {
    dispatch(toggleTaskCompletion({ columnId, taskId }));
  };

  const handleDragStart = (taskId: number, sourceColumnId: number, sourceTaskIndex: number) => {
    dispatch(startTaskDrag({taskId, sourceColumnId, sourceTaskIndex}));
  };

  const handleDragEnd = () => {
    dispatch(stopTaskDrag());
  };

  const handleDrop = (destinationColumnId: number, destinationIndex: number) => {
    const { taskId, sourceColumnId } = drag;
    dispatch(moveTaskBetweenColumns({sourceColumnId, taskId, destinationColumnId, destinationIndex}));
    handleDragEnd()
  };

  const currentCategory = BOARD_CATEGORIES.find(cat => cat.id === activeBoardId);
  const activeTitleBoard = currentCategory ? currentCategory.title : 'Выберите категорию';

  const handleChooseCategory = (boardId: string) => {
    dispatch(setActiveBoard({ boardId }));
    dispatch(checkAndCreateBoardIfNotExists(boardId));
  };

  return (
    <div className='page'>
      <Sidebar boardCategories={BOARD_CATEGORIES} onChooseCategory={handleChooseCategory}/>
      
      <MainLayout>

        <Header activeTitleBoard={activeTitleBoard} />
        <Content 
          handleAddColumn={handleAddColumn}
          columns={columns}
          onChangeColumnTitle={handleChangeColumnTitle}
          deleteColumn={handleRemoveColumn}
          addTask={handleAddTask}
          onChangeTaskTitle={handleChangeTaskTitle}
          toggleTaskCompletion={handleToggleTaskCompletion}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          isDragging={!!drag.taskId}
          />

      </MainLayout>

    </div>
  )
}

export default App
