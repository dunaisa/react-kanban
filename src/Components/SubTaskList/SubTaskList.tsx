import SubTask from '../SubTask/SubTask';
import './SubTaskList.css';

type SubTaskListProps = {
  styleType?: 'small-task' | 'details-task';
}

const SubTaskList = ({styleType} : SubTaskListProps) => {
  return (      
    <div className='subtask__list-wrapper'>
      <ul className='subtask__list'>

        {/* <li className='opened-task__subtask-item'>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2_802)">
          <path d="M5.33333 7.5L6.77777 8.94444L9.66666 6.05555M14 7.5C14 8.35359 13.8319 9.19883 13.5052 9.98744C13.1786 10.7761 12.6998 11.4926 12.0962 12.0962C11.4926 12.6998 10.7761 13.1786 9.98743 13.5052C9.19882 13.8319 8.35358 14 7.49999 14C6.6464 14 5.80117 13.8319 5.01255 13.5052C4.22393 13.1786 3.50738 12.6998 2.9038 12.0962C2.30022 11.4926 1.82143 10.7761 1.49478 9.98744C1.16812 9.19883 0.999992 8.35359 0.999992 7.5C0.999992 5.77609 1.68481 4.12279 2.9038 2.90381C4.12278 1.68482 5.77609 1 7.49999 1C9.2239 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_2_802">
          <rect width="15" height="15" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <span className='opened-task__subtask-text'>
            Перенести пользователей в новую БД
          </span>
          <div className='opened-task__subtask-user-ava'>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
        </li>
        <li className='opened-task__subtask-item'>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2_802)">
          <path d="M5.33333 7.5L6.77777 8.94444L9.66666 6.05555M14 7.5C14 8.35359 13.8319 9.19883 13.5052 9.98744C13.1786 10.7761 12.6998 11.4926 12.0962 12.0962C11.4926 12.6998 10.7761 13.1786 9.98743 13.5052C9.19882 13.8319 8.35358 14 7.49999 14C6.6464 14 5.80117 13.8319 5.01255 13.5052C4.22393 13.1786 3.50738 12.6998 2.9038 12.0962C2.30022 11.4926 1.82143 10.7761 1.49478 9.98744C1.16812 9.19883 0.999992 8.35359 0.999992 7.5C0.999992 5.77609 1.68481 4.12279 2.9038 2.90381C4.12278 1.68482 5.77609 1 7.49999 1C9.2239 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_2_802">
          <rect width="15" height="15" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <span className='opened-task__subtask-text'>
            Сверстать новый интерфейс чекаута
          </span>
          <div className='opened-task__subtask-user-ava'>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6735 4.07143C10.6735 5.01863 10.2864 5.92704 9.59752 6.59681C8.90861 7.26658 7.97425 7.64286 6.99998 7.64286C6.02572 7.64286 5.09136 7.26658 4.40245 6.59681C3.71354 5.92704 3.32651 5.01863 3.32651 4.07143C3.32651 3.12423 3.71354 2.21582 4.40245 1.54605C5.09136 0.876274 6.02572 0.5 6.99998 0.5C7.97425 0.5 8.90861 0.876274 9.59752 1.54605C10.2864 2.21582 10.6735 3.12423 10.6735 4.07143V4.07143ZM6.99998 10.3214C5.29502 10.3214 3.65989 10.9799 2.4543 12.152C1.2487 13.3241 0.571411 14.9138 0.571411 16.5714H13.4286C13.4286 14.9138 12.7513 13.3241 11.5457 12.152C10.3401 10.9799 8.70494 10.3214 6.99998 10.3214V10.3214Z" stroke="#96999C" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
        </li> */}

        <SubTask styleType={styleType}/>
        
      </ul>
      <button className={`subtask__btn subtask__btn--${styleType}`}>
        {styleType === 'details-task' ? 
          (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9H4.5M9 4.5V9V4.5ZM9 9V13.5V9ZM9 9H13.5H9Z" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ) 
          : 
          (<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 4.5H1M4.5 1V4.5V1ZM4.5 4.5V8V4.5ZM4.5 4.5H8H4.5Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          )
        }

        <span className={`subtask__btn-text subtask__btn-text--${styleType}`}>
          Добавить подзадачу
        </span>
      </button>
    </div>
  );
}

export default SubTaskList;
