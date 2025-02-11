import React, { useEffect, useState } from 'react';
import './CounsLanding.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import logo from 'D:/CareerMate/Careermate/frontend/public/profile_logo.png'; // Update the path based on where your image is located

function CounsLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle the modal open/close
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Counselor details modal
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');
  const [days, setDays] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages
  const [isManaging, setIsManaging] = useState(false);
  const [slots, setSlots] = useState([]);
  const [addSlots, setAddSlots] = useState(new Set());
  const [removeSlots, setRemoveSlots] = useState(new Set());
  // const location = useLocation();

  const counselorDetails = {
    name: localStorage.getItem('counsName'),
    email: localStorage.getItem('counsEmail'),
    phone: localStorage.getItem('counsPhone'),
    qualification: localStorage.getItem('counsQualification')
  };

  const logout = () => {
    localStorage.removeItem('counsId');
    localStorage.removeItem('counsName');
    localStorage.removeItem('counsEmail');
    localStorage.removeItem('counsPhone');
    localStorage.removeItem('counsQualification');
    navigate("/CounsellorLogin");
  }

  const editProfile = () => {
    navigate("/CounsellorEdit");
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const manageSlots = () => {
    setIsManaging(true);
    // fetchSlots();
  };

  const navigate = useNavigate();
  const viewRequests = () => {
    navigate("/requests");
  };

  // Close the modal
  const closeModal = () => {
    setDays(new Set());
    setIsModalOpen(false);
    setErrorMessage(''); // Clear error message when closing the modal
  };

  const closeManager = () => {
    setAddSlots(new Set());
    setRemoveSlots(new Set());
    // fetchSlots();
    setIsManaging(false);
  }

  const openDetailsModal = () => setIsDetailsModalOpen(true);
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target.className === 'details-modal-overlay') {
      closeDetailsModal();
    }
  };

  const addDay = (day) => {
    setDays((prevSet) => new Set([...prevSet, day]));
  }

  const removeDay = (day) => {
    setDays((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(day);
      return newSet;
    })
  }


  // Helper function to check if start time is before end time and the difference is at least 30 minutes
  const isValidTimeRange = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    // Convert start and end times to total minutes
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Check if start time is before end time and the difference is at least 30 minutes
    return endTotalMinutes > startTotalMinutes && (endTotalMinutes - startTotalMinutes) >= 30;
  };

  useEffect(() => {
    const fetchSlots = async () => {
      // console.log(counselor.id);
      try {
        const response = await axios(`http://localhost:5001/api/v1/counsellor/getAllSlots`, {
          params: {
            id: localStorage.getItem('counsId'),
          }
        });
        console.log(response);
        const result = await response.data.slots.rows;
        setSlots(result); // Assuming your query result is in rows
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
  }, [isManaging]);

  const handleSlots = (e) => {
    // console.log(days);
    const updateSlots = async () => {
      try {
        const arrDays = [...days];
        const response = await axios.post(`http://localhost:5001/api/v1/counsellor/changeSlotStatus`, {
          addSlots: [...addSlots],
          removeSlots: [...removeSlots]
        });
        console.log(response);
      } catch (error) {
        console.error('Error updating slots:', error);
      }
    };
    updateSlots();
    closeManager();
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (days.size === 0) {
      setErrorMessage('Please select atleast one day of week');
      return;
    }

    // Validate time range
    if (!isValidTimeRange(startTime, endTime)) {
      setErrorMessage('End time must be at least 30 minutes after start time.');
      return;
    }

    // Process the submitted start and end times (e.g., send to backend)
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Days:", days);

    // Clear error message
    setErrorMessage('');

    const addSlots = async () => {
      try {
        const arrDays = [...days];
        const response = await axios.post(`http://localhost:5001/api/v1/counsellor/addNewSlot`, {
          counsellor_id: localStorage.getItem('counsId'),
          start_time: startTime,
          end_time: endTime,
          days: arrDays,
          status: true
        });
        console.log(response);
      } catch (error) {
        console.error('Error adding slots:', error);
      }
    };
    addSlots();
    setDays(new Set());

    // Close the modal after submitting
    closeModal();
  };

  return (
    <div className="Nav-bar">
      <header className="header">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CareerMate</h1>
          <nav>
            <ul className="Nav_bar">
              <li><a href="/Home" className="hover:underline">HOME</a></li>
              <li>
                <button className="hover:underline" onClick={openModal}>ADD SLOT</button>
              </li>
              <li><button onClick={manageSlots} className="hover:underline">MANAGE SLOTS</button></li>
              <li><button onClick={viewRequests} className="hover:underline">REQUESTS</button></li>
            </ul>
          </nav>
          {/* Logo in the top-right corner */}
          <div className="logo" onClick={openDetailsModal} style={{ cursor: 'pointer' }}>
            <img src={`${process.env.PUBLIC_URL}/profile_logo.png`} alt="Counsellor Logo" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="hero_section">
          <h1>Give guidance to others.</h1>
          <p className="cta-text">Guide the right path to students with your experience...</p>
        </section>

        <section className="about_section">
          <div className="about_box">
            <h2>ABOUT US</h2>
            <p>
              We at CareerMate aim at providing the best guidance and motivation to help students shape their future.
              We believe that choosing the right career option is necessary for building a brighter future and fostering
              the skills of students, requiring proper guidance and planning...
            </p>
          </div>
        </section>

        <section className="why">
          <div className="why-box">
            <h2>WHY GUIDE THE RIGHT CAREER PATH?</h2>
            <p>Guiding the right career path is essential for personal fulfillment and long-term success...</p>
          </div>
        </section>

        <section className="Session">
          <h2 className="expart">Expert Career Guidance</h2>
          <p className="expart-more">Unlock Your Potential with Personalized Career Counselling</p>
        </section>
      </main>

      <footer className="footer-section">
        <div className="footer-box">
          <p>CareerMate Counselling</p>
        </div>
      </footer>

      {/* Add Slot Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Slot</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'inline-flex', alignSelf: 'start' }}>
                  <input
                    type="checkbox"
                    value="Monday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(1) : removeDay(1) }}
                  />
                  Monday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Tuesday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(2) : removeDay(2) }}
                  />
                  Tuesday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Wednesday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(3) : removeDay(3) }}
                  />
                  Wednesday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Thursday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(4) : removeDay(4) }}
                  />
                  Thursday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Friday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(5) : removeDay(5) }}
                  />
                  Friday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Saturday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(6) : removeDay(6) }}
                  />
                  Saturday
                </label>
              </div>
              <div>
                <label style={{ display: 'inline-flex' }}>
                  <input
                    type="checkbox"
                    value="Sunday"
                    // checked={isChecked1}
                    onChange={(e) => { e.target.checked ? addDay(0) : removeDay(0) }}
                  />
                  Sunday
                </label>
              </div>

              {/* Display error message if start time is greater than end time or time diff is less than 30 minutes */}
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <button type="submit">Submit</button>
              <button type="button" onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Counselor Details Modal */}
      {isDetailsModalOpen && (
        <div
          className="details-modal-overlay"
          onClick={handleOutsideClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999
          }}
        >
          <div
            className="details-modal"
            style={{
              position: 'absolute',
              top: '60px',
              right: '10px',
              backgroundColor: '#fff',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px'
            }}
          >
            <h2>Counselor Details</h2>
            <p><strong>Name:</strong> {counselorDetails.name}</p>
            <p><strong>Email:</strong> {counselorDetails.email}</p>
            <p><strong>Phone:</strong> {counselorDetails.phone}</p>
            <p><strong>Qualification:</strong> {counselorDetails.qualification}</p>
            <div className='profButtons'>

              <button className='editButton' onClick={editProfile} style={{ display: 'flex' }}>Edit Profile</button>
              <button className='logoutButton' onClick={logout} style={{ display: 'flex' }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {isManaging && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Manage Counselling Time Slots</h3>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>Timeslot</b>
              <b>Open/Closed</b>
            </div>
            <br />
            <form onSubmit={handleSlots}>
              {slots.map((slot, index) => (
                <label key={index} style={{ display: 'inline-flex' }}>
                  {slot.day}({slot.start_time}-{slot.end_time})
                  <input
                    type="checkbox"
                    defaultChecked={slot.status}
                    onChange={(e) => { e.target.checked ? setAddSlots(new Set([...addSlots, slot.slot_id])) : setRemoveSlots(new Set([...removeSlots, slot.slot_id])) }}
                  />
                </label>
              ))}
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={closeManager}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CounsLanding;
