import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Admin } from 'redux/slices/adminsSlice';

type PutType = {
  adminId: string;
  updatedAdmin: Partial<Admin>;
};

const URL = 'http://localhost:4000/api/v1/admins';

export const fetchAdminsThunk = createAsyncThunk(
  'admins/fetch',
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

export const fetchAdminThunk = createAsyncThunk(
  'admin/fetch',
  async ({ adminId, token }: { adminId: string; token: string }) => {
    try {
      const res = await axios.get(`${URL}/${adminId}`, {
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

export const createAdminThunk = createAsyncThunk(
  'admin/create',
  async ({ newAdmin, token }: { newAdmin: Admin; token: string }) => {
    try {
      const res = await axios.post(`${URL}/`, newAdmin, {
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

export const updateAdminThunk = createAsyncThunk(
  'admin/update',
  async ({ data, token }: { data: PutType; token: string }) => {
    try {
      const { adminId, updatedAdmin } = data;
      const res = await axios.put(`${URL}/${adminId}`, updatedAdmin, {
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

export const deleteAdminThunk = createAsyncThunk(
  'admin/delete',
  async ({ adminId, token }: { adminId: string; token: string }) => {
    try {
      const res = await axios.delete(`${URL}/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: adminId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
