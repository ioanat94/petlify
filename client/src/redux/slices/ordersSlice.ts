import { createSlice } from '@reduxjs/toolkit';

import {
  createOrderThunk,
  deleteOrderThunk,
  fetchOrdersThunk,
  fetchOrderThunk,
  updateOrderThunk,
} from 'redux/services/order.service';

export type Order = {
  _id?: string;
  products: string[];
  user: string;
  date: Date;
  address: string;
  value: number;
  status: string;
};

export interface OrdersState {
  allOrders: Order[];
  singleOrder: Order;
  isLoading: boolean;
}

const initialState: OrdersState = {
  allOrders: [],
  singleOrder: {
    _id: '',
    products: [],
    user: '',
    date: new Date(),
    address: '',
    value: 0,
    status: '',
  },
  isLoading: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersThunk.pending, (state: OrdersState) => {
      state.allOrders = [];
      state.isLoading = true;
    });
    builder.addCase(
      fetchOrdersThunk.fulfilled,
      (state: OrdersState, action) => {
        state.allOrders = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchOrdersThunk.rejected, (state: OrdersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(fetchOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderThunk.fulfilled, (state: OrdersState, action) => {
      state.singleOrder = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchOrderThunk.rejected, (state: OrdersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(createOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(
      createOrderThunk.fulfilled,
      (state: OrdersState, action) => {
        state.allOrders = [...state.allOrders, action.payload.data];
        state.isLoading = false;
      }
    );
    builder.addCase(createOrderThunk.rejected, (state: OrdersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(updateOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateOrderThunk.fulfilled,
      (state: OrdersState, action) => {
        const updatedOrder = state.allOrders.find(
          (order) => order._id === action.payload.data._id
        )!;
        updatedOrder.status = action.payload.data.status;
        state.isLoading = false;
      }
    );
    builder.addCase(updateOrderThunk.rejected, (state: OrdersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(deleteOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteOrderThunk.fulfilled,
      (state: OrdersState, action) => {
        state.allOrders = state.allOrders.filter(
          (order) => order._id !== action.payload.data
        );
        state.isLoading = false;
      }
    );
    builder.addCase(deleteOrderThunk.rejected, (state: OrdersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
  },
});

export default ordersSlice.reducer;
