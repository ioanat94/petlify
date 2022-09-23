import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product, UpdatedProduct } from 'redux/slices/productsSlice';

type PutType = {
  productId: string;
  updatedProduct: UpdatedProduct;
};

const URL = 'http://localhost:4000/api/v1/products';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetch',
  async () => {
    try {
      const res = await axios.get(`${URL}`);

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
  async (product: Product) => {
    try {
      const res = await axios.post(`${URL}/`, product);

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
  async (data: PutType) => {
    try {
      const { productId, updatedProduct } = data;
      const res = await axios.put(`${URL}/${productId}`, updatedProduct);

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
  async (productId: string) => {
    try {
      const res = await axios.delete(`${URL}/${productId}`);

      return {
        data: productId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
