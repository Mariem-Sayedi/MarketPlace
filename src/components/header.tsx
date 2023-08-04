// Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FavoriteIconD from './FavoriteIconD';
import CartIconD from './CartIconD';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <CartIconD product={product} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
