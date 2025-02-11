import React from 'react';
import './LoginModal.css'; // Add styles for the modal
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate(); 
  const handleLoginStudent = () => {
    navigate('/StudentLogin'); // Navigate to student registration
    onClose(); // Close the modal
  };
  const handleLoginCounsellor = () => {
    navigate('/CounsellorLogin'); // Navigate to counsellor registration
    onClose(); // Close the modal
  };  
  const handleRegisterStudent = () => {
    navigate('/Student_Details_Submission'); // Navigate to student registration
    onClose(); // Close the modal
  };

  const handleRegisterCounsellor = () => {
    navigate('/Counsellor_Details_Submission'); // Navigate to counsellor registration
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Welcome!</h2>
        <div className="modal-content">
          <div className="login-section">
            <h3>Login as:</h3>
            <div className="login-buttons">
              <button onClick={handleLoginStudent}>Student Login</button>
              <button onClick={handleLoginCounsellor}>Counsellor Login</button>
            </div>
          </div>
          <div className="register-section">
            <h3>Register as:</h3>
            <div className="register-buttons">
              <button onClick={handleRegisterStudent}>Register as Student</button>
              <button onClick={handleRegisterCounsellor}>Register as Counsellor</button>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
