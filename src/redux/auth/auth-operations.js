import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = '';
const authInstance = axios.create({
  baseURL: 'http://localhost:3002/',
});

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

const signUpUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', userData);
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

const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', userData);
      //   token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        toast.error(
          'Something wrong. Please  check that the form is filled out correctly and try again. Or  go to sign up.'
        )
      );
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      //   token.unset();
    } catch (error) {
      return rejectWithValue(toast.error('Error logout'));
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    // const userToken = state.auth.token;

    // if (token === null) {
    //   return thunkAPI.rejectWithValue();
    // }

    // token.set(userToken);

    try {
      const { data } = await authInstance.get('/users', userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toast.error('Error fetch current user.'));
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
