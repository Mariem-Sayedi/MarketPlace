// CategoryScreen.tsx
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryScreen = ({ onFilter, onClose }: { onFilter: (category: string) => void; onClose: () => void }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false); // Set loading to false after categories are fetched
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onFilter(category);
  };
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      
      {/* Conditionally render the FlatList or the loading indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#378ff8" style={styles.activityIndicator} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item)}>
              <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Close button */}
      <View pointerEvents="box-none" style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f3f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  categoryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  closeButton: {
    padding: 12,
    backgroundColor: '#378ff8',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default CategoryScreen;
