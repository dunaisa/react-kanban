import './Column.css'
import { Column as ColumnType } from '../../types/types';
import { useState } from 'react';

type ColumnProps = {
  column: ColumnType;
  onChangeColumnTitle: (id: number, title: string) => void;
  deleteColumn: (id: number) => void;
};

const Column = ({column, onChangeColumnTitle, deleteColumn} : ColumnProps) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleUpdateColumnTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeColumnTitle(column.id, e.target.value);
  }

  const handleDeleteColumn = () => {
    deleteColumn(column.id);
  }

  const handletooglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  }
  
  return (
    <div className='column'>
      <div className='column__info'>

        <input 
        className='column__name' 
        type='text'
        value={column.title}
        placeholder='Название...' 
        onChange={handleUpdateColumnTitle}
        />

        <div className='column__operations'>
          <button className='column__btn column__btn--add'>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 4.5H0.75M4.5 0.75V4.5V0.75ZM4.5 4.5V8.25V4.5ZM4.5 4.5H8.25H4.5Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div className='column__btn column__btn--more' onClick={handletooglePopup}>
            <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.29168 1.49999H1.29626H1.29168ZM4.50001 1.49999H4.50459H4.50001ZM7.70834 1.49999H7.71293H7.70834ZM1.75001 1.49999C1.75001 1.62155 1.70172 1.73813 1.61577 1.82408C1.52981 1.91003 1.41323 1.95832 1.29168 1.95832C1.17012 1.95832 1.05354 1.91003 0.967586 1.82408C0.881632 1.73813 0.833344 1.62155 0.833344 1.49999C0.833344 1.37843 0.881632 1.26185 0.967586 1.1759C1.05354 1.08995 1.17012 1.04166 1.29168 1.04166C1.41323 1.04166 1.52981 1.08995 1.61577 1.1759C1.70172 1.26185 1.75001 1.37843 1.75001 1.49999V1.49999ZM4.95834 1.49999C4.95834 1.62155 4.91005 1.73813 4.8241 1.82408C4.73815 1.91003 4.62157 1.95832 4.50001 1.95832C4.37845 1.95832 4.26187 1.91003 4.17592 1.82408C4.08997 1.73813 4.04168 1.62155 4.04168 1.49999C4.04168 1.37843 4.08997 1.26185 4.17592 1.1759C4.26187 1.08995 4.37845 1.04166 4.50001 1.04166C4.62157 1.04166 4.73815 1.08995 4.8241 1.1759C4.91005 1.26185 4.95834 1.37843 4.95834 1.49999V1.49999ZM8.16668 1.49999C8.16668 1.62155 8.11839 1.73813 8.03243 1.82408C7.94648 1.91003 7.8299 1.95832 7.70834 1.95832C7.58679 1.95832 7.47021 1.91003 7.38425 1.82408C7.2983 1.73813 7.25001 1.62155 7.25001 1.49999C7.25001 1.37843 7.2983 1.26185 7.38425 1.1759C7.47021 1.08995 7.58679 1.04166 7.70834 1.04166C7.8299 1.04166 7.94648 1.08995 8.03243 1.1759C8.11839 1.26185 8.16668 1.37843 8.16668 1.49999V1.49999Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {
              isPopupOpen && (
                <div className='column__btn-popup' onClick={handleDeleteColumn}>
                  <span className='column__btn-popup-text'>
                    Удалить&nbsp;столбец
                  </span>
                </div>
              )
            }

          </div>
        </div>
      </div>
      <div className='column__tasks'>
        <div className='column__task'>

        </div>

      </div>

    </div>
  );
}

export default Column;
