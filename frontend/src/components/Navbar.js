import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#ADD8E6" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ color: "black", backgroundColor: "#ADD8E6" }}
          >
            CodeSoldiers
            <img
              src="/logo.png"
              style={{ height: "55px", width: "55px", marginLeft: "5px" }}
              alt="soldier"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="navbar-toggler-icon"></div>
          </button>
        </div>
      </nav>
    </div>
  );
}
