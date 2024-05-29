import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  position: "",
  password: "" // Added password field to initial state
};

const positionOptions = ["CEO", "Accountant", "Manager"]; 

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, position, password } = state; // Destructuring state
  const navigate = useNavigate(); 
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`)
        .then(resp => setState({ ...resp.data[0] }))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !position || !password) { // Checking if password is not empty
      toast.error("Please fill each input field");
    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {
          name,
          email,
          position,
          password // Including password in the request body
        })
          .then(() => {
            setState(initialState);
            toast.success("Staff Added Successfully");
            navigate("/staff");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios.put(`http://localhost:5000/api/update/${id}`, {
          name,
          email,
          position,
          password // Including password in the request body
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
          alignContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Your Name....'
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor='email'>E-Mail</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your E-mail....'
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='text' // Keeping input type as text for password
          id='password'
          name='password'
          placeholder='Your Password....'
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor='position'>Position</label>
        <select
          id='position'
          name='position'
          value={position}
          onChange={handleInputChange}
        >
          <option value=''>Select Position</option>
          {positionOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input type='submit' value={id ? "Update" : "Save"} />
        <Link to="/staff">
          <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
