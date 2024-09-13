import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  selectedCountry: null,
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      if (state.mode === "dark") state.mode = "light";
      else state.mode = "dark";
    },
    selectCountry(state, actions) {
      state.selectedCountry = actions.payload;
    },
    deselectCountry(state) {
      state.selectedCountry = null;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
