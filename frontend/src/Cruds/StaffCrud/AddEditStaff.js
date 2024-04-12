import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom"; // Correct import
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css"

const initialState = {
  name: "",
  email: "",
  position: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, position } = state;
  const navigate = useNavigate(); 
  const { id } = useParams();
  
  useEffect(() => {
    
      axios.get(`http://localhost:5000/api/get/${id}`)
        .then(resp => setState({ ...resp.data[0] }))
    
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !position) {
      toast.error("Please fill each input field");
    } else {
        if(!id){
            axios.post("http://localhost:5000/api/post",{
           name,
           email,
           position,
        })
        .then(()=>{
            setState({name:"",email:"",position:""})
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("Staff Added Successfully");
    }
    else{
            axios.put(`http://localhost:5000/api/update/${id}`,{
           name,
           email,
           position,
        })
        .then(()=>{
            setState({name:"",email:"",position:""})
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("Staff Updated Successfully");
       
    }
    setTimeout(()=>navigate("/"),500);
}
  }
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Your Name....'
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='email'>E-Mail</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your E-mail....'
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='position'>Position</label>
        <input
          type='text'
          id='position'
          name='position'
          placeholder='Your Position....'
          value={position || ""}
          onChange={handleInputChange}
        />
        <input type='submit' value={id ? "Update" : "Save"} />
        <Link to="/staff">
        <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
