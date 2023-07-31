import { generateId } from "../../../utils";

export const mockProducts = [
  {
    id: generateId(),
    name: "Mock product 1",
    quantityUnit: "pcs",
    created: "",
  },
  {
    id: generateId(),
    name: "Mock product 2",
    quantityUnit: "kg",
    created: "",
  },
  {
    id: generateId(),
    name: "Mock product 3",
    quantityUnit: "liter",
    created: "",
  },
];
