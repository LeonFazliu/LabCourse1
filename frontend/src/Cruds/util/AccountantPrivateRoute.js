import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use the default export

const AccountantPrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    console.log(role);

    if (role === "accountant" || role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return <Navigate to="/" />;
  }
};

export default AccountantPrivateRoute;
