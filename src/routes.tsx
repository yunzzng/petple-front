import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  PostCreatePage,
  ErrorPage,
  Signup,
  Login,
  Profile,
  PostUpdatePage,
  CommunityPage,
  CreatePetProfile,
} from "@/pages";
import BaseLayout from "@/components/Layout";
import PetMedical from "./pages/PetMedical";
import PetPlace from "./pages/PetPlace";
import PetFood from "./pages/PetFood";
import PetFuneral from "./pages/PetFuneral";
import { Suspense } from "react";
import PostDetailPage from "./pages/PostDetail";

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
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/community/create",
        element: <PostCreatePage />,
      },
      {
        path: "/community/update/:id",
        element: (
          <Suspense fallback={<p>...Loading</p>}>
            <PostUpdatePage />
          </Suspense>
        ),
      },
      {
        path: "/community/post/:id",
        element: (
          <Suspense fallback={<p>...Loading</p>}>
            <PostDetailPage />
          </Suspense>
        ),
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
      {
        path: "/createpetprofile",
        element: <CreatePetProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
