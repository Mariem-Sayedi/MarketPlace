// LoginAction.js
import { loginSuccess } from '../Reducers/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const login = (username: string, password: string) => async (dispatch: (arg0: { payload: any; type: "auth/loginSuccess"; }) => void) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
    const token = response.data.token;

    // Store the token locally
    await AsyncStorage.setItem('token', token);

    // Dispatch login success action
    dispatch(loginSuccess(token));
  } catch (error) {
    Alert.alert('Login Error', 'Invalid username or password');
  }
};
