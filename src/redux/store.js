import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth-reducer';
import userSlice from './user/user-reducer';
import productSlice from './products/products-reducer';

const initialState = { user: '' };

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
  },
  initialState: initialState,
});
