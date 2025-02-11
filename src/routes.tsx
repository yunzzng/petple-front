import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home } from "@/utils";
import ErrorPage from "./pages/Error";
import Sginup from "./pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Sginup />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
