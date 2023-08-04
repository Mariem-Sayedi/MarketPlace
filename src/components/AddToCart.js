import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../ReduxToolkit/reducers/cartSlice';

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const isCart = cartProducts.some((item) => item.id === product.id);

  const handleToggleCart = () => {
    dispatch(toggleCart(product));
  };

  const getTotalCartCount = () => {
    return cartProducts.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <TouchableOpacity onPress={handleToggleCart}>
      {isCart ? (
        <View >
                 <Button title="Add to Cart" color={getTotalCartCount() > 0 ?'#378ff8' : '#378ff8'} onPress={handleToggleCart}/>
          {getTotalCartCount() > 0 && (
            <Text>{getTotalCartCount()}</Text>
          )}
        </View>
      ) : (
        <View >
        <Button title="Add to Cart" color={getTotalCartCount() > 0 ? '#378ff8' : '#378ff8'} onPress={handleToggleCart}/>
 {getTotalCartCount() > 0 && (
   <Text>{getTotalCartCount()}</Text>
 )}
</View>
        )}
    </TouchableOpacity>
  );
};



export default AddToCart;