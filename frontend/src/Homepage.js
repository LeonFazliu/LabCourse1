import axios from 'axios'
import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';


export const Homepage = () => {
  
  const[auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const[message,setMessage]=useState('')

  axios.defaults.withCredentials=true;


  useEffect(()=>{
   axios.get('http://localhost:5000')
   .then(res=>{
    if(res.data.Status==="Success"){
      setAuth(true);
      setName(res.data.name);
    }else{
      setAuth(false)
      setMessage(res.data.Message);
    }
   })
  },[])
  const handleLogout=()=>{
    axios.get('http://localhost:5000/logout')
    .then(res=>{
      if(res.data.Status==="Success"){
        window.location.reload();
      }
      else{
        alert("error")
      }
    }).catch(err=>console.log(err))
  }

  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
        <h3>You are Authorized {name}</h3>
      <button className='btn btn-danger' onClick={handleLogout}>Log out</button>

        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Log in now</h3>
          <Link to="/login" className='btn btn-primary'>Log in</Link>
        </div>
      }

    </div>
  )
}

export default Homepage;