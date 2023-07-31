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

  public static toCreateDto(product: Product): Omit<Product, "id" | "isLoading"> {
    return {
      name: product.name,
      quantityUnit: product.quantityUnit,
      created: product.created,
    };
  }
}

export interface ProductCreateDto {
  name: string;
  quantityUnit: QuantityUnit;
}

export interface ProductDto extends Product {}
