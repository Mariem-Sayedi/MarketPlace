import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import favoriteReducer from './reducers/favoriteSlice';
import cartReducer from './reducers/cartSlice'; 

const rootReducer = combineReducers({
  products: productsReducer,
  favorite: favoriteReducer,
  cart: cartReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
