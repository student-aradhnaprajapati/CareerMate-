import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Landing.css';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal'; // Import the LoginModal component

const Landing = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  return (
    <div className="career-page">
      {/* Header */}
      <header className="header">
        <div className="logo">CareerMate</div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </nav>
        <button className="start-button" onClick={openModal}>Let's Start</button>
      </header>

      {/* Main Section */}
      <section className="hero-section">
        <h2>Explore your career with a quiz or with experts.</h2>
        <p className="cta-text">Choose the right path without any dilemma...</p>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-box">
          <h2>ABOUT US</h2>
          <p>
            We at CareerMate aim at providing the best guidance and motivation to help students shape their future.
            We believe that choosing the right career option is necessary for building a brighter future and fostering the skills of students...
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <div className="why-box">
          <h2>WHY TO CHOOSE THE RIGHT PATH?</h2>
          <p>
            Choosing the right career path is essential for personal fulfillment and long-term success...
          </p>
        </div>
      </section>

      {/* Why CareerMate Section */}
      <section className="why-careermate">
        <h2>WHY CAREERMATE?</h2>
        <div className="features">
          <div className="feature">
            <i className="icon">📘</i>
            <p>Take Quiz</p>
          </div>
          <div className="feature">
            <i className="icon">🔍</i>
            <p>Search and select the right career</p>
          </div>
          <div className="feature">
            <i className="icon">🤝</i>
            <p>1:1 personalized counseling sessions</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>REVIEWS</h2>
        <div className="reviews">
          <div className="review">
            <p>Aditi Verma</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
          <div className="review">
            <p>Suresh Kumar</p>
            <p>⭐⭐⭐⭐</p>
          </div>
          <div className="review">
            <p>Meghna Sinha</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="follow-us">
        <h2>FOLLOW US</h2>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram className="icon" />
            <p>Instagram</p>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin className="icon" />
            <p>LinkedIn</p>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube className="icon" />
            <p>YouTube</p>
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Developed and Maintained by careermate.org</p>
      </footer>

      {/* Render the Login Modal if it's open */}
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </div>
  );
}

export default Landing;
