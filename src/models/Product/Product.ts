import { QuantityUnit } from "../../types";
import { ProductFormValue } from "./ProductFormValue";

export class Product {
  public id = "";
  public name = "";
  public quantityUnit!: QuantityUnit;
  public created = "";

  public static toFormValue(product: Product): ProductFormValue {
    return {
      name: product.name,
      quantityUnit: product.quantityUnit,
    };
  }
}

export interface ProductCreateDto {
  name: string;
  quantityUnit: QuantityUnit;
}

export interface ProductDto extends Product {}
