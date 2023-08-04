import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check for the authentication token when the app starts
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      // Retrieve the authentication token from AsyncStorage
      const authToken = await AsyncStorage.getItem('authToken');

      // If the token exists, navigate to the main screen or dashboard
      if (authToken) {
        navigation.replace('Marketplace'); // Use replace instead of navigate to prevent going back to login screen
      }
    } catch (error) {
      console.log('Error retrieving authentication token:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });

      // Assuming the API returns an authentication token on successful login
      const authToken = response.data.token;

      // Store the authentication token in AsyncStorage
      await AsyncStorage.setItem('authToken', authToken);

      // Redirect the user to the main screen or dashboard
      navigation.replace('Marketplace'); // Use replace instead of navigate to prevent going back to login screen
    } catch (error) {
      Alert.alert('Login Error', 'Invalid username or password');
    }
  };

  // Use navigation.setOptions to set the header title and other options
  useEffect(() => {
    navigation.setOptions({
      title: 'Login', // Set the header title
    });
  }, []);

  return (
    <View>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
