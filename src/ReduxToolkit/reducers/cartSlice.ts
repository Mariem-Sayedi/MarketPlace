import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../Interfaces/Index';


type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [], // Initialize the state with an empty array
};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveCart: (state) => {
      AsyncStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    toggleCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.products.find((item) => item.id === product.id);
      if (existingProduct && existingProduct.quantity) {
        existingProduct.quantity += 1;
      } else {
        const productToAdd = { ...product, quantity: 1 };
        state.products.push(productToAdd);
      }
      AsyncStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    clearCart: (state) => {
      state.products = [];
      AsyncStorage.setItem('cartProducts', JSON.stringify([]));  
    },
    updateCart: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      AsyncStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
  }});
export const { toggleCart, clearCart, saveCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
