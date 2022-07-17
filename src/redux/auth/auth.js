import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  picture: '',
  isAuthorised: false,
  isLoading: false,
  isFetchingCurrentUser: false,
  token: 'kfkfjfk',
  lenguage: 'uk',
  isDark: false,
  refreshToken: '',
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer