import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditImageState {
  image: string;
}

const initialState: EditImageState = {
  image: "",
};

const editImageSlice = createSlice({
  name: "editImage",
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
  },
});

export const { setImage } = editImageSlice.actions;
export default editImageSlice.reducer;
