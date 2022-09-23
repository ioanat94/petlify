import { createSlice } from '@reduxjs/toolkit';
import {
  createProductThunk,
  deleteProductThunk,
  fetchProductsThunk,
  fetchProductThunk,
  updateProductThunk,
} from 'redux/services/product.service';

export type Product = {
  _id?: string;
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

export type UpdatedProduct = {
  _id?: string;
  name?: string;
  img?: string;
  description?: string;
  categories?: {
    pet: string;
    subcategory: string;
  };
  variants?: string[];
  sizes?: string[];
  price?: number;
};

export interface ProductsState {
  allProducts: Product[];
  singleProduct: Product;
  isLoading: boolean;
}

const initialState: ProductsState = {
  allProducts: [],
  singleProduct: {
    _id: '',
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

export const productsSlice = createSlice({
  name: 'products',
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
    builder.addCase(
      fetchProductsThunk.rejected,
      (state: ProductsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(fetchProductThunk.pending, (state: ProductsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchProductThunk.fulfilled,
      (state: ProductsState, action) => {
        state.singleProduct = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchProductThunk.rejected,
      (state: ProductsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(createProductThunk.pending, (state: ProductsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      createProductThunk.fulfilled,
      (state: ProductsState, action) => {
        state.allProducts = [...state.allProducts, action.payload.data];
        state.isLoading = false;
      }
    );
    builder.addCase(
      createProductThunk.rejected,
      (state: ProductsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(updateProductThunk.pending, (state: ProductsState) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductThunk.fulfilled, (state: ProductsState) => {
      state.allProducts = [...state.allProducts];
      state.isLoading = false;
    });
    builder.addCase(
      updateProductThunk.rejected,
      (state: ProductsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(deleteProductThunk.pending, (state: ProductsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteProductThunk.fulfilled,
      (state: ProductsState, action) => {
        state.allProducts = state.allProducts.filter(
          (product) => product._id !== action.payload.data
        );
        state.isLoading = false;
      }
    );
    builder.addCase(
      deleteProductThunk.rejected,
      (state: ProductsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
  },
});

export default productsSlice.reducer;
