import React, { useEffect, useState } from 'react'

import { Header } from '../../components/NotePage/Header';
import { Menu } from '../../components/NotePage/Menu/Menu';
import { NoteCreate } from '../../components/NotePage/NoteCreate/NoteCreate';
import { ManageNote } from '../../components/NotePage/ManageNote/ManageNote';
import Axios from '../../axios';

type NoteType = {
  _id: string;
  name: string;
}

export const PlanForDay = () => {
  const [note, setNote] = useState<NoteType[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");
 
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

  const handleSelectNote = async (i: any) => {
    const selectNote = await Axios.get(`/notes/oneNote/${i}`);
    setSelectedNote(selectNote.data.name);
  }

  return (
    <div className='h-full'>
      {menuOpen && <Menu handleSelectNote={handleSelectNote} setMenuOpen={setMenuOpen} setAddNote={setAddNote} setIsUpdate={setIsUpdate} isUpdate={isUpdate} note={note} setNote={setNote} />}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} selectedNote={selectedNote} />
      {/* <ManageNote menuOpen={menuOpen} /> */}
      {/* {!selectTask === null ? <ManageNote menuOpen={menuOpen} selectOpenTask={selectOpenTask} /> : <div className='w-full h-full flex items-center justify-center'>Перейдите в заметку</div>} */}
      {note === null || selectedNote === '' && <NoteCreate setMenuOpen={setMenuOpen} />}
    </div>
  )
}
