import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

export const ViewReservations = () => {
  const [reservation, setReservation] = useState({});
  const { Reservation_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reservations/${Reservation_id}`)
      .then((resp) => setReservation({ ...resp.data[0] }))
      .catch((error) => console.error(error));
  }, [Reservation_id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Reservation Details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{Reservation_id}</span>
          <br />
          <br />
          <strong>Customer Name:</strong>
          <span>{reservation.CostumerName}</span>
          <br />
          <br />
          <strong>Hotel Name:</strong>
          <span>{reservation.hotelname}</span>
          <br />
          <br />
          <strong>Check-in Date:</strong>
          <span>
            {reservation.checkindate
              ? new Date(reservation.checkindate).toLocaleDateString()
              : ""}
          </span>
          <br />
          <br />
          <strong>Check-out Date:</strong>
          <span>
            {reservation.checkoutdate
              ? new Date(reservation.checkoutdate).toLocaleDateString()
              : ""}
          </span>
          <br />
          <br />
          <Link to="/reservations">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewReservations;
