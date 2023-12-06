import React from 'react'

type HeaderTypes = {
    menuOpen: boolean;
    name: string | undefined;
    smile: string | undefined;
};

export const Header: React.FC<HeaderTypes> = ({ menuOpen, name, smile }) => {
  return (
    <div className='flex-1 relative p-2 px-3' style={{width: `${menuOpen === true ? `calc(100%)` : `calc(100% - 240px)`}`, left: `${menuOpen === true ? `0` : `240px`}`}}>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-1'>
                <p>{smile}</p>
                <button className='p-1 text-base rounded-md hover:bg-btn-hover'>
                    <span>{name}</span>
                </button>
            </div>
            <div className='flex items-center'>...</div>
        </div>
    </div>
  )
}
