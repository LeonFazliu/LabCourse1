import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./CrudDesign.css";
import { toast } from "react-toastify";
import axios from "axios";

export const ReservationsCrud = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/reservations");
            setData(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch reservation data");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteRecord = (Reservation_id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:5000/api/reservations/${Reservation_id}`)
                .then(() => {
                    toast.success("Record deleted successfully");
                    loadData();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to delete record");
                });
        }
    }

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='addbutton' style={{ marginLeft: "40.5rem" }}>
                <Link to="/reservations/add">
                    <button className='btn btn-contact'>New Reservation</button>
                </Link>
            </div>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Customer Name</th>
                        <th style={{ textAlign: "center" }}>Hotel Name</th>
                        <th style={{ textAlign: "center" }}>Check-in Date</th>
                        <th style={{ textAlign: "center" }}>Check-out Date</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record, index) => (
                        <tr key={record.Reservation_id}>
                            <td>{index + 1}</td>
                            <td>{record.CostumerName}</td>
                            <td>{record.hotelname}</td>
                            <td>{new Date(record.checkindate).toLocaleDateString()}</td>
                            <td>{new Date(record.checkoutdate).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/reservations/update/${record.Reservation_id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteRecord(record.Reservation_id)}>Delete</button>
                                <Link to={`/reservations/view/${record.Reservation_id}`}>
                                    <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationsCrud;
