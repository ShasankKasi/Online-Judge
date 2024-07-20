import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData(["isAuthenticated"]);
  const isAuthenticated = authData ? authData.auth : false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
