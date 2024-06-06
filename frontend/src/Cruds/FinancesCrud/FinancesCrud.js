import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./CrudDesign.css";
import { toast } from "react-toastify";
import axios from "axios";

export const FinancesCrud = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/finances");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch financial data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteRecord = (salaryid) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:5000/api/finances/${salaryid}`)
        .then(() => {
          toast.success("Record deleted successfully");
          loadData();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete record");
        });
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="addbutton" style={{ marginLeft: "29.0rem" }}>
        <Link to="/finances/add">
          <button className="btn btn-contact">New payment</button>
        </Link>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Salary</th>
            <th style={{ textAlign: "center" }}>Payment Date</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={record.salaryid}>
              <td>{index + 1}</td>
              <td>{record.name}</td>
              <td>{record.salary}</td>
              <td>{format(new Date(record.paymentdate), "MM/dd/yyyy")}</td>
              <td>
                <Link to={`/finances/update/${record.salaryid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteRecord(record.salaryid)}
                >
                  Delete
                </button>
                <Link to={`/finances/view/${record.salaryid}`}>
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

export default FinancesCrud;
