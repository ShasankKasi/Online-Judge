import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/scss/bootstrap";
import "./signup.css";
import Navbar from "./Navbar";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://13.51.168.80:8000/api/signup", {
        name,
        email,
        password,
      });
      if (response.data.status === "exist") {
        alert("User already exists");
      } else if (response.data.status === "success") {
        navigate("http://13.51.168.80:8000", { state: { id: email } });
      } else if (response.data.status === "passerror") {
        alert("Password should be atleast 8 letters");
      } else if (response.data.status === "emptyerror") {
        alert("Enter Valid Details");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
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
