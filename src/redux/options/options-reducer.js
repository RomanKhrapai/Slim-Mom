import { createSlice } from '@reduxjs/toolkit';
import optionsOperations from './options-operations';
import  userOperations  from '../user/user-operation';
import  productsOperations  from '../products/products-operation';

const initialState = {
  isAuthorised: false,
  isLoading: false,
  isFetchingCurrentUser: false,
  isModal:false,
  isDark:false,
  toDay:"",
  token: "",
  refreshToken: '',
 lenguage:"",
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    apdateUserInfo(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [optionsOperations.signUpUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [optionsOperations.signUpUser.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload.user.params,
      state.user.name = action.payload.user.name,
      state.user.email = action.payload.email;
      state.token = action.payload.accessToken;
      state.isAuthorised = true;
      state.isLoading = false;
    },
    [optionsOperations.signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [optionsOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
      state.isLoading = true;
    },
    [optionsOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isAuthorised = true;
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
    [optionsOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
    [optionsOperations.logIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [optionsOperations.logIn.fulfilled](state, { payload }) {
      // console.log(payload);
      state.user = payload.user.params;
      state.user.name = payload.user.name;
      state.token = payload.accessToken;
      state.isAuthorised = true;
      state.isLoading = false;
    },
    [optionsOperations.logIn.rejected]: (state, action) => {
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [optionsOperations.logOut.pending]: (state, action) => {
      state.isPending = true;
      state.isLoading = true;
    },
    [optionsOperations.logOut.fulfilled]: (state, action) => {
      state.user.email = '';
      state.user.refreshToken = '';
      state.token = null;
      state.isAuthorised = false;
      state.isLoading = false;
    },
    [optionsOperations.logOut.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { apdateUserInfo } = optionsSlice.actions;
export default optionsSlice.reducer;
