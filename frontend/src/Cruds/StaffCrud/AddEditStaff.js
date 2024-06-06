import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  role: "",
  password: "", // Added password field to initial state
};

const positionOptions = ["admin", "accountant", "manager"];

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, role, password } = state; // Destructuring state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !role || !password) {
      // Checking if password is not empty
      toast.error("Please fill each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            role,
            password, // Including password in the request body
          })
          .then(() => {
            setState(initialState);
            toast.success("Staff Added Successfully");
            navigate("/staff");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            role,
            password, // Including password in the request body
          })
          .then(() => {
            setState(initialState);
            toast.success("Staff Updated Successfully");
            navigate("/staff");
          })
          .catch((err) => toast.error(err.response.data));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name...."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your E-mail...."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text" // Keeping input type as text for password
          id="password"
          name="password"
          placeholder="Your Password...."
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor="role">Position</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={handleInputChange}
        >
          <option value="">Select Position</option>
          {positionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/staff">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
