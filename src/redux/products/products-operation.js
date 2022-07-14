import axios from 'axios';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getRequestProducts = createAsyncThunk(
  'products/getAllRequest',
  // ожидает получить строку поиска: "любое ваше значене")
  async (userRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products?title=${userRequest}`, userRequest);

      return data.data.result;
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
  getRequestProducts,
  getOneProduct,
};
export default productsOperations;
