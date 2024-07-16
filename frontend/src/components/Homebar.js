import React from "react";
import { Link } from "react-router-dom";

const Homebar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img
            src="/logo.png"
            style={{ height: "45px", width: "45px", marginRight: "10px" }}
            alt="soldier"
          />
          <span className="fs-4">CodeSoldiers</span>
        </Link>
      </div>
    </nav>
  );
};

export default Homebar;
