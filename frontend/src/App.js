import React from 'react';
import Signup from './components/signup'; 
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Forgot from './components/Forgot';
// import otp from './components/otp';
import Verify from './components/Verify';
import Question1 from './components/Question1';
import Admin from './components/Admin';
import Question from './components/Question';
// import forgot from './Forgot';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/question1" element={<Question1/>}/>
        <Route path="/Question/:id" element={<Question/>}/>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </Router>
  );
};
