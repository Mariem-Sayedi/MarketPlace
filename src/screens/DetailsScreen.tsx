import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import CartIconDetails from '../Components/CartIconDetails';
import FavoriteIconDetails from '../Components/FavoriteIconDetails';
import { toggleCart } from '../ReduxToolkit/Reducers/CartSlice';
import AddToCart from '../Components/AddToCart';
import { DetailsScreenProps, Product } from '../Interfaces/Index';


const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { product} = route.params;
  const dispatch = useDispatch();
  const [quantityInput, setQuantityInput] = useState('0'); 

  const handleAddToCart = () => {
    const quantity = parseInt(quantityInput, 10);
    if (quantity > 0) {
      dispatch(toggleCart({ product, quantity }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.productImage} source={{ uri: product.image }} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
      <AddToCart product={product}/>
      {/* Cart and Favorite icons */}
      <FavoriteIconDetails product={product} />
    </ScrollView>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productImage: {
    width: windowWidth - 50, // Set the width to the window width minus padding
    height: 250,  // Keep the original height
    resizeMode: 'contain',
    marginBottom: 16,
    marginRight: 20,

  },
  productDetails: {
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#378ff8',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityText: {
    fontSize: 18,
    marginRight: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    width: 80,
  },
 
});

export default DetailsScreen;
