import userAuthStore from "@/zustand/userAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = userAuthStore();
  return !!userId ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
