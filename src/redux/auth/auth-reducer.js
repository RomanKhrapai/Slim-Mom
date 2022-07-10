import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthorised: true, isPending: false },
  reducers: {},
  extraReducers: {
    [authOperations.fetchCurrentUser.pending]: (state, action) => {
      state.isPending = true;
    },
    [authOperations.fetchCurrentUser.fulfilled]: (state, action) => {
      state.isPending = false;
    },
    [authOperations.fetchCurrentUser.rejected]: (state, action) => {
      state.isPending = false;
    },
    [authOperations.logIn.pending]: (state, action) => {
      state.isPending = true;
    },
    [authOperations.logIn.fulfilled]: (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;
    },
    [authOperations.logIn.rejected]: (state, action) => {
      state.isPending = false;
      state.isAuthorised = false;
    },
    [authOperations.logOut.pending]: (state, action) => {
      state.isPending = true;
    },
    [authOperations.logOut.fulfilled]: (state, action) => {
      state.isPending = false;
    },
    [authOperations.logOut.rejected]: (state, action) => {
      state.isPending = false;
    },
  },
});
