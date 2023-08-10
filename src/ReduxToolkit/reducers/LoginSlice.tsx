import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../Actions/LoginAction';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {})
      .addCase(login.fulfilled, (state, action: PayloadAction<User[]>) => {})
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {});
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
