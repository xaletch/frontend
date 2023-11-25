import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';

import link_img from '../../../img/link_img';

import './Menu.css';

import Axios from '../../../axios';
import { NoteItem } from '../../NotePage/Menu/NoteItem/NoteItem';

interface MenuInterface {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
};

type NoteType = {
  _id: string;
  name: string;
  smile: string;
}

export const Menu: React.FC<MenuInterface> = ({ setMenuOpen, menuOpen, isUpdate, setIsUpdate }) => {
  const [noteName, setNoteName] = useState<string>("без названия");
  const [noteId, setNoteId] = useState<string>("");
  const [note, setNote] = useState<NoteType[]>([]);
  const [addNote, setAddNote] = useState(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const myAccount = async () => {
      try {
        const { data } = await Axios.get('/user/account');
        setUsername(data.username);
      }
      catch (err) {
        console.log('При получении имени пользователя произошла ошибка: \n', err);
      }
    };
    myAccount();
  }, []);
 
  useEffect(() => {
    const noteData = async () => {
      try {
        const data = await Axios.get('/notes');
        setNote(data.data);
        setAddNote(false);
      }
      catch (err) {
        console.log('При получении заметок произошла ошибка: \n', err);
      }
    }
    noteData();
  }, [isUpdate, addNote]);

  const handleSelectNote = async (id: any) => {
    await Axios.get(`/notes/oneNote/${id}`);
  }
  
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleCreateNote = async () => {
    try {
      await Axios.post('/notes/save', noteName);
      setAddNote(true);
    }
    catch (err) {
      console.log('Не удалось создать заметку: \n', err);
    }
  };

  const handleUpdate = async (_id: string, name: string) => {
    setIsUpdate(true);
    setNoteId(_id);
    setNoteName(name);
  }

  return (
    <div className='bg-secondary h-full w-60 fixed top-0 left-0 overflow-hidden'>
      <div className='h-full bg-secondary flex flex-col'>
        <div>
          <div className='p-3 flex justify-between text-center'>
            <div className='gap-2 flex items-center'>
              <div className='w-[24px] h-[24px] bg-light-grey rounded-md flex justify-center items-center'>
                <span className='text-base uppercase font-medium text-username'>{username[0]}</span>
              </div>
              <span className='text-base font-medium capitalize text-noteName'>{username}</span>
            </div>
            <div className='p-1 cursor-pointer flex items-center rounded hover:bg-grey' onClick={handleCloseMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 16 12" fill="none">
                <path d="M0 0H16V2H0V0ZM4 5H16V7H4V5ZM9 10H16V12H9V10Z" fill="#8f8f8f" fillOpacity="0.8"/>
              </svg>
            </div>
          </div>
          <div className=''>
            <div className='p-1 px-3 flex items-center font-medium cursor-pointer hover:bg-light-grey'>
              <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 19 19" fill="none">
                <path d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z" fill="#676767"/>
              </svg>
              <span style={{color: '#676767'}}>Поиск</span>
            </div>
            <div className='p-1 px-3 flex items-center font-medium cursor-pointer hover:bg-light-grey'>
              <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.8 5H8.2V8.2H5V9.8H8.2V13H9.8V9.8H13V8.2H9.8V5Z" fill="#676767"/>
                <path d="M9 0C4.0374 0 0 4.0374 0 9C0 13.9626 4.0374 18 9 18C13.9626 18 18 13.9626 18 9C18 4.0374 13.9626 0 9 0ZM9 16.2C5.0301 16.2 1.8 12.9699 1.8 9C1.8 5.0301 5.0301 1.8 9 1.8C12.9699 1.8 16.2 5.0301 16.2 9C16.2 12.9699 12.9699 16.2 9 16.2Z" fill="#676767"/>
              </svg>
              <span style={{color: '#676767'}} onClick={handleCreateNote}>Новая страница</span>
            </div>
          </div>
        </div>
        <div className='mt-4 overflow-auto'>
          {note.reverse().map((item: NoteType) => <NoteItem 
            key={item._id} name={item.name} id={item._id} smile={item.smile}
            noteName={noteName} setNote={setNote} setNoteName={setNoteName} setIsUpdate={setIsUpdate} isUpdate={isUpdate} noteId={noteId}
            handleUpdate={() => handleUpdate(item._id, item.name)}
            handleSelectNote={handleSelectNote}
           />)}

          {/* CREATE PAGE */}
          <div className='p-1 px-3 flex items-center font-medium cursor-pointer hover:bg-light-grey'>
            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" fill="#676767"/>
            </svg>
            <span className='' style={{color: '#676767'}} onClick={handleCreateNote}>Добавить страницу</span>
          </div>

          {/* BASKET */}
          <div className='mt-4 p-1 px-3 flex items-center font-medium cursor-pointer hover:bg-light-grey'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 20" fill="none">
              <path d="M12 0H6C4.897 0 4 0.897 4 2V4H0V6H2V18C2 19.103 2.897 20 4 20H14C15.103 20 16 19.103 16 18V6H18V4H14V2C14 0.897 13.103 0 12 0ZM6 2H12V4H6V2ZM14 18H4V6H14V18Z" fill="#676767"/>
            </svg>
            <span style={{color: '#676767'}}>Корзина</span>
          </div>
        </div>
      </div>
    </div>
  )
}