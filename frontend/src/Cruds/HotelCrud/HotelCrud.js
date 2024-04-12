import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./CrudDesign.css";
import { toast } from "react-toastify";
import axios from "axios";

export const HotelCrud = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/hotels");
            setData(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch hotel data");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteHotel = (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            axios.delete(`http://localhost:5000/api/hotels/${id}`)
                .then(() => {
                    toast.success("Hotel deleted successfully");
                    loadData();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to delete hotel");
                });
        }
    }

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='addbutton'>
            <Link to="/hotels/add">
               
                <button className='btn btn-contact'>Add Hotel</button>
            </Link>
            </div>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Hotel Name</th>
                        <th style={{ textAlign: "center" }}>City</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((hotel, index) => (
                        <tr key={hotel.hotel_id}>
                            <td>{index + 1}</td>
                            <td>{hotel.hotelname}</td>
                            <td>{hotel.hotelcity}</td>
                            <td>
                                <Link to={`/hotels/update/${hotel.hotel_id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteHotel(hotel.hotel_id)}>Delete</button>
                                <Link to={`./view/${hotel.hotel_id}`}>
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

export default HotelCrud;
