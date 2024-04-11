import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffCrud from './Cruds/StaffCrud/StaffCrud'; 
import  AddEdit  from './Cruds/StaffCrud/AddEdit';
import View from './Cruds/StaffCrud/View';


function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position='top-center'/>
        <Routes>
          <Route exact path="/" element={<StaffCrud />} />
          <Route path="/addStaff" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
