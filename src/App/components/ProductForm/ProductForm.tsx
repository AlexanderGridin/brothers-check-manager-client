import { SyntheticEvent, useEffect } from "react";
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
import ClearIcon from "@mui/icons-material/Clear";
import { Product, ProductFormValue } from "../../../models/Product";

import styles from "./ProductForm.module.css";

interface ProductFormProps {
  entity?: Product | null;
  resetAfterSubmit?: boolean;
  onSubmit: (formValue: ProductFormValue) => void;
  onClear?: () => void;
}

export const ProductForm = ({
  entity,
  resetAfterSubmit = false,
  onSubmit,
  onClear = () => {
    console.log("define handler for onClear");
  },
}: ProductFormProps) => {
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

  useEffect(() => {
    if (!entity) {
      formik.resetForm();
      return;
    }

    formik.setValues({ ...Product.toFormValue(entity) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

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
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>

      <div className={styles.formRow}>
        <FormControl fullWidth error={!!formik.errors.quantityUnit && formik.touched.quantityUnit}>
          <InputLabel id="quantity-unit" sx={{ fontFamily: "inherit" }}>
            Quantity unit *
          </InputLabel>

          <Select
            id="quantity-unit"
            sx={{ fontFamily: "inherit" }}
            label="Quantity unit *"
            {...formik.getFieldProps("quantityUnit")}
          >
            <MenuItem value="kg" sx={{ fontFamily: "inherit" }}>
              Кг
            </MenuItem>
            <MenuItem value="pcs" sx={{ fontFamily: "inherit" }}>
              Шт
            </MenuItem>
            <MenuItem value="liter" sx={{ fontFamily: "inherit" }}>
              Л
            </MenuItem>
          </Select>

          {formik.touched.quantityUnit && formik.errors.quantityUnit && (
            <FormHelperText>{formik.errors.quantityUnit}</FormHelperText>
          )}
        </FormControl>
      </div>

      <div className={styles.formRow} style={{ marginTop: "25px" }}>
        <Button
          variant={buttonVariant}
          size="large"
          type="submit"
          sx={{ marginRight: "15px;", fontFamily: "inherit", textTransform: "none" }}
        >
          {entity ? <SaveIcon sx={{ marginRight: "7px" }} /> : <AddIcon sx={{ marginRight: "7px" }} />}
          <span style={{ lineHeight: 1 }}>{entity ? "Save" : "Add"}</span>
        </Button>

        {entity && (
          <Button
            variant={buttonVariant}
            size="large"
            color="error"
            sx={{ fontFamily: "inherit", textTransform: "none" }}
            onClick={onClear}
          >
            <ClearIcon sx={{ marginRight: "7px" }} />
            <span style={{ lineHeight: 1 }}>Clear</span>
          </Button>
        )}
      </div>
    </form>
  );
};
