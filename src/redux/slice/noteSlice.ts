import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store";
import Axios from '../../axios';

export const fetchNotes = createAsyncThunk('/notes', async () => {
    const { data } = await Axios.get('/notes');
    return data;
});

const initialState = {
    itemsNote: [],
    status: 'loading',
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
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
  },
})

export const { } = noteSlice.actions;

export default noteSlice.reducer;