import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Error from "./Error";
import WatchList from "./WatchList";

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
  {
    path: "/watchList",
    element: <WatchList />,
  },
]);

const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;
