import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  CostumerName: "",
  CostumersPhone: "",
  CostumersEmail: ""
};

const AddEditCustomer = () => {
  const [state, setState] = useState(initialState);
  const { CostumerName, CostumersPhone, CostumersEmail } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/customers/${id}`)
        .then(resp => setState({ ...resp.data[0] }))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!CostumerName || !CostumersPhone || !CostumersEmail) {
      toast.error("Please fill each input field");
    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/customers", {
          CostumerName,
          CostumersPhone,
          CostumersEmail
        })
          .then(() => {
            setState(initialState);
            toast.success("Customer Added Successfully");
            navigate("/customers");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios.put(`http://localhost:5000/api/customers/${id}`, {
          CostumerName,
          CostumersPhone,
          CostumersEmail
        })
          .then(() => {
            toast.success("Customer Updated Successfully");
            navigate("/customers");
          })
          .catch((err) => toast.error(err.response.data));
      }
    }
  }

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
        <label htmlFor='CostumerName'>Customer Name</label>
        <input
          type='text'
          id='CostumerName'
          name='CostumerName'
          placeholder='Customer Name....'
          value={CostumerName || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='CostumersPhone'>Phone</label>
        <input
          type='text'
          id='CostumersPhone'
          name='CostumersPhone'
          placeholder='Phone....'
          value={CostumersPhone || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='CostumersEmail'>Email</label>
        <input
          type='email'
          id='CostumersEmail'
          name='CostumersEmail'
          placeholder='Email....'
          value={CostumersEmail || ""}
          onChange={handleInputChange}
        />
        <input type='submit' value={id ? "Update" : "Save"} />
        <Link to="/customers">
          <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
};

export default AddEditCustomer;
