import React, { Dispatch, SetStateAction } from 'react'

interface ActionInterface {
    action: boolean;
    setAction: Dispatch<SetStateAction<boolean>>;
    handleDeleteNote: (id: string) => void;
    handleUpdate: any;
    id: string;
};

export const Action: React.FC<ActionInterface> = ({ action, setAction, handleDeleteNote, id, handleUpdate }) => {
    const handleClose = () => {
        setAction(false);
    };

    return (
        <div className='w-full h-full fixed top-0 left-0 rounded flex justify-center items-center bg-black05 z-10' onClick={handleClose}>
            <div className='bg-secondary w-[400px] h-[200px] rounded-xl p-6 flex justify-between flex-col' onClick={(e) => e.stopPropagation()}>
                <p className='text-center text-3xl pb-2'>Delete or rename?</p>
                <div className='flex gap-4 justify-center'>
                    <button className='p-2 px-6 bg-black text-white rounded-md hover:opacity-90' onClick={() => handleDeleteNote(id)}><p className='pb-1'>Delete</p></button>
                    <button className='p-2 px-6 bg-black text-white rounded-md hover:opacity-90' onClick={() => {handleUpdate(); setAction(false)}}><p className='pb-1'>Rename</p></button>
                </div>
            </div>
        </div>
    )
}
