import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../ReduxToolkit/Reducers/LoginSlice'; 

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  return <Button title="Log out" onPress={handleLogout} />;
};

export default LogoutButton;
