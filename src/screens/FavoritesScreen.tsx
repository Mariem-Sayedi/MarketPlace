import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';
import { Product } from '../Interfaces/Index';
import { clearFavorite } from '../ReduxToolkit/Reducers/FavoriteSlice';
import LottieView from 'lottie-react-native';

const FavoriteScreen = () => {
  const favoriteProducts = useSelector((state: RootState) => state.favorite.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      console.log('favoriteProducts',favoriteProducts)
      const storedProducts = await AsyncStorage.getItem('favoriteProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } else {
        setProducts([])
      }
    })();
  }, [favoriteProducts]);

  

  const handleClearFavorite = async () => {
    dispatch(clearFavorite());
    // Clear the favoriteProducts from AsyncStorage as well
    await AsyncStorage.removeItem('favoriteProducts');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyFavoriteContainer}>
          {/* <LottieView
            source={require('../Assets/emptyAnimation.json')}
            autoPlay
            loop
          /> */}
          <Text style={styles.emptyFavoriteText}>No products in favorite list yet.</Text>
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
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2} // Display two products per row 
      />
      <View style={styles.clearFavoriteButtonContainer}>
        <Button
          title="Clear all"
          onPress={handleClearFavorite}
          color={MAIN_BLUE_COLOR}
        />
      </View>
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
    width: 190,
    height: 310,
    margin: 8,
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    marginTop: 8,
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
 
  clearFavoriteButtonContainer: {
    marginTop: 10,
    backgroundColor: MAIN_BLUE_COLOR,
    borderRadius: 40, 
    paddingVertical: 12, 
    paddingHorizontal: 8, 
    alignSelf: 'center',
  },
});

export default FavoriteScreen;
