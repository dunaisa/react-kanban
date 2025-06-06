import { useEffect, useRef, useState } from 'react';
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
  removeTask: (columnId: number, taskId: number) => void;
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
  openTask,
  removeTask
} : TaskProps) => {

  const spanRef = useRef<HTMLSpanElement>(null);

  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

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
    if (!isDeleteOverlayOpen) {
      openTask(taskId)
    }
  }

  const handleOpenOverlay = () => {
    setIsDeleteOverlayOpen(!isDeleteOverlayOpen)
  }

  const handleRemoveTask = () => {
    removeTask(columnId, taskId)
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

        <button className='task__btn-more' onClick={handleOpenOverlay}>
          <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29168 1.49999H1.29626H1.29168ZM4.50001 1.49999H4.50459H4.50001ZM7.70834 1.49999H7.71293H7.70834ZM1.75001 1.49999C1.75001 1.62155 1.70172 1.73813 1.61577 1.82408C1.52981 1.91003 1.41323 1.95832 1.29168 1.95832C1.17012 1.95832 1.05354 1.91003 0.967586 1.82408C0.881632 1.73813 0.833344 1.62155 0.833344 1.49999C0.833344 1.37843 0.881632 1.26185 0.967586 1.1759C1.05354 1.08995 1.17012 1.04166 1.29168 1.04166C1.41323 1.04166 1.52981 1.08995 1.61577 1.1759C1.70172 1.26185 1.75001 1.37843 1.75001 1.49999V1.49999ZM4.95834 1.49999C4.95834 1.62155 4.91005 1.73813 4.8241 1.82408C4.73815 1.91003 4.62157 1.95832 4.50001 1.95832C4.37845 1.95832 4.26187 1.91003 4.17592 1.82408C4.08997 1.73813 4.04168 1.62155 4.04168 1.49999C4.04168 1.37843 4.08997 1.26185 4.17592 1.1759C4.26187 1.08995 4.37845 1.04166 4.50001 1.04166C4.62157 1.04166 4.73815 1.08995 4.8241 1.1759C4.91005 1.26185 4.95834 1.37843 4.95834 1.49999V1.49999ZM8.16668 1.49999C8.16668 1.62155 8.11839 1.73813 8.03243 1.82408C7.94648 1.91003 7.8299 1.95832 7.70834 1.95832C7.58679 1.95832 7.47021 1.91003 7.38425 1.82408C7.2983 1.73813 7.25001 1.62155 7.25001 1.49999C7.25001 1.37843 7.2983 1.26185 7.38425 1.1759C7.47021 1.08995 7.58679 1.04166 7.70834 1.04166C7.8299 1.04166 7.94648 1.08995 8.03243 1.1759C8.11839 1.26185 8.16668 1.37843 8.16668 1.49999V1.49999Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>

        <div className={isDeleteOverlayOpen ? 'task__btn-overlay' : 'task__btn-overlay hidden'}>
          <div className='task__btn-container'>
          <button className='task__btn-delete' onClick={handleRemoveTask}>
            <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3427_9)">
            <path d="M13.6666 9.1536e-07C13.4459 -0.0029954 13.2267 0.0379004 13.0219 0.120314C12.817 0.202727 12.6306 0.325015 12.4734 0.480077C12.3162 0.635138 12.1914 0.819882 12.1062 1.02358C12.0211 1.22728 11.9772 1.44587 11.9772 1.66667H1.99997C1.77912 1.66354 1.55985 1.70435 1.3549 1.7867C1.14996 1.86906 0.963421 1.99133 0.806138 2.1464C0.648855 2.30147 0.523961 2.48626 0.438715 2.69002C0.353469 2.89379 0.30957 3.11246 0.30957 3.33333C0.30957 3.55421 0.353469 3.77288 0.438715 3.97664C0.523961 4.18041 0.648855 4.36519 0.806138 4.52027C0.963421 4.67534 1.14996 4.79761 1.3549 4.87997C1.55985 4.96232 1.77912 5.00312 1.99997 5H32C32.2208 5.00312 32.4401 4.96232 32.645 4.87997C32.85 4.79761 33.0365 4.67534 33.1938 4.52027C33.3511 4.36519 33.476 4.18041 33.5612 3.97664C33.6465 3.77288 33.6904 3.55421 33.6904 3.33333C33.6904 3.11246 33.6465 2.89379 33.5612 2.69002C33.476 2.48626 33.3511 2.30147 33.1938 2.1464C33.0365 1.99133 32.85 1.86906 32.645 1.7867C32.4401 1.70435 32.2208 1.66354 32 1.66667H22.0228C22.0228 1.44587 21.9789 1.22728 21.8937 1.02358C21.8085 0.819882 21.6837 0.635138 21.5265 0.480077C21.3693 0.325015 21.1829 0.202727 20.9781 0.120314C20.7732 0.0379004 20.5541 -0.0029954 20.3333 9.1536e-07H13.6666ZM1.99997 8.33333V35C1.99997 36.8417 3.49164 38.3333 5.33331 38.3333H28.6666C30.5083 38.3333 32 36.8417 32 35V8.33333H1.99997Z"/>
            </g>
            <defs>
            <clipPath id="clip0_3427_9">
            <rect width="34" height="38" fill="white"/>
            </clipPath>
            </defs>
            </svg>

          </button>
            
          </div>

        </div>

      </div>

  );
}

export default Task;
