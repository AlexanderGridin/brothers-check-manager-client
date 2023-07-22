import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import AddIcon from "@mui/icons-material/Add";

import { Card } from "../Card";

import styles from "./ProductForm.module.css";
import { QuantityUnit } from "../../../models/Product";
import { SyntheticEvent } from "react";

interface ProductFormValue {
  name: string;
  quantityUnit: QuantityUnit | "";
}

export const ProductForm = () => {
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
    initialValues: {
      name: "",
      quantityUnit: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
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
    <Card maxWidth={850} title="Add product">
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
            <AddIcon sx={{ marginRight: "7px" }} />
            <span style={{ lineHeight: 1 }}>Add product</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};
