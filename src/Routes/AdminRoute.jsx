import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <span className="loading loading-dots loading-xl "></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
