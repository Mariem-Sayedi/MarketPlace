import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
import { saveFavorite } from '../ReduxToolkit/reducers/favoriteSlice';
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
  const dispatch = useDispatch();
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const products = await AsyncStorage.getItem('favoriteProducts')
      if(products?.length) {
        const parsedProducts = JSON.parse(products)
        setProducts(parsedProducts)
      }
    })()
  }, [favoriteProducts]);

  const saveFavoriteToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    } catch (error) {
      console.error('Error saving favorite to AsyncStorage:', error);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity>
      <View style={styles.productContainer}>     
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (favoriteProducts?.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyFavoriteContainer}>
          <Text style={styles.emptyFavoriteText}>No products in favorite list yet.</Text>
        </View>
      </View>
    );
  }
  

  // Key to force re-render when numColumns changes
  const listKey = favoriteProducts.length + 'columnList';

  return (
    <FlatList
      data={favoriteProducts}
      key={listKey} // Use key to force re-render when numColumns changes
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      numColumns={1} // Display one product per row (one-column list)
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    alignItems: 'flex-start', 
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
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, 
  },
  productPrice: {
    fontSize: 14,
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