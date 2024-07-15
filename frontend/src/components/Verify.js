import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "./Verify.css";
import toast from "react-hot-toast";
export default function Verify() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/verify", {
        email,
        number, // assuming you have the 'otp' variable defined
      });
      if (response.data && response.data.status === "success") {
        toast.success("Verification done");
        const name = response.data.userName;
        navigate("/home", { state: { email, name } });
      } else {
        toast.error("Otp is incorrect");
      }
    } catch (e) {
      toast.error("Unknown error occured")
    }
  }

  return (
    <div>
      <Navbar />

      <div className="containers">
        <input
          type="text"
          value={number}
          maxLength={4}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter Otp"
        ></input>
        <br></br>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
