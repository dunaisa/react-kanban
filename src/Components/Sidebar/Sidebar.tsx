import './Sidebar.css'
import Logo from '../../assets/logo.png'
import { Board } from '../../types/types'

import { Link } from 'react-router-dom'

// type SidebarProps = {
//   activeBoardId: string | null;
// };

// { activeBoardId }: SidebarProps

type SidebarProps = {
  boardCategories: Board[];
  onChooseCategory: (boardId: string) => void;
};

const Sidebar = ({ boardCategories, onChooseCategory }: SidebarProps) => {

  return (
    <div className='side-bar'>
      <div className='side-bar__header'>
        <img src={Logo} alt="Логотип" className='logo'/>
        <button className='menu-btn'>
          <div></div>
        </button>
      </div>
      <div className='side-bar__main'>
        <div className='side-bar__category'>
          <ul className='side-bar__list'>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link '>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 10L3 8M3 8L10 1L17 8M3 8H17M3 8V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H7M17 8L19 10M17 8V18C17 18.2652 16.8946 18.5196 16.7071 18.7071C16.5196 18.8946 16.2652 19 16 19H13M7 19C7.26522 19 7.51957 18.8946 7.70711 18.7071C7.89464 18.5196 8 18.2652 8 18V14C8 13.7348 8.10536 13.4804 8.29289 13.2929C8.48043 13.1054 8.73478 13 9 13H11C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14V18C12 18.2652 12.1054 18.5196 12.2929 18.7071C12.4804 18.8946 12.7348 19 13 19M7 19H13" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Дашборд</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 8L7.16667 9.66667L10.5 6.33333M15.5 8C15.5 8.98491 15.306 9.96018 14.9291 10.8701C14.5522 11.7801 13.9997 12.6069 13.3033 13.3033C12.6069 13.9997 11.7801 14.5522 10.8701 14.9291C9.96018 15.306 8.98491 15.5 8 15.5C7.01509 15.5 6.03982 15.306 5.12987 14.9291C4.21993 14.5522 3.39314 13.9997 2.6967 13.3033C2.00026 12.6069 1.44781 11.7801 1.0709 10.8701C0.693993 9.96018 0.5 8.98491 0.5 8C0.5 6.01088 1.29018 4.10322 2.6967 2.6967C4.10322 1.29018 6.01088 0.5 8 0.5C9.98912 0.5 11.8968 1.29018 13.3033 2.6967C14.7098 4.10322 15.5 6.01088 15.5 8Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Мои Задачи</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 13.8333V8.83333C5.5 8.39131 5.3244 7.96738 5.01184 7.65482C4.69928 7.34226 4.27536 7.16667 3.83333 7.16667H2.16667C1.72464 7.16667 1.30072 7.34226 0.988155 7.65482C0.675595 7.96738 0.5 8.39131 0.5 8.83333V13.8333C0.5 14.2754 0.675595 14.6993 0.988155 15.0118C1.30072 15.3244 1.72464 15.5 2.16667 15.5H3.83333C4.27536 15.5 4.69928 15.3244 5.01184 15.0118C5.3244 14.6993 5.5 14.2754 5.5 13.8333ZM5.5 13.8333V5.5C5.5 5.05797 5.67559 4.63405 5.98816 4.32149C6.30072 4.00893 6.72464 3.83333 7.16667 3.83333H8.83333C9.27536 3.83333 9.69928 4.00893 10.0118 4.32149C10.3244 4.63405 10.5 5.05797 10.5 5.5V13.8333M5.5 13.8333C5.5 14.2754 5.67559 14.6993 5.98816 15.0118C6.30072 15.3244 6.72464 15.5 7.16667 15.5H8.83333C9.27536 15.5 9.69928 15.3244 10.0118 15.0118C10.3244 14.6993 10.5 14.2754 10.5 13.8333M10.5 13.8333V2.16667C10.5 1.72464 10.6756 1.30072 10.9882 0.988155C11.3007 0.675595 11.7246 0.5 12.1667 0.5H13.8333C14.2754 0.5 14.6993 0.675595 15.0118 0.988155C15.3244 1.30072 15.5 1.72464 15.5 2.16667V13.8333C15.5 14.2754 15.3244 14.6993 15.0118 15.0118C14.6993 15.3244 14.2754 15.5 13.8333 15.5H12.1667C11.7246 15.5 11.3007 15.3244 10.9882 15.0118C10.6756 14.6993 10.5 14.2754 10.5 13.8333Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Проекты</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='side-bar__category'>
          <span className='side-bar__category-heading'>Избранное</span>

          <ul className='side-bar__list'>

            {boardCategories.map(category => (
              <li className='side-bar__list-item' key={category.id} onClick={() => onChooseCategory(category.id)}>
                <div className='side-bar__list-link' >
                  <div className='side-bar__list-link-marker'></div>
                  <span className='side-bar__list-link-text'>{category.title}</span>
                </div>
              </li>
            ))}

            {/* {boards.map((board) => (
              <li className='side-bar__list-item' key={board.id}>
                <div className='side-bar__list-link' onClick={() => onBoardSelect(board.id)}>
                  <div className='side-bar__list-link-marker'></div>
                  <span className='side-bar__list-link-text'>{board.category}</span>
                </div>
            </li>
            ))} */}

            {/* <li className='side-bar__list-item'>
              <Link href="" className='side-bar__list-link'>
                <div className='side-bar__list-link-marker'></div>
                <span className='side-bar__list-link-text'>Электротовары</span>
              </Link>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <div className='side-bar__list-link-marker'></div>
                <span className='side-bar__list-link-text'>Лесхозснаб</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <div className='side-bar__list-link-marker'></div>
                <span className='side-bar__list-link-text'>Посуда-Сити</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <div className='side-bar__list-link-marker side-bar__list-link-marker--blue'></div>
                <span className='side-bar__list-link-text'>Автошкола “Автолицей”</span>
              </a>
            </li> */}
          </ul>
          <button className='side-bar__category-btn'>
            <span className='side-bar__category-btn-text'>Раскрыть весь список</span>            
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.91665 0.75L3.99998 3.66667L1.08331 0.75" stroke="#B7B9BB" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div className='side-bar__category'>
        <span className='side-bar__category-heading'>Команды</span>
          <ul className='side-bar__list'>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 2.08333L6.66667 5L3.75 7.91667" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Программисты</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 2.08333L6.66667 5L3.75 7.91667" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Маркетологи</span>
              </a>
            </li>
            <li className='side-bar__list-item'>
              <a href="" className='side-bar__list-link'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 2.08333L6.66667 5L3.75 7.91667" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='side-bar__list-link-text'>Дизайнеры</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
