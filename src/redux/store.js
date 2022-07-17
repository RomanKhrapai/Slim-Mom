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
import userSlice from './user/user-reducer';
import productSlice from './products/products-reducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const optionsPersistConfig = {
  key: 'options',
  storage,
  whitelist: ['token'],
};

const initialState = { user: '' };

export const store = configureStore({
  reducer: {
    user: userSlice,
    options: persistReducer(optionsPersistConfig, optionsSlice),
    products: productSlice,
  },
  initialState: initialState,
  middleware,
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);