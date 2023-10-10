import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'

export const Loading = () => {
    const { user } = useTelegram();

    return (
        <div className='h-screen flex items-center justify-center'>
            <h1 className='p-2 text-base text-center'><span>{user?.first_name}шрекович</span>, добро пожаловать!</h1>
        </div>
    )
}
