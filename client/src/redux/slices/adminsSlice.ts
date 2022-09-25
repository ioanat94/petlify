import { createSlice } from '@reduxjs/toolkit';

import {
  createAdminThunk,
  deleteAdminThunk,
  fetchAdminsThunk,
  fetchAdminThunk,
  updateAdminThunk,
} from 'redux/services/admin.service';

export type Admin = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
};

export type UpdatedAdmin = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  roles?: string[];
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
    roles: [],
  },
  isLoading: false,
};

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
    builder.addCase(fetchAdminsThunk.rejected, (state: AdminsState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(fetchAdminThunk.pending, (state: AdminsState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdminThunk.fulfilled, (state: AdminsState, action) => {
      state.singleAdmin = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchAdminThunk.rejected, (state: AdminsState, error) => {
      console.log(error);
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
    builder.addCase(createAdminThunk.rejected, (state: AdminsState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(updateAdminThunk.pending, (state: AdminsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateAdminThunk.fulfilled,
      (state: AdminsState, action) => {
        state.singleAdmin = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(updateAdminThunk.rejected, (state: AdminsState, error) => {
      console.log(error);
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
    builder.addCase(deleteAdminThunk.rejected, (state: AdminsState, error) => {
      console.log(error);
      state.isLoading = false;
    });
  },
});

export default adminsSlice.reducer;
