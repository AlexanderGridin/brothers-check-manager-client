import { NavLink } from "react-router-dom";
import { NavigationItem } from "../../../models";
import { navigationItems } from "../../../routing";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav>
      <ul className="plain-list">
        {navigationItems.map((item: NavigationItem, index: number) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? `${styles.link} ${styles.active}` : styles.link;
              }}
              to={item.path}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
