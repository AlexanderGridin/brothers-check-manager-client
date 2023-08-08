import TextField from "@mui/material/TextField";
import { Store, StoreFormValue } from "../../../models/Store";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { SyntheticEvent, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

interface StoreFormProps {
  entity?: Store | null;
  resetAfterSubmit?: boolean;
  onSubmit: (value: StoreFormValue) => void;
  onClear?: () => void;
}

export const StoreForm = ({
  entity,
  resetAfterSubmit = false,
  onSubmit,
  onClear = () => {
    console.log("define handler for onClear");
  },
}: StoreFormProps) => {
  const isResetAfterSubmit = resetAfterSubmit;
  const textInputVariant = "outlined";
  const buttonVariant = "contained";

  const validate = (value: StoreFormValue) => {
    const errors: Partial<Record<keyof StoreFormValue, string>> = {};

    if (!value.name) {
      errors.name = "Name is required";
    }

    if (!value.city) {
      errors.city = "City is required";
    }

    return errors;
  };

  const form = useFormik<StoreFormValue>({
    initialValues: entity ? { ...Store.toFormValue(entity) } : { ...new StoreFormValue() },
    validate,
    onSubmit: (value: StoreFormValue) => {
      onSubmit(value);

      if (isResetAfterSubmit) {
        form.resetForm();
      }
    },
  });

  useEffect(() => {
    if (!entity) {
      form.resetForm();
      return;
    }

    form.setValues({ ...Store.toFormValue(entity) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    form.setTouched({
      name: true,
      city: true,
    });

    if (Object.keys(form.errors).length > 0) {
      return;
    }

    form.submitForm();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-row">
        <TextField
          id="name"
          label="Name *"
          variant={textInputVariant}
          className="form-control"
          {...form.getFieldProps("name")}
          error={!!form.errors.name && form.touched.name}
          helperText={form.touched.name && form.errors.name}
        />
      </div>

      <div className="form-row">
        <FormControl fullWidth error={!!form.errors.city && form.touched.city}>
          <InputLabel id="quantity-unit" sx={{ fontFamily: "inherit" }}>
            City *
          </InputLabel>

          <Select id="city" sx={{ fontFamily: "inherit" }} label="City *" {...form.getFieldProps("city")}>
            <MenuItem value="kh" sx={{ fontFamily: "inherit" }}>
              Харьков
            </MenuItem>
            <MenuItem value="vn" sx={{ fontFamily: "inherit" }}>
              Винница
            </MenuItem>
          </Select>

          {form.touched.city && form.errors.city && <FormHelperText>{form.errors.city}</FormHelperText>}
        </FormControl>
      </div>

      <div className="form-row">
        <TextField
          id="description"
          label="Description"
          variant={textInputVariant}
          className="form-control"
          {...form.getFieldProps("description")}
        />
      </div>

      <div className="form-row" style={{ marginTop: "25px" }}>
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
