import React,{useState} from 'react'
import Navbar from './Navbar'
import "./Forgot.css"
import {useNavigate} from "react-router-dom";
import axios from 'axios';
export default function Forgot() {
  const navigate=useNavigate();
    const[email,setEmail]=useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
        const response=await axios.post("http://13.51.168.80:8000/forgot",{
            email,
            
          });
          console.log("post request done");
      if(response.data.status==="otpsent")
      {
        navigate('/verify', { state: {email} });
        console.log("verification not done");
      }
      // console.log("asg");
      else if(response.data.status==="doesnotexist")
      {
        alert("User doesnot exist");
      }
      else{
        console.log("error");
      }
    }
    // console.log("catching error");
    catch(e){
      console.log("verification error")
           console.log(e);

        }
    };
  return (
    <div>
    <Navbar/>
    <div className="containeer">
       <p className="p">Enter your Email to get OTP</p>
        <form action="POST" className="form">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            {/* <br></br> */}
            <button type="submit" onClick={handleSubmit} >Submit</button>
        </form>
        </div>
    </div>
  );
  }

