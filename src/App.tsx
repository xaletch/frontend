import React, { useEffect, useState } from 'react';

import './style/index.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { Home } from './page/Home/Home';
import { Register } from './page/Register/Register';
import { Login } from './page/Login/Login';
import Axios from './axios';
import { SelectNote } from './page/Notes/SelectNote';
import { Documents } from './page/Documents/Documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchNotes } from './redux/slice/noteSlice';
import { NotFound } from './page/NotFound/NotFound';


interface DocumentsInterface {
  _id: string;
  name: string;
  smile: string;
};

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // NOT USED
  const [userData, setUserData] = useState({});

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
      }
    }
    userAuth();
  }, [])

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={!isLoading && <Home />}></Route>
        <Route path='/documents/:_id' element={<SelectNote />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/documents' element={<Documents />}></Route>
      </Routes>
    </div>
  );
}

export default App;
