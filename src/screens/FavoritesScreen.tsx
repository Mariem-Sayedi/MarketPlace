import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
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

const FavoriteScreen = () => {
  const favoriteProducts = useSelector((state: RootState) => state.favorite.products);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const storedProducts = await AsyncStorage.getItem('favoriteProducts');
      if (storedProducts?.length) {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      }
    })();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (favoriteProducts?.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyFavoriteContainer}>
          <Text style={styles.emptyFavoriteText}>No products in the favorite list yet.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
        numColumns={2} // Display two products per row (grid format)
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 2 - 12; // Adjusted for margin and padding

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
  productContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: itemWidth,
    height: 265,
    margin: 8,
  },
  productImage: {
    width: 95,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
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
});

export default FavoriteScreen;
