import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../ReduxToolkit/reducers/productsReducer';
import { useNavigation } from '@react-navigation/native';
import FavoriteIconH from '../components/FavoriteIconH';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/SearchBar';
import CategoryScreen from './CategoryScreen';

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
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
    setFilteredProducts(items); // Initialize filteredProducts with all products when the component mounts
  }, [dispatch, items]);

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

  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleFilterByCategory = async (category: string) => {
    // Fetch products based on the selected category
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }

    setShowCategoryModal(false); // Close the modal after selecting a category
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={undefined} navigation={undefined} />
      <TouchableOpacity style={styles.filterButton} onPress={handleOpenCategoryModal}>
        <Text style={styles.filterButtonText}>Filter by Category</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredProducts} // Use filteredProducts instead of items
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />

      {/* Add the CategoryScreen as a Modal */}
      {showCategoryModal && (
        <Modal animationType="slide" transparent={true} visible={showCategoryModal}>
          <CategoryScreen onFilter={handleFilterByCategory} onClose={() => setShowCategoryModal(false)} />
        </Modal>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 2;

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
