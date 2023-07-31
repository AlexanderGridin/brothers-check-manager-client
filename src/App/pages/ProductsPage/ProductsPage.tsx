import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProductAsync, deleteProductAsync, fetchProducts, updateProductAsync } from "../../../api/products.api";
import { Product, ProductFormValue } from "../../../models/Product";
import { addProduct, deleteProduct, setProducts, updateProduct } from "../../../store/slices/productsSlice";
import { useProductsSelector } from "../../../store/slices/useProductsSelector";
import { Card } from "../../components/Card";
import { Loader } from "../../components/Loader";
import { Page } from "../../components/Page/Page";
import { ProductForm } from "../../components/ProductForm";
import { ProductsList } from "../../components/ProductsList";
import styles from "./ProductsPage.module.css";

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const [editableProduct, setEditableProduct] = useState<Product | null>(null);
  const products = useProductsSelector("products");

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const loadProducts = async () => {
    const products = await fetchProducts();
    dispatch(setProducts(products));
    setIsProductsLoading(false);
  };

  useEffect(() => {
    setIsProductsLoading(true);
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProduct = (product: Product) => {
    setEditableProduct(product);
  };

  const handleDeleteProduct = (product: Product) => {
    dispatch(updateProduct({ ...product, isLoading: true }));

    deleteProductAsync(product.id).then((productId) => {
      if (!productId) return;
      dispatch(deleteProduct(product));
    });
  };

  const handleClearForm = () => {
    setEditableProduct(null);
  };

  const handleProductFormSubmit = async (formValue: ProductFormValue) => {
    setIsFormLoading(true);

    if (editableProduct) {
      const product = { ...editableProduct, ...formValue };
      const updatedProduct = await updateProductAsync(product);

      if (!updatedProduct) return;

      dispatch(
        updateProduct({
          ...updatedProduct,
          isLoading: false,
        })
      );

      setEditableProduct(null);
      setIsFormLoading(false);
      return;
    }

    const product: Product = {
      ...new Product(),
      ...formValue,
    };

    const createdProduct = await createProductAsync(Product.toCreateDto(product));
    if (!createdProduct) return;
    dispatch(addProduct(createdProduct));
    setIsFormLoading(false);
  };

  return (
    <Page title="Products">
      <div className={styles.wrapper}>
        <Card title="Add product" isLoading={isFormLoading}>
          <ProductForm
            entity={editableProduct}
            resetAfterSubmit={!editableProduct}
            onSubmit={handleProductFormSubmit}
            onClear={handleClearForm}
          />
        </Card>

        <div style={{ paddingTop: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Products</h2>

          <div className={`${styles.productsListContainer} ${isFormLoading ? styles.disabledPointer : ""}`}>
            {isProductsLoading && <Loader />}
            <ProductsList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
          </div>
        </div>
      </div>
    </Page>
  );
};
