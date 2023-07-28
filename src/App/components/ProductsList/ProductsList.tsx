import { useDispatch } from "react-redux";
import { Product } from "../../../models/Product";
import { deleteProduct, setProducts } from "../../../store/slices/productsSlice";
import { useProductsSelector } from "../../../store/slices/useProductsSelector";
import { EditButton } from "../buttons";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card } from "../Card";
import styles from "./ProductsList.module.css";
import { useEffect } from "react";
import { fetchProducts } from "../../../api/products.api";

const quantityUnitsMap: Record<string, string> = {
  liter: "Л",
  kg: "Кг",
  pcs: "Шт",
};

interface ProductListProps {
  onEdit: (product: Product) => void;
}

export const ProductsList = ({ onEdit }: ProductListProps) => {
  const dispatch = useDispatch();
  const products = useProductsSelector("products");

  const handleEditClick = (product: Product) => () => {
    onEdit(product);
  };

  const handleDeleteClick = (product: Product) => () => {
    dispatch(deleteProduct(product));
  };

  const loadProducts = async () => {
    const products = await fetchProducts();
    dispatch(setProducts(products))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (!products.length) {
    return <p>No product to display....</p>;
  }

  return (
    <ul className="plain-list">
      {products.map((product: Product) => {
        return (
          <li key={product.id} className={styles.listItem}>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <p>
                    <b>Product name: </b>
                    {product.name}
                  </p>

                  <p>
                    <b>Quantity unit: </b>
                    {quantityUnitsMap[product.quantityUnit as string]}
                  </p>
                </div>

                <div>
                  <EditButton onClick={handleEditClick(product)} />
                  <DeleteButton onClick={handleDeleteClick(product)} />
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
