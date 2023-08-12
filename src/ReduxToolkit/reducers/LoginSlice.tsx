import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../Actions/LoginAction';
import { AuthState, User } from '../../Interfaces/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
       AsyncStorage.removeItem('authToken')
    },
  },
  extraReducers:(builder) => {
    builder 
      .addCase(login.pending, (state) => {})
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true; 
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null; 
        state.isAuthenticated = false; 
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
