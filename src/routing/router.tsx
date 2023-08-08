import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ProductsPage } from "../App/pages/ProductsPage";
import { StoresPage } from "../App/pages/StoresPage";

const About = () => {
  return <h1>About page</h1>;
};

const Index = () => {
  return <h1>Index</h1>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "stores",
        element: <StoresPage />,
      },
    ],
  },
]);
