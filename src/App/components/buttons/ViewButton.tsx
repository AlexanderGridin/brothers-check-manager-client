import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export const ViewButton = (props: IconButtonProps) => {
  return (
    <IconButton aria-label="view" {...props}>
      <ReadMoreIcon />
    </IconButton>
  );
};
