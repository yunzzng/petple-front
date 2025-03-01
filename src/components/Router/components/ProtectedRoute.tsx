import useToast from "@/components/UI/Toast/hooks/useToast";
import userAuthStore from "@/zustand/userAuth";
import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = userAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      toast({ type: "INFO", description: "로그인이 필요합니다." });
    }
  }, []);

  return !!userId ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
