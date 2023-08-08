import { QuantityUnit } from "../../types";
import { ProductFormValue } from "./ProductFormValue";

export class Product {
  public id = "";
  public name = "";
  public quantityUnit: QuantityUnit | "" = "";
  public created = "";
  public isLoading = false;

  public static toFormValue(product: Product): ProductFormValue {
    return {
      name: product.name,
      quantityUnit: product.quantityUnit,
    };
  }

  public static toCreateDto(product: Product): ProductCreateDto {
    return {
      name: product.name,
      quantityUnit: product.quantityUnit,
      created: product.created,
    };
  }
}

export interface ProductCreateDto {
  name: string;
  quantityUnit: QuantityUnit | "";
  created: string;
}
