import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Meet Our Team</h2>
      
      <div className="team-members">
        {/* First Team Member */}
        <div className="team-member">
          <div className="profile-pic-container">
            <img 
              src="http://localhost:4000/images/ashutoshshinde.jpg"
              alt="Ashutosh Shinde"
              className="profile-pic"
            />
          </div>
          <h3>Ashutosh Shinde</h3>
          <p className="role">Full Stack Developer</p>
          <div className="social-links">
            <a href="mailto:ashutosh.22310120@viit.ac.in" className="social-link">
              <i className="fa fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/ashutosh-shinde" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://github.com/ashutosh" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://instagram.com/ashutosh" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Second Team Member */}
        <div className="team-member">
          <div className="profile-pic-container">
            <img 
              src="http://localhost:4000/images/manu_2.png"
              alt="Manaswi Shekokar"
              className="profile-pic"
            />
          </div>
          <h3>Manaswi Shekokar</h3>
          <p className="role">ML Engineer | UI/UX Designer</p>
          <div className="social-links">
            <a href="mailto:manaswi.shekokar@gmail.com" className="social-link">
              <i className="fa fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/manaswi-shekokar" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://github.com/manaswi" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://instagram.com/manaswi" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
