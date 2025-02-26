import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import BaseLayout from "@/components/Layout";
import { PetPlaceDetail, PetWalk, PetWalkDetail, Roulette } from "./pages";

const ErrorPage = lazy(() => import("@/pages/Error"));
const HomePage = lazy(() => import("@/pages/Home"));
const PetMedicalPage = lazy(() => import("@/pages/PetMedical"));
const PetPlacePage = lazy(() => import("@/pages/PetPlace"));
const PetFoodPage = lazy(() => import("@/pages/PetFood"));
const PetFuneralPage = lazy(() => import("@/pages/PetFuneral"));
const PostCreatePage = lazy(() => import("@/pages/PostCreate"));
const PostDetailPage = lazy(() => import("@/pages/PostDetail"));
const PostUpdatePage = lazy(() => import("@/pages/PostUpdate"));
const CommunityPage = lazy(() => import("@/pages/Community"));
const LoginPage = lazy(() => import("@/pages/Login"));
const SignupPage = lazy(() => import("@/pages/Signup"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const CreatePetProfile = lazy(() => import("@/pages/CreatePetProfile"));
const PetFriendsPage = lazy(() => import("@/pages/PetFriends"));
const ChatPage = lazy(() => import("@/pages/Chat"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/community",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <CommunityPage />
          </Suspense>
        ),
      },
      {
        path: "/community/create",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PostCreatePage />
          </Suspense>
        ),
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
        path: "/signup",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/petmedi",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetMedicalPage />
          </Suspense>
        ),
      },
      {
        path: "/petplace",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetPlacePage />
          </Suspense>
        ),
      },
      {
        path: "/petplace/:id",
        element: <PetPlaceDetail />,
      },
      {
        path: "/petfuneral",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetFuneralPage />
          </Suspense>
        ),
      },
      {
        path: "/petfood",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetFoodPage />
          </Suspense>
        ),
      },
      {
        path: "/petwalk",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetWalk />
          </Suspense>
        ),
      },
      {
        path: "/petwalk/detail",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetWalkDetail />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/createpet",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <CreatePetProfile />
          </Suspense>
        ),
      },
      {
        path: "/petfriends",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <PetFriendsPage />
          </Suspense>
        ),
      },
      {
        path: "/roulette",
        element: (
          <Suspense fallback={<p>...loading</p>}>
            <Roulette />
          </Suspense>
        ),
      },
    ],
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
    path: "/chat/:nickname",
    element: (
      <Suspense fallback={<p>...Loading</p>}>
        <ChatPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
