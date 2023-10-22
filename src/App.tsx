import React, { useEffect, useState } from 'react';

import './style/index.css';

import { Route, Routes } from 'react-router-dom';

import { Loading } from './components/Loading/Loading';
import { Home } from './page/Home/Home';
import { Note } from './page/Note/Note';
import { PlanForDay } from './page/PlanForDay/PlanForDay';


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      const timeout = setTimeout(() => {
          setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      {isLoading && <Loading />}
      <Routes>
        <Route path='/frontend' element={!isLoading && <Home />}></Route>
        <Route path='frontend/note' element={!isLoading && <Note />}></Route>
        <Route path='frontend/plan-day' element={!isLoading && <PlanForDay />}></Route>
      </Routes>
    </div>
  );
}

export default App;
