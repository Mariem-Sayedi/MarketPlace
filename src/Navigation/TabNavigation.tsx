import React from 'react';
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from '../Screens/CartScreen';
import FavouritesScreen from '../Screens/FavoritesScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';

const Tab = createMaterialBottomTabNavigator();

const  MyTabs = ()=> {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="white"
      barStyle={{ backgroundColor: MAIN_BLUE_COLOR }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={30} />
          ),
        }}
      />
       <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;