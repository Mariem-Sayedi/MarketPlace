import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxToolkit/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';
import { Product } from '../Interfaces/Index';
import { clearFavorite, updateFavorite } from '../ReduxToolkit/Reducers/FavoriteSlice';
import LottieView from 'lottie-react-native';
import { handleImageClick, itemWidth } from '../Constants';

const FavoriteScreen = () => {
  const favoriteProducts = useSelector((state: RootState) => state.favorite.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  
  useEffect(() => {
    (async () => {
      const storedProducts = await AsyncStorage.getItem('favoriteProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        dispatch(updateFavorite(parsedProducts)); // Dispatch the updateFavorite action
        setProducts(parsedProducts);
      } else {
        setProducts([]);
      }
    })();
  }, []);

  useEffect(() => {
    setProducts(favoriteProducts);
  },[favoriteProducts])
  

  const handleClearFavorite = async () => {
    dispatch(clearFavorite());
    // Clear the favoriteProducts from AsyncStorage as well
    await AsyncStorage.removeItem('favoriteProducts');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyFavoriteContainer}>
          {/* <LottieView
            source={require('../Assets/emptyAnimation.json')}
            // autoPlay
            // loop
            ref={animationRef}
          /> */}
          <Text style={styles.emptyFavoriteText}>No products in favorite list yet.</Text>
        </View>
      </View>
    );
  // }

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
      <TouchableOpacity onPress={handleClearFavorite} style={styles.clearFavoriteButtonContainer}>
        <Text>Clear all</Text>
      </TouchableOpacity>
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
    width: 180,
    height: 290,
    margin: 3.5,
  },
  productImage: {
    width: itemWidth - 32,
    height: 150,
    resizeMode: 'contain',
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
