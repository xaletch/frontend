import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import note from './slice/noteSlice';

export const store = configureStore({
    reducer: {
        note,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();