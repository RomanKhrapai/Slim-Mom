import axios from 'axios';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = '';
const userInstance = axios.create({
  baseURL: 'http://localhost:3002/',
});
const dairyInstance = axios.create({
  baseURL: 'http://localhost:3003/',
});

const getUser = createAsyncThunk(
  'user/getUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await userInstance.get(
        '/users/&{userData.id}',
        userData
      );
      //   token.set(data.token);
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
  'user/addInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/users/${userId}', userData);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('This product is not found'));
    }
  }
);

const getDayProducts = createAsyncThunk(
  'user/getDiaryProducts',
  async (diaryDate, { rejectWithValue }) => {
    try {
      const { data } = await dairyInstance.get(`/diary`, diaryDate);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Cannot find products for this data'));
    }
  }
);

const addProductToDiary = createAsyncThunk(
  'user/addProduct',
  async (dailyData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/diary`, dailyData);

      return data;
    } catch (error) {
      return rejectWithValue(toast.error('Something wrong'));
    }
  }
);

const removeProductFromDiary = createAsyncThunk(
  'user/deleteProduct',
  async (dailyData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/diary`, dailyData);

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
};
export default userOperations;
