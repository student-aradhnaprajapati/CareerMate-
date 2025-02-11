import React from 'react';
import './verticalNavBar.css';
import { Link } from 'react-router-dom';

const VerticalNavBar = ({isStudent}) => {
  return (
    <div className='vNav'>
      <div className="h-screen w-48 bg-black text-white p-4 flex flex-col items-center">
        {/* <h2 className="text-2xl font-bold mb-8">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#home" className="text-yellow-500">Home</a>
          <a href="#profile" className="text-red-500">Profile</a> */}
          {/* <a href="#appointments" className="text-pink-500">Appointments</a>
    <div className="h-screen w-48 bg-black text-white p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <nav className="flex flex-col space-y-4">
        <a href="/Home" className="text-yellow-500">Home</a>
        <a href="#profile" className="text-red-500">Profile</a>
        {/* <a href="#appointments" className="text-pink-500">Appointments</a>
        <a href="#settings" className="text-yellow-500">Settings</a> */}

        {/* </nav> */}
        <div className='p-5 top-0'>
          <h1 className="stitle p-1">CareerMate</h1>
          <h3 className="stag p-3">Enlightening Futures, Nurturing Success</h3>
          <br /><br /><br />

          <ul className style={{alignItems: 'center'}}>
            <li><Link to="/StudentLanding" style={{padding: '60px'}}>Home</Link></li>
            <br />
            <li><Link to="/QuizWindow" style={{padding: '63px'}}>Quiz</Link></li>
            <br />
            {/* <li><a href="#report">Report</a></li> */}
            <li><Link to="/counsellor" style={{padding: '40px'}}>Counselling</Link></li>
            <br />
            <li><Link to="/Resource" style={{padding: '10px'}}>Roadmaps/Resources</Link></li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerticalNavBar;
