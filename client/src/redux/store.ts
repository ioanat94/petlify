import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';
import adminsReducer from './slices/adminsSlice';
import authReducer from './slices/authSlice';
import adminAuthReducer from './slices/authAdminSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    admins: adminsReducer,
    auth: authReducer,
    adminAuth: adminAuthReducer,
    cart: cartReducer,
    orders: ordersReducer,
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
