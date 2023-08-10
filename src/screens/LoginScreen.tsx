import React, { useState } from 'react';
import { View, Text, TextInput, Button, LogBox, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../ReduxToolkit/Reducers/LoginSlice';
import { AppLogo } from '../Components/Logo';
import LogoutButton from '../Components/LogOutButton';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    setUsernameError('');
    setPasswordError('');

    let isValid = true;

    if (!username.length) {
      setUsernameError('Please enter a username');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    }

    if (!password.length) {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    try {
      const isValid = validateForm();
      if (!isValid) return;

      // Simulating a successful login with a token
      const token = 'your_auth_token_here';
      await dispatch(loginSuccess(token));
      await AsyncStorage.setItem('authToken', token);
      navigation.navigate('Marketplace');
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppLogo />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <View style={styles.button}>
        <Button title="Log in" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 40, 
    marginTop: 20, 
  },
  button: {
    width: '48%', 
    marginTop: 10,
    backgroundColor: MAIN_BLUE_COLOR,
    borderRadius: 30, 
    paddingVertical: 12, 
    paddingHorizontal: 8, 
    align: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
