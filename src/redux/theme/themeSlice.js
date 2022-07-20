import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false,
  };
  
  export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      toggleTheme: (state) => {
        state.isDark = !state.isDark;
      },
    },
  });

  export const { toggleTheme } = themeSlice.actions;

  export default themeSlice.reducer;