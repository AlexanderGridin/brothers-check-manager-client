import { useSelector } from "react-redux";
import { RootState } from "../store";
import { StoresState } from "./storesSlice";

export const useStoresSelector = (key: keyof StoresState) =>
  useSelector((state: RootState) => state["[STORES]"][key] as any);
