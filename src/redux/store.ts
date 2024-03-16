import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { noteApi } from "./api";

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
