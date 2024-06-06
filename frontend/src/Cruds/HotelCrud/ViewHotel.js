import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

export const ViewHotel = () => {
  const [hotel, setHotel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hotels/${id}`)
      .then((resp) => setHotel({ ...resp.data[0] }))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Hotel Details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Hotel Name:</strong>
          <span>{hotel.hotelname}</span>
          <br />
          <br />
          <strong>City:</strong>
          <span>{hotel.hotelcity}</span>
          <br />
          <br />
          <Link to="/hotels">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewHotel;
