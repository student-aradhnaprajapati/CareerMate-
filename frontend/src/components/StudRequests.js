import React, { useEffect, useState } from 'react';
import './Requests.css';
import { useLocation } from 'react-router';
import axios from 'axios';


const StudRequests = () => {
    const location = useLocation();
    const [requests, setRequests] = useState([
        // { name: "Jay Patel", email: "abc@gmail.com", slot: "08:00:00" },
        // { name: "John Doe", email: "johndoe@example.com", slot: "09:00:00" },
        // { name: "Jane Smith", email: "janesmith@example.com", slot: "10:00:00" },

    ]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios(`http://localhost:5001/api/v1/user/getRequests`, {
                    params: {
                        sId: localStorage.getItem('stuId')
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

    console.log('Requests:', requests);

    return (
        <div className="Request-container">
            {requests.map((request, index) => (
                <div key={index} className="request-list">
                    <h2 className="Request-heading">Counselling Request {index + 1}</h2>
                    <p><strong>Counsellor Name : </strong> {request.cName}</p>
                    <p><strong>Email : </strong> {request.cEmail}</p>
                    <p><strong>Status : </strong> {request.status}</p>
                    <br />
                    <p><strong>Start Time : </strong> {request.start_time}</p>
                    <p><strong>End Time : </strong> {request.end_time}</p>
                </div>
            ))}
        </div>
    );
};

export default StudRequests;