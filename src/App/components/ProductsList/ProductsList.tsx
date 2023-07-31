import { Product } from "../../../models/Product";
import { EditButton } from "../buttons";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card } from "../Card";
import styles from "./ProductsList.module.css";

const quantityUnitsMap: Record<string, string> = {
  liter: "Л",
  kg: "Кг",
  pcs: "Шт",
};

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductsList = ({ products, onEdit, onDelete }: ProductListProps) => {
  const handleEditClick = (product: Product) => () => {
    onEdit(product);
  };

  const handleDeleteClick = (product: Product) => () => {
    onDelete(product);
  };

  return (
    <div className={styles.wrapper}>
      <ul className="plain-list">
        {products.map((product: Product) => {
          return (
            <li key={product.id} className={styles.listItem}>
              <Card isLoading={product.isLoading}>
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
    </div>
  );
};
