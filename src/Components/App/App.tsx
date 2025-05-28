import { useState } from 'react';
import './App.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'
import MainLayout from '../MainLayout/MainLayout'
import { boardsData } from '../../data/boardsData';

function App() {

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const selectedBoard = boardsData.find(board => board.id === selectedBoardId) || null;

  return (
    <div className='page'>
      <Sidebar boards={boardsData} onBoardSelect={setSelectedBoardId}/>
      
      <MainLayout>

        <Header board={selectedBoard} />
        <Content />

      </MainLayout>

    </div>
  )
}

export default App
