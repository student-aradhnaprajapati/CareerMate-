import React, { useState, useEffect } from 'react';
import SlotTable from './SlotTable';
import BookingPopup from './BookingPopup';
import axios from 'axios'

const Card = ({ counselor }) => {
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [slots, setSlots] = useState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      console.log(counselor.id);
      try {
        const response = await axios(`http://localhost:5001/api/v1/counsellor/getActiveSlots`, {
          params: {
            id: counselor.id,
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
  }, [counselor.id]); // Effect depends on the counsellorId


  const styles = {
    base: {
      color: "blueviolet",
      textDecoration: isHovered? "underline": "none"
    },
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingPopup(true);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{counselor.name}</h3>
          <p><b>Experience : </b>{counselor.experience ? counselor.experience : 0} years</p>
          <p><b>Rating : </b>{counselor.rating ? `${counselor.rating}★` : 'Not rated yet'}</p>
          <br />
          <a href={`/CounsProfile/${counselor.id}`} target='_blank' style={styles.base}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >View Profile</a>
        </div>
        <button
          onClick={() => setShowSlots(!showSlots)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          See Free Slots
        </button>
      </div>
      {showSlots && <SlotTable slots={slots} onSelect={handleSlotSelect} />}
      {showBookingPopup && (
        <BookingPopup
          slot={selectedSlot}
          counselor={counselor}
          onClose={() => setShowBookingPopup(false)}
        />
      )}
    </div>
  );
};

export default Card;
