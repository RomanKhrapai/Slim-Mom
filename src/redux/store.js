import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/auth-reducer';
import userSlice from './user/user-reducer';
import productSlice from './products/products-reducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const initialState = { user: '' };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    user: userSlice,
    product: productSlice,
  },
  initialState: initialState,
  middleware,
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);