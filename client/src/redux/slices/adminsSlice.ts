import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Admin = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

export type UpdatedAdmin = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
};

type PutType = {
  adminId: string;
  updatedAdmin: UpdatedAdmin;
};

export interface AdminsState {
  allAdmins: Admin[];
  singleAdmin: Admin;
  isLoading: boolean;
}

const initialState: AdminsState = {
  allAdmins: [],
  singleAdmin: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  },
  isLoading: false,
};

export const fetchAdminsThunk = createAsyncThunk('admins/fetch', async () => {
  const res = await axios.get('http://localhost:4000/api/v1/admins');

  return {
    data: res.data,
    status: res.status,
  };
});

export const fetchAdminThunk = createAsyncThunk(
  'admin/fetch',
  async (adminId: string) => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/admins/${adminId}`
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const createAdminThunk = createAsyncThunk(
  'admin/create',
  async (admin: Admin) => {
    const res = await axios.post(`http://localhost:4000/api/v1/admins/`, admin);

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const updateAdminThunk = createAsyncThunk(
  'admin/update',
  async (data: PutType) => {
    const { adminId, updatedAdmin } = data;
    const res = await axios.put(
      `http://localhost:4000/api/v1/admins/${adminId}`,
      updatedAdmin
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const deleteAdminThunk = createAsyncThunk(
  'admin/delete',
  async (adminId: string) => {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/admins/${adminId}`
    );

    return {
      data: res.data,
      status: res.status,
    };
  }
);

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminsThunk.pending, (state: AdminsState) => {
      state.allAdmins = [];
      state.isLoading = true;
    });
    builder.addCase(
      fetchAdminsThunk.fulfilled,
      (state: AdminsState, action) => {
        state.allAdmins = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchAdminThunk.pending, (state: AdminsState) => {
      state.singleAdmin = {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: '',
      };
      state.isLoading = true;
    });
    builder.addCase(fetchAdminThunk.fulfilled, (state: AdminsState, action) => {
      state.singleAdmin = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(createAdminThunk.pending, (state: AdminsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      createAdminThunk.fulfilled,
      (state: AdminsState, action) => {
        state.allAdmins = [...state.allAdmins, action.payload.data];
        state.isLoading = false;
      }
    );
    builder.addCase(updateAdminThunk.pending, (state: AdminsState) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdminThunk.fulfilled, (state: AdminsState) => {
      state.allAdmins = [...state.allAdmins];
      state.isLoading = false;
    });
    builder.addCase(deleteAdminThunk.pending, (state: AdminsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteAdminThunk.fulfilled,
      (state: AdminsState, action) => {
        state.allAdmins = state.allAdmins.filter(
          (admin) => admin._id !== action.payload.data
        );
        state.isLoading = false;
      }
    );
  },
});

export default adminsSlice.reducer;
