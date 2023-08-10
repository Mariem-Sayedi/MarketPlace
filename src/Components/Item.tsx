import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FavoriteIconHome from "./FavoriteIconHome";
import { Product } from "../Interfaces/Index";
import { useNavigation } from "@react-navigation/native";

export const renderItem = ({ item }: { item: Product }) => {
  const navigation = useNavigation();

  const handleImageClick = () => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2;

  return (
    <TouchableOpacity onPress={handleImageClick}>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={{ uri: item?.image }} />
        <Text style={styles.productTitle}>{item?.title}</Text>
        <Text style={styles.productPrice}>${item?.price}</Text>
        <FavoriteIconHome product={item} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    width: 120,
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
});
