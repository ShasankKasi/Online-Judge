import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Homebar from "./Homebar";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        queryClient.setQueryData(["user"], {
          email: response.data.email,
          name: response.data.name,
        });
        queryClient.setQueryData(["isAuthenticated"], { auth: true });
        navigate("/home");
      } else if (response.data.status === "admin") {
        queryClient.setQueryData(["user"], {
          email: response.data.email,
          name: response.data.name,
        });
        queryClient.setQueryData(["isAuthenticated"], { auth: true });
        navigate("/admin");
      } else if (response.data.status === "doesnotexist") {
        toast.error("User does not exist. Please sign up.");
      } else if (response.data.status === "incorrect password") {
        toast.error("Incorrect password. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error occurred. Please try again.");
      } else {
        toast.error("Unknown error occurred. Please try again later.");
      }
    }
  }

  return (
    <div>
      <Homebar />
      <div className="main">
        <div className="sub-main">
          <div className="imgs">
            <div className="container-image">
              <img
                src="/logo.png"
                className="profile-icon"
                alt="Logo of Code Soldiers"
              />
            </div>
          </div>
          <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <FaUser className="email-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  className="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <FaLock className="password-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-button">
                <button type="submit">Login</button>
              </div>
            </form>
            <div className="link">
              <button
                className="link-button"
                onClick={() => navigate("/forgot")}
              >
                Forgot password?
              </button>
              <button
                className="link-button"
                onClick={() => navigate("/signup")}
              >
                Sign Up?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
