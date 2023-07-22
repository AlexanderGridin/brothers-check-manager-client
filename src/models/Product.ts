export type QuantityUnit = "kg" | "pcs" | "liters";

export class Product {
  public id = "";
  public name = "";
  public quantityUnit!: QuantityUnit;
  public created = "";
}

export interface ProductCreateDto {
  name: string;
  quantityUnit: QuantityUnit;
}

export interface ProductDto extends Product {}
