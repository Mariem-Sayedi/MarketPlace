import React from 'react';
import HomeScreen from "../screens/HomeScreen";
import CartScreen from '../screens/CartScreen';
import FavouritesScreen from '../screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

const  MyTabs = ()=> {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="white"
      barStyle={{ backgroundColor: '#378ff8' }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={37} />
          ),
        }}
      />
       <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;