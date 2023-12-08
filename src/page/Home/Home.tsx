import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import Axios from '../../axios';

import './home.css';

export const Home: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [isMenu, setMenu] = useState<boolean>(false);
  const user = localStorage.getItem('logged_in');

  // OBTAINING USERNAME
  useEffect(() => {
    const myAccount = async () => {
      try {
        const { data } = await Axios.get('/user/account');
        setUsername(data.username);
      }
      catch (err) {
        console.log('При получении имени пользователя произошла ошибка: \n', err);
      }
    };
    myAccount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('logged_in');
    setMenu(false);
  };

  const closeMenu = () => {
    isMenu && setMenu(false);
  };

  console.log(isMenu)

  return (
    <div onClick={closeMenu}>
      <Header isMenu={isMenu} setMenu={setMenu} username={username} />
      <div className='container px-32'>
        <div className='flex justify-center flex-col text-center mt-24'>
          <div className='flex flex-col items-center gap-3'>
            <h1 className='text-8xl font-bold leading-[68px] text-text-home'>Write, plan, share. <br/> With AI at your side.</h1>
            <p className='text-4xl font-medium text-text-home'>Name is the connected workspace where better, faster work happens.</p>
            {user ?
              <Link to='/documents' className='w-[167px]'>
                <button className='px-8 p-1 h-[36px] text-white font-medium bg-button rounded hover:opacity-90'>Get name free</button>
              </Link>
            :
              <Link to='/login' className='w-[167px]'>
                <button className='px-8 p-1 h-[36px] text-white font-medium bg-button rounded hover:opacity-90'>Get name free</button>
              </Link>
            }
          </div>
        </div>
      </div>
      {isMenu &&
        <div className='home-menu absolute p-6 px-0 rounded-2xl bg-white' onClick={(e: any) => e.stopPropagation()}>
          <div className='flex flex-col'>
            <div className='px-6 mb-2 flex gap-3 items-center'>
              <div className='w-[44px] h-[44px] bg-light-grey rounded-md flex justify-center items-center select-none'>
                <span className='text-x1 uppercase font-medium text-username'>{username[0]}</span>
              </div>
              <span className='text-base font-medium capitalize text-noteName'>{username}</span>
            </div>
            <div>
              <button className='p-3 px-6 text-sm text-color-note w-full flex items-center gap-3 hover:bg-secondary2' onClick={handleLogout}>
                <div className='w-[44px] flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 16"  className='w-[12px] h-[12px]'>
                    <path fill="rgba(103, 103, 103)" d="M1 0a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Zm10.3 9.3a1 1 0 0 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 1 0-1.4 1.4L12.58 6H5a1 1 0 1 0 0 2h7.59l-1.3 1.3Z"></path>
                  </svg>
                </div>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
