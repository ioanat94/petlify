import { createSlice } from '@reduxjs/toolkit';

import { fetchTokenThunk } from 'redux/services/auth.service';

type LoggedInUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
};

export interface UsersState {
  token: string;
  loggedInUser: LoggedInUser;
  isLoading: boolean;
}

const initialState: UsersState = {
  token: localStorage.getItem('token') || '',
  loggedInUser: JSON.parse(localStorage.getItem('user')!) || {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    image: '',
  },
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTokenThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTokenThunk.fulfilled, (state: UsersState, action) => {
      state.token = action.payload.data.token;
      state.loggedInUser = action.payload.data.user;
      localStorage.setItem('token', JSON.stringify(state.token));
      localStorage.setItem('user', JSON.stringify(state.loggedInUser));
      state.isLoading = false;
    });
    builder.addCase(fetchTokenThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
