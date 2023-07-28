import { PropsWithChildren } from "react";
import styles from "./Page.module.css";

interface PageProps extends PropsWithChildren {
  title: string;
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>

      <div>{children}</div>
    </div>
  );
};
