import { PropsWithChildren } from "react";
import styles from "./AppLayout.module.css";

interface AppLayoutProps extends PropsWithChildren {
  header?: JSX.Element;
  sidebar?: JSX.Element;
  footer?: JSX.Element;
}

export const AppLayout = ({ header, sidebar, footer, children }: AppLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      {header && <header className={styles.header}>{header}</header>}

      <div className={styles.content}>
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        <main className={styles.main}>{children}</main>
      </div>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};
