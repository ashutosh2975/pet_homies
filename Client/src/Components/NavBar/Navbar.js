import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="Pet Homies Logo" />
          <p>Pet-Homies</p>
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/appointments">Book Vet</Link>
          </li>
          <li>
            
          <Link to="/donate">Donete</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-buttons">
        {/* <Link to="/donate">
          <button className="Navbar-button donate-btn">Donate </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
