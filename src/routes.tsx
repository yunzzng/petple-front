import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  PostCreatePage,
  ErrorPage,
  Signup,
  Login,
  Profile,
} from "@/pages";
import BaseLayout from "@/components/Layout";
import PetMedical from "./pages/PetMedical";
import PetPlace from "./pages/PetPlace";
import PetFood from "./pages/PetFood";
import PetFuneral from "./pages/PetFuneral";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
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
      {
        path: "/petmedi",
        element: <PetMedical />,
      },
      {
        path: "/petplace",
        element: <PetPlace />,
      },
      {
        path: "/petfuneral",
        element: <PetFuneral />,
      },
      {
        path: "/petfood",
        element: <PetFood />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
