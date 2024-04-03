import React,{useState} from 'react';
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

import './Login.css'
import Navbar from './Navbar';

export default function Login(){
    const navigate=useNavigate();

   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
//    const[errorMessage,setErrorMessage]=useState("");
   
   function handleForgot(){
    navigate("/forgot");
   }
   async function handleSubmit(e){
    e.preventDefault();

    try{
        console.log(1);
        const response=await axios.post("http://localhost:8000/login",{
            email,password,
        });
        if(response.data.status==="success"){
            console.log(1);
            if(email==="u21ec107@eced.svnit.ac.in")
            navigate("/admin",{state:{email:response.data.email,name:response.data.name,}});
            // else{
            // return <Link to={{ pathname: `/home`, state: { email: response.data.email, name: response.data.name  } ,}} ></Link>
            // }
            else
            navigate("/home",{state:{email:response.data.email,name:response.data.name,}});
        }
        else if(response.data.status==="doesnotexist")
        {
            alert("Do Sign up First");
        }
        else if(response.data.status==="incorrect password"){
            alert("Please Enter Correct Password");
        }

    }
    catch(e){
        
        console.log(e);
        // setErrorMessage("Error occurred while request");
    }
   }
    return (
         <div>
          <Navbar/>
        <div className="login">
            <h1 className="container"><strong>Log in</strong></h1>
        <form action="POST">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <br></br>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <br></br>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        <br></br>
        <Link to="/signup" style={{borderRadius:'5px',marginRight:"55px", textDecoration:"none" ,color:"black"}}>
               Sign up
            </Link>

            <button onClick={handleForgot} style={{borderRadius:'5px',marginLeft:"140px",padding:"3px",fontSize:"18px", textDecoration:"none" ,color:"black"}}>Forgot Password?</button>
         </div>
        </div>
    )
}