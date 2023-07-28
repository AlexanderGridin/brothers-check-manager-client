import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNegativeCounter } from "../../../hooks";
import { Product, ProductFormValue } from "../../../models/Product";
import { addProduct, updateProduct } from "../../../store/slices/productsSlice";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page/Page";
import { ProductForm } from "../../components/ProductForm";
import { ProductsList } from "../../components/ProductsList";
import styles from "./ProductsPage.module.css";

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const [editableProduct, setEditableProduct] = useState<Product | null>(null);
  const { getValue } = useNegativeCounter();

  const handleProductEdit = (product: Product) => {
    setEditableProduct(product);
  };

  const handleClearForm = () => {
    setEditableProduct(null);
  };

  const handleProductFormSubmit = (formValue: ProductFormValue) => {
    if (editableProduct) {
      dispatch(updateProduct({ ...editableProduct, ...formValue }));
      setEditableProduct(null);
      return;
    }

    const newProduct = new Product();

    dispatch(
      addProduct({
        ...newProduct,
        ...formValue,
        id: getValue().toString(),
      })
    );
  };

  return (
    <Page title="Products">
      <div className={styles.wrapper}>
        <Card title="Add product">
          <ProductForm
            entity={editableProduct}
            resetAfterSubmit
            onSubmit={handleProductFormSubmit}
            onClear={handleClearForm}
          />
        </Card>

        <div style={{ paddingTop: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Products</h2>
          <ProductsList onEdit={handleProductEdit} />
        </div>
      </div>
    </Page>
  );
};
