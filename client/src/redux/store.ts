import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';
import adminsReducer from './slices/adminsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    admins: adminsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
