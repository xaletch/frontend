import React from 'react';
import { Button } from '../../components/Button/Button';
import { Category } from '../../components/Category/Category';

export const Home = () => {
  return (
    <div className='p-4 h-screen flex justify-center'>
        <Category />
        {/* <Button className='p-2 pl-6 pr-6'>Создать</Button> */}
    </div>
  )
}
