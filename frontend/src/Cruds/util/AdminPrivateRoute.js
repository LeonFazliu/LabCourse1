import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    if (role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return <Navigate to="/" />;
  }
};

export default AdminPrivateRoute;
