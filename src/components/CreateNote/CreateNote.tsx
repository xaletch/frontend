import React, { useState, useRef } from 'react'
import { Header } from '../Header/Header'

import './CreateNote.css';

interface NoteInterface {
  name: string,
  done: boolean,
  id: number,
};

export const CreateNote: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [notes, setNotes] = useState<Array<NoteInterface>>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);

  const handleChangeInput = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClickCreateNote = () => {
    inputRef.current.focus();
  };

  const handleNoteAdd = () => {
    if(inputValue) {
      const newNotes = {
        name: inputValue,
        done: false,
        id: 1,
      }

      setNotes([...notes, newNotes]);
      setInputValue('');
    };
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newNotes = {
        name: inputValue,
        done: false,
        id: 1,
      };

      setNotes([...notes, newNotes]);
      setInputValue('');
    };
  };

  return (
    <div className='p-4 w-screen h-screen'>
        <Header />
        <div className='mt-8 flex relative items-center'>
            <input className='input w-screen p-4 pl-6 pr-10 text-sm outline-none' type='text' ref={inputRef} value={inputValue} onChange={handleChangeInput} onKeyDown={handleKeyDown} placeholder='обновить бота'/>
            <div onClick={handleNoteAdd} className='w-8 h-10 flex justify-center items-center transition ease-in-ou rounded absolute right-8 cursor-pointer  hover:bg-slate-200'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                    <path d="M12.2473 4.94844C7.36828 4.94844 3.24728 9.06944 3.24728 13.9484C3.24728 18.8274 7.36828 22.9484 12.2473 22.9484C17.1263 22.9484 21.2473 18.8274 21.2473 13.9484C21.2473 9.06944 17.1263 4.94844 12.2473 4.94844ZM12.2473 20.9484C8.45328 20.9484 5.24728 17.7424 5.24728 13.9484C5.24728 10.1544 8.45328 6.94844 12.2473 6.94844C16.0413 6.94844 19.2473 10.1544 19.2473 13.9484C19.2473 17.7424 16.0413 20.9484 12.2473 20.9484Z" fill="black"/>
                    <path d="M13.2473 12.9484V8.94844H11.2473V14.9484H17.2473V12.9484H13.2473ZM17.5313 4.65544L18.9433 3.23944L21.9533 6.23944L20.5403 7.65644L17.5313 4.65544ZM6.94528 4.65544L3.95528 7.65444L2.53728 6.24244L5.52728 3.24244L6.94528 4.65544Z" fill="black"/>
                </svg>
            </div>
        </div>
        <div className='mt-6'>
                <ul>
                    {notes.map((item, index) => (
                        <div key={index} className='note p-3 pl-9 mb-1 text-start text-sm relative flex items-center'>
                            <span className='w-4 h-4 rounded-full absolute left-3 cursor-pointer hover:bg-slate-300'></span>
                            <li>{item.name}</li>
                        </div>
                    ))}
                </ul>
                {notes.length <= 0 && <p className='text-sm'>У вас пока нет заметок. <span className='cursor-pointer font-medium' onClick={handleClickCreateNote}>Создать</span></p>}
        </div>
    </div>
  )
}

{/* <Button className='p-2 pl-6 pr-6'>Создать</Button> */}