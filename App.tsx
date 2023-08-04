import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './src/navigation/TabNavigation';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SearchBar from './src/components/SearchBar';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './src/ReduxToolkit/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ onLoginSuccess: (token) => console.log('Auth Token:', token) }}
          />
          <Stack.Screen name="Marketplace" component={MyTabs} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={DetailsScreen} />   
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
