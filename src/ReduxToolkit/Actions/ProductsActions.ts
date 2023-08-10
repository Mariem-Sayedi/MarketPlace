import { createAsyncThunk } from "@reduxjs/toolkit";
import { fakeStoreApiBaseUrl } from "../../Constants";
import axios from "axios";
import { Product } from "../../Interfaces/Index";

export const fetchProducts = createAsyncThunk <Product[],void,{rejectValue:string}>('products/fetchProducts', async (_,{rejectWithValue}) => {
   try{
      console.log("entered")
    const response = await axios.get(`${fakeStoreApiBaseUrl}/products`);
    console.log('response data', response?.data)
    return response.data;
   }
   catch(error:any){
    return rejectWithValue(error.message)
   }
  });