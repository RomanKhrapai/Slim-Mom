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
import optionsSlice from './options/options-reducer';
import userSlice from './userParams/user-reducer';
import productSlice from './products/products-reducer';
import authSlice from './auth/auth';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const optionsPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const initialState = { user: '' };

export const store = configureStore({
  reducer: {
    user: userSlice,
    options: persistReducer(optionsPersistConfig, optionsSlice),
    products: productSlice,
    auth: authSlice,
  },
  initialState: initialState,
  middleware,
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);