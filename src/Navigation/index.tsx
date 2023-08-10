import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux'; 
import MyTabs from './TabNavigation';
import HomeScreen from '../Screens/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import LoginScreen from '../Screens/LoginScreen';
import CartIconDetails from '../Components/CartIconDetails';
import ProductsSlice from '../ReduxToolkit/Reducers/ProductsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../ReduxToolkit/Reducers/LoginSlice';
import { AppLogo } from '../Components/Logo';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Rehydrate the token on app start
    const rehydrateToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        dispatch(loginSuccess(storedToken));
      }
    };
    
    rehydrateToken();
  }, []);
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Marketplace" component={MyTabs} options={{
              headerTitle: () => <AppLogo />, 
            }}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Product Detail"
            component={DetailsScreen}
            options={({ route }) => ({  
              headerRight: () => <CartIconDetails product={route.params.product} />, 
            })}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ onLoginSuccess: (Token) => console.log('Auth Token:', Token) }}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
