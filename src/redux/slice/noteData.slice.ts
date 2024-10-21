// selectNoteData
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteDataInterface } from "../../app/types";

interface selectNoteDataState {
  selectNoteData: NoteDataInterface | undefined;
}

const initialState: selectNoteDataState = {
  selectNoteData: undefined,
};

const selectNoteDataSlice = createSlice({
  name: "noteData",
  initialState,
  reducers: {
    setSelectNoteData(state, action: PayloadAction<NoteDataInterface>) {
      state.selectNoteData = action.payload;
    },
  },
});

export const { setSelectNoteData } = selectNoteDataSlice.actions;
export default selectNoteDataSlice.reducer;
