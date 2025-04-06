import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Error from "./Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;
