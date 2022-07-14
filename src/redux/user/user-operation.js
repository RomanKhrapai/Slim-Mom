import axios from 'axios';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getUser = createAsyncThunk(
  'user/getUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        '/users/&{userData.id}',
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        toast.error(
          'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
        )
      );
    }
  }
);

const addUserInfo = createAsyncThunk(
  'user/addUserInfo',
  // ожидает получить информацию из формы и язык: { height: '165', age: '45', currentWeight: '75', desiredWeight: '54', bloodType: '3', language: "ua" }
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/private/daily-calorie-intake', userData);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Somsing wrong'));
    }
  }
);


const addVisitorInfo = createAsyncThunk(
  'user/addVisitorInfo',
    // ожидает получить информацию из формы и язык: { height: '165', age: '45', currentWeight: '75', desiredWeight: '54', bloodType: '3', language: "ua" }
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/public/daily-calorie-intake', userData);
      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Somsing wrong'));
    }
  }
);

const getDayProducts = createAsyncThunk(
  'user/getDiaryProducts',
  // Ничего не получает возвращает абсолютно всё что заносилось в дневник за любое время
  async (diaryDate, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/diary`, diaryDate);

      return data.data;
    } catch (error) {
      return rejectWithValue(toast.error('Cannot find products for this data'));
    }
  }
);

const addProductToDiary = createAsyncThunk(
  'user/addProduct',
  // ожидает получить имя продукта в ключе, а количество в его значении {amount: 500}
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/diary`, product);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Something wrong'));
    }
  }
);

const removeProductFromDiary = createAsyncThunk(
  'user/deleteProduct',
  // ожидает получить id продукта
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/diary/${productId}`, productId);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Something wrong'));
    }
  }
);

const userOperations = {
  addUserInfo,
  getUser,
  addProductToDiary,
  removeProductFromDiary,
  getDayProducts,
  addVisitorInfo
};
export default userOperations;
