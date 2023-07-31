import { Product } from "../models/Product";
import { http } from "./http";
import { routes } from "./routes";

export const fetchProducts = async (): Promise<Product[]> => {
  const route = routes.products.getAll;

  try {
    const respose = await http.get(route);
    return respose.data;
  } catch (e) {
    return [] as Product[];
  }
};

export const createProductAsync = async (body: Omit<Product, "id" | "isLoading">): Promise<Product | null> => {
  const route = routes.products.create;

  try {
    const response = await http.post(route, body);
    return response.data;
  } catch (e) {
    return null;
  }
};

export const deleteProductAsync = async (id: string): Promise<string | null> => {
  const route = routes.products.delete.replace("{productId}", id);

  try {
    await http.delete(route);
    return id;
  } catch (e) {
    return null;
  }
};

export const updateProductAsync = async (body: Product): Promise<Product | null> => {
  const route = routes.products.update;

  try {
    const response = await http.put(route, body);
    return response.data;
  } catch (e) {
    return null;
  }
};
