import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isBanned: boolean;
};

export type UpdatedUser = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  isBanned?: boolean;
};

type PutType = {
  userId: string;
  updatedUser: UpdatedUser;
};

export interface UsersState {
  allUsers: User[];
  singleUser: User;
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
  singleUser: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    isBanned: false,
  },
  isLoading: false,
};

export const fetchUsersThunk = createAsyncThunk('users/fetch', async () => {
  try {
    const res = await axios.get('http://localhost:4000/api/v1/users');

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    throw error;
  }
});

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async (userId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/users/${userId}`
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

export const createUserThunk = createAsyncThunk(
  'user/create',
  async (user: User) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/users/`, user);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (data: PutType) => {
    try {
      const { userId, updatedUser } = data;
      const res = await axios.put(
        `http://localhost:4000/api/v1/users/${userId}`,
        updatedUser
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

export const deleteUserThunk = createAsyncThunk(
  'user/delete',
  async (userId: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/users/${userId}`
      );

      return {
        data: userId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state: UsersState) => {
      state.allUsers = [];
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchUsersThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state: UsersState, action) => {
      state.singleUser = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(createUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = [...state.allUsers, action.payload.data];
      state.isLoading = false;
    });
    builder.addCase(createUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(updateUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state: UsersState, action) => {
      const updatedUser = state.allUsers.find(
        (user) => user._id === action.payload.data._id
      )!;
      updatedUser.isBanned = action.payload.data.isBanned;
      state.isLoading = false;
    });
    builder.addCase(updateUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(deleteUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload.data
      );
      state.isLoading = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
