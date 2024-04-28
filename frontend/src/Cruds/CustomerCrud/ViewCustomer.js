import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

export const ViewCustomer = () => {
    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/customers/${id}`)
            .then(resp => setCustomer({ ...resp.data[0] }))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='card'>
                <div className='card-header'>
                    <p>Customer Details</p>
                </div>
                <div className='container'>
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Customer Name:</strong>
                    <span>{customer.CostumerName}</span>
                    <br />
                    <br />
                    <strong>Phone:</strong>
                    <span>{customer.CostumersPhone}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{customer.CostumersEmail}</span>
                    <br />
                    <br />
                    <strong>Gender:</strong>
                    <span>{customer.CostumersGender}</span>
                    <br />
                    <br />
                    <Link to="/customers">
                        <div className='btn btn-edit'>
                            Go Back
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ViewCustomer;
