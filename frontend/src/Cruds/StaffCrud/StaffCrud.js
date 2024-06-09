import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StaffCrud.css";
import { toast } from "react-toastify";
import axios from "axios";

export const StaffCrud = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteStaff = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that staff?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Successfully Deleted");
      setTimeout(() => loadData(), 300);
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="addbutton" style={{ marginLeft: "40.1rem" }}>
        <Link to="/addstaff">
          <button className="btn btn-contact">Add Staff</button>
        </Link>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Full Name</th>
            <th style={{ textAlign: "center" }}>E-mail</th>
            <th style={{ textAlign: "center" }}>Password</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.role}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteStaff(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StaffCrud;
