import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "[PRODUCTS]",
  initialState,
  reducers: {
    addProduct: (state: ProductsState, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state: ProductsState, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;

      state.products = state.products.map((product) => {
        return product.id === updatedProduct.id ? { ...updatedProduct } : product;
      });
    },
    deleteProduct: (state: ProductsState, action: PayloadAction<Product>) => {
      const productToDelete = action.payload;
      state.products = state.products.filter((product) => product.id !== productToDelete.id);
    },
    setProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
