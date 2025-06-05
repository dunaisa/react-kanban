import { useEffect, useRef } from 'react';
import './Task.css'

type TaskProps = {
  taskId: number;
  columnId: number;
  taskTitle: string;
  taskCompleted: boolean;
  onChangeTaskTitle: (columnId: number, taskId: number, titleTask: string) => void;
  toggleTaskCompletion: (columnId: number, taskId: number) => void;
  taskIndex: number;
  onDragStart: (taskId: number, sourceColumnId: number, sourceTaskIndex: number) => void;
  onDragEnd: () => void;
  openTask: (taskId: number) => void;
};

const Task = ({
  columnId,
  taskId, 
  taskTitle,
  onChangeTaskTitle,
  toggleTaskCompletion,
  taskCompleted,
  taskIndex,
  onDragStart,
  onDragEnd,
  openTask
} : TaskProps) => {

  const spanRef = useRef<HTMLSpanElement>(null);

  const handleBlur = () => {
    const newTitle = spanRef.current.innerText.trim();
    onChangeTaskTitle(columnId, taskId, newTitle);
  }

  const handleToggleCompletion = () => {
    toggleTaskCompletion(columnId, taskId)
  }

  const handleMouseDown = () => {
    onDragStart(taskId, columnId, taskIndex)
  }

  const handleMouseUp = () => {
    onDragEnd()
  }

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.innerText = taskTitle;
    }
  }, [taskTitle]);

  const handleOpenTask = () => {
    openTask(taskId)
  }

  return (
      <div className='task' draggable onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onDoubleClick={handleOpenTask} >

        <div className={!taskCompleted ? 'task__heading' : 'task__heading task__heading--completed'}>
          {taskTitle && 
            <button className='task__status' type="button" onClick={handleToggleCompletion}>

              {
                !taskCompleted ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33333 7.5L6.77778 8.94444L9.66667 6.05555M14 7.5C14 8.35359 13.8319 9.19883 13.5052 9.98744C13.1786 10.7761 12.6998 11.4926 12.0962 12.0962C11.4926 12.6998 10.7761 13.1786 9.98744 13.5052C9.19883 13.8319 8.35359 14 7.5 14C6.64641 14 5.80117 13.8319 5.01256 13.5052C4.22394 13.1786 3.50739 12.6998 2.90381 12.0962C2.30022 11.4926 1.82144 10.7761 1.49478 9.98744C1.16813 9.19883 1 8.35359 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> :  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="15" height="15" rx="7.5" fill="#8BC34A"/>
                <path d="M5.33331 7.5L6.77776 8.94445L9.66665 6.05556" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              }
              
            </button>
          }

          <span
            ref={spanRef}
            className='task__title'
            contentEditable="true"
            data-placeholder="Напишите название задачи..."
            onBlur={handleBlur}>
              
          </span>
        </div>

        <div className='task__info'>

          <div className='task__user-ava'>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          {
            !taskCompleted && taskTitle &&

              <button className='task__timer-btn'>
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.752 3.168L2.555 1.036C2.40426 0.935422 2.22902 0.877699 2.04802 0.868997C1.86701 0.860296 1.68705 0.900942 1.52735 0.986591C1.36766 1.07224 1.23424 1.19967 1.14136 1.35527C1.04847 1.51087 0.999612 1.68878 1 1.86999V6.133C0.999975 6.31404 1.0491 6.49169 1.14213 6.647C1.23516 6.80232 1.36861 6.92946 1.52824 7.01487C1.68787 7.10028 1.86769 7.14075 2.04852 7.13197C2.22935 7.12318 2.4044 7.06547 2.555 6.965L5.752 4.833C5.88896 4.74167 6.00126 4.61795 6.07892 4.47281C6.15659 4.32768 6.19723 4.16561 6.19723 4.001C6.19723 3.83638 6.15659 3.67432 6.07892 3.52918C6.00126 3.38404 5.88896 3.26032 5.752 3.16899V3.168Z" stroke="#4F6EA3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          }

        </div>

      </div>

  );
}

export default Task;
