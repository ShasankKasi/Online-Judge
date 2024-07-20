import React, { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Homebar from "./Homebar";
export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot", {
        email,
      });
      if (response.data.status === "otpsent") {
        toast.success("Otp sent successfully");
        navigate("/verify", { state: { email } });
      } else if (response.data.status === "doesnotexist") {
        toast.error("User doesnot exist");
      } else {
        toast.error("Unknown error");
      }
    } catch (e) {
      toast.error("verification error");
    }
  }
  return (
    <div>
      <Homebar />
      <div className="containeer">
        <p className="p">Enter your Email to get OTP</p>
        <form action="POST" className="form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
