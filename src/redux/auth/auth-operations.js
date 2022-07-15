import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.baseURL = 'https://slim-mom-server.herokuapp.com/api/';

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
  // ожидает получить данные пользователя { name: "user2Test", email: "user2test@gmail.com", password: "user2test" }
  async (userData, { rejectWithValue }) => {
    try {
       const signUpResponse = await axios.post('/auth/register ', userData);
      //  console.log(signUpResponse.data);
       try{
         const loginResponse= await axios.post('/auth/logn', {email: userData.email, password: userData.password});
         token.set(loginResponse.data.accessToken);
        //  console.log(loginResponse.data.user.params);
         return({...loginResponse.data, isAuthorised: true})
       }
       catch{
       return (signUpResponse.data, {isAuthorised: false, refreshToken: "", accessToken: "" , user:{ email: "", name: ""}});
      }
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
  // Ожидает получить почту и пароль пользователя {email: "user2test@gmail.com", password: "user2test" }
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', userData);
      localStorage.setItem('token', data.accessToken)
      token.set(data.accessToken);
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
  // Ничего не получает, делает запрос с текущим токеном и разлогинивает пользователя
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/logout');
      localStorage.removeItem('token');
      token.unset();
    } catch (error) {
      return rejectWithValue(toast.error('Error logout'));
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.user.accessToken;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);

    try {
      const { data } = await axios.get('auth/refresh');
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