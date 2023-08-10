import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './Reducers/ProductsSlice';
import favoriteReducer from './Reducers/FavoriteSlice';
import cartReducer from './Reducers/CartSlice'; 
import authReducer from './Reducers/LoginSlice';
const rootReducer = combineReducers({
  products: productsReducer,
  favorite: favoriteReducer,
  cart: cartReducer, 
  auth:authReducer,
});

const store = configureStore({
  reducer: rootReducer,

});

export type AppDispatch =typeof store.dispatch;
export default store;
