import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await loginUserApi({ email, password });
    return data.user;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const data = await registerUserApi({ email, password, name });
    return data.user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
  const data = await getUserApi();
  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
      });
  },
  selectors: {
    getIsAuth: (state): boolean => state.isAuth,
    getUser: (state): TUser | null => state.user,
    getAuthLoading: (state): boolean => state.isLoading
  }
});

export const { getIsAuth, getUser, getAuthLoading } = authSlice.selectors;
export default authSlice.reducer;
