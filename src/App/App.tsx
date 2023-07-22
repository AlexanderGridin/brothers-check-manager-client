import { Outlet } from "react-router-dom";

import { AppLayout } from "./components/AppLayout";
import { Navigation } from "./components/Navigation";

import "./App.css";

export const App = () => {
  return (
    <AppLayout sidebar={<Navigation />}>
      <div style={{ color: "#FFF" }}>
        <Outlet />
      </div>
    </AppLayout>
  );
};
