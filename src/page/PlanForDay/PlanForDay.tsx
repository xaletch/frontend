import React, { useEffect, useState } from 'react'

import { Header } from '../../components/NotePage/Header';
import { Menu } from '../../components/NotePage/Menu/Menu';
import { NoteCreate } from '../../components/NotePage/NoteCreate/NoteCreate';
import { ManageNote } from '../../components/NotePage/ManageNote/ManageNote';
import Axios from '../../axios';
import { SelectNote } from './SelectNote/SelectNote';

type NoteType = {
  _id: string;
  name: string;
  smile: string;
}

type SelectNote = {
  name: string;
  smile: string;
  title: string;
  text: string;
}

export const PlanForDay = () => {
  const [note, setNote] = useState<NoteType[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectNote | null>(null);
 
  useEffect(() => {
    const noteData = async () => {
      try {
        const data = await Axios.get('/notes');
        setNote(data.data);
        setAddNote(false);
      }
      catch (err) {
        console.log('При получении заметок произошла ошибка: \n', err);
      }
    }
    noteData();
  }, [isUpdate, addNote]);

  // console.log("NOTE: ", note);

  const handleSelectNote = async (id: any) => {
    const selectNote = await Axios.get(`/notes/oneNote/${id}`);
    setSelectedNote(selectNote.data);
  }

  // console.log("SELECTNOTE: ", selectedNote); 

  return (
    <div className='h-full'>
      {/* {menuOpen && <Menu handleSelectNote={handleSelectNote} setMenuOpen={setMenuOpen} setAddNote={setAddNote} setIsUpdate={setIsUpdate} isUpdate={isUpdate} note={note} setNote={setNote} />} */}
      {/* <SelectNote /> */}
      {/* <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} selectedNote={selectedNote} /> */}
      {/* <ManageNote menuOpen={menuOpen} /> */}
      {/* {selectedNote && Array.isArray(selectedNote) ? selectedNote.map((obj, index) => <ManageNote key={index} {...obj} menuOpen={menuOpen} setAddNote={setAddNote} />) : <ManageNote {...selectedNote} menuOpen={menuOpen} setAddNote={setAddNote} />} */}
      {/* {selectedNote ? <ManageNote menuOpen={menuOpen} /> : <div className='w-full h-full flex items-center justify-center'>Перейдите в заметку</div>} */}
      {/* {note === null && <NoteCreate setMenuOpen={setMenuOpen} />} */}
    </div>
  )
}
