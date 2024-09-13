import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      if (state.mode === "dark") state.mode = "light";
      else state.mode = "dark";
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
