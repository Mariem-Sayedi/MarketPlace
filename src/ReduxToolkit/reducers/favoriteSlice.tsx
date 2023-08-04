import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type FavoriteState = {
  products: Product[];
};

const initialState: FavoriteState = {
  products: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    saveFavorite: (state) => {
      AsyncStorage.setItem('favoriteProducts', JSON.stringify(state.products));
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.products.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        // If the product is already in the favorite list, remove it
        state.products.splice(existingIndex, 1);
      } else {
        // If the product is not in the favorite list, add it
        state.products.push(product);
      }

      // Save the updated favorite list to AsyncStorage
      AsyncStorage.setItem('favoriteProducts', JSON.stringify(state.products));
    },
  },
});

export const { toggleFavorite, saveFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;