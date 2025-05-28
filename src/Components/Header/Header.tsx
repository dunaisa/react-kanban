import './Header.css'
import UserImg from '../../assets/user-img.png'

import { Board } from '../../types/types';

type HeaderProps = {
  board: Board | null;
}

const Header = ({ board }: HeaderProps) => {

  return (
    <header className='header'>
      <div className='header__nav'>
        <div className='header__nav-page'>
          <span className='header__page-name'>
            {!board ? 'Не выбрано' : board.category}
          </span>
          <span className='header__page-status'>
            В работе
          </span>
        </div>
        <div className='header__nav-container'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
                Описание
              </a>
            </li>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
                Список
              </a>
            </li>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
                Канбан
              </a>
            </li>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
                Планирование
              </a>
            </li>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
                Дашборд
              </a>
            </li>
            <li className='header__nav-item'>
              <a href="" className='header__nav-link'>
              Команда
              </a>
            </li>  
          </ul>

        </div>
      </div>
      <div className='header__info-btns'>
        <button className='header__btn header__info-theme'>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.354 12.354C16.7172 13.0122 14.9231 13.1748 13.1946 12.8217C11.4662 12.4686 9.87962 11.6153 8.63217 10.3678C7.38472 9.12037 6.53139 7.53381 6.17827 5.80535C5.82514 4.0769 5.98779 2.28277 6.64599 0.645996C4.7077 1.42673 3.10135 2.85739 2.10232 4.69272C1.10328 6.52805 0.773783 8.65374 1.17031 10.7054C1.56683 12.757 2.66467 14.6069 4.27565 15.9378C5.88662 17.2687 7.91037 17.9977 9.99999 18C11.7969 18.0001 13.5527 17.4624 15.0415 16.4562C16.5303 15.45 17.684 14.0213 18.354 12.354Z" fill="#333333" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button className='header__btn header__info-messages'>
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.16667 7.49998H5.175H5.16667ZM8.5 7.49998H8.50833H8.5ZM11.8333 7.49998H11.8417H11.8333ZM16 7.49998C16 11.0896 12.6417 14 8.5 14C7.27386 14.004 6.06233 13.7406 4.95417 13.2289L1 14L2.1625 10.9775C1.42667 9.97159 1 8.77885 1 7.49998C1 3.91036 4.35833 1 8.5 1C12.6417 1 16 3.91036 16 7.49998Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button className='header__btn header__info-notifications'>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.625 13.4444H5.375M10.625 13.4444H15L13.7706 12.1956C13.6055 12.0278 13.4746 11.8287 13.3853 11.6095C13.2959 11.3903 13.25 11.1554 13.25 10.9182V8.11111C13.2501 7.00794 12.9136 5.93186 12.2868 5.03101C11.66 4.13017 10.7737 3.44886 9.75 3.08089V2.77778C9.75 2.30628 9.56563 1.8541 9.23744 1.5207C8.90925 1.1873 8.46413 1 8 1C7.53587 1 7.09075 1.1873 6.76256 1.5207C6.43437 1.8541 6.25 2.30628 6.25 2.77778V3.08089C4.21125 3.81333 2.75 5.78933 2.75 8.11111V10.9191C2.75 11.3973 2.56275 11.8569 2.22938 12.1956L1 13.4444H5.375H10.625ZM10.625 13.4444V14.3333C10.625 15.0406 10.3484 15.7189 9.85616 16.219C9.36387 16.719 8.69619 17 8 17C7.30381 17 6.63613 16.719 6.14384 16.219C5.65156 15.7189 5.375 15.0406 5.375 14.3333V13.4444H10.625Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button className='header__btn header__info-lk'>
          <img src={UserImg} alt="" className='header__info-lk-img'/>
        </button>

      </div>
      
    </header>
  );
}

export default Header;
