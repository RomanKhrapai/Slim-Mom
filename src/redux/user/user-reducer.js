import { createSlice } from '@reduxjs/toolkit';
import userOperations from './user-operation';

export const userSlice = createSlice({
  name: 'user',
  initialState: { id: 1, name: '', dairy: {}, isFetchingUser: false },
  reducers: {},
  extraReducers: {
    [userOperations.getUser.pending]: (state, action) => {
      state.isPending = true;
    },
    [userOperations.getUser.fulfilled]: (state, action) => {
      state.isPending = false;
    },
    [userOperations.getUser.rejected]: (state, action) => {
      state.isPending = false;
    },
    [userOperations.addUserInfo.pending]: (state, action) => {
      state.isFetchingUser = true;
    },
    [userOperations.addUserInfo.fulfilled]: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isFetchingUser = false;
    },
    [userOperations.addUserInfo.rejected]: (state, action) => {
      state.id = null;
      state.name = null;
      state.isFetchingUser = false;
    },
    [userOperations.getDayProducts.pending]: (state, action) => {
      state.isFetchingUser = true;
    },
    [userOperations.getDayProducts.fulfilled]: (state, action) => {
      state.isFetchingUser = false;
    },
    [userOperations.getDayProducts.rejected]: (state, action) => {
      state.isFetchingUser = false;
    },
    [userOperations.addProductToDiary.pending]: (state, action) => {
      state.isFetchingUser = true;
    },
    [userOperations.addProductToDiary.fulfilled]: (state, action) => {
      state.isFetchingUser = false;
    },
    [userOperations.addProductToDiary.rejected]: (state, action) => {
      state.isFetchingUser = false;
    },
    [userOperations.removeProductFromDiary.pending]: (state, action) => {
      state.isFetchingUser = true;
    },
    [userOperations.removeProductFromDiary.fulfilled]: (state, action) => {
      state.isFetchingUser = false;
    },
    [userOperations.removeProductFromDiary.rejected]: (state, action) => {
      state.isFetchingUser = false;
    },
  },
});
