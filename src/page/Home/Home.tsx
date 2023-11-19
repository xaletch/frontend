import React from 'react';
import { Category } from '../../components/Category/Category';
import { Header } from '../../components/Header/Header';

export const Home = () => {
  return (
    <div>
      <Header />
      <div className='h-screen flex justify-center'>
        <Category />
      </div>
    </div>
  )
}
