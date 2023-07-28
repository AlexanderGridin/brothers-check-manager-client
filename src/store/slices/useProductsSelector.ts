import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductsState } from "./productsSlice";

export const useProductsSelector = (key: keyof ProductsState) =>
  useSelector((state: RootState) => state["[PRODUCTS]"][key] as any);
