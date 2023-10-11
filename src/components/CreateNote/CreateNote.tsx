import React, { useState, useRef } from 'react'
import { Header } from '../Header/Header'

import './CreateNote.css';
import { CompletedNotes } from '../CompletedNotes/CompletedNotes';
import { Button } from '../Button/Button';

interface NoteInterface {
  name: string,
  done: boolean,
  id: number,
};

export const CreateNote: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [notes, setNotes] = useState<Array<NoteInterface>>([]);
  const [doneNotes, setDoneNotes] = useState<Array<NoteInterface>>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);
  const [noteDone, setNoteDone] = useState<boolean>(false);
  const [completedNode, setCompletedNode] = useState(true);

  const handleChangeInput = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClickCreateNote = () => {
    inputRef.current.focus();
  };

  const handleNoteAdd = () => {
    if (inputValue) {
      const newNotes = {
        name: inputValue,
        done: noteDone,
        id: notes.length + 1,
      };

      noteDone ? setDoneNotes([...doneNotes, newNotes]) : setNotes([...notes, newNotes]);

      setNotes([...notes, newNotes]);
      setInputValue('');
    };
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newNotes = {
        name: inputValue,
        done: noteDone,
        id: notes.length + 1,
      };

      setNotes([...notes, newNotes]);
      setInputValue('');
    };
  };

  const handleNoteDone = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index].done = !updatedNotes[index].done;
    const doneNote = updatedNotes[index];
    setNotes(updatedNotes);

    setDoneNotes([...doneNotes, doneNote]);

    setNotes(notes.filter(item => item.done !== updatedNotes[index].done));
  };

  const handleCompletedNode = () => {
    setCompletedNode(!completedNode);
  };

  return (
    <div className='p-4 w-screen h-screen'>
        <Header />
        <div className='mt-8 flex relative items-center'>
          <input className='input w-screen p-4 pl-6 pr-14 text-sm outline-none' type='text' ref={inputRef} value={inputValue} onChange={handleChangeInput} onKeyDown={handleKeyDown} placeholder='обновить бота'/>
          {inputValue && 
            <div className='absolute right-2 flex'>
              <div className='node-btn w-8 h-10 flex justify-center items-center transition ease-in-ou rounded cursor-pointer' onClick={handleNoteAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <div onClick={handleNoteAdd} className='node-btn w-8 h-10 flex justify-center items-center transition ease-in-ou rounded cursor-pointe'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                  <path d="M12.2473 4.94844C7.36828 4.94844 3.24728 9.06944 3.24728 13.9484C3.24728 18.8274 7.36828 22.9484 12.2473 22.9484C17.1263 22.9484 21.2473 18.8274 21.2473 13.9484C21.2473 9.06944 17.1263 4.94844 12.2473 4.94844ZM12.2473 20.9484C8.45328 20.9484 5.24728 17.7424 5.24728 13.9484C5.24728 10.1544 8.45328 6.94844 12.2473 6.94844C16.0413 6.94844 19.2473 10.1544 19.2473 13.9484C19.2473 17.7424 16.0413 20.9484 12.2473 20.9484Z" fill="#FFf"/>
                  <path d="M13.2473 12.9484V8.94844H11.2473V14.9484H17.2473V12.9484H13.2473ZM17.5313 4.65544L18.9433 3.23944L21.9533 6.23944L20.5403 7.65644L17.5313 4.65544ZM6.94528 4.65544L3.95528 7.65444L2.53728 6.24244L5.52728 3.24244L6.94528 4.65544Z" fill="#FFf"/>
                </svg>
              </div>
            </div>
          }
        </div>
        <div className='mt-6'>
          <ul>
            {notes.map((item, index) => (
              <div key={index} className='note p-3 pl-9 mb-1 text-start text-sm relative flex items-center justify-between'>
                <span className='w-4 h-4 rounded-full absolute left-3 cursor-pointer flex items-center justify-center' onClick={() => handleNoteDone(index)}>
                  <svg className={item.done ? 'active' : 'hidden'} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                <li>{item.name}</li>
                <div className='important cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 25" fill="none">
                    <path d="M6.516 14.823L5.026 21.275C4.97986 21.4704 4.99371 21.6751 5.06574 21.8625C5.13777 22.0499 5.26464 22.2112 5.42976 22.3253C5.59489 22.4395 5.79061 22.5012 5.99135 22.5024C6.19209 22.5036 6.38852 22.4442 6.555 22.332L12 18.702L17.445 22.332C17.6153 22.4451 17.8162 22.5033 18.0206 22.4988C18.225 22.4944 18.4232 22.4274 18.5884 22.3069C18.7536 22.1865 18.878 22.0183 18.9448 21.8251C19.0116 21.6318 19.0176 21.4228 18.962 21.226L17.133 14.826L21.669 10.744C21.8143 10.6132 21.918 10.4427 21.9674 10.2535C22.0168 10.0644 22.0097 9.86488 21.9469 9.67974C21.8841 9.4946 21.7685 9.33193 21.6142 9.21183C21.4599 9.09173 21.2739 9.01947 21.079 9.004L15.378 8.55L12.911 3.089C12.8323 2.91316 12.7045 2.76384 12.5428 2.65906C12.3812 2.55429 12.1926 2.49854 12 2.49854C11.8074 2.49854 11.6188 2.55429 11.4572 2.65906C11.2955 2.76384 11.1677 2.91316 11.089 3.089L8.622 8.55L2.921 9.003C2.72945 9.01818 2.54633 9.08821 2.39355 9.20473C2.24077 9.32125 2.12479 9.47932 2.05949 9.66003C1.99419 9.84074 1.98233 10.0364 2.02534 10.2237C2.06835 10.411 2.1644 10.5819 2.302 10.716L6.516 14.823ZM9.369 10.497C9.54749 10.4829 9.71892 10.4211 9.8653 10.318C10.0117 10.2149 10.1276 10.0743 10.201 9.911L12 5.93L13.799 9.911C13.8724 10.0743 13.9883 10.2149 14.1347 10.318C14.2811 10.4211 14.4525 10.4829 14.631 10.497L18.603 10.812L15.332 13.756C15.048 14.012 14.935 14.406 15.039 14.774L16.292 19.159L12.556 16.668C12.392 16.5579 12.199 16.4992 12.0015 16.4992C11.804 16.4992 11.611 16.5579 11.447 16.668L7.543 19.271L8.593 14.725C8.6315 14.5578 8.62633 14.3835 8.57799 14.2189C8.52966 14.0543 8.43978 13.9048 8.317 13.785L5.279 10.823L9.369 10.497Z" fill="#FFF"/>
                  </svg>
                </div>
              </div>
            ))}
          </ul>
          {notes.length <= 0 && doneNotes.length <= 0 && <p className='text-sm pt-20'>У вас пока нет заметок. <span className='cursor-pointer font-medium' onClick={handleClickCreateNote}>Создать</span></p>}
          {notes.length <= 0 && doneNotes.length > 0 && <p className='text-sm pt-20'>Поздравляю вы выполнили все задачи! <span className='cursor-pointer font-medium' onClick={handleClickCreateNote}>Создать ещё</span></p>}
        </div>
        <div className='mt-14 flex flex-col'>
          {doneNotes.length !== 0 && <Button className='w-30 p-2 mr-auto pl-6 pr-6 text-sm' onClick={handleCompletedNode}>Завершенные {doneNotes.length}</Button>}
          {completedNode && doneNotes.map((obj, index) => <CompletedNotes {...obj} key={index}/>)}
        </div>
    </div>
  )
}