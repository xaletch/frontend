import React from 'react'
import { useTelegram } from '../../../hooks/useTelegram'

export const NoteCreate = () => {
  const { user } = useTelegram()
  
  return (
    <div className='flex justify-center items-center flex-col h-screen w-screen absolute top-0 left-0 -z-10'>
      <h2 className='text-2xl font-medium'>{user?.first_name}шрекович добро пожаловать</h2>
      <button className='mt-4 inline-flex items-center justify-center rounded-sm text-sm font-medium bg-dark h-10 px-4 py-2 hover:opacity-90' style={{color: '#f1f1f1'}}>
        <svg className='mr-2' width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.8 5H8.2V8.2H5V9.8H8.2V13H9.8V9.8H13V8.2H9.8V5Z" fill="#F1F1F1"/>
          <path d="M9 0C4.0374 0 0 4.0374 0 9C0 13.9626 4.0374 18 9 18C13.9626 18 18 13.9626 18 9C18 4.0374 13.9626 0 9 0ZM9 16.2C5.0301 16.2 1.8 12.9699 1.8 9C1.8 5.0301 5.0301 1.8 9 1.8C12.9699 1.8 16.2 5.0301 16.2 9C16.2 12.9699 12.9699 16.2 9 16.2Z" fill="#F1F1F1"/>
        </svg>
        Создать заметку
      </button>
    </div>
  )
}
