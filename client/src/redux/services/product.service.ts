import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from 'redux/slices/productsSlice';

type PutType = {
  productId: string;
  updatedProduct: Partial<Product>;
};

const URL = 'http://localhost:4000/api/v1/products';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetch',

  async (query?: string) => {
    try {
      const res = await axios.get(`${URL}${query ? query : ''}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductThunk = createAsyncThunk(
  'product/fetch',
  async (productId: string) => {
    try {
      const res = await axios.get(`${URL}/${productId}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const createProductThunk = createAsyncThunk(
  'product/create',
  async ({ product, token }: { product: Product; token: string }) => {
    try {
      const res = await axios.post(`${URL}/`, product, {
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

export const updateProductThunk = createAsyncThunk(
  'product/update',
  async ({ data, token }: { data: PutType; token: string }) => {
    try {
      const { productId, updatedProduct } = data;
      const res = await axios.put(`${URL}/${productId}`, updatedProduct, {
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

export const deleteProductThunk = createAsyncThunk(
  'product/delete',
  async ({ productId, token }: { productId: string; token: string }) => {
    try {
      const res = await axios.delete(`${URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: productId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
