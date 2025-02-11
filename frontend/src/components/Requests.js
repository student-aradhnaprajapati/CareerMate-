import React, { useEffect, useState } from 'react';
import './Requests.css';
import { useLocation } from 'react-router';
import axios from 'axios';


const Requests = () => {
    const location = useLocation();
    const [requests, setRequests] = useState([
        // { name: "Jay Patel", email: "abc@gmail.com", slot: "08:00:00" },
        // { name: "John Doe", email: "johndoe@example.com", slot: "09:00:00" },
        // { name: "Jane Smith", email: "janesmith@example.com", slot: "10:00:00" },

    ]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                console.log(localStorage.getItem('counsId'));
                const a = localStorage.getItem('counsId');
                const response = await axios(`http://localhost:5001/api/v1/counsellor/viewRequests`, {
                    params: {
                        cId: a
                    }
                });
                console.log(response);
                setRequests(response.data.slots);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchRequests(); // Call the function inside useEffect
    }, []);

    const changeStatus = async (slot_id, status) => {
        try {
            const response = await axios.post('http://localhost:5001/api/v1/counsellor/changeReqStatus', {
              slot_id: slot_id,
              status: status,
              couns_id: localStorage.getItem('counsId')
            });
      
            console.log(response);  // Handle the API response       // Return or set the data as needed
          } catch (error) {
            console.error('Error Changing Status:', error);
          }
    };

    console.log('Requests:', requests);

    return (
        <div className="Request-container">
            {requests.map((request, index) => (
                <div key={index} className="request-list">
                    <h2 className="Request-heading">Counselling Request {index + 1}</h2>
                    <p><strong>Student Name : </strong> {request.sName}</p>
                    <p><strong>Email : </strong> {request.sEmail}</p>
                    <br />
                    <p><strong>Start Time : </strong> {request.start_time}</p>
                    <p><strong>End Time : </strong> {request.end_time}</p>
                    <div className="select-btn">
                        <button className="cancel-btn" onClick={() => changeStatus(request.slot_id, 0)}>
                            Deny
                        </button>
                        <button className="conform-btn" onClick={() => changeStatus(request.slot_id, 1)}>
                            Accept
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Requests;