import { createSlice } from '@reduxjs/toolkit';

import { fetchAdminTokenThunk } from 'redux/services/adminAuth.service';

function setInfo() {
  if (!localStorage.getItem('adminToken')) {
    const adminToken = '';
    const loggedInAdmin = {
      _id: '',
      roles: [],
    };
    return { adminToken, loggedInAdmin };
  }

  const adminToken: string = JSON.parse(
    localStorage.getItem('adminToken') || ''
  );
  const loggedInAdmin: LoggedInAdmin = JSON.parse(
    localStorage.getItem('loggedInAdmin')!
  ) || {
    _id: '',
    roles: [],
  };

  return { adminToken, loggedInAdmin };
}

type LoggedInAdmin = {
  _id: string;
  roles: string[];
};

export interface UsersState {
  adminToken: string;
  loggedInAdmin: LoggedInAdmin;
  isLoading: boolean;
}

const initialState: UsersState = {
  adminToken: setInfo().adminToken,
  loggedInAdmin: setInfo().loggedInAdmin,
  isLoading: false,
};

export const authAdminSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.adminToken = '';
      state.loggedInAdmin = { _id: '', roles: [] };
      localStorage.setItem('adminToken', JSON.stringify(state.adminToken));
      localStorage.setItem(
        'loggedInAdmin',
        JSON.stringify(state.loggedInAdmin)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminTokenThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAdminTokenThunk.fulfilled,
      (state: UsersState, action) => {
        state.adminToken = action.payload.data.token;
        state.loggedInAdmin = action.payload.data.resAdmin;
        localStorage.setItem('adminToken', JSON.stringify(state.adminToken));
        localStorage.setItem(
          'loggedInAdmin',
          JSON.stringify(state.loggedInAdmin)
        );
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchAdminTokenThunk.rejected,
      (state: UsersState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
  },
});

export const { logout } = authAdminSlice.actions;

export default authAdminSlice.reducer;
