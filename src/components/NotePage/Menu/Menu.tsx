import React from 'react';

import link_img from '../../../img/link_img';

import { useTelegram } from '../../../hooks/useTelegram';

export const Menu = () => {
  const { user } = useTelegram();

  return (
    <div className='bg-secondary w-screen h-full overflow-y-auto absolute top-0 left-0'>
      <div className='h-full bg-secondary overflow-y-auto flex flex-col'>
        <div className='p-3 flex justify-between text-center'>
          <div className='gap-2 flex items-center'>
            <span>
              <img className='rounded-full h-8 w-8' src={user?.photo_url} alt="avatar" />
            </span>
            <span className='text-base font-medium capitalize'>{user?.first_name}Шрекович</span>
          </div>
          <div className='cursor-pointer flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 16 12" fill="none">
              <path d="M0 0H16V2H0V0ZM4 5H16V7H4V5ZM9 10H16V12H9V10Z" fill="#8f8f8f" fillOpacity="0.8"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
