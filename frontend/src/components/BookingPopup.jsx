import React from 'react';
import axios from 'axios';

const BookingPopup = ({ slot, counselor, onClose }) => {
  const handleConfirmBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/user/registerCouns', {
        student_id: localStorage.getItem('stuId'),  // Make sure the 'id' is defined here
        counsellor_id: counselor.id,
        status_of_request: 'Pending',
        slot_id: slot.slot_id
      });

      console.log(response);  // Handle the API response       // Return or set the data as needed
    } catch (error) {
      console.error('Error registering session:', error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
        <p><strong>Counselor:</strong> {counselor.name}</p>
        <p><strong>Date:</strong> {slot.day}</p>
        <p><strong>Start-Time:</strong> {slot.start_time}</p>
        <p><strong>End-Time:</strong> {slot.end_time}</p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBooking}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
