import { loginSuccess } from '../Reducers/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export const login = createAsyncThunk(
  'auth/loginSuccess', 
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
      const token = response.data.token;

      // Store the token locally
      await AsyncStorage.setItem('token', token);

      return token; // Return the token to be dispatched on success
    } catch (error) {
      return rejectWithValue('Invalid username or password'); // Handle error with rejectWithValue
    }
  }
);
