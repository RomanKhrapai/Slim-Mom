import axios from 'axios';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getRequestProducts = createAsyncThunk(
  'products/getAllRequest',
  // ожидает получить строку поиска: "любое ваше значене")
  async (userRequest, { rejectWithValue }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDA5ODQ4YjE2MWYwOTU3OTM3ODQwNCIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NTc4Mzc2NzQsImV4cCI6MTY1Nzg3MzY3NH0.s_A6p_JuXT89f1QkjbKDg8YAy0lXTwJfzlPcspkOgQ0"
    try {
      const { data } = await axios.get(`/products?title=${userRequest}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
