import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import authOperations from './auth-operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorised: false,
    user: { name: '', email: '', id: '', refreshToken: '' },
    isLoading: false,
    accessToken: ''
  },
  reducers: {},
  extraReducers: {
    [authOperations.signUpUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [authOperations.signUpUser.fulfilled]: (state, action) => {
      // state.user.id = action.payload.data.user.id
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.email;
      state.user.refreshToken = action.payload.refreshToken;
      state.isAuthorised = action.payload.isAuthorised;
      state.isLoading = false;
    },
    [authOperations.signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.logIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [authOperations.logIn.fulfilled]: (state, action) => {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.isAuthorised = true;
      state.isLoading = false;
    },
    [authOperations.logIn.rejected]: (state, action) => {
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [authOperations.logOut.pending]: (state, action) => {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.logOut.fulfilled]: (state, action) => {
      state.user.email = '';
      state.user.refreshToken = '';
      state.accessToken = null;
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [authOperations.logOut.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
