import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'; 
import  AddEdit  from './AddEdit';
import View from './View'

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position='top-center'/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/addStaff" element={<AddEdit />} />
          <Route  path="/update/:id" element={<AddEdit />} />
          <Route  path="/view/:id" element={<View />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
