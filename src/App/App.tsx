import { Product, ProductFormValue } from "../models/Product";
import "./App.css";
import { Card } from "./components/Card";
import { ProductForm } from "./components/ProductForm";

export const App = () => {
  const testProduct: Product = {
    id: "1",
    name: "Snikers",
    quantityUnit: "pcs",
    created: "11/07/2023",
  };

  return (
    <div>
      <Card maxWidth={850} title="Add product">
        <ProductForm
          resetAfterSubmit
          onSubmit={(formValue: ProductFormValue) => {
            console.log("create form", formValue);
          }}
        />
      </Card>

      <Card maxWidth={850} title="Update product">
        <ProductForm
          entity={testProduct}
          onSubmit={(formValue: ProductFormValue) => {
            console.log("edit form", formValue);
          }}
        />
      </Card>
    </div>
  );
};
