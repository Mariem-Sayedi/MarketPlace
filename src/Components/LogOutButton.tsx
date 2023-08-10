import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../ReduxToolkit/Reducers/LoginSlice'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';
import { Alert, TouchableOpacity } from 'react-native';
import { clearCart } from '../ReduxToolkit/Reducers/CartSlice';
import { clearFavorite } from '../ReduxToolkit/Reducers/FavoriteSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert("Alert","Do you really want to logout?",[
        {text: 'Logout', onPress: () => 
       {dispatch(clearFavorite())
        dispatch(clearCart())
        dispatch(logout())}
       },
        {text: 'cancel'}
    ])

    
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
    <Icon name="log-out-outline" size={35} color={MAIN_BLUE_COLOR} />
    </TouchableOpacity>
    )};

export default LogoutButton;
