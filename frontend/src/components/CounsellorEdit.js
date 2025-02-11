import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Counsellor_Details_Submission.css'; 
import axios from 'axios';

function CounsellorEdit() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    highest_qualification: '',
    domains: [''],
    experience: 0
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle domain change
  const handleDomainChange = (index, e) => {
    const newDomains = [...formData.domains];
    newDomains[index] = e.target.value;
    setFormData({ ...formData, domains: newDomains });
  };

  // Add a new domain input field
  const addDomainField = () => {
    setFormData({ ...formData, domains: [...formData.domains, ''] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, highest_qualification, domains, experience } = formData;
    console.log(formData);

    // Basic validation
    if (!name || !phone || !highest_qualification || !experience) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/v1/counsellor/counsEdit', {
        id: localStorage.getItem('counsId'),
        name: formData.name,  // Make sure the 'id' is defined here
        phone: formData.phone,
        highest_qualification: formData.highest_qualification,
        domains: formData.domains,
        experience: formData.experience
      });

      console.log(response);  // Handle the API response       // Return or set the data as needed
      navigate("/counslanding");
    } catch (error) {
      console.error('Error Updating Details:', error);
    }

    // try {
    //   const response = await fetch('/api/counsellor/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name,
    //       phone,
    //       email,
    //       password,
    //       highest_qualification,
    //       domains,
    //     }),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert('Registration successful!');
    //     navigate('/counslanding'); // Navigate to the landing page
    //   } else {
    //     alert('Registration failed: ' + data.error);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form', error);
    //   alert('Error submitting form');
    // }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>CareerMate</h1>
        </div>
        <nav className="navbar">
          <a href="/Home">Home</a>
        </nav>
      </header>

      {/* Form */}
      <div className="form-container">
        <h2>Enter your details</h2>
        <form className="form" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <p className="error">{error}</p>}

          {/* Form Fields */}
          <div className="form-group">
            <label>Name :- </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Phone No. :- </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Highest Qualification :- </label>
            <input
              type="text"
              name="highest_qualification"
              placeholder="Enter your qualification"
              value={formData.highest_qualification}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Experience :- </label>
            <input
              type="number"
              name="experience"
              placeholder="Enter your experience in years"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>

          {/* Multi-domain input field */}
          <div className="form-group">
            <label>Domains :-</label>
            {formData.domains.map((domain, index) => (
              <div key={index} className="domain-input-container">
                <input
                  type="text"
                  placeholder="Enter domain"
                  value={domain}
                  onChange={(e) => handleDomainChange(index, e)}
                />
                {index === formData.domains.length - 1 && (
                  <button type="button" onClick={addDomainField} className="add-btn">
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CounsellorEdit;