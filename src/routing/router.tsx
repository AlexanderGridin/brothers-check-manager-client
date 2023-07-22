import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";

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
    ],
  },
]);