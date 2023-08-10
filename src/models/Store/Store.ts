import { generateId } from "../../utils";
import { Product } from "../Product";
import { StoreFormValue } from "./StoreFormValue";

export class Store {
  public id = generateId();
  public name = "";
  public city = "";
  public description = "";
  public products: Product[] = [];
  public isLoading = false;

  public static toFormValue(store: Store): StoreFormValue {
    return {
      name: store.name,
      city: store.city,
      description: store.description,
    };
  }

  public static toCreateDto(store: Store): StoreCreateDto {
    return {
      name: store.name,
      city: store.city,
      description: store.description,
    };
  }
}

export interface StoreCreateDto {
  name: string;
  city: string;
  description: string;
}
