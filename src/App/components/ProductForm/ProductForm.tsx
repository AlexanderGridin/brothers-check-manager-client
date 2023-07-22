import { SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { Product, ProductFormValue } from "../../../models/Product";

import styles from "./ProductForm.module.css";

interface ProductFormProps {
  entity?: Product;
  resetAfterSubmit?: boolean;
  onSubmit: (formValue: ProductFormValue) => void;
}

export const ProductForm = ({ entity, resetAfterSubmit = false, onSubmit }: ProductFormProps) => {
  const isResetAfterSubmit = resetAfterSubmit;
  const validate = (values: ProductFormValue) => {
    const errors: Partial<Record<keyof ProductFormValue, string>> = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.quantityUnit) {
      errors.quantityUnit = "Quantity unit is required";
    }

    return errors;
  };

  const formik = useFormik<ProductFormValue>({
    initialValues: entity ? Product.toFormValue(entity) : { ...new ProductFormValue() },
    validate,
    onSubmit: (value: ProductFormValue) => {
      onSubmit(value);

      if (isResetAfterSubmit) {
        formik.resetForm();
      }
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    formik.setTouched({
      name: true,
      quantityUnit: true,
    });

    if (Object.keys(formik.errors).length > 0) {
      return;
    }

    formik.submitForm();
  };

  const textInputVariant = "outlined";
  const buttonVariant = "contained";

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <TextField
          id="name"
          label="Name *"
          variant={textInputVariant}
          className={styles.formControl}
          {...formik.getFieldProps("name")}
          error={!!formik.errors.name && formik.touched.name}
          helperText={formik.errors.name}
        />
      </div>

      <div className={styles.formRow}>
        <FormControl fullWidth error={!!formik.errors.quantityUnit && formik.touched.quantityUnit}>
          <InputLabel id="quantity-unit">Quantity unit *</InputLabel>

          <Select id="quantity-unit" label="Quantity unit *" {...formik.getFieldProps("quantityUnit")}>
            <MenuItem value="kg">Кг</MenuItem>
            <MenuItem value="pcs">Шт</MenuItem>
            <MenuItem value="liter">Л</MenuItem>
          </Select>

          {formik.errors.quantityUnit && <FormHelperText>{formik.errors.quantityUnit}</FormHelperText>}
        </FormControl>
      </div>

      <div className={styles.formRow} style={{ marginTop: "25px" }}>
        <Button variant={buttonVariant} size="large" type="submit">
          {entity ? <SaveIcon sx={{ marginRight: "7px" }} /> : <AddIcon sx={{ marginRight: "7px" }} />}
          <span style={{ lineHeight: 1 }}>{entity ? "Save" : "Add"}</span>
        </Button>
      </div>
    </form>
  );
};
