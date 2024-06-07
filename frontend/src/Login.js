import axios from "axios";
import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Login.css"; // Import the CSS file for additional styles

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to manage error message
  

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    // Redirect to home if already logged in
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          login(res.data.Token);
          navigate("/staff");
        } else {
          setError(res.data.Message); // Set error message
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Please insert the correct information."); // Generic error message
      });
  };

  return (
    <div className="login-container">
      <div className="login-form bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="off"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="off"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
              required
            />
            {error && <p className="text-danger mt-2">{error}</p>} {/* Display error message if exists */}
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
