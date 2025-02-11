import React from "react";
import { useState } from "react";
import "./resource-roadmap.css"; 

const CareerRoadmap = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const toggleProfileOverlay = () => {
    setProfileOpen(!isProfileOpen);
  };
  
  const closeOverlayIfClickedOutside = (e) => {
    if (e.target.classList.contains("profile-overlay")) {
      setProfileOpen(false);
    }
  };

  return (
    <div className="career-roadmap">
      <header className="roadmap-header"> 
        <h1 className="logo">CareerMate</h1>
        <nav className="roadmap-navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#quiz">Quiz</a></li>
            <li><a href="#report">Report</a></li>
            <li><a href="#counsellor">Counsellor</a></li>
          </ul>
        </nav>
        <button className="profile-tab" onClick={toggleProfileOverlay}>
          <div className="profile-circle">HS</div>
        </button>
      </header>

      <section>
        <h2>Career Options After 10th</h2>

        <div className="stream">
          <h3>Science Stream</h3>
          <p>
            Subjects: Physics, Chemistry, Mathematics (PCM) / Biology (PCB),
            English, and optional subjects like Computer Science.
          </p>
          <h4>Engineering (PCM)</h4>
          <ul>
            <li>Courses: B.Tech, B.E., Diploma in Engineering</li>
            <li>Popular Exams: JEE Main, JEE Advanced, State-level Engineering Exams.</li>
            <li>Books: NCERT, Concepts of Physics by H.C. Verma, IIT Mathematics by M.L. Khanna, Organic Chemistry by OP Tandon, Comcise Inorganic Chemistry by JD Lee</li>
            <li>YouTube Channels: Unacademy JEE, Physics Wallah, Vedantu JEE</li>
            <li>Websites: Khan Academy, Embibe</li>
            <li>Notes: 
              <ul>             
                <li><a href="https://drive.google.com/drive/folders/1zZejrJopD0I4EeuEetyPeAcb2xwcMwvN" target="blank">Physics</a></li>
                <li><a href="https://drive.google.com/drive/folders/12dKPY1Wh7zKNNHGtYsaIUmmD1eHKY7MR" target="blank">Chemistry</a></li>
                <li><a href="https://drive.google.com/drive/folders/1ydCbLCjDgUQ2vx9Wt22PoGhAMpzbSwgE" target="blank">Mathematics</a> </li> 
              </ul>
            </li>
          </ul>

          <h4>Medical (PCB)</h4>
          <ul>
            <li>Courses: MBBS, BDS, BAMS, BHMS, Pharmacy.</li>
            <li>Popular Exams: NEET, AIIMS</li>
            <li>Books: Concepts of Physics by H.C. Verma, Organic Chemistry by OP Tandon, Comcise Inorganic Chemistry by JD Lee, Biology by Trueman’s Publications, NCERT</li>
            <li>YouTube Channels: Dr. Aman Arora, Biomentors, Aakash BYJU's NEET</li>
            <li>Websites: NEET Prep, Topper</li>
            <li>Notes: 
              <ul>             
                <li><a href="https://drive.google.com/drive/folders/1zZejrJopD0I4EeuEetyPeAcb2xwcMwvN" target="blank">Physics</a></li>
                <li><a href="https://drive.google.com/drive/folders/12dKPY1Wh7zKNNHGtYsaIUmmD1eHKY7MR" target="blank">Chemistry</a></li>
                <li><a href="https://drive.google.com/file/d/1DlAxpsZ5E3clkp-aNUsQOeh1vI1EXd-R/edit" target="blank">Biology</a> </li> 
              </ul>
            </li>
          </ul>

        </div>

        <div className="stream">
          <h3>Commerce Stream</h3>
          <p>Subjects: Business Studies, Accountancy, Economics, Mathematics, English.</p>
          <h4>Chartered Accountant (CA)</h4>
          <ul>
            <li>Courses: Chartered Accountancy, Company Secretary (CS), Cost Management Accounting (CMA)</li>
            <li>Popular Exams: CA Foundation, Intermediate, Final</li>
            <li>Books: Fundamentals of Accounting by P.C. Tulsian, Taxmann's series</li>
            <li>YouTube Channels: CA Rachana Ranade, Study at Home</li>
            <li>Websites: ICAI, Topper</li>
            <li>
              Notes:
              <ul>
                <li><a href="https://drive.google.com/drive/folders/1wmS0IAg0EaEZ6iJxaP5PPH3aHe4lJUJY?usp=sharing" target="blank">Business Studies</a></li>
                <li><a href="https://drive.google.com/drive/folders/1lcNczgXgEKJbZbt10W1J6cF9qGmwo5-Y?usp=sharing" target="blank">Accountancy</a></li>
                <li><a href="" target="blank">Economics</a></li>
              </ul>
            </li>
          </ul>

          <h4>Banking and Finance</h4>
          <ul>
            <li>Courses: B.Com, BBA, Economics, Financial Management</li>
            <li>Popular Exams: Bank PO, SSC CGL, IBPS Exams</li>
            <li>Books: Principles of Economics by N. Gregory Mankiw, Quantitative Aptitude by R.S. Aggarwal</li>
            <li>YouTube Channels: Study IQ, Adda247</li>
            <li>Websites: Bankersadda, Oliveboard</li>
          </ul>
        </div>

        <div className="stream">
          <h3>Arts Stream</h3>
          <p>Subjects: History, Political Science, Psychology, Geography, Sociology, English.</p>
          <h4>Law</h4>
          <ul>
            <li>Courses: BA LLB, LLB</li>
            <li>Popular Exams: CLAT, AILET</li>
            <li>Books: Legal Aptitude by A.P. Bhardwaj</li>
            <li>YouTube Channels: LegalEdge Tutorials, Unacademy CLAT</li>
            <li>Websites: CLAT Possible, Career Launcher</li>
          </ul>

          <h4>Civil Services/UPSC</h4>
          <ul>
            <li>Courses: BA in Political Science, History, Geography</li>
            <li>Popular Exams: UPSC, State Public Service Exams</li>
            <li>Books: Indian Polity by M. Laxmikanth, History of Modern India by Bipan Chandra</li>
            <li>YouTube Channels: Unacademy UPSC, Study IQ</li>
            <li>Websites: Vision IAS, ClearIAS</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CareerRoadmap;