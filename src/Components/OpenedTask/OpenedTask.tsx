import { useEffect, useRef } from 'react';
import './OpenedTask.css'
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '@/types/types';

type OpenedTaskProps = {
  // columnId,
  // taskId, 
  // taskTitle,
  onChangeTaskTitle: (columnId: number, taskId: number, titleTask: string) => void;
  closeTask: () => void;
  openedTaskId: number;
  task: Task;
  columnId: number;
};

const OpenedTask = ({ closeTask, openedTaskId, task, columnId, onChangeTaskTitle } : OpenedTaskProps) => {

  if (!task) return null;

  // const dispatch = useDispatch();
  const spanRef = useRef<HTMLSpanElement>(null);

  // useEffect(() => {
  //   if (spanRef.current) {
  //     spanRef.current.innerText = taskTitle;
  //   }
  // }, [taskTitle]);

  useEffect(() => {
    if (task && spanRef.current) {
      spanRef.current.innerText = task.title || '';
    }
  }, [task]);

  const handleCloseTask = () => {
    const newTitle = spanRef.current.innerText.trim();
    onChangeTaskTitle(columnId, task.id, newTitle);
    closeTask()
  }

  return (
    <div className={openedTaskId ? 'opened-task' : 'opened-task opened-task--hide'} >
      <div className='opened-task__wrapper'>
        <div className='opened-task__top'>
          <div className='opened-task__top-left'>
            <button className='opened-task__btn opened-task__btn-timer'>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.064 8.37599L8.66625 6.77699C8.5532 6.70156 8.42177 6.65827 8.28601 6.65174C8.15026 6.64522 8.01529 6.6757 7.89552 6.73994C7.77574 6.80418 7.67568 6.89975 7.60602 7.01645C7.53635 7.13315 7.49971 7.26658 7.5 7.40249V10.5997C7.49998 10.7355 7.53682 10.8688 7.6066 10.9852C7.67637 11.1017 7.77646 11.1971 7.89618 11.2611C8.0159 11.3252 8.15077 11.3556 8.28639 11.349C8.42201 11.3424 8.5533 11.2991 8.66625 11.2237L11.064 9.62474C11.1667 9.55625 11.2509 9.46346 11.3092 9.35461C11.3674 9.24575 11.3979 9.1242 11.3979 9.00074C11.3979 8.87728 11.3674 8.75573 11.3092 8.64688C11.2509 8.53803 11.1667 8.44523 11.064 8.37674V8.37599Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='opened-task__btn-timer-text'>
                Работать над задачей
              </span>
            </button>
            <div className='opened-task__time'>
              <span className='opened-task__time-current'>00ч.</span>
              <span className='opened-task__time-planned'>00ч.</span>
            </div>

          </div>
          <div className='opened-task__top-right'>
            <button className='opened-task__btn opened-task__btn-finish'>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 9.75L6.75 12.75L14.25 5.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='opened-task__btn-finish-text'>
                Завершить задачу
              </span>
            </button>
            <button className='opened-task__btn opened-task__btn-copy'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.46001 6.53999C8.87659 5.95675 8.08541 5.6291 7.26045 5.6291C6.4355 5.6291 5.64432 5.95675 5.0609 6.53999L1.94979 9.6511C1.65264 9.93809 1.41563 10.2814 1.25258 10.661C1.08953 11.0405 1.00371 11.4488 1.00012 11.8619C0.996528 12.2749 1.07524 12.6846 1.23167 13.067C1.3881 13.4493 1.61911 13.7967 1.91122 14.0888C2.20333 14.3809 2.5507 14.6119 2.93304 14.7683C3.31538 14.9248 3.72505 15.0035 4.13814 14.9999C4.55124 14.9963 4.95948 14.9105 5.33904 14.7474C5.71861 14.5844 6.06191 14.3474 6.3489 14.0502L7.20601 13.1939M6.61645 9.38355C7.19987 9.96679 7.99105 10.2944 8.81601 10.2944C9.64096 10.2944 10.4321 9.96679 11.0156 9.38355L14.1267 6.27244C14.6934 5.68567 15.007 4.8998 14.9999 4.08408C14.9928 3.26835 14.6656 2.48805 14.0888 1.91122C13.512 1.3344 12.7316 1.00721 11.9159 1.00012C11.1002 0.993029 10.3143 1.30661 9.72756 1.87333L8.87201 2.72888" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button className='opened-task__btn opened-task__btn-close' onClick={handleCloseTask}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6H1M9.55556 1L15 6L9.55556 1ZM15 6L9.55556 11L15 6Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
        <div className='opened-task__content'>
          <span
            ref={spanRef}
            className='opened-task__title'
            contentEditable="true"
            data-placeholder="Напишите название задачи..."
            >
              
          </span>
        </div>

      </div>
      
    </div>
  );
}

export default OpenedTask;
