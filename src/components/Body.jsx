import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import React from "react";

const Body = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={browserRouter} />;
    </>
  );
};

export default Body;
