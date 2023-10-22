import React, { Dispatch, SetStateAction } from 'react'

interface MenuInterface {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectOpenTask: string;
}

export const Header: React.FC<MenuInterface> = ({ menuOpen, setMenuOpen, selectOpenTask }) => {
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className='absolute top-0 left-0 right-0'>
      <nav className='p-2 px-3 flex items-center gap-4'>
        <svg className='cursor-pointer' onClick={handleMenu} xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 16 12" fill="none">
          <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="#CCCCCC"/>
        </svg>
        <div className='w-full flex justify-between'>
          <div className='text-sm h-auto p-1'>{selectOpenTask}</div>
          <div className='flex items-center'>
            <button className='px-3 text-sm h-auto cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
