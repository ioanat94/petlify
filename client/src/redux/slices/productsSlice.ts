import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export type PutType = {
  productId: string;
  updatedProduct: UpdatedProduct;
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

export const createProductThunk = createAsyncThunk(
  'product/create',
  async (product: Product) => {
    const res = await axios.post(
      `http://localhost:4000/api/v1/products/`,
      product
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const updateProductThunk = createAsyncThunk(
  'product/update',
  async (data: PutType) => {
    const { productId, updatedProduct } = data;
    const res = await axios.put(
      `http://localhost:4000/api/v1/products/${productId}`,
      updatedProduct
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const deleteProductThunk = createAsyncThunk(
  'product/delete',
  async (productId: string) => {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/products/${productId}`
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

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
    builder.addCase(fetchProductThunk.pending, (state: ProductsState) => {
      state.singleProduct = {
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
    builder.addCase(updateProductThunk.pending, (state: ProductsState) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductThunk.fulfilled, (state: ProductsState) => {
      state.allProducts = [...state.allProducts];
      state.isLoading = false;
    });
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
  },
});

export default productsSlice.reducer;
