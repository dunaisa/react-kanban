import { FormEvent, useEffect, useRef, useState } from 'react';
import './OpenedTask.css'
import { useDispatch } from 'react-redux';
import { Task, TaskComment } from '@/types/types';
import { addComment } from '@/store/slices/columnsSlice';
import { formatTimeAgo } from '@/utils/dateFormat';
import { useCurrentBoardData } from '@/hooks/useCurrentBoardData';
import SubTask from '../SubTask/SubTask';
import SubTaskList from '../SubTaskList/SubTaskList';


type OpenedTaskProps = {
  // columnId,
  // taskId, 
  // taskTitle,
  onChangeTaskTitle: (columnId: number, taskId: number, titleTask: string) => void;
  closeTask: () => void;
  openedTaskId: number;
  task: Task;
  columnId: number;
  toggleTaskCompletion: (columnId: number, taskId: number) => void;
};

const OpenedTask = ({ closeTask, openedTaskId, task, columnId, onChangeTaskTitle, toggleTaskCompletion } : OpenedTaskProps) => {

  if (!task) return null;

  const { comments } = useCurrentBoardData();

  const spanRef = useRef<HTMLSpanElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

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

  const handleToggleTaskCompletion = () => {
    toggleTaskCompletion(columnId, task.id)
  }

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();

    const newComment: Omit<TaskComment, 'id'> = {
      userName: 'Анонимный пользователь', // можно заменить на реального пользователя из стора
      text: commentRef.current.innerHTML.trim(),
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment({columnId, taskId: task.id, comment: newComment}))

    if (commentRef.current) {
      commentRef.current.innerHTML = '';
    }
  }

  return (
    <div className={openedTaskId ? 'opened-task' : 'opened-task opened-task--hide'} >
      <div className='opened-task__wrapper'>
        <div className='opened-task__top'>
          <div className='opened-task__top-left'>

              {
                task.completed &&
                <span className='opened-task__time-planned'>Задача завершена</span>
              }
            {
              !task.completed && 
              <button className='opened-task__btn opened-task__btn-timer'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.064 8.37599L8.66625 6.77699C8.5532 6.70156 8.42177 6.65827 8.28601 6.65174C8.15026 6.64522 8.01529 6.6757 7.89552 6.73994C7.77574 6.80418 7.67568 6.89975 7.60602 7.01645C7.53635 7.13315 7.49971 7.26658 7.5 7.40249V10.5997C7.49998 10.7355 7.53682 10.8688 7.6066 10.9852C7.67637 11.1017 7.77646 11.1971 7.89618 11.2611C8.0159 11.3252 8.15077 11.3556 8.28639 11.349C8.42201 11.3424 8.5533 11.2991 8.66625 11.2237L11.064 9.62474C11.1667 9.55625 11.2509 9.46346 11.3092 9.35461C11.3674 9.24575 11.3979 9.1242 11.3979 9.00074C11.3979 8.87728 11.3674 8.75573 11.3092 8.64688C11.2509 8.53803 11.1667 8.44523 11.064 8.37674V8.37599Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='opened-task__btn-timer-text'>
                  Работать над задачей
                </span>
              </button>
            }
            <div className='opened-task__time'>
              <span className='opened-task__time-current'>00ч.</span>
              <span className='opened-task__time-planned'>00ч.</span>
            </div>

          </div>
          <div className='opened-task__top-right'>
            <button 
            className={!task.completed ? 'opened-task__btn opened-task__btn-finish' : 'opened-task__btn opened-task__btn-finish--restart'} 
            onClick={handleToggleTaskCompletion}>
              {
                !task.completed && <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 9.75L6.75 12.75L14.25 5.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              }
              
              <span className='opened-task__btn-finish-text'>
                {!task.completed ? 'Завершить задачу' : 'Возобновить задачу'}                
              </span>
            </button>
            {/* <button className='opened-task__btn opened-task__btn-bg opened-task__btn-detele'>
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3434_15)">
              <path d="M5.03516 -6.6663e-07C4.95382 -0.00110457 4.87308 0.0139623 4.79761 0.0443251C4.72215 0.0746879 4.65346 0.119741 4.59555 0.176869C4.53765 0.233997 4.49166 0.302061 4.46028 0.377108C4.42889 0.452155 4.41273 0.532689 4.41273 0.614034H0.736916C0.655549 0.612884 0.574765 0.627916 0.499258 0.658258C0.423752 0.6886 0.355028 0.733646 0.297082 0.790778C0.239136 0.847911 0.193122 0.91599 0.161715 0.991061C0.130309 1.06613 0.114136 1.14669 0.114136 1.22807C0.114136 1.30944 0.130309 1.39001 0.161715 1.46508C0.193122 1.54015 0.239136 1.60823 0.297082 1.66536C0.355028 1.72249 0.423752 1.76754 0.499258 1.79788C0.574765 1.82822 0.655549 1.84326 0.736916 1.8421H11.7895C11.8709 1.84326 11.9517 1.82822 12.0272 1.79788C12.1027 1.76754 12.1714 1.72249 12.2294 1.66536C12.2873 1.60823 12.3333 1.54015 12.3647 1.46508C12.3962 1.39001 12.4123 1.30944 12.4123 1.22807C12.4123 1.14669 12.3962 1.06613 12.3647 0.991061C12.3333 0.91599 12.2873 0.847911 12.2294 0.790778C12.1714 0.733646 12.1027 0.6886 12.0272 0.658258C11.9517 0.627916 11.8709 0.612884 11.7895 0.614034H8.11373C8.11373 0.532689 8.09757 0.452155 8.06618 0.377108C8.0348 0.302061 7.98882 0.233997 7.93091 0.176869C7.873 0.119741 7.80432 0.0746879 7.72885 0.0443251C7.65339 0.0139623 7.57264 -0.00110457 7.4913 -6.6663e-07H5.03516ZM0.736916 3.07017V12.8947C0.736916 13.5732 1.28648 14.1228 1.96499 14.1228H10.5615C11.24 14.1228 11.7895 13.5732 11.7895 12.8947V3.07017H0.736916Z" fill="#333333"/>
              </g>
              <defs>
              <clipPath id="clip0_3434_15">
              <rect width="12.5263" height="14" fill="white"/>
              </clipPath>
              </defs>
              </svg>
            </button> */}
            <button className='opened-task__btn opened-task__btn-bg opened-task__btn-copy'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.46001 6.53999C8.87659 5.95675 8.08541 5.6291 7.26045 5.6291C6.4355 5.6291 5.64432 5.95675 5.0609 6.53999L1.94979 9.6511C1.65264 9.93809 1.41563 10.2814 1.25258 10.661C1.08953 11.0405 1.00371 11.4488 1.00012 11.8619C0.996528 12.2749 1.07524 12.6846 1.23167 13.067C1.3881 13.4493 1.61911 13.7967 1.91122 14.0888C2.20333 14.3809 2.5507 14.6119 2.93304 14.7683C3.31538 14.9248 3.72505 15.0035 4.13814 14.9999C4.55124 14.9963 4.95948 14.9105 5.33904 14.7474C5.71861 14.5844 6.06191 14.3474 6.3489 14.0502L7.20601 13.1939M6.61645 9.38355C7.19987 9.96679 7.99105 10.2944 8.81601 10.2944C9.64096 10.2944 10.4321 9.96679 11.0156 9.38355L14.1267 6.27244C14.6934 5.68567 15.007 4.8998 14.9999 4.08408C14.9928 3.26835 14.6656 2.48805 14.0888 1.91122C13.512 1.3344 12.7316 1.00721 11.9159 1.00012C11.1002 0.993029 10.3143 1.30661 9.72756 1.87333L8.87201 2.72888" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button className='opened-task__btn opened-task__btn-bg opened-task__btn-close' onClick={handleCloseTask}>
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
          <div className='opened-task__description'>
            <div className='opened-task__description-row'>
              <span className='opened-task__description-title'>
                Исполнитель
              </span>
              <div className='opened-task__row-info'>
                <div className='opened-task__executor-ava'>
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <span className='opened-task__row-text'>Никита Хаецкий</span>
              </div>
            </div>
            <div className='opened-task__description-row'>
              <span className='opened-task__description-title'>
                Даты
              </span>
              <div className='opened-task__row-info'>
                <div className='opened-task__executor-ava'>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.33333 3.66667V1V3.66667ZM9.66667 3.66667V1V3.66667ZM3.66667 6.33333H10.3333H3.66667ZM2.33333 13H11.6667C12.0203 13 12.3594 12.8595 12.6095 12.6095C12.8595 12.3594 13 12.0203 13 11.6667V3.66667C13 3.31304 12.8595 2.97391 12.6095 2.72386C12.3594 2.47381 12.0203 2.33333 11.6667 2.33333H2.33333C1.97971 2.33333 1.64057 2.47381 1.39052 2.72386C1.14048 2.97391 1 3.31304 1 3.66667V11.6667C1 12.0203 1.14048 12.3594 1.39052 12.6095C1.64057 12.8595 1.97971 13 2.33333 13Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span className='opened-task__row-text'>Нет даты</span>
              </div>
            </div>
            <div className='opened-task__description-row'>
              <span className='opened-task__description-title'>
                Проект
              </span>
              <div className='opened-task__row-info'>
                <span className='opened-task__row-text'>Добавить проект</span>
              </div>
            </div>
            <div className='opened-task__description-row'>
              <span className='opened-task__description-title'>
                Описание
              </span>
              <div className='opened-task__row-info'>
                <div className='opened-task__row-text opened-task__description-area' contentEditable data-placeholder='Добавьте описание к этой задаче...'>

                </div>
              </div>
            </div>

          </div>

          <div className='opened-task__subtask-wrapper'>
            <span className='opened-task__subtask-title'>
              Подзадачи
            </span>
            <SubTaskList styleType={'details-task'}/>
          </div>

          <div className='opened-task__comments'>
            <div className='opened-task__comments-wrapper'>
              {
                comments.map(comment => (
                  <div className='opened-task__comment' key={comment.id}>
                    <div className='opened-task__executor-ava'>
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      </div>
                    <div className='opened-task__comment-content'>
                      <div className='opened-task__comment-content-top'>
                        <span className='opened-task__comment-user-name'>
                         {comment.userName}
                        </span>
                        <span className='opened-task__comment-time'>
                        {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <div className='opened-task__comment-text'>
                      {comment.text}
                      </div>
                    </div>
    
                  </div>
                ))
              }
            </div>
          </div>
          <div className='opened-task__comment-form comment-form'>
            <div className='opened-task__executor-ava'>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <div className='comment-form__area'>
              <div className='comment-form__textarea' ref={commentRef} contentEditable data-placeholder='Задайте вопрос или напишите комментарий...'>

              </div>
              <button className='comment-form__btn' onClick={handleSubmitComment}>
                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.95173 9.78319C2.98348 9.92607 2.98348 10.0742 2.95173 10.2171L1.4557 16.9492C1.27304 17.7712 2.12597 18.4371 2.8791 18.0605L17.2111 10.8945C17.9481 10.526 17.9481 9.47422 17.2111 9.10569L2.8791 1.9397C2.12597 1.56313 1.27304 2.22908 1.4557 3.05106L2.95173 9.78319Z" fill="#E5E5E5" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
      
    </div>
  );
}

export default OpenedTask;
