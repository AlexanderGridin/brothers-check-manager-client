import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = (props: IconButtonProps) => {
  return (
    <IconButton aria-label="edit" {...props}>
      <EditIcon />
    </IconButton>
  );
};
