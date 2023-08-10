import { PayloadAction, createSlice } from '@reduxjs/toolkit';
  import { fetchProducts } from '../Actions/ProductsActions';
import { Product } from '../../Interfaces/Index';

  export interface ProductsState {
   items:Product[] |undefined,
   loading:boolean,
   error:string | undefined,
   
  }
  const initialState:ProductsState={ items: [],loading:false, error: undefined }

const productsSlice = createSlice({
  name: 'products',
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error=undefined;
        state.items= undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product[]>) => {
        state.loading = false;
        state.error=undefined;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'error fetching products';
      });
  },
});

export default productsSlice.reducer;
