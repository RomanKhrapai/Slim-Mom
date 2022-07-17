import { createSlice } from '@reduxjs/toolkit';
import optionsOperations from '../options/options-operations';
import  userOperations  from '../user/user-operation';
import  productsOperations  from './products-operation';

const initialState = {
  dailyCalorieIntake: '',
  productsNotRecommended: [],
  diary: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [productsOperations.getRequestProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [productsOperations.getRequestProducts.fulfilled]: (state, {payload}) => {
      state.items = payload;
      state.isLoading = false;
    },
    [productsOperations.getRequestProducts.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },
    [productsOperations.getOneProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [productsOperations.getOneProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [productsOperations.getOneProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer