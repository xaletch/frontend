import React, { useEffect, useState } from 'react'
import { Menu } from '../../components/Notes/Menu/Menu';
import { NoteContent } from '../../components/Notes/NoteContent';
import { useParams } from 'react-router-dom';
import Axios from '../../axios';

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
    blocks: Blocks[];
}

export const SelectNote = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [noteUpdate, setNoteUpdate] = useState(false);
    

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
                    // console.log(JSON.parse(data.blocks));
                }
            }
            catch (err) {
                console.log('Не удалось открыть заметку');
            }
        }
        fetchNote();
    }, [_id, isUpdate, noteUpdate]);

    console.log('selectNote?.blocks: ', selectNote?.blocks);

    return (
        <div>
            <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
            <NoteContent menuOpen={menuOpen} imageUrl={selectNote?.imageUrl} name={selectNote?.name} smile={selectNote?.smile} text={selectNote?.text} id={selectNote?._id} noteUpdate={noteUpdate} setNoteUpdate={setNoteUpdate} blocks={selectNote?.blocks} />
        </div>
    )
}
