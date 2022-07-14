import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './products-operation';

const productSlice = createSlice({
  name: 'products',
  initialState: { pending: false },
  reducers: {},
  extraReducers: {
    [productsOperations.getRequestProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [productsOperations.getRequestProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [productsOperations.getRequestProducts.rejected]: (state, action) => {
      state.isLoading = false;
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