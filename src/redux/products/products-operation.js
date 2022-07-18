import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from 'services/i18n/config';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getRequestProducts = createAsyncThunk(
  'products/getAllRequest',
  // ожидает получить строку поиска: "любое ваше значене")
  async (userRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products?title=${userRequest}`
      );

      return data.data.result;
    } catch (error) {
      return rejectWithValue(toast.error(i18n.t('authentification.This product is not found')));
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
      return rejectWithValue(toast.error(i18n.t('authentification.Ooops, something went wrong. Please, try again')));
    }
  }
);

const productsOperations = {
  getRequestProducts,
  getOneProduct,
};
export default productsOperations;
