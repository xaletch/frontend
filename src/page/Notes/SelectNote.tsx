import React, { useEffect, useState } from 'react'
import { Menu } from '../../components/Notes/Menu/Menu';
import { NoteContent } from '../../components/Notes/NoteContent';
import { useParams } from 'react-router-dom';
import Axios from '../../axios';

import { Control } from '../../components/Notes/Control/Control';

interface User {
    username: string;
}

interface Blocks {
    id: string;
    type: string;
    props: {
        textColor: string;
        backgroundColor: string;
        textAlignment: string;
    };
    content: Array<{
        type: string;
        text?: string;
        styles?: {};
    }>;
    children: Blocks[];
}

type NoteData = {
    _id: string;
    imageUrl: string;
    name: string;
    title: string;
    smile: string;
    text: string;
    user: User;
    blocks: Blocks[];
}

type NoteType = {
    _id: string;
    name: string;
    smile: string;
}

export const SelectNote: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState(false);
    const [isControl, setIsControl] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [controlCords, setControlCords] = useState({x: 0, y: 0});

    const { _id } = useParams();
    const [selectNote, setSelectNote] = useState<NoteData>();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                if (_id) {
                    const { data } = await Axios.get('/notes/oneNote/' + _id);
                    setSelectNote(data);
                    setIsUpdate(false);
                    setNoteUpdate(false);
                    data.blocks = JSON.parse(data.blocks);
                };
            }
            catch (err) {
                console.log('Не удалось открыть заметку');
            }
        }
        fetchNote();
    }, [_id, isUpdate, noteUpdate]);

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

    return (
        <div className='relative'>
            <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} isUpdate={isUpdate} setIsUpdate={setIsUpdate} username={username} controlCords={controlCords} setControlCords={setControlCords} setIsControl={setIsControl} />
            {isControl && <Control name={selectNote?.name} id={selectNote?._id} username={username} controlCords={controlCords} setIsControl={setIsControl} />}
            <NoteContent menuOpen={menuOpen} imageUrl={selectNote?.imageUrl} name={selectNote?.name} smile={selectNote?.smile} text={selectNote?.text} id={selectNote?._id} noteUpdate={noteUpdate} setNoteUpdate={setNoteUpdate} blocks={selectNote?.blocks} />
        </div>
    )
}
