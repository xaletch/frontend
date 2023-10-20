import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import link_img from '../../../img/link_img';

import './Menu.css';

import { useTelegram } from '../../../hooks/useTelegram';

// import { MenuInterface, TaskInterface } from '../../../interfaces/interfaces';

interface TaskInterface { 
  name: string;
}

interface MenuInterface {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<TaskInterface[]>>;
  tasks: TaskInterface[];
  setNewTask: Dispatch<SetStateAction<string>>;
  newTask: string;
};

export const Menu: React.FC<MenuInterface> = ({ setMenuOpen, setTasks, tasks, setNewTask, newTask }) => {
  // const [tasks, setTasks] = useState<Array<TaskInterface>>([]);
  // const [newTask, setNewTask] = useState<string>("без названия");
  const [selectTask, setSelectTask] = useState<number>(-1);
  const [changeTaskName, setChangeTaskName] = useState<boolean>(false);
  const [changeTaskValue, setChangeTaskValue] = useState("без названия");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { user } = useTelegram();

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleAddTask = () => {
    const newTasks = {
      name: newTask,
    };
    
    setTasks([...tasks, newTasks]);
    console.log("TASKS: ", newTask);
  };

  const handleChangeName = (index: number) => {
    setSelectTask(index);
    if(index === selectTask) {
      setChangeTaskName(!changeTaskName);
    };
  };
  
  useEffect(() => {
    if (changeTaskName) {
      inputRef.current?.focus();
    };
  }, [changeTaskName]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setChangeTaskName(false);
    };
  }

  const handleTaskNameChange = (index: number, newName: TaskInterface) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], name: newName.name };
    setTasks(updatedTasks);
  
    console.log("tasks", tasks);
    console.log(":", {...updatedTasks[index], name: newName.name});
  };

  return (
    <div className='bg-secondary h-full w-full overflow-y-auto absolute top-0 left-0'>
      <div className='h-full bg-secondary overflow-y-auto flex flex-col'>
        <div>
          <div className='p-3 flex justify-between text-center'>
            <div className='gap-2 flex items-center'>
              <span>
                {/* <img className='rounded-full h-8 w-8' src={user?.photo_url} alt="" /> */}
                <img className='rounded-full h-8 w-8' src={link_img.emptyAvatar} alt="" />
              </span>
              <span className='text-base font-medium capitalize'>{user?.first_name}</span>
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
              <span style={{color: '#676767'}} onClick={handleAddTask}>Новая страница</span>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          {tasks.map((item, index) => (
            <div key={index}>
              <div className='page p-1 px-3 h-8 flex items-center justify-between font-medium cursor-pointer hover:bg-light-grey' onClick={() => handleChangeName(index)}>
                <div className='flex items-center'>
                  <div className='w-4 h-4 mr-1 rounded hover:bg-grey'>
                    <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "#676767" }}>
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                  <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 20" fill="none">
                    <path d="M15.937 6.68C15.926 6.648 15.917 6.617 15.904 6.586C15.8566 6.47747 15.7902 6.37825 15.708 6.293L9.708 0.293C9.62275 0.210782 9.52353 0.144411 9.415 0.0969999C9.385 0.0829999 9.353 0.0749999 9.321 0.0639999C9.23733 0.0355262 9.15022 0.0183742 9.062 0.013C9.04 0.011 9.021 0 9 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V7C16 6.979 15.989 6.96 15.987 6.938C15.9819 6.85016 15.9651 6.7634 15.937 6.68ZM12.586 6H10V3.414L12.586 6ZM2 18V2H8V7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H14L14.002 18H2Z" fill="#676767"/>
                  </svg>
                    {selectTask !== index || changeTaskName !== true ? 
                      <span style={{color: '#676767'}}>{item.name}</span>
                    :
                      <input ref={inputRef} className='outline-none rounded bg-light' type="text" value={tasks[index].name} onKeyDown={handleKeyDown} onChange={(e: any) => handleTaskNameChange(index, { name: e.target.value })} style={{color: '#676767'}}/>
                    }
                </div>
                <div className='setting flex items-center gap-2'>
                  <button className='w-5 h-5 flex justify-center items-center rounded hover:bg-grey'>
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
          ))}

          {/* CREATE PAGE */}
          <div className='p-1 px-3 flex items-center font-medium cursor-pointer hover:bg-light-grey' onClick={handleAddTask}>
            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" fill="#676767"/>
            </svg>
            <span className='' style={{color: '#676767'}}>Добавить страницу</span>
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
