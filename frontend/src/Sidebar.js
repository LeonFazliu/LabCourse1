import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { AuthContext } from "./AuthContext";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // Use logout from AuthContext
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:5000/logout",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          logout(); // Call logout function from AuthContext
          navigate("/login");
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column bg-dark text-white p-4 vh-100">
      <h3>
        <i className="bi bi-bootstrap fs-5 me-2"></i>
        <span>Navigate</span>
      </h3>
      <hr className="text-secondary mt-2" />
      <ul className="nav nav-pills flex-column p-0 m-0">
        {userRole === "admin" ? (
          <li className="nav-item p-1">
            <Link to="/staff" className="nav-link text-white">
              <i className="bi me-2 fs-5"></i>
              <span className="fs-5">Staff</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {userRole === "manager" || userRole === "admin" ? (
          <li className="nav-item p-1">
            <Link to="/hotels" className="nav-link text-white">
              <i className="bi me-2 fs-5"></i>
              <span className="fs-5">Hotels</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {userRole === "manager" || userRole === "admin" ? (
          <li className="nav-item p-1">
            <Link to="/customers" className="nav-link text-white">
              <i className="bi me-2 fs-5"></i>
              <span className="fs-5">Customers</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {userRole === "accountant" || userRole === "admin" ? (
          <li className="nav-item p-1">
            <Link to="/finances" className="nav-link text-white">
              <i className="bi me-2 fs-5"></i>
              <span className="fs-5">Finances</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {userRole === "manager" || userRole === "admin" ? (
          <li className="nav-item p-1">
            <Link to="/reservations" className="nav-link text-white">
              <i className="bi me-2 fs-5"></i>
              <span className="fs-5">Reservations</span>
            </Link>
          </li>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <li className="nav-item p-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
