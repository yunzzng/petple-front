import Loading from "@/components/Loading";
import userAuthStore from "@/zustand/userAuth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoding] = useState(true);
  const { userId } = userAuthStore();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoding(false);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return !!userId ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
