import React, { useEffect, useRef, useState } from 'react';
import './SelectNote.css';

import { Smile } from '../../../components/NotePage/ManageNote/Smile/Smile';
import { Editor } from '../../../components/NotePage/ManageNote/Editor';
import Axios from '../../../axios';
import { useParams } from 'react-router-dom';

type NoteData = {
    _id: string;
    imageUrl: string;
    name: string;
    title: string;
    smile: string;
    text: string;
}

export const SelectNote: React.FC = () => {
    const [selectEmoji, setSelectEmoji] = useState<string>("");
    const [image, setImage] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const fileRef = useRef<any>(null);

    const { _id } = useParams();
    const [selectNote, setSelectNote] = useState<NoteData>();

    // console.log(isUpdate);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const { data } = await Axios.get('/notes/oneNote/' + _id);
                setSelectNote(data);
                setIsUpdate(false);
            }
            catch (err) {
                console.log('Не удалось открыть заметку');
            }
        }
        fetchNote();
    }, [_id, isUpdate]);

    console.log(selectNote);

    const handleChange = async (event: any) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);

            const { data } = await Axios.post('/uploads', formData);
            setImage(data.url);
        }
        catch (err) {
            console.log('Не удалось отправить картинку на сервер: \n', err);
        }
    };

    useEffect(() => {
        if (selectEmoji.length === 2) {
            setShowEmoji(false);
        };
    }, [selectEmoji]);

    const handleOpenFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        };
    };

    useEffect(() => {
        try {
            const noteContent = async () => {
                // if (selectNote?.name) {
                    await Axios.patch('/notes/update/' + _id, { smile: selectEmoji ? selectEmoji : selectNote?.smile, imageUrl: image ? image : selectNote?.imageUrl });
                    setIsUpdate(true);
                
                // }
            }
            noteContent();
        }
        catch (err) {
            console.log(err)
        }
    }, [image, selectEmoji]);

    const handleRemoveSmile = async () => {
        try {
            // setSelectEmoji("");
            await Axios.patch('/notes/update/' + _id, { smile: selectEmoji });
            setIsUpdate(true);
        }
        catch (err) {
            console.log('Не удалось удалить смайлик: \n', err);
        }
    };

    return (
        <div className='flex-1 h-screen relative' style={{width: `${'menuOpen === false' ? `calc(100%)` : `calc(100% - 240px)`}`, left: `${'menuOpen === false ? `0` : `240px`'}`}}>
            <div className='pt-11'>
                {selectNote?.imageUrl && (
                    <div className='relative w-full h-[28vh] group top-0'>
                        <img className='absolute h-full w-full inset-0 object-cover' src={`http://localhost:8000/${selectNote?.imageUrl}`} alt={''} />
                        <div className='absolute z-10 bottom-3 right-6 flex gap-2'>
                            <button className='p-1 px-2 rounded-md bg-noteName text-sm text-white' onClick={() => {handleOpenFile()}}>Update</button>
                            <button className='p-1 px-2 rounded-md bg-noteName text-sm text-white'>Delete</button>
                        </div>
                    </div>
                )}
                {selectNote?.name && (
                    <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                        <div className='pl-14 manage-note'>
                            <div className={`text-7xl flex items-center gap-3 ${selectNote.smile === "" ? 'hidden' : ''}`}>
                                <button>{selectNote.smile}</button>
                                {selectNote?.smile && (
                                    <button className='p-3 border border-light-grey rounded-full' onClick={handleRemoveSmile}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10.192 0.343994L5.949 4.58599L1.707 0.343994L0.292999 1.75799L4.535 5.99999L0.292999 10.242L1.707 11.656L5.949 7.41399L10.192 11.656L11.606 10.242L7.364 5.99999L11.606 1.75799L10.192 0.343994Z" fill="#6F6F6F"/>
                                        </svg>
                                    </button>  
                                )}
                            </div>
                            <div className='py-4 flex gap-2 opacity-1 manage-note_btn relative'>
                                <button className={`flex cursor-pointer text-sm items-center gap-2 border border-light-grey hover:bg-secondary rounded p-1 px-2 ${selectNote.smile ? 'hidden' : ''}`} onClick={() => setShowEmoji(!showEmoji)}>                   
                                    <svg id="Flat" width='20' height='20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                        <path d="M128,26A102,102,0,1,0,230,128,102.1153,102.1153,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.10217,90.10217,0,0,1,128,218Zm46.77148-62.99951a54.02665,54.02665,0,0,1-93.543.001,5.99977,5.99977,0,1,1,10.38671-6.00878,42.20387,42.20387,0,0,0,20.03809,17.70556,41.95759,41.95759,0,0,0,46.04492-9.0039,42.18412,42.18412,0,0,0,6.68653-8.70264,5.99978,5.99978,0,1,1,10.38671,6.00879ZM82,108a10,10,0,1,1,10,10A10.01114,10.01114,0,0,1,82,108Zm72,0a10,10,0,1,1,10,10A10.01114,10.01114,0,0,1,154,108Z"/>
                                    </svg>
                                    добавить значок
                                </button>
                                <button className={`flex cursor-pointer text-sm gap-2 border border-light-grey hover:bg-secondary rounded p-1 px-2 ${selectNote.imageUrl ? 'hidden' : ''}`} onClick={() => {handleOpenFile()}}>
                                    <svg xmlns="http ://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 20" fill="none">
                                        <path d="M17 0H3C1.794 0 0 0.799 0 3V17C0 19.201 1.794 20 3 20H18V18H3.012C2.55 17.988 2 17.806 2 17C2 16.194 2.55 16.012 3.012 16H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0ZM6.503 3C6.90162 3 7.28391 3.15835 7.56578 3.44022C7.84765 3.72209 8.006 4.10438 8.006 4.503C8.006 4.90162 7.84765 5.28391 7.56578 5.56578C7.28391 5.84765 6.90162 6.006 6.503 6.006C6.10438 6.006 5.72209 5.84765 5.44022 5.56578C5.15835 5.28391 5 4.90162 5 4.503C5 4.10438 5.15835 3.72209 5.44022 3.44022C5.72209 3.15835 6.10438 3 6.503 3ZM9 11H4L7 8L8.5 9.399L11.5 6L15 11H9Z" fill="#444"/>
                                    </svg>
                                    добавить обложку
                                </button>
                                {showEmoji && <Smile selectEmoji={selectEmoji} setSelectEmoji={setSelectEmoji} />}
                                <input className='hidden' type='file' ref={fileRef} onChange={handleChange} accept='image/*, .png, .jpg, .gif, .web' />
                            </div>
                            <div>
                                <h1 className='text-5xl font-bold text-noteName'>{selectNote?.name}</h1>
                                <div className='mt-2'>
                                    <p className='text-md text-dark'>{selectNote?.text}</p>
                                </div>
                                <Editor />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}