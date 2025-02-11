import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerticalNavBar from './components/verticalNavBar';
import Landing from './components/Landing';
import QuizProviderComponent from './components/quiz/quizProvider';
import QuizWindow from './components/quiz/quizWindow';
import CounsellorList from './components/CounsellorList';
import CounsLanding from './components/CounsLanding';
import Counsellor_Details_Submission from './components/Counsellor_Details_Submission';
import Student_Details_Submission from './components/Student_Details_Submission';
import CounsellorLogin from './components/CounsellorLogin';
import StudentLogin from './components/StudentLogin';
import StudentLanding from './components/StudentLanding';
import './App.css';
import Requests from './components/Requests';
import Printing from './components/Report';
import QuizReport from './components/quiz/quizReport';
import { QuizProvider } from './components/quiz/quizContext';
import StudentEdit from './components/StudentEdit';
import CounsellorEdit from './components/CounsellorEdit';
import CareerRoadmap from './components/resource-roadmap';
import StudRequests from './components/StudRequests';
import CounsProfile from './components/CounsProfile';

function App() {
  
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left
      <div className="flex-shrink-0 text-white">
      <VerticalNavBar />
      </div>  */}

      {/* Main content on the right */}
      <div className="flex-grow bg-gray-100 p-6 overflow-auto ml-60">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* <Route path="/" element={<QuizProviderComponent><QuizWindow /></QuizProviderComponent>} /> */}
            <Route path="/Student_Details_Submission" element={<Student_Details_Submission />} />
            <Route path="/StudentLogin" element={<StudentLogin />} />
            <Route path="/StudentLanding" element={<StudentLanding />} />
            <Route path="/CounsellorLogin" element={<CounsellorLogin />} />
            <Route path="/counsellor" element={<CounsellorList />} />
            <Route path="/Counsellor_Details_Submission" element={<Counsellor_Details_Submission />} />
            <Route path="/counslanding" element={<CounsLanding />} />
            <Route path='/Requests' element={<Requests />} />
            <Route path='/Printing' element={<Printing />} />
            <Route path="/QuizReport" element={<QuizReport />} />
            <Route path="/StudentEdit" element={<StudentEdit />} />
            <Route path="/CounsellorEdit" element={<CounsellorEdit />} />
            <Route path="/QuizWindow" element={<QuizProviderComponent><QuizWindow /></QuizProviderComponent>} />
            <Route path='/Resource' element={<CareerRoadmap />} />
            <Route path='/StudRequests' element={<StudRequests />} />
            <Route path='/CounsProfile/:id' element={<CounsProfile />} />
            {/* <Route path='/Navbar' element={<VerticalNavBar />} /> */}

            {/* <Route path='/QuizProvider' element={<QuizProvider />} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
