import React, { Dispatch, SetStateAction } from 'react'
import Axios from '../../../axios';

import './Control.css';
import { useNavigate } from 'react-router-dom';

type NoteType = {
    _id: string;
    name: string;
    smile: string;
};

type ControlTypes = {
  name: string | undefined;
  id: string | undefined;
  username: string;
  controlCords: { x: number, y: number };
  setNote: Dispatch<SetStateAction<NoteType[]>>;
  setIsControl: Dispatch<SetStateAction<boolean>>;
};

export const Control: React.FC<ControlTypes> = ({ name, username, controlCords, setNote, id, setIsControl}) => {
    const navigate = useNavigate();

    const handleDeleteNote = async (id: string) => {
        try {
            await Axios.delete(`/notes/delete/${id}`);
            setNote(note => note.filter(item => item._id !== id));

            setIsControl(false);
            navigate('/documents');
        } catch (err) {
            console.log('Не удалось удалить заметку: \n', err);
        }
    };
    
    return (
        <div className='absolute left-[195px] w-[225px] bg-white box-shadow z-50' style={{top: controlCords.y}}>
            <div className=''>
                <div className='bg-white'></div>
                <div className='p-2 px-0'>
                    <div className='flex items-center ml-1 mr-1 pt-1 pb-1 px-3 cursor-default rounded text-base hover:bg-white-2' onClick={() => id && handleDeleteNote(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.5644 2.31854H10.1149V1.6029C10.1149 1.11999 9.72219 0.727264 9.23928 0.727264H6.76074C6.27783 0.727264 5.8851 1.11999 5.8851 1.6029V2.31854H3.43564C2.76074 2.31854 2.20801 2.86836 2.20801 3.54617V4.75054C2.20801 4.91054 2.33892 5.04145 2.49892 5.04145H3.10692V14.048C3.10692 14.7258 3.65674 15.2756 4.33164 15.2756H11.6655C12.3433 15.2756 12.8931 14.7258 12.8931 14.048V5.03854H13.5011C13.6611 5.03854 13.792 4.90763 13.792 4.74763V3.54326C13.792 2.86836 13.2422 2.31854 12.5644 2.31854ZM6.46692 1.6029C6.46692 1.43999 6.59783 1.30908 6.76074 1.30908H9.23928C9.40219 1.30908 9.5331 1.43999 9.5331 1.6029V2.31854H6.46692V1.6029ZM12.3113 14.0451C12.3113 14.4029 12.0233 14.6909 11.6655 14.6909H4.33164C3.97674 14.6909 3.68874 14.4029 3.68874 14.0451V5.03854H12.3113V14.0451ZM13.2102 4.45672H2.78983V3.54326C2.78983 3.18836 3.07783 2.89745 3.43564 2.89745H12.5673C12.9222 2.89745 13.2131 3.18545 13.2131 3.54326V4.45672H13.2102Z" fill="#676767"/>
                            <path d="M8.95126 13.5273C9.11127 13.5273 9.24217 13.3964 9.24217 13.2364V6.49309C9.24217 6.33309 9.11127 6.20218 8.95126 6.20218C8.79127 6.20218 8.66036 6.33309 8.66036 6.49309V13.2364C8.66036 13.3964 8.79127 13.5273 8.95126 13.5273ZM7.04872 13.5273C7.20872 13.5273 7.33963 13.3964 7.33963 13.2364V6.49309C7.33963 6.33309 7.20872 6.20218 7.04872 6.20218C6.88872 6.20218 6.75781 6.33309 6.75781 6.49309V13.2364C6.75781 13.3964 6.88581 13.5273 7.04872 13.5273ZM10.8567 13.5273C11.0167 13.5273 11.1476 13.3964 11.1476 13.2364V6.49309C11.1476 6.33309 11.0167 6.20218 10.8567 6.20218C10.6967 6.20218 10.5658 6.33309 10.5658 6.49309V13.2364C10.5658 13.3964 10.6967 13.5273 10.8567 13.5273ZM5.14327 13.5273C5.30327 13.5273 5.43417 13.3964 5.43417 13.2364V6.49309C5.43417 6.33309 5.30327 6.20218 5.14327 6.20218C4.98327 6.20218 4.85236 6.33309 4.85236 6.49309V13.2364C4.85236 13.3964 4.98327 13.5273 5.14327 13.5273Z" fill="#676767"/>
                        </svg>
                        <p className='ml-3 text-gray2'>Delete</p>
                    </div>
                    <div className='flex items-center ml-1 mr-1 pt-1 pb-1 px-3 cursor-default rounded text-base hover:bg-white-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6587 1.34134L14.6587 3.34134L13.134 4.86667L11.134 2.86667L12.6587 1.34134ZM5.33334 10.6667H7.33334L12.1913 5.80867L10.1913 3.80867L5.33334 8.66667V10.6667Z" fill="#676767"/>
                            <path d="M12.6667 12.6667H5.43867C5.42133 12.6667 5.40333 12.6733 5.386 12.6733C5.364 12.6733 5.342 12.6673 5.31933 12.6667H3.33333V3.33333H7.898L9.23133 2H3.33333C2.598 2 2 2.59733 2 3.33333V12.6667C2 13.4027 2.598 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V6.888L12.6667 8.22133V12.6667Z" fill="#676767"/>
                        </svg>
                        <p className='ml-3 text-gray2'>Rename</p>
                    </div>
                    <div className='w-full h-px bg-white-2 mt-1 mb-1'></div>
                    <div className='px-4 text-sm text-light-gray2'>
                        <div>Page: {name}</div>
                        <div className=''>Last edited by <span className='capitalize'>{username}</span></div>
                        <div className=''>Nov 28, 2023, 22:50</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
