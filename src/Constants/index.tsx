import { Dimensions } from "react-native";
import { Product } from "../Interfaces/Index";
import { useNavigation } from "@react-navigation/native";

const navigation=useNavigation();
export const fakeStoreApiBaseUrl = 'https://fakestoreapi.com';
export const windowWidth = Dimensions.get('window').width;
export const itemWidth = windowWidth / 2;
export const handleImageClick = (item: Product) => {
    navigation.navigate('Product Detail', { product: item });
  };


