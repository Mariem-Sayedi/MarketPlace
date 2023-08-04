import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../ReduxToolkit/reducers/productsReducer';
import { useNavigation } from '@react-navigation/native';
import FavoriteIconH from '../components/FavoriteIconH';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/SearchBar';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleImageClick = (item: Product) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <FavoriteIconH product={item} />
      </View>
    </TouchableOpacity>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.cartActivityIndicator}>
        <Icon name="cart-outline" size={30} color="black" />
        <ActivityIndicator size="large" color="#378ff8" style={styles.activityIndicator} />
      </View>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
  

  const renderError = () => (
    <Text style={styles.errorText}>Error: {error}</Text>
  );

  if (status === 'loading') {
    return renderLoading();
  }

  if (status === 'failed') {
    return renderError();
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  listContainer: {
    paddingVertical: 16,
  },
  productContainer: {
    width: itemWidth,
    padding: 16,
    borderBottomColor: '#ccc',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartActivityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator: {
    marginLeft: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default HomeScreen;
