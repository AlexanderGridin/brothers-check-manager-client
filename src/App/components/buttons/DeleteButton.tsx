import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteButton = (props: IconButtonProps) => {
  return (
    <IconButton aria-label="delete" {...props}>
      <DeleteIcon />
    </IconButton>
  );
};
