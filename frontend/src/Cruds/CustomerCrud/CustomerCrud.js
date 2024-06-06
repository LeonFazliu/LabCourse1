import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CrudDesign.css";
import { toast } from "react-toastify";
import axios from "axios";

export const CustomerCrud = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customer data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => {
          toast.success("Customer deleted successfully");
          loadData();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete customer");
        });
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="addbutton" style={{ marginLeft: "40.1rem" }}>
        <Link to="/customers/add">
          <button className="btn btn-contact">Add Customer</button>
        </Link>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Customer Name</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Gender</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={customer.Costumer_id}>
              <td>{index + 1}</td>
              <td>{customer.CostumerName}</td>
              <td>{customer.CostumersPhone}</td>
              <td>{customer.CostumersEmail}</td>
              <td>{customer.CostumersGender}</td>
              <td>
                <Link to={`/customers/update/${customer.Costumer_id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteCustomer(customer.Costumer_id)}
                >
                  Delete
                </button>
                <Link to={`/customers/view/${customer.Costumer_id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerCrud;
