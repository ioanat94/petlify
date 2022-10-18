import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Order } from 'redux/slices/ordersSlice';

type PutType = {
  orderId: string;
  updatedOrder: Partial<Order>;
};

const URL = 'http://localhost:4000/api/v1/orders';

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetch',

  async ({ token, query }: { token?: string; query?: string }) => {
    try {
      const res = await axios.get(`${URL}?user=${query}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchOrderThunk = createAsyncThunk(
  'order/fetch',
  async (orderId: string) => {
    try {
      const res = await axios.get(`${URL}/${orderId}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  'order/create',
  async (order: Order) => {
    try {
      const res = await axios.post(`${URL}/`, order);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderThunk = createAsyncThunk(
  'order/update',
  async ({ data, token }: { data: PutType; token: string }) => {
    try {
      const { orderId, updatedOrder } = data;
      const res = await axios.put(`${URL}/${orderId}`, updatedOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteOrderThunk = createAsyncThunk(
  'order/delete',
  async ({ orderId, token }: { orderId: string; token: string }) => {
    try {
      const res = await axios.delete(`${URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: orderId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
