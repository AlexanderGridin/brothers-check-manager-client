import { Store } from "../../../models/Store";
import { DeleteButton, EditButton, ViewButton } from "../buttons";
import { Card } from "../Card";
import styles from "./StoresList.module.css";

const citiesMap: Record<string, string> = {
  kh: "Харьков",
  vn: "Винница",
};

interface StoresListProps {
  stores: Store[];
  onEditClick: (store: Store) => void;
  onDeleteClick: (store: Store) => void;
  onViewClick: (store: Store) => void;
}

export const StoresList = ({ stores, onEditClick, onDeleteClick, onViewClick }: StoresListProps) => {
  const handleEditClick = (store: Store) => () => {
    onEditClick(store);
  };

  const handleDeleteClick = (store: Store) => () => {
    onDeleteClick(store);
  };

  const handleViewClick = (store: Store) => () => {
    onViewClick(store);
  };

  return (
    <ul className="plain-list">
      {stores.map((store) => {
        return (
          <li key={store.id} className={styles.listItem}>
            <Card isLoading={store.isLoading}>
              <div className={styles.cardContent}>
                <div>
                  <p>
                    <b>Store name: </b>
                    {store.name}
                  </p>

                  <p>
                    <b>City: </b>
                    {citiesMap[store.city as string]}
                  </p>

                  {store.description && (
                    <p>
                      <b>Description: </b>
                      {store.description}
                    </p>
                  )}
                </div>

                <div>
                  <ViewButton onClick={handleViewClick(store)} />
                  <EditButton onClick={handleEditClick(store)} />
                  <DeleteButton onClick={handleDeleteClick(store)} />
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
