import { configureStore } from "@reduxjs/toolkit";
import { productsReucer } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    "[PRODUCTS]": productsReucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
