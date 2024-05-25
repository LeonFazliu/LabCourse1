import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  name: "",
  salary: "",
  paymentdate: ""
};

const AddEditFinance = () => {
  const [state, setState] = useState(initialState);
  const { name, salary, paymentdate } = state;
  const [staffNames, setStaffNames] = useState([]); // State to hold the list of staff names
  const navigate = useNavigate();
  const { salaryid } = useParams();

  useEffect(() => {
    // Fetch the list of staff names from the staff_db
    axios.get("http://localhost:5000/api/get")
      .then(resp => setStaffNames(resp.data.map(staff => staff.name)))
      .catch(error => console.error(error));

    if (salaryid) {
      axios.get(`http://localhost:5000/api/finances/${salaryid}`)
        .then(resp => setState({ ...resp.data[0] }))
        .catch(error => console.error(error));
    }
  }, [salaryid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !salary || !paymentdate) {
      toast.error("Please fill each input field");
    } else {
      if (!salaryid) {
        axios.post("http://localhost:5000/api/finances", {
          name,
          salary,
          paymentdate
        })
          .then(() => {
            setState(initialState);
            toast.success("Record Added Successfully");
            navigate("/finances");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios.put(`http://localhost:5000/api/finances/${salaryid}`, {
          name,
          salary,
          paymentdate
        })
          .then(() => {
            toast.success("Record Updated Successfully");
            navigate("/finances");
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
        <label htmlFor='name'>Staff Name</label>
        <select
          id='name'
          name='name'
          value={name}
          onChange={handleInputChange}
        >
          <option value="">Select Staff Name</option>
          {staffNames.map((staffName, index) => (
            <option key={index} value={staffName}>{staffName}</option>
          ))}
        </select>
        <label htmlFor='salary'>Salary</label>
        <br></br>
        
        <input
          type='number'
          id='salary'
          name='salary'
          placeholder='Salary...'
          value={salary}
          onChange={handleInputChange}
        />
        <br></br>
        
        <label htmlFor='paymentdate'>Payment Date</label>
        <br></br>
        <input
          type='date'
          id='paymentdate'
          name='paymentdate'
          value={paymentdate}
          onChange={handleInputChange}
        />
        <input type='submit' value={salaryid ? "Update" : "Save"} />
        <Link to="/finances">
          <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
};

export default AddEditFinance;
