import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

export const ViewFinance = () => {
    const [finance, setFinance] = useState({});
    const { salaryid } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/finances/${salaryid}`)
            .then(resp => setFinance({ ...resp.data[0] }))
            .catch(error => console.error(error));
    }, [salaryid]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='card'>
                <div className='card-header'>
                    <p>Finance Details</p>
                </div>
                <div className='container'>
                    <strong>ID:</strong>
                    <span>{salaryid}</span>
                    <br />
                    <br />
                    <strong>Staff Name:</strong>
                    <span>{finance.staffname}</span>
                    <br />
                    <br />
                    <strong>Salary:</strong>
                    <span>{finance.salary}</span>
                    <br />
                    <br />
                    <strong>Payment Date:</strong>
                    <span>{finance.paymentdate}</span>
                    <br />
                    <br />
                    <Link to="/finances">
                        <div className='btn btn-edit'>
                            Go Back
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ViewFinance;
