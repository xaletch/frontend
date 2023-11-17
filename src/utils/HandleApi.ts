import axios from "axios";

const baseUrl = 'http://localhost:8000/notes';

const getAllNotes = (setNote: any) => {
    axios.get(baseUrl)
    .then(({data}) => {
        // console.log('data: ', data);
        setNote(data);
    })
    .catch(err => console.log('data error: ', err))
};

const addNote = (noteName: any, setNoteName: any, setNote: any) => {
    axios.post(`${baseUrl}/save`, noteName)
    .then(({data}) => {
        console.log('data: ', data);
        setNoteName("без названия");
        getAllNotes(setNote)
    })
    .catch(err => console.log('save error: ', err))
};

const updateNote = (noteId: any, noteName: any, setNoteName: any, setNote: any, setIsUpdate: any) => {
    axios.post(`${baseUrl}/update`, {_id: noteId, name: noteName})
    .then(({data}) => {
        console.log('data: ', data);
        setNoteName("без названия");
        setIsUpdate(false);
        getAllNotes(setNote);
    })
    .catch(err => console.log('update error: ', err))
};

const deleteNote = ( _id: string, setNote: any) => {
    axios.post(`${baseUrl}/delete`, {_id})
    .then(({data}) => {
        getAllNotes(setNote);
    })
    .catch(err => console.log('delete error: ', err))
};

export { getAllNotes, addNote, updateNote, deleteNote };