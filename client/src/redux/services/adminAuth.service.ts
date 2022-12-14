import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4000/api/v1/auth';

export const fetchAdminTokenThunk = createAsyncThunk(
  'name/fetch',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post(`${URL}/login-admin`, {
        email: email,
        password: password,
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
