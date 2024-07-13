import React, { useState } from 'react'
import {useNavigate,useLocation} from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios';
import './Verify.css'
export default function Verify() {
  const[number,setNumber]=useState("");
  const navigate=useNavigate();
  const location=useLocation();
  const email=location.state.email;
  async function handleSubmit(e)
  {
    e.preventDefault();
    try{
      // console.log("before posting the otp");
      const response = await axios.post("http://localhost:8000/verify", {
        email,
        number,  // assuming you have the 'otp' variable defined
      });
    // console.log("before ifelse")
    if (response.data && response.data.status === "success") {
      const name = response.data.userName;
      navigate('/home', { state: { email, name } });
    }
    
    else{
      console.log("otp false");
      alert('Otp is incorrect');
    }
  }
  catch(e){
    console.log("verification error")
    console.log(e);
  }
  }
  
  return (
    <div>
      <Navbar/>

    <div className='containers'>

      {/* <h1>This is the otp verification page</h1> */}
      <input type="text" value={number} maxLength={4} onChange={(e)=>setNumber(e.target.value)}placeholder='Enter Otp'></input>
      <br></br>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}
