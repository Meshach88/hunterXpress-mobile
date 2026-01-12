// store/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark' | 'system';

const initialState = {
  mode: 'system' as ThemeMode,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
