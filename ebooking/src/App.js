import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import About from './pages/About';
import View from './pages/View';
import Header  from "./pages/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/AddEdit" element={<AddEdit />} />
          <Route path="/AddEdit/:id" element={<AddEdit />} />
          <Route path="/View/:id" element={<View />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
