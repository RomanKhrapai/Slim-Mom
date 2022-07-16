import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: '', email: '', refreshToken: '' },
  isAuthorised: false,
  isLoading: false,
  token: null,
  isFetchingCurrentUser: true,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    apdateUserInfo(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [authOperations.signUpUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [authOperations.signUpUser.fulfilled]: (state, action) => {
      (state.user = action.payload.user.params),
        (state.user.name = action.payload.user.name);
      state.user.email = action.payload.email;
      state.token = action.payload.accessToken;
      state.isAuthorised = true;
      state.isLoading = false;
    },
    [authOperations.signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
      state.isLoading = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isAuthorised = true;
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
    [authOperations.logIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [authOperations.logIn.fulfilled](state, { payload }) {
      state.user = payload.user.params;
      state.token = payload.accessToken;
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
      state.token = null;
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [authOperations.logOut.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { apdateUserInfo } = authSlice.actions;
export default authSlice.reducer;
