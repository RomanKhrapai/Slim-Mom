import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

 const authSlice = createSlice({
  name: 'auth',
  initialState: { user: { name: null, email: null, password: null }, 
  isLoggedIn: true, 
  isPending: false, 
  isLoading: false,
  isFetchingCurrentUser: false,
},

  reducers: {},
  extraReducers: {
    [authOperations.signUpUser.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isPending = false;
    },
    [authOperations.signUpUser.pending](state) {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.signUpUser.rejected](state) {
      state.isLoading = false;
      state.isPending = false;
    },
    [authOperations.logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isPending = false;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.logIn.rejected](state) {
      state.isPending = false;
      state.isLoading = false;
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isPending = false;
    },
    [authOperations.logOut.pending](state) {
      state.isPending = true;
      state.isLoading = true;
    },
    [authOperations.logOut.rejected](state) {
      state.isPending = false;
      state.isLoading = false
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    }
    /*[authOperations.fetchCurrentUser.pending]: (state, action) => {
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
    },*/
  },
});

export default authSlice.reducer;