import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../ReduxToolkit/Actions/ProductsActions';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../Interfaces/Index';
import FavoriteIcon from '../Components/FavoriteIconHome';
import SearchBar from '../Components/SearchBar';
import { handleImageClick, itemWidth } from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFavorite } from '../ReduxToolkit/Reducers/FavoriteSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const navigation = useNavigation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(fetchProducts());
    };
  
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (items?.length) {
      // const itemsWithFavourite = items?.map(el => )
      setFilteredProducts(items);
    }
  }, [items]);

  // MARK this is for favourite product issue
  useEffect(() => {
    (async () => {
      const storedProducts = await AsyncStorage.getItem('favoriteProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        dispatch(updateFavorite(parsedProducts)); // Dispatch the updateFavorite action
        setProducts(parsedProducts);
      } 
    })();
  }, []);

  

  const handleSearch = useCallback((searchText) => {
    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredItems);
  }, [items]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <FavoriteIcon product={item} />
      </View>
    </TouchableOpacity>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.cartActivityIndicator}>
        <ActivityIndicator size="large" color="#378ff8" style={styles.activityIndicator} />
      </View>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  const renderError = () => (
    <Text style={styles.errorText}>Error: {error}</Text>
  );

  return (
    <View style={styles.container}>
    <SearchBar onSearch={handleSearch} navigation={undefined} />
    {loading ? (
      renderLoading() // Show loading indicator when loading is true
    ) : (
      <FlatList
        data={filteredProducts} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  listContainer: {
    paddingVertical: 16,
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
    margin: 8,
  },
  productImage: {
    width: itemWidth - 32,
    height: 150,
    resizeMode: 'contain',
  },
  productTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    marginTop: 4,
    fontWeight: 'bold',
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: 'red',
  },
  cartActivityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator: {
    marginLeft: 10,
  },
  filterButton: {
    padding: 6,
    backgroundColor: '#378ff8',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
