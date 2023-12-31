import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import './Menu.css';

import Axios from '../../../axios';
import { Item } from '../Item/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fetchNotes } from '../../../redux/slice/noteSlice';

type NoteType = {
  _id: string;
  name: string;
  smile: string;
}

interface MenuInterface {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  username: string;
  setControlCords: Dispatch<SetStateAction<{x: number, y: number}>>;
  setIsControl: Dispatch<SetStateAction<boolean>>;
  controlCords: { x: number, y: number };
};

export const Menu: React.FC<MenuInterface> = ({ setMenuOpen, menuOpen, isUpdate, setIsUpdate, username, controlCords, setControlCords, setIsControl }) => {
  const dispatch = useDispatch();

  const [noteName, setNoteName] = useState<string>("без названия");
  const [noteId, setNoteId] = useState<string>("");

  const documents = useSelector((state: RootState) => state.note.itemsNote);

  const handleSelectNote = async (id: any) => {
    await Axios.get(`/notes/oneNote/${id}`);
  };
  
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleCreateNote = async () => {
    try {
      const data = await Axios.post('/notes/save', noteName);

      dispatch(fetchNotes(data.data));

      navigate(data.data.note._id);
    }
    catch (err) {
      console.log('Не удалось создать заметку: \n', err);
    }
  };

  const handleUpdate = async (_id: string, name: string) => {
    setIsUpdate(true);
    setNoteId(_id);
    setNoteName(name);
  };

  const handleCords = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    setControlCords({ x: event.clientX, y: event.clientY});
  };

  return (
    <div className='bg-secondary h-full w-60 fixed top-0 left-0 overflow-hidden' onClick={(e) => handleCords(e)}>
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
              <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.01918 5.371e-05C8.08305 -0.00613255 7.22258 0.522515 6.80556 1.35872L6.41877 2.13235C6.26635 2.18896 6.1164 2.25096 5.96806 2.31777L5.14814 2.04444C4.26236 1.74874 3.27923 1.98318 2.62285 2.65024C1.97594 3.30778 1.75387 4.27582 2.04587 5.14858L2.31917 5.96698C2.25094 6.11638 2.18709 6.26732 2.12898 6.42093L1.35861 6.80615C0.523352 7.2228 -0.00678197 8.08251 6.55493e-05 9.01837C0.00681727 9.94106 0.533865 10.7827 1.35701 11.1938L2.13218 11.5838C2.189 11.7363 2.25079 11.8863 2.31758 12.0346L2.04587 12.853C1.75048 13.738 1.98415 14.7204 2.65002 15.3769C3.30699 16.0247 4.27501 16.2469 5.14814 15.9555L5.96646 15.6838C6.11566 15.7519 6.26696 15.8143 6.42037 15.8724L6.80556 16.6413C7.22258 17.4775 8.08305 18.0073 9.01918 17.9999C9.94161 17.9937 10.7835 17.4652 11.1944 16.6413L11.5796 15.8708C11.734 15.8136 11.8866 15.7515 12.0367 15.6838L12.8519 15.9555C13.725 16.2469 14.693 16.0248 15.35 15.3769C16.0162 14.72 16.2503 13.7368 15.9541 12.8514L15.6824 12.033C15.7503 11.8842 15.8132 11.7336 15.871 11.5806L16.6414 11.1938C17.4652 10.783 17.9932 9.94146 17.9999 9.01837C18.0068 8.08248 17.4766 7.2228 16.6414 6.80615L15.8678 6.41933C15.8109 6.26591 15.7494 6.11468 15.6824 5.96538L15.9541 5.14858V5.14698C16.2453 4.27463 16.0237 3.30738 15.3772 2.65024C14.7208 1.98305 13.7376 1.74883 12.8519 2.04444L12.0319 2.31777C11.8832 2.25003 11.7326 2.187 11.5796 2.12916L11.1944 1.35872C10.7836 0.534764 9.94165 0.00726073 9.01918 5.371e-05ZM9.00639 1.63684C9.31416 1.63922 9.59223 1.81377 9.73042 2.09079L10.2499 3.12977C10.2986 3.22749 10.3665 3.31447 10.4494 3.38557C10.5322 3.45667 10.6285 3.51046 10.7325 3.54376C11.0409 3.64213 11.3403 3.76554 11.6276 3.9146C11.7246 3.96508 11.8307 3.99561 11.9397 4.0044C12.0486 4.01318 12.1583 4.00004 12.2621 3.96575L13.3681 3.59811H13.3697C13.6678 3.49851 13.9915 3.57644 14.2104 3.79791C14.426 4.01722 14.4988 4.33709 14.4006 4.63069V4.63229L14.0346 5.73361C14.0005 5.83652 13.9871 5.94519 13.9954 6.05331C14.0036 6.16142 14.0332 6.26682 14.0825 6.36339C14.2298 6.65136 14.3519 6.95147 14.4485 7.2601C14.4815 7.36513 14.5352 7.46244 14.6067 7.54621C14.6781 7.62998 14.7656 7.69848 14.8641 7.74762L15.9094 8.27031C16.1905 8.41043 16.3656 8.69386 16.3633 9.00558C16.361 9.31273 16.1866 9.59144 15.9094 9.72967H15.9078L14.8689 10.2508C14.7715 10.2997 14.6848 10.3676 14.614 10.4505C14.5432 10.5334 14.4897 10.6296 14.4565 10.7335C14.3576 11.0419 14.2337 11.3413 14.0841 11.6286C14.0334 11.7258 14.0028 11.8322 13.994 11.9415C13.9852 12.0508 13.9985 12.1607 14.033 12.2648L14.4006 13.3693C14.5003 13.6672 14.4246 13.991 14.2024 14.2101C13.9834 14.426 13.6634 14.4999 13.3697 14.4019H13.3681L12.2669 14.0358C12.1638 14.0015 12.0548 13.988 11.9464 13.9963C11.838 14.0045 11.7323 14.0343 11.6356 14.0838C11.3472 14.2316 11.0481 14.3544 10.7389 14.4514C10.6339 14.4843 10.5366 14.5381 10.4528 14.6095C10.3691 14.6809 10.3006 14.7685 10.2515 14.867L9.73042 15.9092C9.59224 16.1863 9.31421 16.3607 9.00639 16.3631C8.69388 16.3656 8.40988 16.1905 8.26958 15.9092L7.75014 14.8718C7.70138 14.7741 7.63355 14.6871 7.55065 14.616C7.46775 14.5449 7.37147 14.4911 7.26746 14.4578C6.95862 14.3588 6.65853 14.2351 6.37082 14.0854C6.27362 14.0347 6.16723 14.004 6.05796 13.9952C5.94868 13.9865 5.83876 13.9997 5.73471 14.0342L4.63029 14.4019C4.33659 14.4999 4.01655 14.4266 3.79759 14.2101C3.57539 13.9911 3.49974 13.6672 3.5994 13.3693V13.3677L3.96541 12.2664C3.9995 12.1631 4.01268 12.0541 4.00417 11.9457C3.99566 11.8373 3.96564 11.7317 3.91586 11.635C3.76823 11.3476 3.64539 11.0481 3.54825 10.7399C3.51551 10.6354 3.46214 10.5386 3.39131 10.4551C3.32048 10.3717 3.23363 10.3033 3.1359 10.254L2.09222 9.72967H2.09062C1.81344 9.59141 1.63896 9.31289 1.63671 9.00558C1.63443 8.69386 1.8095 8.41052 2.09062 8.27031L3.1295 7.75082C3.22722 7.70205 3.31418 7.63421 3.38528 7.55131C3.45637 7.4684 3.51015 7.37211 3.54346 7.26809C3.6424 6.95971 3.76632 6.66027 3.91586 6.37298C3.96634 6.27598 3.99687 6.16986 4.00565 6.06087C4.01444 5.95188 4.0013 5.84223 3.96701 5.7384L3.5994 4.63229V4.63069C3.50118 4.33715 3.57398 4.01706 3.7896 3.79791C4.0085 3.57552 4.33225 3.49882 4.63029 3.59811L5.73311 3.96575C5.83625 4.00009 5.9452 4.01353 6.05359 4.0053C6.16199 3.99707 6.26766 3.96732 6.36443 3.91779C6.65192 3.77056 6.95133 3.64839 7.25947 3.55176C7.36449 3.51882 7.46179 3.46505 7.54555 3.39364C7.62931 3.32223 7.69781 3.23466 7.74695 3.13616L8.26958 2.09079C8.40987 1.80932 8.69388 1.6344 9.00639 1.63684ZM9.0032 4.90882C6.75316 4.90882 4.9068 6.74896 4.9068 8.99919C4.90678 11.2494 6.75315 13.0944 9.0032 13.0944C11.2532 13.0944 13.0916 11.2494 13.0916 8.99919C13.0916 6.74896 11.2532 4.90882 9.0032 4.90882ZM9.0032 6.54561C10.3687 6.54561 11.455 7.63354 11.455 8.99919C11.455 10.3648 10.3687 11.4576 9.0032 11.4576C7.63766 11.4576 6.54343 10.3648 6.54344 8.99919C6.54344 7.63354 7.63767 6.54561 9.0032 6.54561Z" fill="#676767"/>
              </svg>
              <span style={{color: '#676767'}}>Настройки</span>
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
        <div className='mt-4 overflow-hidden'>
          <div className='h-[500px] overflow-auto'>
            {documents.map((item: NoteType) =>  <Item 
              key={item._id} name={item.name} id={item._id} smile={item.smile}
              noteName={noteName} isUpdate={isUpdate} noteId={noteId} setIsControl={setIsControl}
              handleUpdate={() => handleUpdate(item._id, item.name)}
              handleSelectNote={handleSelectNote}
            />)}
          </div>
          <div className='mt-4'>
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
    </div>
  )
}

function navigate(_id: any) {
  throw new Error('Function not implemented.');
}
