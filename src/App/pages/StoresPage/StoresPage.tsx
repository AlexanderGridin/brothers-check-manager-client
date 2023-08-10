import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStoreAsync, deleteStoreAsync, updateStoreAsync } from "../../../api/stores.api";
import { Store, StoreFormValue } from "../../../models/Store";
import { addStore, deleteStore, updateStore } from "../../../store/slices/storesSlice";
import { useStoresSelector } from "../../../store/slices/useStoresSelector";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import { StoreForm } from "../../components/StoreForm";
import { StoresList } from "../../components/StoresList";

export const StoresPage = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editableStore, setEditableStore] = useState<Store | null>(null);
  const dispatch = useDispatch();
  const stores = useStoresSelector("stores");

  const handleFormSubmit = async (formValue: StoreFormValue) => {
    setIsFormLoading(true);

    if (editableStore) {
      dispatch(updateStore({ ...editableStore, isLoading: true }));

      const store = {
        ...editableStore,
        ...formValue,
      };

      const updatedStore = await updateStoreAsync(store);

      if (!updatedStore) return;

      dispatch(updateStore(updatedStore));
      setEditableStore(null);
      setIsFormLoading(false);

      return;
    }

    const store: Store = {
      ...new Store(),
      ...formValue,
    };

    const createdStore = await createStoreAsync(Store.toCreateDto(store));
    if (!createdStore) return;
    dispatch(addStore(createdStore));
    setIsFormLoading(false);
  };

  const handleEditStoreClick = (store: Store) => {
    setEditableStore(store);
  };

  const handleClearStoreFormClick = () => {
    setEditableStore(null);
  };

  const handleDeleteStoreClick = async (store: Store) => {
    dispatch(updateStore({ ...store, isLoading: true }));

    const deleteResponse = await deleteStoreAsync(store.id);
    if (!deleteResponse) {
      dispatch(updateStore({ ...store, isLoading: false }));
      return;
    }

    dispatch(deleteStore(store));
  };

  return (
    <Page title="Stores">
      <Card title="Add store" isLoading={isFormLoading}>
        <StoreForm
          entity={editableStore}
          onSubmit={handleFormSubmit}
          onClear={handleClearStoreFormClick}
          resetAfterSubmit={!editableStore}
        />
      </Card>

      <div style={{ paddingTop: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Stores</h2>

        <StoresList
          stores={stores}
          onEditClick={handleEditStoreClick}
          onDeleteClick={handleDeleteStoreClick}
          onViewClick={() => console.log("handle store view click")}
        />
      </div>
    </Page>
  );
};
