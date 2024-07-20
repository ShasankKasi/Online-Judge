import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Verify.css";
import toast from "react-hot-toast";
import Homebar from "./Homebar";
import { useQueryClient } from "@tanstack/react-query";

export default function Verify() {
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const email = location.state.email;

  async function handleSubmit(e) {
    e.preventDefault();
    if (number.length !== 4 || isNaN(number)) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/verify", {
        email,
        number,
      });
      setIsLoading(false);
      if (response.data && response.data.status === "success") {
        toast.success("Verification done");
        queryClient.setQueryData(
          ["user"],
          response.data.email,
          response.data.name
        );
        queryClient.setQueryData(["isAuthenticated"], { auth: true });
        navigate("/home", {
          state: { email: response.data.email, name: response.data.name },
        });
      } else {
        toast.error("Otp is incorrect");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Unknown error occurred");
    }
  }

  function handleResendOtp() {
    navigate("/forgot");
  }

  return (
    <div>
      <Homebar />
      <div className="containers">
        <h1>OTP Verification </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={number}
            maxLength={4}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter OTP"
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Submit"}
          </button>
        </form>
        <button onClick={handleResendOtp} disabled={isLoading}>
          Resend OTP
        </button>
      </div>
    </div>
  );
}
