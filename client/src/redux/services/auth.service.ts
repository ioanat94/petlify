import { CredentialResponse } from '@react-oauth/google';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4000/api/v1/auth';

export const fetchTokenThunk = createAsyncThunk(
  'auth/fetch',
  async (credential: CredentialResponse) => {
    try {
      const res = await axios.post(
        `${URL}/login`,
        {},
        {
          headers: {
            id_token: credential as string,
          },
        }
      );

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
