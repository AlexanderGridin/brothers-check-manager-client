import { AppLayout } from "./components/AppLayout";

import "./App.css";

export const App = () => {
  return (
    <AppLayout
      header={<div>header</div>}
      footer={<div>footer</div>}
      sidebar={<div style={{ color: "#FFF" }}>sidebar</div>}
    >
      <div style={{ color: "#FFF" }}>Main content</div>
    </AppLayout>
  );
};
