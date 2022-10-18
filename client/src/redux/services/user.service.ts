import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from 'redux/slices/usersSlice';

type PutType = {
  userId: string;
  updatedUser: Partial<User>;
};

const URL = 'http://localhost:4000/api/v1/users';

export const fetchUsersThunk = createAsyncThunk(
  'users/fetch',
  async ({ token, query }: { token: string; query?: string }) => {
    try {
      const res = await axios.get(`${URL}${query ? query : ''}`, {
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

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async ({ userId, token }: { userId: string; token: string }) => {
    try {
      const res = await axios.get(`${URL}/${userId}`, {
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

export const createUserThunk = createAsyncThunk(
  'user/create',
  async (user: User) => {
    try {
      const res = await axios.post(`${URL}/`, user);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async ({ data, token }: { data: PutType; token: string }) => {
    try {
      const { userId, updatedUser } = data;
      const res = await axios.put(`${URL}/${userId}`, updatedUser, {
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

export const deleteUserThunk = createAsyncThunk(
  'user/delete',
  async ({ userId, token }: { userId: string; token: string }) => {
    try {
      const res = await axios.delete(`${URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: userId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
