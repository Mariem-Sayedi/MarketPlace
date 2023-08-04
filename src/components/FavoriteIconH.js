import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../ReduxToolkit/reducers/favoriteSlice';

const favoriteIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favorite.products);
  const isfavorite = favoriteProducts.some((item) => item.id === product.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteIconContainer}>
      {isfavorite ? (
        <Icon name="heart" size={30} color='red' />
      ) : (
        <Icon name="heart-outline" size={30} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 5, 
  },
});

export default favoriteIcon;
