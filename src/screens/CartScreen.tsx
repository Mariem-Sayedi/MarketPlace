import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
import { clearCart } from '../ReduxToolkit/reducers/cartSlice';
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const storedProducts = await AsyncStorage.getItem('cartProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      }
    })();
  }, [cartProducts]);

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleClearCart = async () => {
    // Dispatch the clearCart action
    dispatch(clearCart());
    // Clear the cartProducts from AsyncStorage as well
    await AsyncStorage.removeItem('cartProducts');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (products.length === 0) {
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
      <Text style={styles.header}>Cart Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2} // Display two products per row (grid format)
      />
      <Text style={styles.totalPriceText}>Total Price: ${calculateTotalPrice()}</Text>
      <Button title="Clear Cart" onPress={handleClearCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#f2f3f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: 170,
    height: 290,
    margin: 8,
  },
  productImage: {
    width: 95,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
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
    fontWeight: 'bold',
    color: 'black',
  },
  emptyFavoriteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFavoriteText: {
    fontSize: 16,
  },
  quantityText: {
    fontSize: 15,
    color: 'black',
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
