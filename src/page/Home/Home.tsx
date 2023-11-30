import React from 'react';
import { Category } from '../../components/Category/Category';
import { Header } from '../../components/Header/Header';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Header />
      <div className='container px-32'>
        <div className='flex justify-center flex-col text-center mt-24'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-8xl font-bold leading-[68px] text-text-home'>Write, plan, share. <br/> With AI at your side.</h1>
            <p className='text-4xl font-medium text-text-home'>Name is the connected workspace where better, faster work happens.</p>
            <Link to='/:id'>
              <button className='px-8 p-1 h-[36px] text-white font-medium bg-button rounded hover:opacity-90'>Get name free</button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='h-screen flex justify-center'>
        <Category />
      </div> */}
    </div>
  )
}
