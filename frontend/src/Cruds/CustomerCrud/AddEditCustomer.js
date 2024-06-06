import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const AddEditCustomer = () => {
  const initialState = {
    CostumerName: "",
    CostumersPhone: "",
    CostumersEmail: "",
    CostumersGender: "",
  };

  const genderOptions = ["Male", "Female"];

  const [state, setState] = useState(initialState);
  const { CostumerName, CostumersPhone, CostumersEmail, CostumersGender } =
    state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/customers/${id}`)
        .then((resp) => setState({ ...resp.data[0] }))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !CostumerName ||
      !CostumersPhone ||
      !CostumersEmail ||
      !CostumersGender
    ) {
      toast.error("Please fill each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/customers", {
            CostumerName,
            CostumersPhone,
            CostumersEmail,
            CostumersGender,
          })
          .then(() => {
            setState(initialState);
            toast.success("Customer Added Successfully");
            navigate("/customers");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios
          .put(`http://localhost:5000/api/customers/${id}`, {
            CostumerName,
            CostumersPhone,
            CostumersEmail,
            CostumersGender,
          })
          .then(() => {
            setState(initialState);
            toast.success("Customer Updated Successfully");
            navigate("/customers");
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
        <label htmlFor="CostumerName">Customer Name</label>
        <input
          type="text"
          id="CostumerName"
          name="CostumerName"
          placeholder="Customer Name...."
          value={CostumerName}
          onChange={handleInputChange}
        />
        <label htmlFor="CostumersPhone">Phone</label>
        <input
          type="text"
          id="CostumersPhone"
          name="CostumersPhone"
          placeholder="Phone...."
          value={CostumersPhone}
          onChange={handleInputChange}
        />
        <label htmlFor="CostumersEmail">Email</label>
        <input
          type="email"
          id="CostumersEmail"
          name="CostumersEmail"
          placeholder="Email...."
          value={CostumersEmail}
          onChange={handleInputChange}
        />
        <label htmlFor="CostumersGender">Gender</label>
        <select
          id="CostumersGender"
          name="CostumersGender"
          value={CostumersGender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/customers">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEditCustomer;
