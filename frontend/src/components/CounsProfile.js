import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './CounsProfile.css';

const CounsProfile = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [domains, setDomains] = useState([]);
  const [reviews, setReviews] = useState([]);
  console.log(id);

  useEffect(() => {
    const getDetails = async () => {
      // console.log(counselor.id);
      try {
        const response = await axios(`http://localhost:5001/api/v1/counsellor/getInfoById`, {
          params: {
            id: id,
          }
        });
        console.log(response);
        setInfo(response.data.info.rows[0]);
        setDomains(response.data.domains.rows);
        setReviews(response.data.reviews.rows);

        // const result = await response.data.slots.rows;
        // setSlots(result); // Assuming your query result is in rows
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    getDetails();
  }, []);
  // CUSTOM HOOK 
  return (
    <div className="counselor-detail7">
      <div className="counselor-card7">
        <h2 className="counselor-name7">{info.name}</h2>
        <br />
        <div className="contact-info7">
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
        </div>

        <div className="qualification7">
          <p><strong>Highest Qualification:</strong> {info.highest_qualification}</p>
          <p><strong>Rating:</strong> {info.rating != null ? `${info.rating}★` : "Not rated yet"}</p>
          <p><strong>Experience:</strong> {info.experience ? info.experience : 0} years</p>
        </div>
        <br /><br />

        <div className="domains7">
          <h2><b>Domains of Expertise:</b></h2>
          {domains.length > 0 ? (
            <ul>
              {domains.map((dObj, index) => (
                <li key={index}><b>{index + 1}. {dObj.domain}</b></li>
              ))}
            </ul>
          ) : (
            <p style={{color: 'black'}}><i>No domains set by the counsellor.</i></p>
          )}
        </div>
        <br /><br />

        <div className="reviews7">
          <h2><b>Reviews:</b></h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="review7">
                  <p>{index + 1}. {review.review}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounsProfile;
