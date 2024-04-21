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
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
