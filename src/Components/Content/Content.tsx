import './Content.css'

const Content = () => {
  return (
    <div className="content">
      <div className="content__wrapper">
        <div className='content__top'>
          <span className='content__status'>
            Последняя задача выполнена 10 марта
          </span>
          <div className='content__filters-container'>

            <button className='content__btn-filter'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.55556C1 1.40821 1.05853 1.26691 1.16272 1.16272C1.26691 1.05853 1.40821 1 1.55556 1H10.4444C10.5918 1 10.7331 1.05853 10.8373 1.16272C10.9415 1.26691 11 1.40821 11 1.55556V2.99222C11 3.13955 10.9414 3.28084 10.8372 3.385L7.27389 6.94833C7.1697 7.0525 7.11114 7.19378 7.11111 7.34111V8.77778L4.88889 11V7.34111C4.88886 7.19378 4.83031 7.0525 4.72611 6.94833L1.16278 3.385C1.05858 3.28084 1.00003 3.13955 1 2.99222V1.55556Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='content__btn-filter-text'>Фильтрация</span>
            </button>

            <button className='content__btn-filter'>
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16667 10.3333L11.5 8M1 1H8.58333H1ZM1 3.33333H6.25H1ZM1 5.66667H6.25H1ZM9.16667 3.33333V10.3333V3.33333ZM9.16667 10.3333L6.83333 8L9.16667 10.3333Z" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='content__btn-filter-text'>Сортировка</span>
            </button>

          </div>
        </div>
        <div className='content__columns'>

        </div>

      </div>
      
    </div>
  );
}

export default Content;
