import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: !!localStorage.getItem('isAuthenticated'),
};

const loginSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      localStorage.setItem('isAuthenticated', action.payload); // Save JWT token
      state.isAuth = true;
    },
    loggedOut: (state) => {
      localStorage.removeItem('isAuthenticated');
      state.isAuth = false;
    },
  },
});

export const { loggedIn, loggedOut } = loginSlice.actions;
export default loginSlice.reducer;
