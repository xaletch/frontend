import React from 'react';

import './Category.css';

const category = [
    {name: "Создать заметку", id: 0},
    {name: "Создать план на день", id: 1},
];

export const Category = () => {
  return (
    <div className='w-screen flex items-center justify-center flex-col'>
        <p className='mb-20 text-sm text-center'>Здесь вы можете управлять своими заметками. <br/>  Но для начала вам предстоит создать забетку/план.</p>
        <ul>
            {category.map((item, index) => (
                <li className='category p-4 pl-6 pr-6 text-sm mb-5 text-center rounded-md cursor-pointer' key={index}>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}
