import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { noteApi } from "./api";

import editImageSlice from "./slice/editImage.slice";
import selectNoteDataSlice from "./slice/noteData.slice";

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    editImage: editImageSlice,
    noteDataSlice: selectNoteDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
