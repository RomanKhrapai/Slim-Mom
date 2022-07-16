import { createSlice } from '@reduxjs/toolkit';
import { changeData } from './user-action';
import userOperations from './user-operation';
import moment from 'moment';

const todayDate = moment().format('DD, MM, YYYY').split(', ').join('.')

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    dailyCalorieIntake: '',
    productsNotRecommended: [],
    isLoading: false,
    diary:[],
    currentDate: todayDate,
    chosenDate: todayDate
  },
  reducers: {},
  extraReducers: {
    [userOperations.getUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [userOperations.getUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userOperations.addUserInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.addUserInfo.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.params = action.payload.data.user
      state.userId = action.payload.data.id;
      state.dailyCalorieIntake = action.payload.data.dailyCalorieIntake;
      state.productsNotRecommended = action.payload.data.productsNotRecommended;
      state.isLoading = false;
    },
    [userOperations.addUserInfo.rejected]: (state, action) => {
      state.userId = '';
      state.dailyCalorieIntake = '';
      state.productsNotRecommended = '';
      state.isLoading = false;
    },
    [userOperations.addVisitorInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.addVisitorInfo.fulfilled]: (state, action) => {
      state.dailyCalorieIntake = action.payload.user.dailyCalorieIntake;
      state.productsNotRecommended = action.payload.user.productsNotRecommended;
      state.isLoading = false;
    },
    [userOperations.addVisitorInfo.rejected]: (state, action) => {
      state.dailyCalorieIntake = '';
      state.productsNotRecommended = '';
      state.isLoading = false;
    },
    [userOperations.getDayProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.getDayProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diary = action.payload;
    },
    [userOperations.getDayProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userOperations.addProductToDiary.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.addProductToDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diary = action.payload.data

    },
    [userOperations.addProductToDiary.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userOperations.removeProductFromDiary.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userOperations.removeProductFromDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.diary = action.payload.data
    },
    [userOperations.removeProductFromDiary.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changeData]: (state, action) => {
      state.chosenDate = action.payload;
    },
  },
});

export default userSlice.reducer;
