import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const slides = [
  {
    image: "http://localhost:4000/images/logo.jpg",
    title: "Be the change you wish to see!",
    text: "Contribute your time and skills to support shelter homes and make a difference. Help with feeding, nurturing, and rehabilitating animals in need. Take part in rescue missions and engage in community outreach initiatives.",
  },
  {
    image: "http://localhost:4000/images/2.jpg",
    title: "Because every life deserves care!",
    text: "Get medical check-ups and vaccinations for animals. Help with emergency care and rehabilitation efforts. Connect with vets and animal welfare specialists. Support healthcare funding and sponsorship programs.",
  },
  {
    image: "http://localhost:4000/images/3.jpg",
    title: "Find a forever friend!",
    text: "Explore profiles of lovable animals seeking a forever home. Find detailed insights on their health, breed, and personality. Easily connect with shelters for a smooth adoption process. Discover inspiring success stories of adopted pets.",
  },
  {
    image: "http://localhost:4000/images/4.jpg",
    title: "Engage, Learn, and Make a Difference!",
    text: "Keep up with welfare camps and awareness events. Join vaccination drives and medical aid programs. Take part in adoption fairs and community activities. Register effortlessly and get event updates.",
  },
];

const HomeLandingContainer = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-container">
      {/* Hero Section with Sliding Effect */}
      <div className="hero-section">
        <div className="hero-content fade-in">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].text}</p>
          <Link to="/donate" className="btn-primary" onClick={scrollToTop}>Donate</Link>
        </div>
        <img src={slides[currentSlide].image} alt="Hero" className="hero-image fade-in" />
      </div>

      
    </div>
  );
};

export default HomeLandingContainer;