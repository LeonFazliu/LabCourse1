import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffCrud from './Cruds/StaffCrud/StaffCrud'; 
import AddEditStaff from './Cruds/StaffCrud/AddEditStaff';
import ViewStaff from './Cruds/StaffCrud/ViewStaff';
import HotelCrud from './Cruds/HotelCrud/HotelCrud'; 
import AddEditHotel from './Cruds/HotelCrud/AddEditHotel';
import ViewHotel from './Cruds/HotelCrud/ViewHotel';
import CustomerCrud from './Cruds/CustomerCrud/CustomerCrud';  
import AddEditCustomer from './Cruds/CustomerCrud/AddEditCustomer';  
import ViewCustomer from './Cruds/CustomerCrud/ViewCustomer';
import FinancesCrud from './Cruds/FinancesCrud/FinancesCrud';
import AddEditFinances from './Cruds/FinancesCrud/AddEditFinances';
import ViewFinances from './Cruds/FinancesCrud/ViewFinances';
import ReservationsCrud from './Cruds/ReservationCrud/ReservationsCrud';
import AddEditReservation from './Cruds/ReservationCrud/AddEditReservation';
import ViewReservations from './Cruds/ReservationCrud/ViewReservations';
import Sidebar from './Sidebar';

function App() {
  return (
    <Router>
      <div className="container-fluid"> 
        <div className="row">
          <div className="col-auto p-0"> 
            <Sidebar />
          </div>
          <div className="col">
            <div className="p-3">
              <ToastContainer position='top-center'/>
              <Routes>
                <Route exact path="/staff" element={<StaffCrud />} />
                <Route path="/addstaff" element={<AddEditStaff />} />
                <Route path="/update/:id" element={<AddEditStaff />} />
                <Route path="/view/:id" element={<ViewStaff />} />

                <Route exact path="/hotels" element={<HotelCrud />} />
                <Route path="/hotels/add" element={<AddEditHotel />} />
                <Route path="/hotels/update/:id" element={<AddEditHotel />} />
                <Route path="/hotels/view/:id" element={<ViewHotel />} />

                <Route exact path="/customers" element={<CustomerCrud />} />
                <Route path="/customers/add" element={<AddEditCustomer />} />
                <Route path="/customers/update/:id" element={<AddEditCustomer />} />
                <Route path="/customers/view/:id" element={<ViewCustomer />} />

                <Route exact path="/finances" element={<FinancesCrud />} />
                <Route path="/finances/add" element={<AddEditFinances />} />
                <Route path="/finances/update/:salaryid" element={<AddEditFinances />} />
                <Route path="/finances/view/:salaryid" element={<ViewFinances />} />

                <Route exact path="/reservations" element={<ReservationsCrud />} />
                <Route path="/reservations/add" element={<AddEditReservation />} />
                <Route path="/reservations/update/:Reservation_id" element={<AddEditReservation />} />
                <Route path="/reservations/view/:Reservation_id" element={<ViewReservations />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
