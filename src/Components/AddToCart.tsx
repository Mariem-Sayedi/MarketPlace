import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../ReduxToolkit/Reducers/CartSlice';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';

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
        <View style={styles.AddToCartButtonContainer}>
                 <Button title="Add to Cart" color={getTotalCartCount() > 0 ?'#378ff8' : '#378ff8'} onPress={handleToggleCart}/>
          {getTotalCartCount() > 0 && (
            <Text style={styles.quantityText}>{getTotalCartCount()}</Text>
          )}
        </View>
      ) : (
        <View style={styles.AddToCartButtonContainer}>
        <Button title="Add to Cart" color={getTotalCartCount() > 0 ? '#378ff8' : '#378ff8'} onPress={handleToggleCart}/>
        {getTotalCartCount() > 0 && (
          <Text style={styles.quantityText}>{getTotalCartCount()}</Text>
        )}
        </View>
         )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
AddToCartButtonContainer: {
  marginTop: 10,
  backgroundColor: MAIN_BLUE_COLOR,
  borderRadius: 40, 
  paddingVertical: 12, 
  paddingHorizontal: 8, 
  alignSelf: 'center',
},
quantityText:{
  alignSelf: 'center',
  color: 'white',
}
});
export default AddToCart;