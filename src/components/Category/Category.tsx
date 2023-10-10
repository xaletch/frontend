import React from 'react';

const category = [
    {name: "Заметки", id: 0},
    {name: "Создать план на день", id: 1},
]

export const Category = () => {
  return (
    <div className='w-screen'>
        <ul className='flex justify-center gap-4'>
            {category.map((item, index) => (
                <li className='button p-1 pl-3 pr-3 text-sm rounded-md' key={index}>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}
