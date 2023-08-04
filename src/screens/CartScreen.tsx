import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
import { clearCart, saveCart } from '../ReduxToolkit/reducers/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

const CartScreen = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const products = await AsyncStorage.getItem('cartProducts')
      if(products?.length) {
        const parsedProducts = JSON.parse(products)
        setProducts(parsedProducts)
      }
    })()
  }, [cartProducts]);

  const saveCartToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product: Product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const handleClearCart = () => {
    // Dispatch the clearCart action
    dispatch(clearCart());
    // Clear the cartProducts from AsyncStorage as well
    AsyncStorage.removeItem('cartProducts');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item?.image }} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{item?.title}</Text>
          <Text style={styles.productPrice}>${item?.price}</Text>
          <Text style={styles.quantityText}>Quantity: {item?.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (products?.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No products in cart yet.</Text>
        </View>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.totalPriceText}>Total Price: ${calculateTotalPrice()}</Text>
      <Button title="Clear Cart" onPress={handleClearCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
  },
  quantityText: {
    fontSize: 12,
    color: 'gray',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
  },
});

export default CartScreen;
