import React, { useState } from 'react';
import './Student_Details_Submission.css'; // Assuming you already have the CSS
import { useNavigate } from 'react-router';
import axios from 'axios';
function StudentEdit() {
  const [formData, setFormData] = useState({
    namee: '',
    phone: '',
    hobbies: '',
    edu_achieve: '',
    extra_achieve: '',
    selfStdyHrs: 0,
    extraCuri: '',
    mathScore: 0,
    langScore: 0,
    scienceScore: 0,
    englishScore: 0,
    sstScore: 0
  });
  
  const navigate= useNavigate();
  // Handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine domains into a single string (optional)
    // const combinedDomains = domains.filter(Boolean).join(', ');

    // const submissionData = { ...formData};

    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5001/api/v1/user/stuEdit', {
        id: localStorage.getItem("stuId"),
        namee: formData.namee,  // Make sure the 'id' is defined here
        phone: formData.phone,
        hobbies: formData.hobbies,
        edu_achieve: formData.edu_achieve,
        extra_achieve: formData.extra_achieve,
        acad: {
          selfStdyHrs: formData.selfStdyHrs,
          extraCuri: formData.extraCuri,
          mathScore: formData.mathScore,
          langScore: formData.langScore,
          scienceScore: formData.scienceScore,
          englishScore: formData.englishScore,
          sstScore: formData.sstScore
        }
      });

      console.log(response);  // Handle the API response       // Return or set the data as needed
    } catch (error) {
      console.error('Error Editing Profile :', error);
    }
    navigate("/StudentLanding");



    // try {
    //   const response = await fetch('http://localhost:5000/api/counsellor/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(submissionData),
    //   }
    // );

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert(data.message); // Success message
    //     // Reset form or redirect user
    //   } else {
    //     alert(data.message || 'Error submitting form');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('There was a problem with the submission.');
    // }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>CareerMate</h1>
        </div>
        
      </header>

      {/* Form */}
      <div className="form-container">
        <h2>Edit Profile</h2>
        <form className="form" onSubmit={handleSubmit}>
          {/* Removed ID input field */}
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              name="namee"
              placeholder="Enter your name"
              value={formData.namee}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone No.: </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hobbies: </label>
            <input
              type="text"
              name="hobbies"
              placeholder="Enter your hobbies"
              value={formData.hobbies}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Weekly Self Study Hours: </label>
            <input
              type="number"
              name="selfStdyHrs"
              placeholder="Enter no. of hours"
              value={formData.selfStdyHrs}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Maths Score: </label>
            <input
              type="number"
              name="mathScore"
              placeholder="Enter Math Score"
              value={formData.mathScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Language Score: </label>
            <input
              type="number"
              name="langScore"
              placeholder="Enter Language Score"
              value={formData.langScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Science Score: </label>
            <input
              type="number"
              name="scienceScore"
              placeholder="Enter Science Score"
              value={formData.scienceScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>English Score: </label>
            <input
              type="number"
              name="englishScore"
              placeholder="Enter English Score"
              value={formData.englishScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Social Studies Score: </label>
            <input
              type="number"
              name="sstScore"
              placeholder="Enter Social Studies Score"
              value={formData.sstScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Do you do extra curricular Activities ? </label>
            <input
              type="text"
              name="extraCuri"
              placeholder="Enter 'yes' or 'no'"
              value={formData.extraCuri}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Educational Achievements</label>
            <input
              type="text"
              name="edu_achieve"
              placeholder="Enter your qualification"
              value={formData.edu_achieve}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Extra Achievements: </label>
            <input
              type="text"
              name="extra_achieve"
              placeholder="Enter your achievements"
              value={formData.extra_achieve}
              onChange={handleInputChange}
            />
          </div>
          

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default StudentEdit;
