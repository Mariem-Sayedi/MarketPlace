import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/ReduxToolkit/store';
import RootNavigator from './src/Navigation';

const Stack = createStackNavigator();

const App = () => {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
      <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
