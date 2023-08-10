import React, { useState } from 'react';
import { View, Text, TextInput, Button, LogBox } from 'react-native';
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
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Log in" onPress={handleLogin} />
        </View>
        <View style={styles.button}>
          <LogoutButton />
        </View>
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
    alignSelf: 'center',
  },
});

export default LoginScreen;
