import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'

export const Loading = () => {
    const { user } = useTelegram();

  return (
    <div className='p-5 h-screen flex items-center justify-center'>
        <h1 className='p-2 text-xl font-semibold'><span>{user?.first_name}</span>, добро пожаловать!</h1>
    </div>
  )
}
