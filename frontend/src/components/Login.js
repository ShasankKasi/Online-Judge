import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";
import Navbar from "./Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleForgot() {
    navigate("/forgot");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data.status === "success") {
        navigate("/home", {
          state: { email: response.data.email, name: response.data.name },
        });
      }
      else if(response.data.status==="admin"){
        navigate("/admin");
      } else if (response.data.status === "doesnotexist") {
        alert("Do Sign up First");
      } else if (response.data.status === "incorrect password") {
        alert("Please Enter Correct Password");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="centered-container">
        <img src="/logo.png" className="logo" alt="soldier" />
        <div className="login">
          <h1 className="container">
            <strong>Log in</strong>
          </h1>
          <form action="POST">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
          <br />
          <Link
            to="/signup"
            style={{
              borderRadius: "5px",
              marginRight: "55px",
              textDecoration: "none",
              color: "black",
            }}
          >
            Sign up
          </Link>
          <button
            onClick={handleForgot}
            style={{
              borderRadius: "5px",
              marginLeft: "140px",
              padding: "3px",
              fontSize: "18px",
              textDecoration: "none",
              color: "black",
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
