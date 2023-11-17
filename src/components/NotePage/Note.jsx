import React, { useState } from 'react';
import { updateNote } from '../../utils/HandleApi.ts';
// interface NoteInterface {
//     name: string;
// }

export const Note = ({ name, id, noteName, setNote, setNoteName, setIsUpdate, isUpdate, noteId, updateMode, deleteNote }) => {
  const inputRef = React.useRef(null);

  console.log('123: ', noteName)

  return (
    <div>
    <div className='page p-1 px-3 h-8 flex items-center justify-between font-medium cursor-pointer hover:bg-light-grey' onDoubleClick={updateMode}>
      <div className='flex items-center'>
        <div onClick={() => updateNote(noteId, noteName, setNoteName, setNote, setIsUpdate)} className='w-4 h-4 mr-1 rounded hover:bg-grey'>
          <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "#676767" }}>
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>
        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 20" fill="none">
          <path d="M15.937 6.68C15.926 6.648 15.917 6.617 15.904 6.586C15.8566 6.47747 15.7902 6.37825 15.708 6.293L9.708 0.293C9.62275 0.210782 9.52353 0.144411 9.415 0.0969999C9.385 0.0829999 9.353 0.0749999 9.321 0.0639999C9.23733 0.0355262 9.15022 0.0183742 9.062 0.013C9.04 0.011 9.021 0 9 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V7C16 6.979 15.989 6.96 15.987 6.938C15.9819 6.85016 15.9651 6.7634 15.937 6.68ZM12.586 6H10V3.414L12.586 6ZM2 18V2H8V7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H14L14.002 18H2Z" fill="#676767"/>
        </svg>
          {!isUpdate || noteId !== id ? 
            <span style={{color: '#676767'}}>{name}</span>
          :
            <input ref={inputRef} className='outline-none rounded bg-light' type="text" value={noteName} onChange={(e) => setNoteName(e.target.value)} style={{color: '#676767'}}/>
          }
      </div>
      <div className='setting flex items-center gap-2'>
        <button className='w-5 h-5 flex justify-center items-center rounded hover:bg-grey' onClick={deleteNote}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 16 4" fill="none">
            <path d="M8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0Z" fill="#676767"/>
          </svg>
        </button>
        <button className='w-5 h-5 flex justify-center items-center rounded hover:bg-grey'>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" fill="#676767"/>
          </svg>
        </button>
      </div>
    </div>
    <p className='text-sm font-medium' style={{color: '#676767', paddingLeft: '37px'}}>Нет страниц внутри</p>
  </div>
  )
}
