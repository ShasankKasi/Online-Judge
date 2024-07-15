import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/scss/bootstrap";
import "./signup.css";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });
      if (response.data.status === "exist") {
        toast.error("User already exists");
      } else if (response.data.status === "success") {
        navigate("/", { state: { id: email } });
      } else if (response.data.status === "passerror") {
        toast.error("Password should be atleast 8 letters");
      } else if (response.data.status === "emptyerror") {
        toast.error("Enter Valid Details");
      }
    } catch (e) {
      toast.error("Error in details entered. Please check the details again");
    }
  }
  return (
    <div>
      <Navbar />
      <div className="signup">
        <h1 className="header" style={{ textAlign: "center" }}>
          <strong>SignUp</strong>
        </h1>
        <form action="POST">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <br></br>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br></br>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <br></br>
        <p>*Password should be atleast 8 characters</p>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Login Page
        </Link>
      </div>
    </div>
  );
}
