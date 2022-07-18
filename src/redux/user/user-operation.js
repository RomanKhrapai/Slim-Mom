import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from 'services/i18n/config';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getUser = createAsyncThunk(
  'user/getUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/&{userData.id}', userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        toast.error(i18n.t(
          'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
        ))
      );
    }
  }
);

const addUserInfo = createAsyncThunk(
  'user/addUserInfo',
  // ожидает получить информацию из формы и язык: { height: '165', age: '45', currentWeight: '75', desiredWeight: '54', bloodType: '3', language: "ua" }
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/users/private/daily-calorie-intake',
        userData
      );

      return data;
    } catch (error) {
      return rejectWithValue(toast.error(i18n.t('authentification.Ooops, something went wrong. Please, try again')));
    }
  }
);

const addVisitorInfo = createAsyncThunk(
  'user/addVisitorInfo',
  // ожидает получить информацию из формы и язык: { height: '165', age: '45', currentWeight: '75', desiredWeight: '54', bloodType: '3', language: "ua" }
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/users/public/daily-calorie-intake',
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(toast.error(i18n.t('authentification.Ooops, something went wrong. Please, try again')));
    }
  }
);

const getDayProducts = createAsyncThunk(
  'user/getDiaryProducts',
  // получает дату и id пользователя {date: "29299292", user: { user: "62d09b07b161f09579378429",}}
  async (diaryData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/diary/${diaryData}`, diaryData);

      if (data.code === 200) {
        return data.data;
      }
    } catch (error) {
      if (error.response.data.message === "Expired token") {
        return rejectWithValue(error.response.data.message)
        // console.log(data);
      }
      // if (error.code === 401) {
      //   console.log(data);
      //   return
      // }
      console.log(error);
      return rejectWithValue(toast.error(i18n.t('authentification.Cannot find products for this data')));
    }
  }
);

const addProductToDiary = createAsyncThunk(
  'user/addProduct',
  // ожидает получить id продукта, его количество и дату { date: "29299292", productId: "5d51694802b2373622ff553b", amount: 500, }
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/diary`, productData);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error(i18n.t('authentification.Ooops, something went wrong. Please, try again')));
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
      return rejectWithValue(toast.error(i18n.t('authentification.Ooops, something went wrong. Please, try again')));
    }
  }
);

const userOperations = {
  addUserInfo,
  getUser,
  addProductToDiary,
  removeProductFromDiary,
  getDayProducts,
  addVisitorInfo,
};
export default userOperations;
