import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'services/i18n/config';
m
axios.defaults.baseURL = 'https://web-production-fe46.up.railway.app/api/';
//axios.defaults.baseURL = 'https://slim-mom-dev.herokuapp.com/api/';
//axios.defaults.baseURL = 'http://localhost:3001/api/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

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

        localStorage.setItem('refreshToken', loginResponse.data.refreshToken);

        toast.success(
          i18n.t(
            'authentification.You have сreated your personal account sucsessfully'
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

      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success(
        i18n.t(
          'authentification.You have logged in successfully. Welcome back!'
        )
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

      localStorage.removeItem('refreshToken');

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
  async (tokens, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    if (persistedToken === null && !tokens) {
      return thunkAPI.rejectWithValue();
    }
    if (!tokens?.accessToken) {
      token.set(persistedToken);
    } else {
      token.set(tokens.accessToken);
    }

    try {
      const { data } = await axios.get('users/current-user');

      if (tokens) {
        return { data, ...tokens };
      }

      return { data, accessToken: persistedToken };
    } catch (error) {
      return thunkAPI
        .rejectWithValue
        // toast.error(i18n.t('authentification.We havent received your profile info. Please, try later'))
        ();
    }
  }
);

axios.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 400 &&
      error.config &&
      !error.config._isRetry &&
      error.response.data.message === 'Expired token'
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          const { data } = await axios.post('/auth/refresh-token', {
            refreshToken,
          });
          token.set(data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios.request(originalRequest);
        }
      } catch (error) {
        if (error?.message === 'Request failed with status code 500') {
          localStorage.setItem('refreshToken', '');
          document.location.replace('https://slim-mom7.netlify.app');
          // document.location.replace('http://localhost:3000/');
        }
        // toast.error('You need to login');
      }
    }
    throw error;
  }
);

const authOperations = {
  signUpUser,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
