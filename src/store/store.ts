import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { storesReducer } from "./slices/storesSlice";

export const store = configureStore({
  reducer: {
    "[PRODUCTS]": productsReducer,
    "[STORES]": storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
