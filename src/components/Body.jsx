import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";

import Browse from "./Browse";
import Error from "./Error";
const Body = () => {
  const browserRouter = createBrowserRouter([
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
  return (
    <>
      <RouterProvider router={browserRouter} />;
    </>
  );
};

export default Body;
