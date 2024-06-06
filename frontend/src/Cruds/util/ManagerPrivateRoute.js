import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ManagerPrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    console.log(role);

    if (role === "manager" || role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return <Navigate to="/" />;
  }
};

export default ManagerPrivateRoute;
