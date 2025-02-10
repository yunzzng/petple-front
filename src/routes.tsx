import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home } from "@/utils";

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
    ],
  },
  // {
  //   path: '*',
  //   element: (
  //   ),
  // },
]);

export default router;
