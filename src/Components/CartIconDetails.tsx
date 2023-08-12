import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../ReduxToolkit/Reducers/CartSlice';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const CartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const isCart = cartProducts.some((item) => item.id === product.id);
  const navigation = useNavigation(); // Get the navigation object

  const handleToggleCart = () => {
    dispatch(toggleCart(product));
  };

  const getTotalCartCount = () => {
    return cartProducts.reduce((total, product) => total + product.quantity, 0);
  };

  const navigateToCartScreen = () => {
    navigation.navigate('CartScreen'); 
  };

  return (
    <TouchableOpacity onPress={ navigateToCartScreen } style={styles.cartIconContainer}>
        <View style={styles.cartIcon}>
          <Icon name="cart" size={30} color={getTotalCartCount() > 0 ? 'red' : '#378ff8'} />
          {getTotalCartCount() > 0 && (
            <Text style={styles.cartIconText}>{getTotalCartCount()}</Text>
          )}
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  cartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cartIcon: {
    position: 'relative',
  },
  cartIconText: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CartIcon;
