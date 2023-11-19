import React, { useEffect, useState } from 'react';

import './style/index.css';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Loading } from './components/Loading/Loading';
import { Home } from './page/Home/Home';
import { Note } from './page/Note/Note';
import { PlanForDay } from './page/PlanForDay/PlanForDay';
import { Register } from './page/Register/Register';
import { Login } from './page/Login/Login';
import Axios from './axios';


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
      const timeout = setTimeout(() => {
          setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const userAuth = async () => {
      try {
        const userData = await Axios.get('/user/account');

        setUserData(userData);
      }
      catch (err) {
        console.log('Вы ещё не вошли в аккаунт: \n', err);
        return navigate('login');
      }
    }
    userAuth();
  }, [])

  // console.log(userData);

  return (
    <div className="App">
      {/* {isLoading && <Loading />} */}
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/frontend' element={!isLoading && <Home />}></Route>
        <Route path='frontend/note' element={!isLoading && <Note />}></Route>
        <Route path='frontend/plan-day' element={!isLoading && <PlanForDay />}></Route>
      </Routes>
    </div>
  );
}

export default App;
