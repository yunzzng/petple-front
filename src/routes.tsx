import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home } from "@/utils";
import Sginup from "./pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: (

    // ),
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
  // {
  //   path: '*',
  //   element: (
  //   ),
  // },
]);

export default router;
