import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'

export const Loading = () => {

    const { user } = useTelegram();

    return (
        <div className='h-screen flex pt-32 justify-center'>
            <h1 className='p-2 text-sm text-center'><span className='capitalize'>{user?.first_name}</span>, добро пожаловать!</h1>
        </div>
    )
}
