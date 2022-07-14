import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://slim-mom-server.herokuapp.com';


const signUpUser = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('api/auth/register', credentials);
    return data;
  } catch (error) {
    toast.error(
      'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
    )
  }
});
const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('api/auth/login', credentials);
    //token.set(data.token);
    return data;
  } catch (error) {
    toast.error(
      'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
    )
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('api/auth/logout');
    //token.unset();
  } catch (error) {
    toast.error(
      'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
    )
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    //const persistedToken = state.auth.token;

   // if (persistedToken === null) {
   //   return thunkAPI.rejectWithValue();
   // }

    //token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      toast.error(
        'Something wrong. Please  check that the form is filled out correctly and try again. Or go to sign in.'
      )
    }
  }
);

const authOperations = {
  signUpUser,
  logIn,
  logOut,
  fetchCurrentUser
};

export default authOperations;

// axios.defaults.baseURL = '';
/*const authInstance = axios.create({
  baseURL: 'https://slim-mom-server.herokuapp.com/',
});*/

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

/*const signUpUser = createAsyncThunk(
  'api/auth/register',
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
  'api/auth/login',
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

const logOut = createAsyncThunk(
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
*/

