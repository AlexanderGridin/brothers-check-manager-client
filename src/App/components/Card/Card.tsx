import Paper from "@mui/material/Paper";
import { PropsWithChildren } from "react";
import { Loader } from "../Loader";

import styles from "./Card.module.css";

interface CardProps extends PropsWithChildren {
  title?: string;
  maxWidth?: number;
  isLoading?: boolean;
}

export const Card = ({ title, maxWidth, isLoading = false, children }: CardProps) => {
  return (
    <Paper
      sx={{
        padding: "15px",
        maxWidth: `${maxWidth}px` || "auto",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading && <Loader />}
      {title && <h2 className={styles.title}>{title}</h2>}
      <div>{children}</div>
    </Paper>
  );
};
