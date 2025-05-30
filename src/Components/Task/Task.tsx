import { useRef } from 'react';
import './Task.css'

type TaskProps = {
  taskId: number;
  columnId: number;
  taskTitle: string;
  onChangeTaskTitle: (columnId: number, taskId: number, titleTask: string) => void;
};

const Task = ({columnId, taskId, taskTitle, onChangeTaskTitle} : TaskProps) => {

  const spanRef = useRef<HTMLSpanElement>(null);

  const handleBlur = () => {
    const newTitle = spanRef.current.innerText.trim();
    onChangeTaskTitle(columnId, taskId, newTitle);
  }

  return (
      <div className='task'>
        <div className='task__heading'>

          <span
            ref={spanRef}
            className='task__name'
            contentEditable="true"
            data-placeholder="Напишите название задачи..."
            onBlur={handleBlur}>
              {taskTitle.trim() === '' ? null : taskTitle}
          </span>
        </div>
        <div className='task__info'>

          <div className='task__user-ava'>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

      </div>

  );
}

export default Task;
