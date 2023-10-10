import React from 'react';

import './Category.css';

const category = [
    {name: "Написать заметку", id: 0},
    {name: "Создать план на день", id: 1},
];

export const Category = () => {
  return (
    <div className='w-screen p-4 flex items-center justify-center'>
        <ul>
            {category.map((item, index) => (
                <li className='category p-4 pl-6 pr-6 text-sm mb-5 text-center rounded-md cursor-pointer' key={index}>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}
