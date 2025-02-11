import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home, PostCreatePage, ErrorPage } from "@/pages";

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
        path: "/community/post/create",
        element: <PostCreatePage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
