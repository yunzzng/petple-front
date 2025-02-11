import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { PostCreatePage, Home } from "@/pages";

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
        path: "/community/post/create",
        element: <PostCreatePage />,
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
