import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

interface HeaderInterface {
  isMenu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  username: string;
}

export const Header: React.FC<HeaderInterface> = ({ isMenu, setMenu, username }) => {
  const user = localStorage.getItem('logged_in');

  const openMenu = () => {
    setMenu(!isMenu);
  };

  return (
    <div className='w-full'>
      <div className='p-6'>
        <div className='flex justify-between items-center'>
          <div className=''>
            Logo
          </div>
          <div className=''>
            {user ?
              <div className='w-[32px] h-[32px] bg-light-grey rounded-md flex justify-center items-center cursor-pointer select-none' onClick={openMenu}>
                <span className='text-base uppercase font-medium text-username'>{username[0]}</span>
              </div>
            : 
              <ul className='flex items-center gap-4'>
                <li>
                  <Link to='/login'>
                    <div className='px-3 p-1 text-text-home hover:bg-secondary rounded'>Log in</div>
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <div className='px-3 p-1 text-white font-medium bg-button rounded hover:opacity-90'>Get name free</div>
                  </Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
