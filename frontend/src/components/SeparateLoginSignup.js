import React from 'react';
import './SeparateLoginSignup.css'; // Import your custom CSS

const SeparateLoginSignup = () => {
  return (
    <div className="career-mate-page">
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h1>CareerMate</h1> {/* Moved the title here */}
          </div>
          <nav className="navbar">
            <ul>
              <li><a href="/home">Home</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="content">
        <div className="student-section">
          <h2>As a Student:</h2>
          <p>
            Sign up as a student and explore our website and take guidance
            regarding your career options.
          </p>
          <button className="signup-btn">Sign up</button>
          <p className="login-text">Already registered?</p>
          <button className="login-btn">Login</button>
        </div>

        <div className="divider"></div> {/* Vertical Line Divider */}

        <div className="counselor-section">
          <h2>As a Counsellor:</h2>
          <p>
            Sign up as a counsellor and guide meetings clearing doubts and
            confusions regarding their careers and shape their views and
            thoughts in the right direction.
          </p>
          <button className="signup-btn">Sign up</button>
          <p className="login-text">Already registered?</p>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default SeparateLoginSignup;