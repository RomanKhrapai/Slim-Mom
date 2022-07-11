import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth-reducer';
import { userSlice } from './user/user-reducer';
import { productSlice } from './products/products-reducer';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
  },
});
