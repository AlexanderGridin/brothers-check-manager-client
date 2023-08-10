import { Store, StoreCreateDto } from "../models/Store";
import { http } from "./http";
import { routes } from "./routes";

export const fetchStores = async (): Promise<Store[]> => {
  const apiUrl = routes.stores.getAll;

  try {
    const response = await http.get(apiUrl);
    return response.data;
  } catch (e) {
    return [];
  }
};

export const createStoreAsync = async (body: StoreCreateDto): Promise<Store | null> => {
  const apiUrl = routes.stores.create;

  try {
    const response = await http.post(apiUrl, body);
    return response.data;
  } catch (e) {
    return null;
  }
};

export const updateStoreAsync = async (body: Store): Promise<Store | null> => {
  const apiUrl = routes.stores.update;

  try {
    const response = await http.put(apiUrl, body);
    return response.data;
  } catch (e) {
    return null;
  }
};

export const deleteStoreAsync = async (id: string): Promise<string | null> => {
  const apiUrl = routes.stores.delete.replace("{storeId}", id);

  try {
    await http.delete(apiUrl);
    return id;
  } catch (e) {
    return null;
  }
};
