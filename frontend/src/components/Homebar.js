import React from "react";
import { Link } from "react-router-dom";

export default function Homebar(props) {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" style={{ backgroundColor: "#ADD8E6" }}>
          <Link
            className="navbar-brand"
            to="/home"
            style={{ backgroundColor: "#ADD8E6" }}
          >
            CodeSoldiers
            {/* <image src= */}
            <img
              src="/logo.png"
              style={{ height: "45px", width: "45px", marginLeft: "5px" }}
              alt="soldier"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
