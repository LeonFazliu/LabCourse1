import React from 'react'
import { Link } from 'react-router-dom';


export const Sidebar = () => {
  return (
    <div className='d-flex flex-column bg-dark text-white p-4 vh-100'>
        <h3>
            <i className='bi bi-bootstrap fs-5 me-2'></i>
            <span>CRUD's</span>
        </h3>
        <hr className='text-secondary mt-2'/>
        <ul className='nav nav-pills flex-column p-0 m-0'>
            <li className='nav-item p-1'>
                <Link to="/staff" className='nav-link text-white'>
                    <i className='bi me-2 fs-5'></i>
                    <span className='fs-5'>Staff</span>
                </Link>
            </li>
            <li className='nav-item p-1'>
                <Link to="/hotels" className='nav-link text-white'>
                    <i className='bi me-2 fs-5'></i>
                    <span className='fs-5'>Hotels</span>
                </Link>
            </li>
            <li className='nav-item p-1'>
                <Link to="/customers" className='nav-link text-white'>
                    <i className='bi me-2 fs-5'></i>
                    <span className='fs-5'>Customers</span>
                </Link>
            </li>
            <li className='nav-item p-1'>
                <Link to="/finances" className='nav-link text-white'>
                    <i className='bi me-2 fs-5'></i>
                    <span className='fs-5'>Finances</span>
                </Link>
                
            </li>
            <li className='nav-item p-1'>
                <Link to="/reservations" className='nav-link text-white'>
                    <i className='bi me-2 fs-5'></i>
                    <span className='fs-5'>Reservations</span>
                </Link>
                
            </li>
        </ul>
    </div>
  )
}

export default Sidebar;
