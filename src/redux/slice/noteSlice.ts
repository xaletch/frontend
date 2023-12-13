import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
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
    name: string;
    user: {
      _id: string;
      username: string;
      email: string;
      passwordHash: string;
      __v: number;
    };
    __v: number;
    imageUrl: string;
    smile: string;
    blocks: Blocks[];
}

export const fetchNotes = createAsyncThunk<NoteData[], void>('notes/fetchNotes', async () => {
    const { data } = await Axios.get('/notes');
    return data;
}) as any;

export const fetchDeleteNote = createAsyncThunk('notes/fetchDeleteNote', async (id) => {
    const { data } = await Axios.delete(`/notes/delete/${id}`);
    console.log(data);
    return data;
}) as any;

interface NoteState {
    itemsNote: NoteData[];
    cart: NoteData[],
    itemsSelectNote: NoteData;
    status: string;
}

const savedCart = localStorage.getItem('cart');
const cartItem = savedCart !== null ? JSON.parse(savedCart) : [];

const initialState: NoteState = {
    itemsNote: [],
    itemsSelectNote: {} as NoteData,
    //! ПЛОХОЙ СПОСОБ СОХРАНЕНИЯ УДАЛЕННЫХ ЗАМЕТОК!
    cart: Array.isArray(cartItem) ? cartItem : [],
    status: 'loading',
};

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
    },
    extraReducers: {
        // GET ALL NOTE
        [fetchNotes.pending.type]: (state) => {
            state.itemsNote = [];
            state.status = 'loading';
        },
        [fetchNotes.fulfilled.type]: (state, action) => {
            state.itemsNote = action.payload;
            state.status = 'loaded';
        },
        [fetchNotes.rejected.type]: (state) => {
            state.itemsNote = [];
            state.status = 'error';
        },
        
        // DELETE NOTE
        [fetchDeleteNote.fulfilled.type]: (state, action) => {
            state.itemsNote = state.itemsNote.filter((item) => item._id !== action.meta.arg);
            state.cart.push(action.payload.note);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
});

export const { } = noteSlice.actions;

export default noteSlice.reducer;