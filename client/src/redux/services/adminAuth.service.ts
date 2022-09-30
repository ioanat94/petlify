import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4000/api/v1/auth';

export const fetchAdminTokenThunk = createAsyncThunk(
  'admin/fetch',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post(`${URL}/login-admin`, {
        email: email,
        password: password,
      });
      console.log(res.data);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
