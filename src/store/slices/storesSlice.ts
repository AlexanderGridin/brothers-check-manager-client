import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../models/Store";

export interface StoresState {
  stores: Store[];
}

const initialState: StoresState = {
  stores: [],
};

export const storesSlice = createSlice({
  name: "[STORES]",
  initialState,
  reducers: {
    addStore: (state: StoresState, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },

    updateStore: (state: StoresState, action: PayloadAction<Store>) => {
      const updatedStore = action.payload;

      state.stores = state.stores.map((store) => {
        return store.id === updatedStore.id ? { ...updatedStore } : store;
      });
    },

    deleteStore: (state: StoresState, action: PayloadAction<Store>) => {
      const storeToDelete = action.payload;
      state.stores = state.stores.filter((store) => store.id !== storeToDelete.id);
    },

    setStores: (state: StoresState, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { addStore, updateStore, deleteStore, setStores } = storesSlice.actions;
export const storesReducer = storesSlice.reducer;
