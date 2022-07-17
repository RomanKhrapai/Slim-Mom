import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'services/i18n/config';

axios.defaults.baseURL = 'https://slim-mom-server.herokuapp.com/api/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

axios.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 400 &&
      error.response.data.message === 'Expired token' &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        token.set(refreshToken);
        const { data } = await axios.get('/auth/refresh-token');
        token.set(data.accessToken);
        return axios.request(originalRequest);
      } catch (error) {
        toast.error(i18n.t('authentification. You need to login'));
        console.log('Not authorized');
      }
    }
    throw error;
  }
);

const signUpUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const signUpResponse = await axios.post('/auth/register ', userData);
      try {
        const loginResponse = await axios.post('/auth/login', {
          email: userData.email,
          password: userData.password,
        });
        token.set(loginResponse.data.accessToken);
        toast.success(
          i18n.t(
            'authentification.You have сreated your personal account sucsessfully!'
          )
        );
        return { ...loginResponse.data, isAuthorised: true };
      } catch {
        return (
          signUpResponse.data,
          {
            isAuthorised: false,
            refreshToken: '',
            accessToken: '',
            user: { email: '', name: '' },
          }
        );
      }
    } catch (error) {
      return rejectWithValue(
        toast.error(
          i18n.t(
            'authentification.Ooops, something went wrong. Please, try again'
          )
        )
      );
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', userData);
      token.set(data.accessToken);
      toast.success(
        i18n.t('authentification.You have logged in successfully. Welcome back')
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        toast.error(
          i18n.t('authentification.You entered wrong email or password')
        )
      );
    }
  }
); 

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/logout');
      token.unset();
      toast.success(
        i18n.t('authentification.You have logged out. Will be waiting fo you!')
      );
    } catch (error) {
      return rejectWithValue(
        toast.error(
          i18n.t(
            'authentification.You havent logged out. We dont want to let you go'
          )
        )
      );
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('users/current-user');
      return data;
    } catch (error) {
      return thunkAPI
        .rejectWithValue
        // toast.error(i18n.t('authentification.We havent received your profile info. Please, try later'))
        ();
    }
  }
);

const authOperations = {
  signUpUser,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
