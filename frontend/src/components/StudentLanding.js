import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate
import './StudentLanding.css';
import { useLocation } from 'react-router-dom';
import Printing from './Report';
import axios from 'axios';
import VerticalNavBar from './verticalNavBar';

const StudentLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for counselor details modal
  const navigate = useNavigate();  // <-- Initialize navigate
  const [p1,setP1] = useState([]);
  const [p2,setP2] = useState([]);

  const [studentDetails,setStudentDetails] = useState(
    // name: "John Doe",
    // email: "johndoe@example.com",
    // phone: "1234567890",
  );

  useEffect(() => {
    const getDetails = async () => {
      // console.log(counselor.id);
      try {
        const response = await axios(`http://localhost:5001/api/v1/user/getProfileById`, {
          params: {
            id: localStorage.getItem('stuId'),
          }
        });
        console.log(response);
        setStudentDetails(response.data.basicDetails.rows[0]);
        let pp1 = [];
        let pp2 = [];
        for(let i=0; i<response.data.predictions.rows.length; i++) {
          pp1.push(response.data.predictions.rows[i]['field']);
          pp2.push(response.data.predictions.rows[i]['interest']*100);
        }

        setP1(pp1);
        setP2(pp2);

        // const result = await response.data.slots.rows;
        // setSlots(result); // Assuming your query result is in rows
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    getDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('stuId');
    localStorage.removeItem('stuName');
    localStorage.removeItem('stuEmail');
    navigate("/StudentLogin");
  }

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsModalOpen(true);
  };

  // Function to close the counselor details modal
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  // Function to start the quiz and navigate to the quiz page
  const startQuiz = () => {
    setIsModalOpen(false);  // Close the modal
    navigate('/QuizWindow');  // Navigate to the quiz page
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'details-modal-overlay') {
      closeDetailsModal();
    }
  };

  const editProfile = () => {
    navigate('/StudentEdit');
  };

  return (
    <div className="student-landing">
      <VerticalNavBar></VerticalNavBar>
      {/* Header Section */}
      <header className="header">
        <div className="logo">CareerMate</div>
        <nav className="nav">
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><button onClick={openModal} className="quiz-button">Quiz</button></li>
            <li><a href="/report">Report</a></li>
            <li><a href="/counsellor">Counselling</a></li>
            <li><a href="/Resource">Resource</a></li>
            <li><a href="/StudRequests">Requests</a></li>
          </ul>
        </nav>
        {/* <div className="user-icon">CM</div> Placeholder for user profile icon */}
        <div className="logo" onClick={openDetailsModal} style={{ cursor: 'pointer',width: '50px', height: '50px' }}>
            <img src={`${process.env.PUBLIC_URL}/profile_logo.png`} alt="Counsellor Logo" />
          </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Explore your career with a quiz or with experts.</h1>
          <p className="cta-text">Choose the right path without any dilemma...</p>
        </div>
        <div className="hero-image">
          <img src="/path-to-your-image.jpg" alt="Career Exploration" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2>ABOUT US</h2>
        <p>
          We at CareerMate aim at providing the best guidance and motivation to the future aspirants of our nation. 
          We believe that choosing a right career option is as necessary as building a brighter future...
        </p>
      </section>

      {/* Why Choose the Right Path Section */}
      <section className="why-section">
        <h2>WHY TO CHOOSE THE RIGHT PATH?</h2>
        <p>
          Choosing the right career path is essential for personal fulfillment and long-term success. 
          When you pursue a career that aligns with your passion and strengths, you’re more likely to find job satisfaction and excel in your role.
        </p>
      </section>

      {/* Career Illustrations Section */}
      <section className="careers-section">
        <div className="career-icons">
          <img src="/path-to-icon1.jpg" alt="Career 1" />
          <img src="/path-to-icon2.jpg" alt="Career 2" />
          <img src="/path-to-icon3.jpg" alt="Career 3" />
          <img src="/path-to-icon4.jpg" alt="Career 4" />
          <img src="/path-to-icon5.jpg" alt="Career 5" />
        </div>
      </section>

      {/* Popup Modal for Quiz */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="stu-modal-content">
            <h2>Start Your Quiz</h2>
            <p>Are you ready to begin your career quiz?</p>
            <button onClick={closeModal} className="close-modal-btn">Cancel</button>
            <button onClick={startQuiz} className="start-quiz-btn">Start Quiz</button> {/* Call startQuiz */}
          </div>
        </div>
      )}

{isDetailsModalOpen && (
        <div
          className="details-modal-overlay"
          onClick={handleOutsideClick}
          // style={{
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   position: 'fixed',
          //   top: 0,
          //   left: 0,
          //   width: '100%',
          //   height: '100%',
          //   backgroundColor: 'rgba(0, 0, 0, 0.3)',
          //   zIndex: 999,
          // }}
        >
          <div
            className="stu-modal-content"
            // style={{
            //   // display: 'flex',
            //   // justifySelf: 'center',
            //   position: 'absolute',
            //   top: '60px',
            //   right: '10px',
            //   backgroundColor: '#fff',
            //   padding: '20px',
            //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            //   borderRadius: '8px',
            //   textAlign: 'center'
            // }}
          >
            <h2><b>Student Details</b></h2>
            <p><strong>Name:</strong> {studentDetails.name}</p>
            <p><strong>Email:</strong> {studentDetails.email}</p>
            <p><strong>Phone:</strong> {studentDetails.phone}</p>
            {/* <div className='stuProf'> */}
            <br /><br />
            <Printing p1={p1} p2={p2} title="ML Based Interest Analysis"/>

            <div className='stuprofButtons'>
              
            <button className='stueditButton' onClick={editProfile} style={{display: 'flex'}}>Edit Profile</button>
            <button className='stulogoutButton' onClick={logout} style={{display: 'flex'}}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Developed and Maintained by careermate.org</p>
      </footer>
    </div>
  );
};

export default StudentLanding;
