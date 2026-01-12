import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import api from '@/services/api';

interface AuthState {
  user: any | null;
  profile: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

/* =======================
   LOGIN
======================= */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { emailOrPhone, password }: { emailOrPhone: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/user/login', { emailOrPhone, password });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

/* =======================
   REGISTER
======================= */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/register', formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

/* =======================
   RESTORE SESSION (IMPORTANT)
======================= */
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (token: string) => {
    const user = await SecureStore.getItemAsync('user');
    const profile = await SecureStore.getItemAsync('profile');

    return {
      token,
      user: user ? JSON.parse(user) : null,
      profile: profile ? JSON.parse(profile) : null,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      SecureStore.deleteItemAsync('token');
      SecureStore.deleteItemAsync('user');
      SecureStore.deleteItemAsync('profile');

      state.user = null;
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    /* ---------- LOGIN ---------- */
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user, profile, token } = action.payload;

      SecureStore.setItemAsync('token', token);
      SecureStore.setItemAsync('user', JSON.stringify(user));
      SecureStore.setItemAsync('profile', JSON.stringify(profile));

      state.user = user;
      state.profile = profile;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* ---------- REGISTER ---------- */
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* ---------- RESTORE SESSION ---------- */
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
