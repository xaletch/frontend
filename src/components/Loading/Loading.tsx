import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'

export const Loading = () => {
    const { user } = useTelegram();

  return (
    <div className='p-5 h-screen flex items-center justify-center'>
        <h1><span>{user?.first_name}</span> Добро пожаловать!</h1>
        {/* <img className='w-16 h-16 select-none' src={link_img.loading} alt=''/> */}
    </div>
  )
}
