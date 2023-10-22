import React from 'react'

interface ManageNoteInterface {
    menuOpen: boolean;
    selectOpenTask: string;
}

export const ManageNote: React.FC<ManageNoteInterface> = ({ menuOpen, selectOpenTask }) => {
  return (
    <div className='flex-1 h-screen relative' style={{width: `${menuOpen === false ? `calc(100%)` : `calc(100% - 240px)`}`, left: `${menuOpen === false ? `0` : `240px`}`}}>
        <div className='pt-14'>
            <div className='relative w-full h-[25vh] group bg-purple top-0'>
                <img className='absolute h-full w-full inset-0 object-cover' src="https://note-taking-app-rose.vercel.app/_next/image?url=https%3A%2F%2Ffiles.edgestore.dev%2F7pxmlanlqzp2krj8%2FpublicFiles%2F_public%2F35f0033b-7b5d-41e0-a82f-c7d1caa03afa.png&w=1920&q=75" alt="" />
            </div>
            <h1>{selectOpenTask}</h1>
        </div>
    </div>
  )
}
