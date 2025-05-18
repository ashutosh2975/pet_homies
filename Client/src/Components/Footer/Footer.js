import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="Pet Homies Logo" />
          <p>{props.title}</p>
        </Link>
      </div>
      <div className="below-footer">
        <p>
          You can reach me at{" "}
          <a className="mail-links" href="ashutosh.22310120@viit.ac.in">
            ashutosh.22310120@viit.ac.in | manaswi.22310120@viit.ac.in
          </a>
        </p>
        
        <p>&copy; 2025 Ashutosh shinde |  Manaswi Shekokar </p>
      </div>
    </footer>
  );
};

export default Footer;
