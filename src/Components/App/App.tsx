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
  removeTask,
  updateNewTaskTitle,
  toggleTaskCompletion,
  startTaskDrag,
  stopTaskDrag,
  moveTaskBetweenColumns,
  setActiveBoard,
  initializeDefaultBoard,
  checkAndCreateBoardIfNotExists,
  openTask,
  closeTask,

 } from '../../store/slices/columnsSlice';

import { useCurrentBoardData } from '@/hooks/useCurrentBoardData';
import { useEffect } from 'react'

function App() {

  useLocalStorage();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDefaultBoard());
  }, [dispatch]);

  const { columns, drag, activeBoardId, openedTaskId, task, columnId } = useCurrentBoardData();

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

  const handleRemoveTask = (columnId: number, taskId: number) => {
    dispatch(removeTask({ columnId, taskId }));
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

  const handleOpenTask = (taskId: number) => {
    dispatch(openTask(taskId));
  }

  const handleCloseTask = () => {
    dispatch(closeTask());
  }

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
          removeTask={handleRemoveTask}
          onChangeTaskTitle={handleChangeTaskTitle}
          toggleTaskCompletion={handleToggleTaskCompletion}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          isDragging={!!drag.taskId}
          openTask={handleOpenTask}
          closeTask={handleCloseTask}
          openedTaskId={openedTaskId}
          task={task}
          columnId={columnId}
          />

      </MainLayout>

    </div>
  )
}

export default App
