import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

 const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthorised: true, isPending: false, isLoading: false },
  reducers: {},
  extraReducers: {
    [authOperations.fetchCurrentUser.pending]: (state, action) => {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.fetchCurrentUser.fulfilled]: (state, action) => {
      state.isPending = false;
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.rejected]: (state, action) => {
      state.isPending = false;
      state.isLoading = false;
    },
    [authOperations.logIn.pending]: (state, action) => {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.logIn.fulfilled]: (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;
      state.isLoading = false;
    },
    [authOperations.logIn.rejected]: (state, action) => {
      state.isPending = false;
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [authOperations.logOut.pending]: (state, action) => {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.logOut.fulfilled]: (state, action) => {
      state.isPending = false;
      state.isLoading = false;
    },
    [authOperations.logOut.rejected]: (state, action) => {
      state.isPending = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer