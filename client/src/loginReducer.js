import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  name: null,
};

const loginSlice = createSlice({
  name: 'loginStatus',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
  },
});

export const { loginUser } = loginSlice.actions;
export default loginSlice.reducer;