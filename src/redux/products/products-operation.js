import axios from 'axios';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'http://localhost:3004/';
const instance = axios.create({
  baseURL: 'http://localhost:3004/'
});

const getAllProducts = createAsyncThunk(
  'products/getAll',
  async (userRequest, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/products', userRequest);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('This product is not found'));
    }
  }
);

const getOneProduct = createAsyncThunk(
  'products/getOne',
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/${product}`, product);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Something wrong'));
    }
  }
);

const productsOperations = {
  getAllProducts,
  getOneProduct,
};
export default productsOperations;
