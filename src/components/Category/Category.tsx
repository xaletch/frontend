import React from 'react';

import { Link } from 'react-router-dom';

import './Category.css';

const category = [
    {name: "Создать заметку", link: 'note', id: 0},
    {name: "Создать план на день", link: 'plan-day', id: 1},
];

export const Category = () => {
  return (
    <div className='max-w-3xl flex items-center justify-center flex-col '>
        <p className='mb-20 text-3xl text-center font-bold'>Ваши идеи, документы и планы едины. Добро пожаловать в (Название отсутствует)</p>
        <ul>
            {category.map((item, index) => (
                <Link to={item.link} key={index}>
                    <li className='category p-4 pl-6 pr-6 text-sm mb-5 text-center rounded-md cursor-pointer'>{item.name}</li>
                </Link>
            ))}
        </ul>
    </div>
  )
}
