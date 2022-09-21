import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Product = {
  name: string;
  img: string;
  description: string;
  categories: {
    pet: string;
    subcategory: string;
  };
  variants: string[];
  sizes: string[];
  price: number;
};

export interface ProductsState {
  allProducts: Product[];
  singleProduct: Product;
  isLoading: boolean;
}

const initialState: ProductsState = {
  allProducts: [],
  singleProduct: {
    name: '',
    img: '',
    description: '',
    categories: {
      pet: '',
      subcategory: '',
    },
    variants: [],
    sizes: [],
    price: 0,
  },
  isLoading: false,
};

export const fetchProductsThunk = createAsyncThunk(
  'products/fetch',
  async () => {
    const res = await axios.get('http://localhost:4000/api/v1/products');

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const fetchProductThunk = createAsyncThunk(
  'product/fetch',
  async (productId: string) => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/products/${productId}`
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const productsSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state: ProductsState) => {
      state.allProducts = [];
      state.isLoading = true;
    });
    builder.addCase(
      fetchProductsThunk.fulfilled,
      (state: ProductsState, action) => {
        state.allProducts = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchProductThunk.pending, (state: ProductsState) => {
      state.singleProduct = {
        name: '',
        img: '',
        description: '',
        categories: {
          pet: '',
          subcategory: '',
        },
        variants: [],
        sizes: [],
        price: 0,
      };
      state.isLoading = true;
    });
    builder.addCase(
      fetchProductThunk.fulfilled,
      (state: ProductsState, action) => {
        state.singleProduct = action.payload.data;
        state.isLoading = false;
      }
    );
  },
});

export default productsSlice.reducer;
