import axios from "axios";
import {toast} from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      toast.success('Bи були успішно зареєстровані!');
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  });

const logIn = createAsyncThunk('auth/login', async credentials => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      toast.success('Вхід до персонального кабінету успішний, з поверненням');
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  });

const logOut = createAsyncThunk('auth/logout', async () => {
    try {
      await axios.post('/users/logout');
      token.unset();
      toast.success('Ви вийшли з персонального кабінету, будемо чекати на Вас!');
    } catch (error) {
      toast.error(error.message);
    }
  });

const fetchCurrentUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
  
      if (persistedToken === null) {
        return thunkAPI.rejectWithValue();
      }
  
      token.set(persistedToken);
      try {
        const { data } = await axios.get('/users/current');
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    }
  );

const authOperations = {
    register,
    logIn,
    logOut,
    fetchCurrentUser,
  };
  
  export default authOperations;
