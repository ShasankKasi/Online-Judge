import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Homebar from "./Homebar";
import "./signup.css"; // Import signup.css for styling

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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
        toast.error("Password should be at least 8 characters");
      } else if (response.data.status === "emptyerror") {
        toast.error("Please fill in all fields");
      }
    } catch (error) {
      setError(error);
      toast.error("Error in details entered. Please check the details again");
    }
  };

  return (
    <div>
      <Homebar />
      <div className="main">
        <div className="sub-main">
          <img src="/logo.png" alt="Logo" className="profile-icon" />
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="input-field"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input-field"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={8}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <Link to="/" className="link">
            Already have an account? Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
