import React from 'react'
import soldier from "./soldie.png"

export default function Homebar(props) {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
              <div className="container-fluid" style={{ backgroundColor: "#ADD8E6" }}>
                <a className="navbar-brand" href="/home" style={{ backgroundColor: "#ADD8E6" }}>CodeSoldiers
                {/* <image src= */}
                <img src={soldier} style={{height:"25px" , width:"25px" , marginLeft:"5px"}}  alt="soldier"/>
                </a>
              </div>
             </nav>
    </div>
  )
}
