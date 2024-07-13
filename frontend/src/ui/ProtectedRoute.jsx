import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  if (isLoading)
    return (
      <div className="FullPage">
        <Spinner />;
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
