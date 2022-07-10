import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './products-operation';

export const productSlice = createSlice({
  name: 'products',
  initialState: { pending: false },
  reducers: {},
  extraReducers: {
    [productsOperations.getAllProducts.pending]: (state, action) => {
      state.pending = true;
    },
    [productsOperations.getAllProducts.fulfilled]: (state, action) => {
      state.pending = false;
    },
    [productsOperations.getAllProducts.rejected]: (state, action) => {
      state.pending = false;
    },
    [productsOperations.getOneProduct.pending]: (state, action) => {
      state.panding = true;
    },
    [productsOperations.getOneProduct.fulfilled]: (state, action) => {
      state.pending = false;
    },
    [productsOperations.getOneProduct.rejected]: (state, action) => {
      state.pending = false;
    },
  },
});
