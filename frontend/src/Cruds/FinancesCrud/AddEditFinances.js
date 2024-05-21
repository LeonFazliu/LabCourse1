import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  staffname: "",
  salary: "",
  paymentdate: ""
};

const AddEditFinance = () => {
  const [state, setState] = useState(initialState);
  const { staffname, salary, paymentdate } = state;
  const navigate = useNavigate();
  const { salaryid } = useParams();

  useEffect(() => {
    if (salaryid) {
      axios.get(`http://localhost:5000/api/finances/${salaryid}`)
        .then(resp => setState({ ...resp.data[0] }))
        .catch(error => console.error(error));
    }
  }, [salaryid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!staffname || !salary || !paymentdate) {
      toast.error("Please fill each input field");
    } else {
      if (!salaryid) {
        axios.post("http://localhost:5000/api/finances", {
          staffname,
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
          staffname,
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
        <label htmlFor='staffname'>Staff Name</label>
        <input
          type='text'
          id='staffname'
          name='staffname'
          placeholder='Staff Name...'
          value={staffname}
          onChange={handleInputChange}
        />
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
