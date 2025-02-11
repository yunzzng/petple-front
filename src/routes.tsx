import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home, PostCreatePage, ErrorPage, Signup, Login } from "@/pages";

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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
