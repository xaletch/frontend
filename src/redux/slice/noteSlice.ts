import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Axios from "../../axios";

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
};

// ALL NOTE
export const fetchNotes = createAsyncThunk<NoteData[], void>(
  "notes/fetchNotes",
  async () => {
    const { data } = await Axios.get("/api/notes");
    return data;
  }
) as any;

// RECEIVING YOUR CART
export const fetchNoteCart = createAsyncThunk(
  "notes/fetchNoteCart",
  async () => {
    const { data } = await Axios.get("/api/notes/cart/note");
    return data;
  }
) as any;

// ADD TO CART NOTE
export const fetchAddNoteCart = createAsyncThunk(
  "notes/fetchAddNoteCart",
  async (id) => {
    const { data } = await Axios.post(`/api/notes/add-to-cart/${id}`);
    return data;
  }
) as any;

// DELETE NOTE
export const fetchDeleteNote = createAsyncThunk(
  "notes/fetchDeleteNote",
  async (id) => {
    const { data } = await Axios.delete(`/api/notes/delete/${id}`);
    return data;
  }
) as any;

interface NoteState {
  items: NoteData[];
  cart: NoteData[];
  itemsSelectNote: NoteData;
  status: string;
}

const initialState: NoteState = {
  items: [],
  itemsSelectNote: {} as NoteData,
  cart: [],
  status: "loading",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: {
    // GET ALL NOTE
    [fetchNotes.pending.type]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchNotes.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchNotes.rejected.type]: (state) => {
      state.items = [];
      state.status = "error";
    },

    // RECEIVING YOUR CART
    [fetchNoteCart.pending.type]: (state) => {
      state.cart = [];
      state.status = "loading";
    },
    [fetchNoteCart.fulfilled.type]: (state, action) => {
      state.cart = action.payload;
      state.status = "loaded";
    },
    [fetchNoteCart.rejected.type]: (state) => {
      state.cart = [];
      state.status = "error";
    },

    // DELETE NOTE
    [fetchDeleteNote.fulfilled.type]: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.meta.arg);
    },

    // ADD NOTE CART
    [fetchAddNoteCart.fulfilled.type]: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.meta.arg);
      state.status = "loaded";
    },
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
