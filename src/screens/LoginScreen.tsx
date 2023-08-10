import React, { useState } from 'react';
import { View, Text, TextInput, Button, LogBox } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/Actions/LoginAction';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../ReduxToolkit/Reducers/LoginSlice';
import { AppLogo } from '../Components/Logo';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
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
        <AppLogo/>
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log in" onPress={handleLogin} />
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
});

export default LoginScreen;
