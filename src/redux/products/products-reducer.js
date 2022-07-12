import { createSlice } from '@reduxjs/toolkit';
import productsOperations from './products-operation';

const productSlice = createSlice({
  name: 'products',
  initialState: { pending: false },
  reducers: {},
  extraReducers: {
    [productsOperations.getAllProducts.pending]: (state, action) => {
      state.pending = true;
      state.isLoading = true;
    },
    [productsOperations.getAllProducts.fulfilled]: (state, action) => {
      state.pending = false;
      state.isLoading = false;
    },
    [productsOperations.getAllProducts.rejected]: (state, action) => {
      state.pending = false;
      state.isLoading = false;
    },
    [productsOperations.getOneProduct.pending]: (state, action) => {
      state.panding = true;
      state.isLoading = true;
    },
    [productsOperations.getOneProduct.fulfilled]: (state, action) => {
      state.pending = false;
      state.isLoading = false;
    },
    [productsOperations.getOneProduct.rejected]: (state, action) => {
      state.pending = false;
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer