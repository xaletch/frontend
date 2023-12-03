import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center'>
            <h1 className='text-10xl text-center font-bold'>404</h1>
            <Link className='mt-6' to={'/home'}>
                <button className='px-8 p-1 h-[36px] text-white font-medium bg-button rounded hover:opacity-90'>Go back to main</button>
            </Link>
        </div>
    </div>
  )
}
