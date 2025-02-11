import { createBrowserRouter } from "react-router-dom";
import { Home, PostCreatePage, ErrorPage, Signup, Login } from "@/pages";
import BaseLayout from "@/components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
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
