import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  CostumerName: "",
  hotelname: "",
  checkindate: "",
  checkoutdate: ""
};

const AddEditReservation = () => {
  const [state, setState] = useState(initialState);
  const [hotels, setHotels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { CostumerName, hotelname, checkindate, checkoutdate } = state;
  const navigate = useNavigate();
  const { Reservation_id } = useParams();

  useEffect(() => {
    if (Reservation_id) {
      axios.get(`http://localhost:5000/api/reservations/${Reservation_id}`)
        .then(resp => setState({ ...resp.data[0] }))
        .catch(error => console.error(error));
    }

    // Fetch the list of hotels
    axios.get("http://localhost:5000/api/hotels")
      .then(resp => setHotels(resp.data))
      .catch(error => console.error(error));

    // Fetch the list of customers
    axios.get("http://localhost:5000/api/customers")
      .then(resp => setCustomers(resp.data))
      .catch(error => console.error(error));
  }, [Reservation_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!CostumerName || !hotelname || !checkindate || !checkoutdate) {
      toast.error("Please fill each input field");
    } else {
      if (!Reservation_id) {
        axios.post("http://localhost:5000/api/reservations", {
          CostumerName,
          hotelname,
          checkindate,
          checkoutdate
        })
          .then(() => {
            setState(initialState);
            toast.success("Reservation Added Successfully");
            navigate("/reservations");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios.put(`http://localhost:5000/api/reservations/${Reservation_id}`, {
          CostumerName,
          hotelname,
          checkindate,
          checkoutdate
        })
          .then(() => {
            toast.success("Reservation Updated Successfully");
            navigate("/reservations");
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
        <select
          id='CostumerName'
          name='CostumerName'
          value={CostumerName}
          onChange={handleInputChange}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.CostumerName} value={customer.CostumerName}>
              {customer.CostumerName}
            </option>
          ))}
        </select>

        <label htmlFor='hotelname'>Hotel Name</label>
        <select
          id='hotelname'
          name='hotelname'
          value={hotelname}
          onChange={handleInputChange}
        >
          <option value="">Select a hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.hotelname} value={hotel.hotelname}>
              {hotel.hotelname}
            </option>
          ))}
        </select>

        <label htmlFor='checkindate'>Check-in Date</label>
        <input
          type='date'
          id='checkindate'
          name='checkindate'
          value={checkindate}
          onChange={handleInputChange}
        />
        <br></br>
        <br></br>

        <label htmlFor='checkoutdate'>Check-out Date</label>
        <input
          type='date'
          id='checkoutdate'
          name='checkoutdate'
          value={checkoutdate}
          onChange={handleInputChange}
        />

        <input type='submit' value={Reservation_id ? "Update" : "Save"} />
        <Link to="/reservations">
          <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
};

export default AddEditReservation;
